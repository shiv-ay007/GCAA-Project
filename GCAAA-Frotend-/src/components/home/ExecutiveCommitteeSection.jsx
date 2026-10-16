import { Phone, Mail, Shield, Award, Users } from 'lucide-react';
import p2 from '@/assets/images/p-2.png';
import p3 from '@/assets/images/p-3.png';

// Helper to get the first letter of the person's actual name (ignoring "Ar." / "Dr." titles)
const getNameInitial = (fullName = '') => {
  const cleaned = fullName.replace(/^(Ar\.|Dr\.|Er\.|Prof\.|Mr\.|Mrs\.|Ms\.)\s*/i, '').trim();
  return cleaned ? cleaned.charAt(0).toUpperCase() : 'G';
};

// Reusable circular avatar component (photo if available, otherwise styled initial letter)
const MemberAvatar = ({ name, image, size = 'lg', className = 'mb-2' }) => {
  const initial = getNameInitial(name);
  const sizeClasses =
    size === 'lg'
      ? 'w-24 h-24 sm:w-28 sm:h-28 text-3xl sm:text-4xl'
      : 'w-20 h-20 sm:w-22 sm:h-22 text-2xl sm:text-3xl';

  return (
    <div className={`relative mx-auto ${className} inline-flex items-center justify-center`}>
      {/* Outer decorative ring */}
      <div
        className={`${sizeClasses} rounded-full p-1 bg-gradient-to-tr from-[#B70D2B] via-red-500 to-amber-500 shadow-lg group-hover:scale-105 transition-transform duration-300`}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full rounded-full object-cover bg-white border-2 border-white"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-[#B70D2B] text-white font-black flex items-center justify-center border-2 border-white tracking-tight shadow-inner">
            {initial}
          </div>
        )}
      </div>
    </div>
  );
};

export const ExecutiveCommitteeSection = ({ activeSection }) => {
  const showAll = !activeSection;
  const showOfficeBearers = showAll || activeSection === 'office-bearers';
  const showExecutiveMembers = showAll || activeSection === 'executive-members';
  const showConvenors = showAll || activeSection === 'convenor';

  const officeBearers = [
    {
      role: 'President',
      name: 'Ar. Anupam Mittal',
      phone: '9415010301',
      email: 'anupam@arinem.com',
      image: p2,
    },
    {
      role: 'General Secretary',
      name: 'Ar. Vishal Gulati',
      phone: '9415025946',
      email: 'sakaar10@yahoo.co.in',
      image: p3,
    },
    {
      role: 'Treasurer',
      name: 'Ar. Avnish Gangwar',
      phone: '9415089038',
      email: 'avanisharchi@gmail.com',
      image: null,
    },
    {
      role: 'Joint Secretary',
      name: 'Ar. Shashank Misra',
      phone: '8588869222',
      email: 'shashankmisra222@gmail.com',
      image: null,
    },
  ];

  const executiveMembers = [
    { name: 'Ar. Harish Tripathi', phone: '9811045628', email: 'htji@gmail.com', image: null },
    { name: 'Ar. Anurag Khandelwal', phone: '9927092009', email: 'anuragkhandelwal@yahoo.com', image: null },
    { name: 'Ar. Arun Rana', phone: '9454994522', email: 'arunrana_kumar@yahoo.com', image: null },
    { name: 'Ar. Prashant Pal Singh', phone: '9838805222', email: 'abhikarms@gmail.com', image: null },
    { name: 'Ar. Vishal Mittal', phone: '9811070399', email: 'vishal@spacedi.com', image: null },
    { name: 'Ar. Pawan Bhatt', phone: '9837059454', email: 'bhattpawan00@yahoo.co.in', image: null },
    { name: 'Ar. Mohit Agarwal', phone: '8090091487', email: 'agarwalmohitk@gmail.com', image: null },
    { name: 'Ar. Devesh Mani Tripathi', phone: '9335210024', email: 'thinkdevesh@gmail.com', image: null },
    { name: 'Ar. Anjaneya Sharma', phone: '9452907110', email: 'sharma.anjaneya@foaaktu.ac.in', image: null },
    { name: 'Ar. Anupam', phone: '9721373056', email: 'Anupam0688@gmail.com', image: null },
  ];

  const convenors = [
    {
      role: 'Convenor',
      name: 'Ar. Repunjay Kumar Patel',
      phone: '9919828111',
      email: 'rkpatel.ar@gmail.com',
      image: null,
    },
    {
      role: 'Convenor',
      name: 'Ar. Smita Nigam',
      phone: '6307450136',
      email: 'smita.bhasker@gmail.com',
      image: null,
    },
  ];

  return (
    <section id="committee" className="bg-neutral-50/70 text-neutral-900 py-12 sm:py-20 border-b border-neutral-200">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-14">

        {/* ========================================================
            1. OFFICE BEARERS
        ======================================================== */}
        {showOfficeBearers && (
          <div className="mb-16 last:mb-0">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B70D2B] block mb-1">
                  Leadership Core
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 flex items-center gap-2.5">
                  <Shield className="w-6 h-6 text-[#B70D2B]" />
                  <span>Office Bearers</span>
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 sm:mt-0">
                Elected leadership steering the Government College of Architecture Alumni Association
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {officeBearers.map((person, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-xl hover:border-[#B70D2B]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between text-center hover:-translate-y-1"
                >
                  {/* Top decorative bar */}
                  <div className="h-2 w-full bg-gradient-to-r from-neutral-900 via-[#B70D2B] to-red-600" />

                  <div className="p-6 sm:p-7 flex-1 flex flex-col items-center">
                    <MemberAvatar name={person.name} image={person.image} size="lg" />

                    <span className="inline-block bg-red-50 text-[#B70D2B] border border-red-200/80 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                      {person.role}
                    </span>

                    <h4 className="text-lg font-extrabold text-neutral-900 leading-snug mb-4">
                      {person.name}
                    </h4>

                    <div className="w-full space-y-2.5 pt-4 border-t border-neutral-100 text-xs text-neutral-600 mt-auto">
                      <a
                        href={`tel:${person.phone}`}
                        className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-neutral-50 hover:bg-red-50 hover:text-[#B70D2B] font-semibold transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#B70D2B] shrink-0" />
                        <span className="lining-nums">{person.phone}</span>
                      </a>
                      <a
                        href={`mailto:${person.email}`}
                        className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-neutral-50 hover:bg-red-50 hover:text-[#B70D2B] font-medium transition-colors"
                        title={person.email}
                      >
                        <Mail className="w-3.5 h-3.5 text-[#B70D2B] shrink-0" />
                        <span className="truncate">{person.email}</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            2. EXECUTIVE MEMBERS
        ======================================================== */}
        {showExecutiveMembers && (
          <div className="mb-16 last:mb-0">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B70D2B] block mb-1">
                  Governing Council
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 flex items-center gap-2.5">
                  <Users className="w-6 h-6 text-[#B70D2B]" />
                  <span>Executive Members</span>
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 sm:mt-0">
                Active council members representing diverse cohorts of our alumni fraternity
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {executiveMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs hover:shadow-lg hover:border-[#B70D2B]/50 transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-[#B70D2B]/80 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <MemberAvatar name={member.name} image={member.image} size="md" />

                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                    Executive Member
                  </span>

                  <h4 className="text-base font-extrabold text-neutral-900 mb-4 leading-snug">
                    {member.name}
                  </h4>

                  <div className="w-full space-y-2 pt-3.5 border-t border-neutral-100 text-xs text-neutral-600 mt-auto">
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center justify-center gap-2 py-1.5 px-2.5 rounded-md bg-neutral-50 hover:bg-red-50 hover:text-[#B70D2B] font-semibold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#B70D2B] shrink-0" />
                      <span className="lining-nums">{member.phone}</span>
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-md bg-neutral-50 hover:bg-red-50 hover:text-[#B70D2B] font-medium transition-colors"
                      title={member.email}
                    >
                      <Mail className="w-3.5 h-3.5 text-[#B70D2B] shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            3. CONVENOR
        ======================================================== */}
        {showConvenors && (
          <div className="mb-4 last:mb-0">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B70D2B] block mb-1">
                  Event &amp; Initiative Coordination
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 flex items-center gap-2.5">
                  <Award className="w-6 h-6 text-[#B70D2B]" />
                  <span>Convenors</span>
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 sm:mt-0">
                Dedicated convenors spearheading alumni engagements and conclaves
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {convenors.map((person, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-xl hover:border-[#B70D2B]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between text-center hover:-translate-y-1"
                >
                  <div className="h-2 w-full bg-gradient-to-r from-[#B70D2B] via-red-600 to-neutral-900" />

                  <div className="p-6 sm:p-7 flex-1 flex flex-col items-center">
                    <MemberAvatar name={person.name} image={person.image} size="lg" />

                    <span className="inline-block bg-red-50 text-[#B70D2B] border border-red-200/80 text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full mb-2">
                      {person.role}
                    </span>

                    <h4 className="text-lg font-extrabold text-neutral-900 leading-snug mb-4">
                      {person.name}
                    </h4>

                    <div className="w-full space-y-2.5 pt-4 border-t border-neutral-100 text-xs text-neutral-600 mt-auto">
                      <a
                        href={`tel:${person.phone}`}
                        className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-neutral-50 hover:bg-red-50 hover:text-[#B70D2B] font-semibold transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#B70D2B] shrink-0" />
                        <span className="lining-nums">{person.phone}</span>
                      </a>
                      <a
                        href={`mailto:${person.email}`}
                        className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-neutral-50 hover:bg-red-50 hover:text-[#B70D2B] font-medium transition-colors"
                        title={person.email}
                      >
                        <Mail className="w-3.5 h-3.5 text-[#B70D2B] shrink-0" />
                        <span className="truncate">{person.email}</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};


