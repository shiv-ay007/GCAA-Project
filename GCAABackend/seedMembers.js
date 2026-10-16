require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const RegisteredMember = require('./Models/RegisteredMember');

const cleanAndFormatName = (str = '') => {
  const clean = str.replace(/\[Deceased\]/gi, '').trim();
  if (clean === clean.toUpperCase() || clean === clean.toLowerCase()) {
    return clean
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .map((w) => (w.includes('.') ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
      .join(' ');
  }
  return clean;
};

const getMembershipNo = (record, idx = 1) => {
  if (record?.membershipNo) return record.membershipNo;
  const yearStr = String(record?.year || '').trim();
  const match = yearStr.match(/\b(19\d\d|20\d\d)\b/) || yearStr.match(/\d{4}/);
  const yearCode = match ? match[0] : (parseInt(yearStr, 10) || 2026);
  const seq = 100 + (Number(record?.sno) || idx);
  return `GCA${yearCode}${seq}`;
};

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas!');

    // Check existing count
    const existingCount = await RegisteredMember.countDocuments();
    console.log(`Current registered members in database: ${existingCount}`);

    // Read alumni data from frontend
    const alumniRecordsPath = path.resolve(__dirname, '../GCAAA-Frotend-/src/data/alumniRecords.js');
    const cohortRecordsPath = path.resolve(__dirname, '../GCAAA-Frotend-/src/data/cohortRecords.js');

    let allExtracted = [];

    if (fs.existsSync(alumniRecordsPath)) {
      const rawAlumni = fs.readFileSync(alumniRecordsPath, 'utf-8');
      // Extract JSON array from file
      const jsonStart = rawAlumni.indexOf('[');
      const jsonEnd = rawAlumni.lastIndexOf(']');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        try {
          const rawRecords = JSON.parse(rawAlumni.substring(jsonStart, jsonEnd + 1));
          console.log(`Parsed ${rawRecords.length} records from alumniRecords.js`);

          rawRecords.forEach((r, idx) => {
            const rawName = r.name || '';
            const name = cleanAndFormatName(rawName);
            const memNo = getMembershipNo(r, idx + 1);
            allExtracted.push({
              name,
              membershipNo: memNo,
              year: String(r.year || ''),
              cohort: 'all',
              course: 'Bachelor of Architecture',
              email: r.email || '',
              mobile: r.mobile || '',
              status: r.reg === 'PAID' ? 'Verified' : 'Active',
            });
          });
        } catch (e) {
          console.warn('Could not parse alumniRecords JSON automatically:', e.message);
        }
      }
    }

    if (allExtracted.length === 0) {
      console.log('Inserting baseline sample members...');
      allExtracted = [
        { sno: 1, name: 'Aakash KR. Yadav', membershipNo: 'GCA2022101', year: '2022', cohort: 'all', course: 'Bachelor of Architecture', status: 'Verified' },
        { sno: 2, name: 'Aakash Panchal', membershipNo: 'GCA2021101', year: '2021', cohort: 'all', course: 'Bachelor of Architecture', status: 'Verified' },
        { sno: 3, name: 'Aakriti Agarwal', membershipNo: 'GCA2020101', year: '2020', cohort: 'all', course: 'Bachelor of Architecture', status: 'Verified' },
        { sno: 4, name: 'Aalok Kumar', membershipNo: 'GCA2019101', year: '2019', cohort: 'all', course: 'Bachelor of Architecture', status: 'Active' },
        { sno: 5, name: 'Aditya Raj Singh Paliwal', membershipNo: 'GCA2023104', year: '2023', cohort: 'all', course: 'Bachelor of Architecture', status: 'Verified' },
        { sno: 6, name: 'Aditya Shukla', membershipNo: 'GCA2024105', year: '2024', cohort: 'all', course: 'Bachelor of Architecture', status: 'Active' },
        { sno: 7, name: 'Aditya Singh', membershipNo: 'GCA2007101', year: '2007', cohort: 'all', course: 'Bachelor of Architecture', status: 'Verified' },
        { sno: 8, name: 'Alok Kumar', membershipNo: 'GCA2025101', year: '2025', cohort: 'all', course: 'Bachelor of Architecture', status: 'Active' },
        { sno: 9, name: 'Alok Kumar Ojha', membershipNo: 'GCA2013102', year: '2013', cohort: 'all', course: 'Bachelor of Architecture', status: 'Verified' },
        { sno: 10, name: 'Alok Kumar Srivastava', membershipNo: 'GCA2007104', year: '2007', cohort: 'all', course: 'Bachelor of Architecture', status: 'Verified' },
      ];
    }

    // Deduplicate by name & membershipNo
    const seen = new Set();
    const deduplicated = [];
    allExtracted.forEach((item) => {
      const key = `${item.name.toLowerCase()}___${item.membershipNo.toLowerCase()}`;
      if (!seen.has(key)) {
        seen.add(key);
        deduplicated.push(item);
      }
    });

    // Sort alphabetically by name
    deduplicated.sort((a, b) => a.name.localeCompare(b.name));

    // Assign sequential sno
    const finalMembers = deduplicated.map((m, idx) => ({
      ...m,
      sno: idx + 1,
    }));

    console.log(`Prepared ${finalMembers.length} deduplicated member records.`);

    // Bulk upsert into MongoDB
    console.log('Performing bulk upsert into MongoDB collection...');
    const bulkOps = finalMembers.map((m) => ({
      updateOne: {
        filter: { membershipNo: m.membershipNo },
        update: { $set: m },
        upsert: true,
      },
    }));

    // In chunks of 500
    const chunkSize = 500;
    for (let i = 0; i < bulkOps.length; i += chunkSize) {
      const chunk = bulkOps.slice(i, i + chunkSize);
      await RegisteredMember.bulkWrite(chunk, { ordered: false });
      console.log(`Processed ${Math.min(i + chunkSize, bulkOps.length)} of ${bulkOps.length}`);
    }

    const newCount = await RegisteredMember.countDocuments();
    console.log(`✅ Success! Total members now in MongoDB Atlas: ${newCount}`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
