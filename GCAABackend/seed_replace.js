const XLSX = require('xlsx');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const RegisteredMember = require('./Models/RegisteredMember');

const f1 = path.join(__dirname, '..', 'GCAAA-Frotend-', 'src', 'assets', 'Lifetime 15oct (2).xls');
const f2 = path.join(__dirname, '..', 'GCAAA-Frotend-', 'src', 'assets', 'all alumani rev (2).xls');

const wb1 = XLSX.readFile(f1);
const wb2 = XLSX.readFile(f2);

function cleanStr(val) {
  if (val === null || val === undefined) return '';
  return String(val).trim();
}

function cleanAndFormatName(str = '') {
  const clean = str.replace(/\[Deceased\]/gi, '').trim();
  if (clean === clean.toUpperCase() || clean === clean.toLowerCase()) {
    return clean
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .map((w) => {
        if (w.includes('.')) return w.toUpperCase();
        return w.charAt(0).toUpperCase() + w.slice(1);
      })
      .join(' ');
  }
  return clean;
}

async function runSeed() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected!');

  // Check if Shivam Yadav exists and preserve his details
  const shivam = await RegisteredMember.findOne({ email: 'shivamyadav993671@gmail.com' });
  const preservedMembers = [];
  if (shivam) {
    console.log('Found existing test registration for:', shivam.name);
    preservedMembers.push(shivam.toObject());
  }

  const allRecords = [];
  const seenMemNos = new Set();
  const seenNames = new Set();

  // 1. Process Lifetime 15oct (2).xls
  const sheetConfigs1 = [
    {
      name: 'b1985 mob mails',
      defaultYear: 'Prior to 1985',
      course: 'Bachelor of Architecture',
      cohort: 'all',
      prefix: 'D',
    },
    {
      name: 'ALL (85-2025)',
      defaultYear: '1985',
      course: 'Bachelor of Architecture',
      cohort: 'all',
      prefix: 'U',
    },
    {
      name: 'm.arch 15-21',
      defaultYear: '2015',
      course: 'Master of Architecture',
      cohort: 'm-arch',
      prefix: 'M1',
    },
    {
      name: 'MURP-20,21',
      defaultYear: '2021',
      course: 'Master of Urban & Regional Planning',
      cohort: 'murp',
      prefix: 'M2',
    },
    {
      name: 'MIEND-20',
      defaultYear: '2022',
      course: 'Master In Environmental Design',
      cohort: 'miend',
      prefix: 'M3',
    },
    {
      name: 'MIND-23',
      defaultYear: '2023',
      course: 'Master In Interior Design',
      cohort: 'mind',
      prefix: 'M4',
    },
  ];

  sheetConfigs1.forEach((cfg) => {
    const ws = wb1.Sheets[cfg.name];
    if (!ws) return;
    const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
    let yr = cfg.defaultYear;

    rows.forEach((r) => {
      if (!r || r.length === 0) return;
      if ((r[0] === null || r[0] === undefined || r[0] === '') && r[1]) {
        const y = parseInt(cleanStr(r[1]), 10);
        if (!isNaN(y) && y >= 1970 && y <= 2030) yr = String(y);
      }
      const memNo = cleanStr(r[1]).toUpperCase();
      const rawName = cleanStr(r[2]);
      if (memNo && rawName && new RegExp('^' + cfg.prefix, 'i').test(memNo)) {
        const name = cleanAndFormatName(rawName);
        if (!seenMemNos.has(memNo)) {
          seenMemNos.add(memNo);
          seenNames.add(`${name.toLowerCase()}___${cfg.cohort}`);
          allRecords.push({
            membershipNo: memNo,
            name,
            year: yr,
            course: cfg.course,
            cohort: cfg.cohort,
            email: cleanStr(r[4]),
            mobile: cleanStr(r[5]),
            status: 'Verified',
          });
        }
      }
    });
  });

  console.log('Lifetime members with official ID extracted:', allRecords.length);

  // 2. Add remaining non-duplicate alumni from all alumani rev (2).xls
  const ws2 = wb2.Sheets['ALL (85-2025)'];
  if (ws2) {
    const rows2 = XLSX.utils.sheet_to_json(ws2, { header: 1 });
    let yr2 = '1985';
    let addedFromRev = 0;

    rows2.forEach((r) => {
      if (!r || r.length === 0) return;
      if (r[1] && typeof r[1] === 'string' && /\b(19\d\d|20\d\d)\b/.test(r[1])) {
        const m = r[1].match(/\b(19\d\d|20\d\d)\b/);
        if (m) yr2 = m[0];
      }
      const rawName = cleanStr(r[2]);
      if (rawName && !rawName.toUpperCase().includes('NAME') && !rawName.toUpperCase().includes('LIST OF GCA')) {
        const name = cleanAndFormatName(rawName);
        const nameKey = `${name.toLowerCase()}___all`;
        if (!seenNames.has(nameKey)) {
          seenNames.add(nameKey);
          addedFromRev++;

          const yNum = parseInt(yr2, 10);
          const batchNum = !isNaN(yNum) && yNum >= 1985 ? yNum - 1985 + 1 : 1;
          const batchStr = String(batchNum).padStart(2, '0');
          let genMemNo = `U${batchStr}${String(100 + (addedFromRev % 800)).padStart(3, '0')}`;
          while (seenMemNos.has(genMemNo)) {
            addedFromRev++;
            genMemNo = `U${batchStr}${String(100 + (addedFromRev % 800)).padStart(3, '0')}`;
          }
          seenMemNos.add(genMemNo);

          allRecords.push({
            membershipNo: genMemNo,
            name,
            year: yr2,
            course: 'Bachelor of Architecture',
            cohort: 'all',
            email: cleanStr(r[4]),
            mobile: cleanStr(r[5]),
            status: cleanStr(r[3]).toUpperCase() === 'PAID' ? 'Verified' : 'Active',
          });
        }
      }
    });
    console.log('Added remaining alumni from all alumani rev (2):', addedFromRev);
  }

  // Sort alphabetically by name initially for sequential S.No assignment
  allRecords.sort((a, b) => a.name.localeCompare(b.name));

  const finalDocs = allRecords.map((item, idx) => ({
    ...item,
    sno: idx + 1,
    createdAt: new Date(Date.now() - (allRecords.length - idx) * 1000 * 60), // older timestamps
  }));

  // Re-add preserved registrations at the very top (highest S.No, newest createdAt)
  if (preservedMembers.length > 0) {
    preservedMembers.forEach((p, idx) => {
      delete p._id;
      finalDocs.push({
        ...p,
        sno: finalDocs.length + 1,
        membershipNo: p.membershipNo || 'U42001',
        createdAt: new Date(), // newest timestamp so it is at the very top!
      });
    });
  }

  console.log(`Replacing collection with ${finalDocs.length} total records...`);
  await RegisteredMember.deleteMany({});
  await RegisteredMember.insertMany(finalDocs);
  console.log('Successfully replaced database with official records!');

  const count = await RegisteredMember.countDocuments();
  console.log('Total documents now in MongoDB Atlas:', count);
  process.exit(0);
}

runSeed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
