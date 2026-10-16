const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

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

// 1. Prior to 1985 & B.Arch Records for alumniRecords.js
const bArchAndDiplomaRecords = [];
const seenMemNos = new Set();
const seenBArchNames = new Set();

// From b1985 mob mails
const wsD = wb1.Sheets['b1985 mob mails'];
if (wsD) {
  const dRows = XLSX.utils.sheet_to_json(wsD, { header: 1 });
  dRows.slice(3).forEach((r) => {
    const memNo = cleanStr(r[1]).toUpperCase();
    const rawName = cleanStr(r[2]);
    if (memNo && rawName && /^D\d+/i.test(memNo)) {
      const name = cleanAndFormatName(rawName);
      if (!seenMemNos.has(memNo)) {
        seenMemNos.add(memNo);
        seenBArchNames.add(name.toLowerCase());
        bArchAndDiplomaRecords.push({
          sno: bArchAndDiplomaRecords.length + 1,
          membershipNo: memNo,
          year: 'Prior to 1985',
          name,
          reg: 'PAID',
          email: cleanStr(r[4]),
          mobile: cleanStr(r[5]),
        });
      }
    }
  });
}

// From ALL (85-2025)
const wsU = wb1.Sheets['ALL (85-2025)'];
if (wsU) {
  const uRows = XLSX.utils.sheet_to_json(wsU, { header: 1 });
  let currentYear = 1985;
  uRows.forEach((r) => {
    if (!r || r.length === 0) return;
    if ((r[0] === null || r[0] === undefined || r[0] === '') && r[1]) {
      const y = parseInt(cleanStr(r[1]), 10);
      if (!isNaN(y) && y >= 1970 && y <= 2030) currentYear = y;
    }
    const memNo = cleanStr(r[1]).toUpperCase();
    const rawName = cleanStr(r[2]);
    if (memNo && rawName && /^U\d+/i.test(memNo)) {
      const name = cleanAndFormatName(rawName);
      if (!seenMemNos.has(memNo)) {
        seenMemNos.add(memNo);
        seenBArchNames.add(name.toLowerCase());
        bArchAndDiplomaRecords.push({
          sno: bArchAndDiplomaRecords.length + 1,
          membershipNo: memNo,
          year: currentYear,
          name,
          reg: cleanStr(r[3]) ? 'PAID' : '',
          email: cleanStr(r[4]),
          mobile: cleanStr(r[5]),
        });
      }
    }
  });
}

// Add remaining from all alumani rev (2).xls
const ws2 = wb2.Sheets['ALL (85-2025)'];
if (ws2) {
  const rows2 = XLSX.utils.sheet_to_json(ws2, { header: 1 });
  let yr2 = 1985;
  let added = 0;
  rows2.forEach((r) => {
    if (!r || r.length === 0) return;
    if (r[1] && typeof r[1] === 'string' && /\b(19\d\d|20\d\d)\b/.test(r[1])) {
      const m = r[1].match(/\b(19\d\d|20\d\d)\b/);
      if (m) yr2 = parseInt(m[0], 10);
    }
    const rawName = cleanStr(r[2]);
    if (rawName && !rawName.toUpperCase().includes('NAME') && !rawName.toUpperCase().includes('LIST OF GCA')) {
      const name = cleanAndFormatName(rawName);
      if (!seenBArchNames.has(name.toLowerCase())) {
        seenBArchNames.add(name.toLowerCase());
        added++;
        const batchNum = yr2 >= 1985 ? yr2 - 1985 + 1 : 1;
        const batchStr = String(batchNum).padStart(2, '0');
        let genMemNo = `U${batchStr}${String(100 + (added % 800)).padStart(3, '0')}`;
        while (seenMemNos.has(genMemNo)) {
          added++;
          genMemNo = `U${batchStr}${String(100 + (added % 800)).padStart(3, '0')}`;
        }
        seenMemNos.add(genMemNo);

        bArchAndDiplomaRecords.push({
          sno: bArchAndDiplomaRecords.length + 1,
          membershipNo: genMemNo,
          year: yr2,
          name,
          reg: cleanStr(r[3]).toUpperCase() === 'PAID' ? 'PAID' : '',
          email: cleanStr(r[4]),
          mobile: cleanStr(r[5]),
        });
      }
    }
  });
}

console.log('Total B.Arch & Diploma records:', bArchAndDiplomaRecords.length);

// 2. Extract PG cohorts
function extractPG(sheetName, prefix, defaultYear) {
  const ws = wb1.Sheets[sheetName];
  if (!ws) return [];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
  let yr = defaultYear;
  const list = [];
  rows.forEach((r) => {
    if (!r || r.length === 0) return;
    if ((r[0] === null || r[0] === undefined || r[0] === '') && r[1]) {
      const y = parseInt(cleanStr(r[1]), 10);
      if (!isNaN(y) && y >= 2000 && y <= 2030) yr = y;
    }
    const memNo = cleanStr(r[1]).toUpperCase();
    const rawName = cleanStr(r[2]);
    if (memNo && rawName && new RegExp('^' + prefix, 'i').test(memNo)) {
      list.push({
        sno: list.length + 1,
        membershipNo: memNo,
        year: yr,
        name: cleanAndFormatName(rawName),
        reg: 'PAID',
        email: cleanStr(r[4]),
        mobile: cleanStr(r[5]),
      });
    }
  });
  return list;
}

const marchRecords = extractPG('m.arch 15-21', 'M1', 2015);
const murpRecords = extractPG('MURP-20,21', 'M2', 2021);
const miendRecords = extractPG('MIEND-20', 'M3', 2022);
const mindRecords = extractPG('MIND-23', 'M4', 2023);

console.log('marchRecords:', marchRecords.length);
console.log('murpRecords:', murpRecords.length);
console.log('miendRecords:', miendRecords.length);
console.log('mindRecords:', mindRecords.length);

// Write alumniRecords.js
const alumniFilePath = path.join(__dirname, '..', 'GCAAA-Frotend-', 'src', 'data', 'alumniRecords.js');
const alumniContent = `// GCA Alumni Association official members roll (Updated from Lifetime 15oct and revised master)\nexport const alumniRecords = ${JSON.stringify(bArchAndDiplomaRecords, null, 2)};\n`;
fs.writeFileSync(alumniFilePath, alumniContent, 'utf8');
console.log('Wrote alumniRecords.js!');

// Write cohortRecords.js
const cohortFilePath = path.join(__dirname, '..', 'GCAAA-Frotend-', 'src', 'data', 'cohortRecords.js');
const cohortContent = `// Postgraduate Cohort Alumni Records extracted from GCA Master Excel Directory
import { alumniRecords } from './alumniRecords.js';

export const marchRecords = ${JSON.stringify(marchRecords, null, 2)};

export const murpRecords = ${JSON.stringify(murpRecords, null, 2)};

export const miendRecords = ${JSON.stringify(miendRecords, null, 2)};

export const mindRecords = ${JSON.stringify(mindRecords, null, 2)};

export const getBatchNo = (year, cohortId = 'all') => {
  const yrStr = String(year || '').trim();
  const yrNum = parseInt(yrStr, 10);

  if (!isNaN(yrNum)) {
    if (cohortId === 'm-arch') {
      const num = yrNum - 2015 + 1;
      return num > 0 ? \`Batch \${num}\` : \`Batch \${yrNum}\`;
    }
    if (cohortId === 'murp') {
      const num = yrNum - 2020 + 1;
      return num > 0 ? \`Batch \${num}\` : \`Batch \${yrNum}\`;
    }
    if (cohortId === 'miend') {
      const num = yrNum - 2020 + 1;
      return num > 0 ? \`Batch \${num}\` : \`Batch \${yrNum}\`;
    }
    if (cohortId === 'mind') {
      const num = yrNum - 2023 + 1;
      return num > 0 ? \`Batch \${num}\` : \`Batch \${yrNum}\`;
    }

    if (yrNum >= 1985) {
      const bArchBatch = yrNum - 1985 + 1;
      return \`Batch \${bArchBatch}\`;
    }
    return 'Foundation Batch';
  }

  return yrStr || '—';
};

export const getMembershipNo = (record) => {
  if (record?.membershipNo) return record.membershipNo;
  const yearStr = String(record?.year || '').trim();
  const match = yearStr.match(/\\b(19\\d\\d|20\\d\\d)\\b/) || yearStr.match(/\\d{4}/);
  const yearCode = match ? parseInt(match[0], 10) : 2026;
  const batchNum = yearCode >= 1985 ? (yearCode - 1985 + 1) : 1;
  const seq = 100 + (Number(record?.sno) || 1);
  return \`U\${String(batchNum).padStart(2, '0')}\${seq}\`;
};

const enrichRecords = (records = [], cohortId = 'all') =>
  records.map((r) => ({
    ...r,
    batchNo: r.batchNo || getBatchNo(r.year, cohortId),
    membershipNo: r.membershipNo || getMembershipNo(r),
  }));

export const allCohorts = {
  'all': {
    id: 'all',
    label: 'ALL (85-2025)',
    course: 'Bachelor of Architecture & Foundation (Prior to 1985 - 2025)',
    records: enrichRecords(alumniRecords, 'all'),
  },
  'm-arch': {
    id: 'm-arch',
    label: 'm.arch 15-21',
    course: 'Master of Architecture (M.Arch 2015-2023)',
    records: enrichRecords(marchRecords, 'm-arch'),
  },
  'murp': {
    id: 'murp',
    label: 'MURP-20,21',
    course: 'Master of Urban & Regional Planning (MURP 2020-2025)',
    records: enrichRecords(murpRecords, 'murp'),
  },
  'miend': {
    id: 'miend',
    label: 'MIEND-20',
    course: 'Master In Environmental Design (MIEND 2020-2025)',
    records: enrichRecords(miendRecords, 'miend'),
  },
  'mind': {
    id: 'mind',
    label: 'MIND-23',
    course: 'Master In Interior Design (MIND 2023-2025)',
    records: enrichRecords(mindRecords, 'mind'),
  },
};
`;

fs.writeFileSync(cohortFilePath, cohortContent, 'utf8');
console.log('Wrote cohortRecords.js!');
