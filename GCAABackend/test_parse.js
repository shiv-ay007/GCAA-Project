const XLSX = require('xlsx');
const path = require('path');

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

const members = [];
const seen = new Set();

// 1. Extract from Lifetime 15oct (2).xls (All with official membership numbers)
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
      const key = name.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        members.push({
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

console.log('Lifetime Official Members:', members.length);

// 2. Add remaining alumni from all alumani rev (2).xls if any exist
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
      const key = name.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        addedFromRev++;
        const yNum = parseInt(yr2, 10);
        const batchNum = !isNaN(yNum) && yNum >= 1985 ? yNum - 1985 + 1 : 1;
        const batchStr = String(batchNum).padStart(2, '0');
        const generatedMemNo = `U${batchStr}${String(100 + (addedFromRev % 800)).padStart(3, '0')}`;

        members.push({
          membershipNo: generatedMemNo,
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
  console.log('Added remaining from all alumani rev (2):', addedFromRev);
}

console.log('Total Master Records:', members.length);
