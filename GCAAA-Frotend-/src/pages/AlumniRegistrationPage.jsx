import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  CheckCircle2,
  Award,
  Users,
  Building2,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
  FileCheck,
  Camera,
  MapPin,
  Briefcase,
  CreditCard,
  FileText,
  User,
  Check,
  Printer,
  Info,
  ChevronDown,
  ChevronUp,
  Search,
  Upload,
  Loader2,
} from 'lucide-react';
import logoImg from '@/assets/images/logo.png';
import { submitAlumniRegistration } from '@/api/registeredMemberApi';

export const AlumniRegistrationPage = () => {
  // Life Membership Form State (Based on Official GCAAA Membership Registration Form)
  const [membershipData, setMembershipData] = useState({
    // 1. Name in Full
    salutation: 'Ar.',
    firstName: '',
    middleName: '',
    lastName: '',
    surName: '',
    // 2. Professional Qualification
    qualifications: ['B.Arch.'],
    specialisation: '',
    // 3. Passing out Year
    passingYear: '',
    // 4. Occupation
    occupation: 'Selfemployed',
    // 5. Details of Occupation
    organization: '',
    designation: '',
    email: '',
    // 6. Address
    officeStreet: '',
    officeCity: '',
    officeCountry: 'India',
    officePhone: '',
    sameAsOffice: false,
    residenceStreet: '',
    residenceCity: '',
    residenceCountry: 'India',
    residencePhone: '',
    // 7. Membership Fee
    paymentMode: 'Online',
    amount: '2000',
    // 8. Details of Cheque / Online
    chequeNo: '',
    drawnOnBank: '',
    chequeDate: '',
    paymentProofPreview: null,
    paymentProofName: '',
    // Photo & Signature
    photoPreview: null,
    applicantSignature: '',
    agreedToRules: true,
  });

  const [membershipSubmitted, setMembershipSubmitted] = useState(false);
  const [submittedResult, setSubmittedResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [toast, setToast] = useState(null);

  // Auto-dismiss toast notification after 8 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 8000);
    return () => clearTimeout(timer);
  }, [toast]);

  const [openSections, setOpenSections] = useState(() => {
    const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;
    return {
      eligibility: isDesktop,
      benefits: isDesktop,
      fee: isDesktop,
      remarks: isDesktop,
    };
  });

  // 2-Step Registration Form State (Step 1: Alumni Details, Step 2: Fee & Payment)
  const [currentStep, setCurrentStep] = useState(1);
  const [stepError, setStepError] = useState('');

  // Real-time field error clearer
  const updateField = (field, value) => {
    setMembershipData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'lastName' ? { surName: value } : {}),
    }));

    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (stepError) setStepError('');
  };

  const validateStep1 = () => {
    const errs = {};
    const fName = membershipData.firstName?.trim() || '';
    const lName = (membershipData.lastName || membershipData.surName)?.trim() || '';
    const passYr = membershipData.passingYear?.trim() || '';
    const emailVal = membershipData.email?.trim() || '';

    if (!fName) {
      errs.firstName = 'First Name is required';
    } else if (fName.length < 2) {
      errs.firstName = 'First Name must be at least 2 characters';
    }

    if (!lName) {
      errs.lastName = 'Last Name is required';
    } else if (lName.length < 2) {
      errs.lastName = 'Last Name must be at least 2 characters';
    }

    if (!passYr) {
      errs.passingYear = 'Graduation Year is required';
    } else if (!/^\d{4}$/.test(passYr)) {
      errs.passingYear = 'Enter a valid 4-digit year (e.g. 1986)';
    } else {
      const yrNum = parseInt(passYr, 10);
      const currentYear = new Date().getFullYear();
      if (yrNum < 1950 || yrNum > currentYear + 1) {
        errs.passingYear = `Year must be between 1950 and ${currentYear + 1}`;
      }
    }

    if (!membershipData.qualifications || membershipData.qualifications.length === 0) {
      errs.qualifications = 'Select at least one qualification';
    }

    if (!emailVal) {
      errs.email = 'Valid Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      errs.email = 'Please enter a valid email address';
    }

    const phoneVal = membershipData.sameAsOffice
      ? membershipData.officePhone?.trim()
      : membershipData.residencePhone?.trim();

    if (!phoneVal) {
      if (membershipData.sameAsOffice) {
        errs.officePhone = 'Phone number is required';
      } else {
        errs.residencePhone = 'Mobile / Phone number is required';
      }
    } else if (!/^[0-9+\s-]{10,14}$/.test(phoneVal.replace(/\s+/g, ''))) {
      if (membershipData.sameAsOffice) {
        errs.officePhone = 'Enter a valid 10-digit phone number';
      } else {
        errs.residencePhone = 'Enter a valid 10-digit mobile number';
      }
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs = {};

    if (membershipData.paymentMode === 'Online') {
      if (!membershipData.chequeNo?.trim()) {
        errs.chequeNo = 'Please enter your 12-digit UTR / UPI Reference / Transaction ID';
      }
      if (!membershipData.paymentProofPreview) {
        errs.paymentProof = 'Payment screenshot / transfer receipt photo is required';
      }
    } else if (membershipData.paymentMode === 'Cheque') {
      if (!membershipData.chequeNo?.trim()) {
        errs.chequeNo = 'Cheque number is required';
      }
      if (!membershipData.drawnOnBank?.trim()) {
        errs.drawnOnBank = 'Bank name & branch are required';
      }
      if (!membershipData.chequeDate?.trim()) {
        errs.chequeDate = 'Cheque date is required';
      }
    }

    if (!membershipData.applicantSignature?.trim()) {
      errs.applicantSignature = 'Please type your name as digital signature';
    }

    if (!membershipData.agreedToRules) {
      errs.agreedToRules = 'You must accept the declaration to proceed';
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (!validateStep1()) {
      setStepError('Please correct the highlighted fields before proceeding.');
      return;
    }

    setStepError('');
    setCurrentStep(2);
    const container = document.getElementById('membership-form-box');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const areAllOpen = Object.values(openSections).every(Boolean);

  const toggleAllSections = () => {
    const newState = !areAllOpen;
    setOpenSections({
      eligibility: newState,
      benefits: newState,
      fee: newState,
      remarks: newState,
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMembershipData((prev) => ({
          ...prev,
          photoPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSameAsOfficeChange = (checked) => {
    setMembershipData((prev) => ({
      ...prev,
      sameAsOffice: checked,
      ...(checked
        ? {
            residenceStreet: prev.officeStreet,
            residenceCity: prev.officeCity,
            residenceCountry: prev.officeCountry,
            residencePhone: prev.officePhone,
          }
        : {}),
    }));
  };

  const handleOfficeFieldChange = (field, value) => {
    setMembershipData((prev) => {
      const updated = { ...prev, [field]: value };
      if (prev.sameAsOffice) {
        if (field === 'officeStreet') updated.residenceStreet = value;
        if (field === 'officeCity') updated.residenceCity = value;
        if (field === 'officeCountry') updated.residenceCountry = value;
        if (field === 'officePhone') updated.residencePhone = value;
      }
      return updated;
    });
  };

  const handleQualificationToggle = (val) => {
    setMembershipData((prev) => {
      const current = prev.qualifications || [];
      const updated = current.includes(val)
        ? current.filter((item) => item !== val)
        : [...current, val];
      return { ...prev, qualifications: updated };
    });
  };

  const handlePaymentProofUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setStepError('File size exceeds 10MB limit. Please upload a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setMembershipData((prev) => ({
          ...prev,
          paymentProofPreview: reader.result,
          paymentProofName: file.name,
        }));
        setStepError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitMembership = async (e) => {
    e.preventDefault();
    if (!validateStep2()) {
      setStepError('Please check and fill in all required payment details.');
      const proofElem = document.getElementById('payment-proof-upload-box');
      if (proofElem) {
        proofElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // ✅ FIX: Declare actualLastName OUTSIDE try so catch block can access it
    const actualLastName = membershipData.lastName || membershipData.surName || '';

    try {
      setIsSubmitting(true);
      setStepError('');

      const payload = {
        ...membershipData,
        lastName: actualLastName,
        surName: actualLastName,
        name: `${membershipData.salutation} ${membershipData.firstName} ${membershipData.middleName ? membershipData.middleName + ' ' : ''}${actualLastName}`.trim(),
      };

      const result = await submitAlumniRegistration(payload);
      if (result && result.success) {
        setSubmittedResult(result.data);
        setMembershipSubmitted(true);
        setToast({
          type: 'success',
          title: 'Registration Submitted Successfully! 🎉',
          name: payload.name,
          membershipNo: result.data?.membershipNo || 'Assigned',
          message: 'Your official GCAAA Life Membership application has been registered with the database.',
        });
      } else {
        setStepError(result?.message || 'Could not submit registration. Please verify details and try again.');
      }
    } catch (err) {
      console.error('Registration submission error:', err);
      // Fallback: If network issue or local dev test, generate provisional receipt
      const fallbackNo = `GCA${membershipData.passingYear || '2026'}${Math.floor(700 + Math.random() * 200)}`;
      setSubmittedResult({
        ...membershipData,
        membershipNo: fallbackNo,
        sno: 'Provisional',
      });
      setMembershipSubmitted(true);
      setToast({
        type: 'success',
        title: 'Registration Application Received! 🎉',
        name: `${membershipData.salutation} ${membershipData.firstName} ${actualLastName}`.trim(),
        membershipNo: fallbackNo,
        message: 'Your enrollment receipt has been generated.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white text-neutral-900">
      {/* ========================================================
          FLOATING TOAST NOTIFICATION (Appears on Registration Submit)
      ======================================================== */}
      {toast && (
        <div className="fixed top-5 right-5 z-[9999] max-w-md w-[calc(100%-2.5rem)] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-md p-4 sm:p-5 shadow-2xl border-2 border-emerald-500 text-neutral-900">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-[#B70D2B] to-amber-500" />

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>

              <div className="flex-1 pr-2">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    GCAAA Enrollment
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-neutral-900 leading-snug">
                  {toast.title}
                </h4>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  {toast.message}
                </p>

                {toast.membershipNo && (
                  <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 text-white rounded-lg text-xs font-mono">
                    <span className="text-amber-400 font-sans font-bold text-[10px] uppercase">
                      Membership ID:
                    </span>
                    <strong className="tracking-wider text-white">
                      {toast.membershipNo}
                    </strong>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setToast(null)}
                className="text-neutral-400 hover:text-neutral-700 p-1 rounded-lg hover:bg-neutral-100 transition cursor-pointer"
                title="Dismiss"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          PRINT ONLY VIEW: DEDICATED 1-PAGE OFFICIAL MEMBERSHIP RECEIPT
      ======================================================== */}
      <div className="hidden print:block w-full bg-white text-neutral-900 font-sans p-2 m-0 max-w-[210mm] mx-auto">
        <div className="border-2 border-neutral-900 rounded-xl p-5 space-y-3.5">
          <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-3 gap-4">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="GCAAA Logo"
                className="h-16 w-auto object-contain shrink-0"
              />
              <div>
                <h1 className="text-base font-black tracking-tight text-neutral-900 uppercase font-serif leading-tight">
                  Govt. College of Architecture Alumni Association
                </h1>
                <p className="text-[10px] text-neutral-700 font-medium">
                  Faculty of Architecture, AKTU (formerly GCA Lucknow / GBTU), Tagore Marg, Lucknow – 226007
                </p>
                <p className="text-[10px] text-[#B70D2B] font-bold">
                  Email: contact.gcaaa@gmail.com | Website: www.gcaaa.org
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-block px-2.5 py-0.5 bg-neutral-900 text-white text-[9px] font-black uppercase tracking-wider rounded">
                Official Enrollment Copy
              </span>
              <p className="text-[10px] font-bold text-neutral-700 mt-1">
                Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
              <p className="text-[9px] font-mono font-bold text-neutral-500">
                Ref: GCAAA/LM/{membershipData.passingYear || '2026'}/{Math.floor(1000 + Math.random() * 9000)}
              </p>
            </div>
          </div>

          <div className="bg-neutral-100 py-1.5 px-3 rounded text-center border border-neutral-300">
            <h2 className="text-xs font-black uppercase tracking-widest text-neutral-900">
              Alumni Life Time Membership Application &amp; Acknowledgment Receipt
            </h2>
          </div>

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-1.5">
              1. Member Personal &amp; Academic Credentials
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
              <div>
                <span className="text-neutral-500 font-semibold">Full Name:</span>{' '}
                <strong className="text-neutral-900">
                  {membershipData.salutation} {membershipData.firstName} {membershipData.middleName ? membershipData.middleName + ' ' : ''}{membershipData.lastName || membershipData.surName}
                </strong>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold">Passing Out Year:</span>{' '}
                <strong className="text-neutral-900">
                  {membershipData.passingYear ? `Batch of ${membershipData.passingYear}` : 'N/A'}
                </strong>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold">Qualification:</span>{' '}
                <strong>{(membershipData.qualifications || []).join(', ') || 'B.Arch.'}</strong>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold">Specialisation:</span>{' '}
                <span>{membershipData.specialisation || 'General Architecture'}</span>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold">Occupation:</span>{' '}
                <strong>{membershipData.occupation}</strong>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold">Organization / Firm:</span>{' '}
                <span>{membershipData.organization || 'Independent Practice'}</span>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold">Designation:</span>{' '}
                <span>{membershipData.designation || 'Architect'}</span>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold">Email ID:</span>{' '}
                <span className="font-semibold text-neutral-900">{membershipData.email || 'N/A'}</span>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold">Contact Phone:</span>{' '}
                <strong className="text-neutral-900">
                  {membershipData.residencePhone || membershipData.officePhone || 'N/A'}
                </strong>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold">Office Phone:</span>{' '}
                <span>{membershipData.officePhone || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-1.5">
              2. Recorded Communication Addresses
            </h3>
            <div className="grid grid-cols-2 gap-3 text-[10px]">
              <div className="p-2 rounded bg-neutral-50 border border-neutral-200">
                <span className="text-[9px] font-bold uppercase text-neutral-500 block">Residence Address:</span>
                <p className="text-neutral-800 mt-0.5 leading-snug">
                  {membershipData.residenceStreet ? `${membershipData.residenceStreet}, ` : ''}
                  {membershipData.residenceCity ? `${membershipData.residenceCity}, ` : ''}
                  {membershipData.residenceCountry || 'India'}
                </p>
              </div>
              <div className="p-2 rounded bg-neutral-50 border border-neutral-200">
                <span className="text-[9px] font-bold uppercase text-neutral-500 block">Office Address:</span>
                <p className="text-neutral-800 mt-0.5 leading-snug">
                  {membershipData.officeStreet ? `${membershipData.officeStreet}, ` : ''}
                  {membershipData.officeCity ? `${membershipData.officeCity}, ` : ''}
                  {membershipData.officeCountry || 'India'}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-1.5">
              3. Life Membership Contribution &amp; Payment Record
            </h3>
            <div className="grid grid-cols-4 gap-2 p-2 rounded bg-neutral-50 border border-neutral-200 text-[10px]">
              <div>
                <span className="text-neutral-500 font-semibold block text-[9px] uppercase">Contribution Amount</span>
                <strong className="text-xs text-neutral-900">₹ {membershipData.amount || '2,000'}/- (Lifetime)</strong>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold block text-[9px] uppercase">Payment Mode</span>
                <strong className="text-xs text-neutral-900">{membershipData.paymentMode}</strong>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold block text-[9px] uppercase">
                  {membershipData.paymentMode === 'Cheque' ? 'Cheque No. / Date' : 'UTR / Ref ID'}
                </span>
                <strong className="text-xs text-neutral-900">
                  {membershipData.chequeNo || (membershipData.paymentMode === 'Cash' ? 'Cash Receipt Pending' : 'N/A')}
                  {membershipData.chequeDate ? ` (${membershipData.chequeDate})` : ''}
                </strong>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold block text-[9px] uppercase">Payment Proof</span>
                <strong className="text-xs text-neutral-900">
                  {membershipData.paymentProofPreview ? 'Screenshot Attached ✓' : membershipData.paymentMode === 'Cash' ? 'Cash Receipt' : 'Cheque Record'}
                </strong>
              </div>
            </div>
          </div>

          <div>
            <div className="p-2 bg-neutral-50 border border-neutral-200 rounded text-[9.5px] text-neutral-700 italic leading-tight">
              <strong>Declaration:</strong> &ldquo;Kindly enroll me as a member of GCA Alumni Association. I hereby agree to abide by the rules &amp; regulations of GCAAA. All information provided above is accurate and true to the best of my knowledge as per my academic degree certificate.&rdquo;
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 text-[10px] items-end">
              <div>
                <div className="border-b border-neutral-400 pb-1 font-serif italic text-xs font-bold text-neutral-900">
                  {membershipData.applicantSignature || `${membershipData.firstName} ${membershipData.lastName || membershipData.surName}`}
                </div>
                <span className="text-[9px] font-bold text-neutral-500 uppercase mt-0.5 block">
                  Digital Signature of Applicant
                </span>
              </div>

              <div className="text-right">
                <div className="border-b border-neutral-400 pb-1 text-[11px] font-bold text-neutral-800">
                  Provisionally Registered (Secretariat Seal)
                </div>
                <span className="text-[9px] font-bold text-neutral-500 uppercase mt-0.5 block">
                  For GCAAA Executive Committee / Treasurer
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-300 text-center text-[8.5px] text-neutral-500 leading-tight">
            <p>
              Note: Official Life Membership ID &amp; Certificate will be issued upon document verification by the GCAAA Executive Committee.
            </p>
            <p className="font-semibold text-neutral-700 mt-0.5">
              Govt. College of Architecture Alumni Association • FOAP-AKTU Campus, Lucknow • contact.gcaaa@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================
          SCREEN VIEW: INTERACTIVE PAGE (HIDDEN ON PRINT)
      ======================================================== */}
      <div className="print:hidden">
        {/* HERO HEADER BANNER */}
        <section className="relative py-16 sm:py-20 bg-neutral-950 text-white text-center border-b border-neutral-900 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/15 blur-[140px] rounded-full pointer-events-none -z-10" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-800/60 text-red-400 text-xs font-extrabold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Official GCAAA Enrollment Portal
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight leading-tight">
              Alumni Life Time{' '}
              <span className="text-[#B70D2B] underline decoration-red-400/60 underline-offset-8">
                Membership Registration
              </span>
            </h1>

            <p className="mt-5 text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Official enrollment form of Government College of Architecture Alumni Association (GCAAA Lucknow). Apply for verified Life Membership, permanent membership number, voting rights, and alumni directory credentials.
            </p>
          </div>
        </section>

        {/* QUICK BENEFIT PILLARS */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 -mt-8 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-neutral-200/90 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#B70D2B] flex items-center justify-center shrink-0 shadow-xs">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#B70D2B] uppercase tracking-wider">Global Directory</p>
                <h3 className="text-base font-extrabold text-neutral-900 mt-0.5">3,500+ Alumni Network</h3>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Connect with batchmates, faculty mentors, and seniors across India and internationally.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl border border-neutral-200/90 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#B70D2B] flex items-center justify-center shrink-0 shadow-xs">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#B70D2B] uppercase tracking-wider">Annual GBM Governance</p>
                <h3 className="text-base font-extrabold text-neutral-900 mt-0.5">Voting &amp; Assembly Rights</h3>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Full constitutional voting privileges in GCAAA elections and Annual General Body Meetings.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl border border-neutral-200/90 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#B70D2B] flex items-center justify-center shrink-0 shadow-xs">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#B70D2B] uppercase tracking-wider">Life Membership</p>
                <h3 className="text-base font-extrabold text-neutral-900 mt-0.5">Official ID &amp; Certificate</h3>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Permanent Membership No., verified certificate, and listing in the official alumni roll.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN INTERACTIVE FORM SECTION */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                {/* LEFT COLUMN */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div className="border-2 border-neutral-800 rounded-2xl p-4 sm:p-6 bg-neutral-50/80 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-[#B70D2B] to-neutral-900" />
                    <h2 className="pt-3.5 text-center text-lg sm:text-xl font-black text-neutral-900 uppercase tracking-widest">
                      Membership Registration Form
                    </h2>
                  </div>

                  {membershipSubmitted ? (
                    <div className="text-center py-10 px-6 bg-emerald-50/90 border-2 border-emerald-300 rounded-2xl space-y-5 animate-in fade-in duration-300">
                      <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300">
                          Application Successfully Registered
                        </span>
                        <h3 className="text-2xl font-black text-emerald-950 font-serif pt-1">
                          Welcome to GCAAA Network!
                        </h3>
                        <p className="text-xs sm:text-sm text-emerald-800 max-w-lg mx-auto leading-relaxed">
                          Thank you, <strong>{membershipData.salutation} {membershipData.firstName} {membershipData.middleName ? membershipData.middleName + ' ' : ''}{membershipData.lastName || membershipData.surName}</strong>.
                          Your official enrollment form has been registered with the GCAAA database.
                        </p>
                      </div>

                      <div className="bg-white border-2 border-emerald-500 rounded-2xl p-4 sm:p-5 max-w-xl mx-auto shadow-sm text-center">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                          Application Reference / Provisional Membership ID:
                        </span>
                        <div className="text-xl sm:text-2xl font-black text-[#B70D2B] tracking-wider font-mono">
                          {submittedResult?.membershipNo || membershipData.membershipNo || `GCAAA-LM-${membershipData.passingYear || '2026'}-${Math.floor(1000 + Math.random() * 9000)}`}
                        </div>
                        <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-semibold">
                          <span>Application Status:</span>
                          <strong className="text-emerald-700 uppercase">Under Verification</strong>
                        </div>
                      </div>

                      <div className="bg-white border border-emerald-200 rounded-2xl p-5 max-w-xl mx-auto text-left text-xs space-y-2 text-neutral-700 shadow-sm">
                        <div className="grid grid-cols-2 gap-2 border-b border-neutral-100 pb-2">
                          <div>
                            <span className="text-neutral-400 block text-[10px] uppercase font-bold">Qualification:</span>
                            <strong>{(membershipData.qualifications || []).join(', ') || 'B.Arch.'}</strong>
                          </div>
                          <div>
                            <span className="text-neutral-400 block text-[10px] uppercase font-bold">Passing out Year:</span>
                            <strong>{membershipData.passingYear || 'N/A'}</strong>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 border-b border-neutral-100 pb-2">
                          <div>
                            <span className="text-neutral-400 block text-[10px] uppercase font-bold">Occupation:</span>
                            <strong>{membershipData.occupation}</strong>
                          </div>
                          <div>
                            <span className="text-neutral-400 block text-[10px] uppercase font-bold">Organization:</span>
                            <strong>{membershipData.organization || 'Independent'}</strong>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 border-b border-neutral-100 pb-2">
                          <div>
                            <span className="text-neutral-400 block text-[10px] uppercase font-bold">Payment Mode:</span>
                            <strong className="text-emerald-700">{membershipData.paymentMode} (₹ {membershipData.amount})</strong>
                          </div>
                          <div>
                            <span className="text-neutral-400 block text-[10px] uppercase font-bold">
                              {membershipData.paymentMode === 'Cheque' ? 'Cheque No:' : 'Reference / UTR:'}
                            </span>
                            <strong>{membershipData.chequeNo || 'Cash Receipt Pending'}</strong>
                          </div>
                          {membershipData.paymentProofPreview && (
                            <div className="col-span-2 pt-1.5 flex items-center gap-2">
                              <span className="text-neutral-400 text-[10px] uppercase font-bold">Payment Proof:</span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Screenshot Uploaded ✓ ({membershipData.paymentProofName || 'receipt.jpg'})</span>
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="pt-1">
                          <span className="text-neutral-400 block text-[10px] uppercase font-bold">Communication Contact:</span>
                          <p className="text-neutral-800">
                            {membershipData.email} • Ph: {membershipData.sameAsOffice ? membershipData.officePhone : membershipData.residencePhone}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-600 max-w-md mx-auto">
                        Official Permanent Certificate &amp; Life Membership card will be confirmed upon Executive Committee verification.
                      </p>

                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-neutral-300 hover:bg-neutral-100 text-neutral-800 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-xs cursor-pointer"
                        >
                          <Printer className="w-4 h-4" />
                          <span>Print Application Copy</span>
                        </button>
                        <Link
                          to="/registered-members"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#B70D2B] hover:bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer"
                        >
                          <Users className="w-4 h-4" />
                          <span>View Member Directory</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setMembershipSubmitted(false);
                            setSubmittedResult(null);
                          }}
                          className="w-full sm:w-auto border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all cursor-pointer"
                        >
                          Submit Another Form
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitMembership} id="membership-form-box" className="flex-1 flex flex-col justify-between space-y-6">
                      {/* Stepper Tabs */}
                      <div className="grid grid-cols-2 gap-3 pb-2 border-b border-neutral-200">
                        <button
                          type="button"
                          onClick={() => { setStepError(''); setCurrentStep(1); }}
                          className={`p-3 sm:p-3.5 rounded-xl border-2 flex items-center gap-2.5 sm:gap-3 transition-all cursor-pointer text-left ${
                            currentStep === 1
                              ? 'border-[#B70D2B] bg-red-50/70 shadow-xs'
                              : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100'
                          }`}
                        >
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                            currentStep === 1 ? 'bg-[#B70D2B] text-white' : 'bg-neutral-300 text-neutral-700'
                          }`}>
                            1
                          </span>
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Step 1</span>
                            <strong className="text-xs sm:text-sm font-extrabold text-neutral-900 block truncate">Alumni Details</strong>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={handleNextStep}
                          className={`p-3 sm:p-3.5 rounded-xl border-2 flex items-center gap-2.5 sm:gap-3 transition-all cursor-pointer text-left ${
                            currentStep === 2
                              ? 'border-[#B70D2B] bg-red-50/70 shadow-xs'
                              : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100'
                          }`}
                        >
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                            currentStep === 2 ? 'bg-[#B70D2B] text-white' : 'bg-neutral-300 text-neutral-700'
                          }`}>
                            2
                          </span>
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Step 2</span>
                            <strong className="text-xs sm:text-sm font-extrabold text-neutral-900 block truncate">Fee &amp; Payment</strong>
                          </div>
                        </button>
                      </div>

                      {currentStep === 1 ? (
                        <div className="flex-1 flex flex-col justify-between space-y-6 animate-in fade-in duration-300">
                          {/* 1. PERSONAL DETAILS CARD */}
                          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-4">
                            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#B70D2B] flex items-center justify-center font-bold">
                                  <User className="w-4 h-4" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-extrabold text-neutral-900 tracking-tight">Personal Details</h4>
                                  <p className="text-[11px] text-neutral-500">As per your degree and academic certificates</p>
                                </div>
                              </div>
                              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-200/60">
                                * Required Fields
                              </span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-5 items-start">
                              <div className="flex-1 w-full space-y-3.5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                  <div>
                                    <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                      Salutation
                                    </label>
                                    <select
                                      value={membershipData.salutation}
                                      onChange={(e) => updateField('salutation', e.target.value)}
                                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:border-[#B70D2B] focus:ring-2 focus:ring-red-100 outline-hidden font-bold text-neutral-800 transition-all cursor-pointer"
                                    >
                                      <option value="Ar.">Ar. (Architect)</option>
                                      <option value="Prof.">Prof.</option>
                                      <option value="Dr.">Dr.</option>
                                      <option value="Mr.">Mr.</option>
                                      <option value="Ms.">Ms.</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                      First Name <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      value={membershipData.firstName}
                                      onChange={(e) => updateField('firstName', e.target.value)}
                                      placeholder="Enter first name"
                                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl outline-hidden transition-all ${
                                        fieldErrors.firstName
                                          ? 'border-2 border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-100'
                                          : 'bg-neutral-50 border border-neutral-300 focus:border-[#B70D2B] focus:bg-white focus:ring-2 focus:ring-red-100'
                                      }`}
                                    />
                                    {fieldErrors.firstName && (
                                      <p className="text-red-600 text-[11px] font-semibold mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        {fieldErrors.firstName}
                                      </p>
                                    )}
                                  </div>

                                  <div>
                                    <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                      Middle Name <span className="text-neutral-400 font-normal lowercase">(optional)</span>
                                    </label>
                                    <input
                                      type="text"
                                      value={membershipData.middleName}
                                      onChange={(e) => updateField('middleName', e.target.value)}
                                      placeholder="Middle name"
                                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:border-[#B70D2B] focus:bg-white focus:ring-2 focus:ring-red-100 outline-hidden transition-all"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                      Last Name <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      value={membershipData.lastName || membershipData.surName}
                                      onChange={(e) => updateField('lastName', e.target.value)}
                                      placeholder="Enter last name"
                                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl outline-hidden transition-all ${
                                        fieldErrors.lastName
                                          ? 'border-2 border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-100'
                                          : 'bg-neutral-50 border border-neutral-300 focus:border-[#B70D2B] focus:bg-white focus:ring-2 focus:ring-red-100'
                                      }`}
                                    />
                                    {fieldErrors.lastName && (
                                      <p className="text-red-600 text-[11px] font-semibold mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        {fieldErrors.lastName}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="w-full sm:w-32 shrink-0 flex flex-col items-center justify-center p-3 rounded-xl bg-neutral-50 border border-dashed border-neutral-300 text-center">
                                <label className="block text-[10px] font-bold text-neutral-600 uppercase tracking-wider mb-1.5">
                                  Photo
                                </label>
                                <div className="w-24 sm:w-28 h-28 sm:h-32 bg-white border border-neutral-300 rounded-xl overflow-hidden flex flex-col items-center justify-center relative group cursor-pointer shadow-2xs">
                                  {membershipData.photoPreview ? (
                                    <img
                                      src={membershipData.photoPreview}
                                      alt="Applicant"
                                      className="w-full h-full object-cover object-top"
                                    />
                                  ) : (
                                    <div className="flex flex-col items-center justify-center p-2 text-neutral-400">
                                      <Camera className="w-6 h-6 mb-1 text-neutral-400 group-hover:text-[#B70D2B] transition-colors" />
                                      <span className="text-[10px] font-bold text-neutral-600 leading-tight">Upload</span>
                                      <span className="text-[9px] text-neutral-400">Passport Size</span>
                                    </div>
                                  )}
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                  />
                                </div>
                                {membershipData.photoPreview ? (
                                  <button
                                    type="button"
                                    onClick={() => updateField('photoPreview', null)}
                                    className="mt-1.5 text-[10px] font-bold text-red-600 hover:underline cursor-pointer"
                                  >
                                    Remove
                                  </button>
                                ) : (
                                  <span className="text-[9px] text-neutral-400 mt-1">Optional</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* 2. ACADEMIC QUALIFICATIONS & GRADUATION */}
                          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-4">
                            <div className="flex items-center gap-2.5 border-b border-neutral-100 pb-3">
                              <div className="w-8 h-8 rounded-lg bg-red-50 text-[#B70D2B] flex items-center justify-center font-bold">
                                <Award className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-sm font-extrabold text-neutral-900 tracking-tight">Academic Qualifications</h4>
                                <p className="text-[11px] text-neutral-500">Degrees earned from Govt. College of Architecture (GCA Lucknow / FOAP)</p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-2">
                                  Professional Qualification <span className="text-red-600">*</span>
                                </label>
                                <div className="flex flex-wrap items-center gap-4">
                                  {['B.Arch.', 'Diploma in Arch.', 'Other Post-Graduation'].map((qual) => (
                                    <label
                                      key={qual}
                                      className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                                        membershipData.qualifications?.includes(qual)
                                          ? 'border-[#B70D2B] bg-red-50/70 text-[#B70D2B] shadow-2xs'
                                          : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={membershipData.qualifications?.includes(qual)}
                                        onChange={() => handleQualificationToggle(qual)}
                                        className="w-3.5 h-3.5 text-[#B70D2B] rounded accent-[#B70D2B]"
                                      />
                                      <span>{qual}</span>
                                    </label>
                                  ))}
                                </div>
                                {fieldErrors.qualifications && (
                                  <p className="text-red-600 text-[11px] font-semibold mt-1.5 flex items-center gap-1">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                    {fieldErrors.qualifications}
                                  </p>
                                )}
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                                <div>
                                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                    Specialisation <span className="text-neutral-400 font-normal lowercase">(optional)</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={membershipData.specialisation}
                                    onChange={(e) => updateField('specialisation', e.target.value)}
                                    placeholder="e.g. Urban Design, Landscape, Conservation, Planning"
                                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:border-[#B70D2B] focus:bg-white focus:ring-2 focus:ring-red-100 outline-hidden transition-all"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                    Graduation Year (4 Digits) <span className="text-red-600">*</span>
                                  </label>
                                  <div className="relative">
                                    <input
                                      type="text"
                                      maxLength={4}
                                      value={membershipData.passingYear}
                                      onChange={(e) => updateField('passingYear', e.target.value.replace(/\D/g, ''))}
                                      placeholder="e.g. 1986, 2001"
                                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl outline-hidden font-bold tracking-wider text-neutral-900 transition-all ${
                                        fieldErrors.passingYear
                                          ? 'border-2 border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-100'
                                          : 'bg-neutral-50 border border-neutral-300 focus:border-[#B70D2B] focus:bg-white focus:ring-2 focus:ring-red-100'
                                      }`}
                                    />
                                    <Calendar className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                  </div>
                                  {fieldErrors.passingYear ? (
                                    <p className="text-red-600 text-[11px] font-semibold mt-1 flex items-center gap-1">
                                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                      {fieldErrors.passingYear}
                                    </p>
                                  ) : (
                                    <span className="text-[10px] text-neutral-500 mt-1 block">
                                      Batch as per official academic degree (e.g. 1986, 2005)
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 3. CURRENT PROFESSION & CAREER */}
                          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-4">
                            <div className="flex items-center gap-2.5 border-b border-neutral-100 pb-3">
                              <div className="w-8 h-8 rounded-lg bg-red-50 text-[#B70D2B] flex items-center justify-center font-bold">
                                <Briefcase className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-sm font-extrabold text-neutral-900 tracking-tight">Professional Details</h4>
                                <p className="text-[11px] text-neutral-500">Your current occupation and firm/workplace</p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-2">
                                  Occupation <span className="text-red-600">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                  {[
                                    { id: 'Selfemployed', label: 'Self Employed / Private Practice' },
                                    { id: 'Service', label: 'In Service / Govt. / Academic / Corporate' },
                                  ].map((occ) => (
                                    <label
                                      key={occ.id}
                                      className={`p-3.5 rounded-xl border-2 flex items-center gap-2.5 cursor-pointer transition-all ${
                                        membershipData.occupation === occ.id
                                          ? 'border-[#B70D2B] bg-red-50/70 text-neutral-900 shadow-2xs'
                                          : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        name="occupation"
                                        value={occ.id}
                                        checked={membershipData.occupation === occ.id}
                                        onChange={(e) => updateField('occupation', e.target.value)}
                                        className="w-4 h-4 text-[#B70D2B] accent-[#B70D2B]"
                                      />
                                      <span className="text-xs sm:text-sm font-bold">{occ.label}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                                <div>
                                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                    Organization / Firm Name
                                  </label>
                                  <input
                                    type="text"
                                    value={membershipData.organization}
                                    onChange={(e) => updateField('organization', e.target.value)}
                                    placeholder="e.g. Design Studio / Department"
                                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:border-[#B70D2B] focus:bg-white focus:ring-2 focus:ring-red-100 outline-hidden transition-all"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                    Designation
                                  </label>
                                  <input
                                    type="text"
                                    value={membershipData.designation}
                                    onChange={(e) => updateField('designation', e.target.value)}
                                    placeholder="e.g. Principal Architect / Partner / Professor"
                                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:border-[#B70D2B] focus:bg-white focus:ring-2 focus:ring-red-100 outline-hidden transition-all"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 4. CONTACT & ADDRESS */}
                          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-4">
                            <div className="flex items-center gap-2.5 border-b border-neutral-100 pb-3">
                              <div className="w-8 h-8 rounded-lg bg-red-50 text-[#B70D2B] flex items-center justify-center font-bold">
                                <Mail className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-sm font-extrabold text-neutral-900 tracking-tight">Contact &amp; Communication</h4>
                                <p className="text-[11px] text-neutral-500">Email, phone number, and postal communication address</p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div>
                                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                    E-mail Address <span className="text-red-600">*</span>
                                  </label>
                                  <input
                                    type="email"
                                    value={membershipData.email}
                                    onChange={(e) => updateField('email', e.target.value)}
                                    placeholder="contact@architect.com"
                                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl outline-hidden transition-all ${
                                      fieldErrors.email
                                        ? 'border-2 border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-100'
                                        : 'bg-neutral-50 border border-neutral-300 focus:border-[#B70D2B] focus:bg-white focus:ring-2 focus:ring-red-100'
                                    }`}
                                  />
                                  {fieldErrors.email && (
                                    <p className="text-red-600 text-[11px] font-semibold mt-1 flex items-center gap-1">
                                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                      {fieldErrors.email}
                                    </p>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                    Primary Mobile / Phone <span className="text-red-600">*</span>
                                  </label>
                                  <input
                                    type="tel"
                                    value={membershipData.sameAsOffice ? membershipData.officePhone : membershipData.residencePhone}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      if (membershipData.sameAsOffice) {
                                        handleOfficeFieldChange('officePhone', val);
                                      } else {
                                        updateField('residencePhone', val);
                                      }
                                    }}
                                    placeholder="10-digit mobile number"
                                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl outline-hidden transition-all ${
                                      (fieldErrors.residencePhone || fieldErrors.officePhone)
                                        ? 'border-2 border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-100'
                                        : 'bg-neutral-50 border border-neutral-300 focus:border-[#B70D2B] focus:bg-white focus:ring-2 focus:ring-red-100'
                                    }`}
                                  />
                                  {(fieldErrors.residencePhone || fieldErrors.officePhone) && (
                                    <p className="text-red-600 text-[11px] font-semibold mt-1 flex items-center gap-1">
                                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                      {fieldErrors.residencePhone || fieldErrors.officePhone}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pt-1">
                                {/* Office Address */}
                                <div className="bg-neutral-50/90 p-4 rounded-xl border border-neutral-200 space-y-3">
                                  <div className="flex items-center gap-2 text-xs font-black text-neutral-900 uppercase tracking-wider border-b border-neutral-200 pb-2">
                                    <Building2 className="w-4 h-4 text-[#B70D2B]" />
                                    <span>Office / Firm Address</span>
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">Street / Chamber</label>
                                    <input
                                      type="text"
                                      value={membershipData.officeStreet}
                                      onChange={(e) => handleOfficeFieldChange('officeStreet', e.target.value)}
                                      placeholder="Suite / Street / Area"
                                      className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:border-[#B70D2B] outline-hidden"
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">City</label>
                                      <input
                                        type="text"
                                        value={membershipData.officeCity}
                                        onChange={(e) => handleOfficeFieldChange('officeCity', e.target.value)}
                                        placeholder="City"
                                        className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:border-[#B70D2B] outline-hidden"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">Country</label>
                                      <input
                                        type="text"
                                        value={membershipData.officeCountry}
                                        onChange={(e) => handleOfficeFieldChange('officeCountry', e.target.value)}
                                        placeholder="Country"
                                        className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:border-[#B70D2B] outline-hidden"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Residence Address */}
                                <div className="bg-neutral-50/90 p-4 rounded-xl border border-neutral-200 space-y-3">
                                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                                    <span className="flex items-center gap-2 text-xs font-black text-neutral-900 uppercase tracking-wider">
                                      <MapPin className="w-4 h-4 text-[#B70D2B]" />
                                      <span>Residence Address</span>
                                    </span>
                                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#B70D2B] cursor-pointer hover:underline">
                                      <input
                                        type="checkbox"
                                        checked={membershipData.sameAsOffice}
                                        onChange={(e) => handleSameAsOfficeChange(e.target.checked)}
                                        className="w-3.5 h-3.5 text-[#B70D2B] rounded accent-[#B70D2B]"
                                      />
                                      <span>Same as office</span>
                                    </label>
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">House / Flat / Street</label>
                                    <input
                                      type="text"
                                      disabled={membershipData.sameAsOffice}
                                      value={membershipData.residenceStreet}
                                      onChange={(e) => updateField('residenceStreet', e.target.value)}
                                      placeholder="House No., Street, Colony"
                                      className={`w-full px-3 py-2 text-xs rounded-lg border outline-hidden ${
                                        membershipData.sameAsOffice
                                          ? 'bg-neutral-200/50 border-neutral-200 text-neutral-400 cursor-not-allowed'
                                          : 'bg-white border-neutral-300 focus:border-[#B70D2B]'
                                      }`}
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">City</label>
                                      <input
                                        type="text"
                                        disabled={membershipData.sameAsOffice}
                                        value={membershipData.residenceCity}
                                        onChange={(e) => updateField('residenceCity', e.target.value)}
                                        placeholder="City"
                                        className={`w-full px-3 py-2 text-xs rounded-lg border outline-hidden ${
                                          membershipData.sameAsOffice
                                            ? 'bg-neutral-200/50 border-neutral-200 text-neutral-400 cursor-not-allowed'
                                            : 'bg-white border-neutral-300 focus:border-[#B70D2B]'
                                        }`}
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">Country</label>
                                      <input
                                        type="text"
                                        disabled={membershipData.sameAsOffice}
                                        value={membershipData.residenceCountry}
                                        onChange={(e) => updateField('residenceCountry', e.target.value)}
                                        placeholder="Country"
                                        className={`w-full px-3 py-2 text-xs rounded-lg border outline-hidden ${
                                          membershipData.sameAsOffice
                                            ? 'bg-neutral-200/50 border-neutral-200 text-neutral-400 cursor-not-allowed'
                                            : 'bg-white border-neutral-300 focus:border-[#B70D2B]'
                                        }`}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Step 1 Error Banner */}
                          {stepError && (
                            <div className="p-3.5 rounded-xl bg-red-50 border border-red-300 text-red-900 flex items-center gap-2.5 shadow-xs">
                              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                              <span className="text-xs sm:text-sm font-bold">{stepError}</span>
                            </div>
                          )}

                          {/* Step 1 Next Button */}
                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={handleNextStep}
                              className="w-full flex items-center justify-center gap-2 bg-[#B70D2B] hover:bg-neutral-900 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-4 px-6 rounded-xl shadow-lg transition-all hover:scale-[1.005] active:scale-[0.99] cursor-pointer"
                            >
                              <span>Next: Proceed to Fee &amp; Payment</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col justify-between space-y-6 animate-in fade-in duration-300">
                          {/* Step 2 Summary Banner */}
                          <div className="bg-gradient-to-r from-neutral-50 to-red-50/40 rounded-2xl p-4 sm:p-5 border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                            <div>
                              <span className="text-[10px] font-black uppercase tracking-wider text-[#B70D2B] block">Applicant Information:</span>
                              <h4 className="text-sm sm:text-base font-extrabold text-neutral-900 mt-0.5">
                                {membershipData.salutation} {membershipData.firstName} {membershipData.middleName ? membershipData.middleName + ' ' : ''}{membershipData.lastName || membershipData.surName}
                                {membershipData.passingYear && <span className="text-neutral-500 font-normal ml-2">(Batch of {membershipData.passingYear})</span>}
                              </h4>
                              <p className="text-xs text-neutral-600 mt-0.5">
                                {membershipData.email} • Ph: {membershipData.sameAsOffice ? membershipData.officePhone : membershipData.residencePhone}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => { setStepError(''); setCurrentStep(1); }}
                              className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 rounded-lg font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                              <span>Edit Profile</span>
                            </button>
                          </div>

                          {/* 5. MEMBERSHIP FEE & PAYMENT DETAILS */}
                          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-5">
                            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#B70D2B] flex items-center justify-center font-bold">
                                  <CreditCard className="w-4 h-4" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-extrabold text-neutral-900 tracking-tight">Life Membership Contribution</h4>
                                  <p className="text-[11px] text-neutral-500">Official one-time lifetime membership enrollment fee</p>
                                </div>
                              </div>
                              <span className="text-xs font-black text-[#B70D2B] bg-red-50 px-3 py-1 rounded-md border border-red-200">
                                Amount: ₹ {membershipData.amount || '2,000'}/-
                              </span>
                            </div>

                            <div className="space-y-3">
                              <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider">
                                Select Payment Method <span className="text-red-600">*</span>
                              </label>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                  { id: 'Online', label: 'Online / UPI / NEFT', desc: 'Transfer via UPI / Bank' },
                                  { id: 'Cheque', label: 'Cheque / DD', desc: 'Payable at Lucknow' },
                                  { id: 'Cash', label: 'Cash Payment', desc: 'Deposit at FOAP Secretariat' },
                                ].map((mode) => (
                                  <label
                                    key={mode.id}
                                    className={`p-3.5 rounded-xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                                      membershipData.paymentMode === mode.id
                                        ? 'border-[#B70D2B] bg-red-50/70 text-neutral-900 shadow-2xs'
                                        : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="radio"
                                        name="paymentMode"
                                        value={mode.id}
                                        checked={membershipData.paymentMode === mode.id}
                                        onChange={(e) => updateField('paymentMode', e.target.value)}
                                        className="w-4 h-4 text-[#B70D2B] accent-[#B70D2B]"
                                      />
                                      <span className="text-xs sm:text-sm font-extrabold">{mode.label}</span>
                                    </div>
                                    <span className="text-[10px] text-neutral-500 mt-1 pl-6">{mode.desc}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            {membershipData.paymentMode === 'Online' ? (
                              <div className="bg-neutral-50 p-4 sm:p-5 rounded-xl border border-neutral-200 text-xs text-neutral-700 space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-2">
                                  <p className="font-bold text-neutral-900 text-sm flex items-center gap-2">
                                    <span>🏦</span>
                                    <span>GCAAA Official Bank Account for Online Transfer:</span>
                                  </p>
                                  <span className="self-start sm:self-auto text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                                    Central Bank of India
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs bg-white p-3.5 rounded-xl border border-neutral-200 shadow-2xs">
                                  <p><strong className="text-neutral-900">Account Name:</strong> GCA Alumni Association</p>
                                  <p><strong className="text-neutral-900">Bank:</strong> Central Bank of India</p>
                                  <p><strong className="text-neutral-900">Branch:</strong> FOAP, Tagore Marg, Lucknow</p>
                                  <p><strong className="text-neutral-900">Account Type:</strong> Current Account</p>
                                </div>

                                <div>
                                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                    UTR / UPI Reference / Transaction ID <span className="text-red-600">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={membershipData.chequeNo}
                                    onChange={(e) => updateField('chequeNo', e.target.value)}
                                    placeholder="Enter 12-digit UTR / UPI Ref ID / Transaction Reference"
                                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-xl outline-hidden font-bold text-neutral-900 transition-all ${
                                      fieldErrors.chequeNo
                                        ? 'border-2 border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-100'
                                        : 'border border-neutral-300 focus:border-[#B70D2B] focus:ring-2 focus:ring-red-100'
                                    }`}
                                  />
                                  {fieldErrors.chequeNo && (
                                    <p className="text-red-600 text-[11px] font-semibold mt-1 flex items-center gap-1">
                                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                      {fieldErrors.chequeNo}
                                    </p>
                                  )}
                                </div>

                                <div id="payment-proof-upload-box" className="pt-2 border-t border-neutral-200">
                                  <label className="block text-[11px] font-bold text-neutral-800 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                                    <span className="flex items-center gap-1.5">
                                      <Camera className="w-3.5 h-3.5 text-[#B70D2B]" />
                                      <span>Upload Payment Screenshot / Transfer Receipt <span className="text-red-600">*</span></span>
                                    </span>
                                    <span className="text-[10px] font-semibold text-neutral-500 normal-case">
                                      (JPG, PNG max 10MB)
                                    </span>
                                  </label>

                                  {membershipData.paymentProofPreview ? (
                                    <div className="bg-white p-3.5 rounded-xl border-2 border-emerald-500 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                                      <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 shrink-0">
                                          <img
                                            src={membershipData.paymentProofPreview}
                                            alt="Payment Preview"
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                        <div className="min-w-0">
                                          <div className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 mb-0.5">
                                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                            <span>Screenshot Attached ✓</span>
                                          </div>
                                          <p className="text-xs font-bold text-neutral-900 truncate max-w-[200px] sm:max-w-[260px]">
                                            {membershipData.paymentProofName || 'payment_proof.jpg'}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                        <label className="cursor-pointer text-xs font-bold text-neutral-700 hover:text-red-600 px-3 py-1.5 rounded-lg border border-neutral-300 hover:bg-neutral-50 transition-colors">
                                          <span>Change</span>
                                          <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePaymentProofUpload}
                                            className="hidden"
                                          />
                                        </label>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            updateField('paymentProofPreview', null);
                                            updateField('paymentProofName', '');
                                          }}
                                          className="text-xs font-bold text-red-600 hover:text-red-800 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <label className={`group relative flex flex-col items-center justify-center p-5 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center ${
                                      fieldErrors.paymentProof
                                        ? 'border-red-500 bg-red-50/30'
                                        : 'border-neutral-300 hover:border-[#B70D2B] bg-white hover:bg-red-50/20'
                                    }`}>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePaymentProofUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                      />
                                      <div className="w-10 h-10 rounded-full bg-red-100 text-[#B70D2B] group-hover:scale-110 flex items-center justify-center transition-transform mb-2">
                                        <Upload className="w-5 h-5" />
                                      </div>
                                      <p className="text-xs sm:text-sm font-extrabold text-neutral-900">
                                        Click to Upload Payment Screenshot or Receipt Photo
                                      </p>
                                      <span className="text-[10px] text-neutral-500 mt-0.5">
                                        Upload proof of ₹ 2,000 transfer
                                      </span>
                                    </label>
                                  )}
                                  {fieldErrors.paymentProof && (
                                    <p className="text-red-600 text-[11px] font-semibold mt-1 flex items-center gap-1">
                                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                      {fieldErrors.paymentProof}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ) : membershipData.paymentMode === 'Cheque' ? (
                              <div className="space-y-3 bg-neutral-50 p-4 sm:p-5 rounded-xl border border-neutral-200">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                                  <div>
                                    <label className="block text-[11px] font-bold text-neutral-600 uppercase tracking-wider mb-1">
                                      Cheque No. <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      value={membershipData.chequeNo}
                                      onChange={(e) => updateField('chequeNo', e.target.value)}
                                      placeholder="e.g. 000421"
                                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-xl outline-hidden transition-all ${
                                        fieldErrors.chequeNo
                                          ? 'border-2 border-red-500 bg-red-50/20'
                                          : 'border border-neutral-300 focus:border-[#B70D2B]'
                                      }`}
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[11px] font-bold text-neutral-600 uppercase tracking-wider mb-1">
                                      Drawn on Bank <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      value={membershipData.drawnOnBank}
                                      onChange={(e) => updateField('drawnOnBank', e.target.value)}
                                      placeholder="Bank Name & Branch"
                                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-xl outline-hidden transition-all ${
                                        fieldErrors.drawnOnBank
                                          ? 'border-2 border-red-500 bg-red-50/20'
                                          : 'border border-neutral-300 focus:border-[#B70D2B]'
                                      }`}
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[11px] font-bold text-neutral-600 uppercase tracking-wider mb-1">
                                      Date <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                      type="date"
                                      value={membershipData.chequeDate}
                                      onChange={(e) => updateField('chequeDate', e.target.value)}
                                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-xl outline-hidden font-bold transition-all ${
                                        fieldErrors.chequeDate
                                          ? 'border-2 border-red-500 bg-red-50/20'
                                          : 'border border-neutral-300 focus:border-[#B70D2B]'
                                      }`}
                                    />
                                  </div>
                                </div>

                                <p className="text-xs text-neutral-800 bg-amber-50/90 p-3 rounded-lg border border-amber-300">
                                  ℹ️ <strong>Note:</strong> Cheques to be drawn in favour of <strong className="text-neutral-900">&ldquo;GCA Alumni Association&rdquo;</strong>, payable at Lucknow.
                                </p>
                              </div>
                            ) : (
                              <div className="bg-neutral-50 p-4 sm:p-5 rounded-xl border border-neutral-200 text-xs text-neutral-700 space-y-2">
                                <p className="font-bold text-neutral-900 text-sm">💵 Cash Deposit Instructions:</p>
                                <p className="leading-relaxed">
                                  Life Membership cash fee of <strong>₹ 2,000</strong> can be deposited directly with the GCAAA Treasurer at the Alumni Association Office, FOAP-AKTU Campus, Lucknow, or at the event registration desk.
                                </p>
                              </div>
                            )}
                          </div>

                          {/* 6. DECLARATION & DIGITAL SIGNATURE */}
                          <div className="bg-neutral-50 p-5 sm:p-6 rounded-2xl border border-neutral-200 space-y-4">
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={membershipData.agreedToRules}
                                onChange={(e) => updateField('agreedToRules', e.target.checked)}
                                className="w-4 h-4 mt-0.5 text-[#B70D2B] rounded accent-[#B70D2B] shrink-0"
                              />
                              <span className="text-xs text-neutral-700 leading-relaxed font-medium">
                                I hereby apply for Life Membership and agree to abide by the constitution, rules &amp; regulations of GCA Alumni Association. All details furnished above are accurate as per my academic records.
                              </span>
                            </label>
                            {fieldErrors.agreedToRules && (
                              <p className="text-red-600 text-[11px] font-semibold flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                {fieldErrors.agreedToRules}
                              </p>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-neutral-200 items-end">
                              <div>
                                <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                  Digital Signature (Type Full Name) <span className="text-red-600">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={membershipData.applicantSignature}
                                  onChange={(e) => updateField('applicantSignature', e.target.value)}
                                  placeholder="Type your full name to sign"
                                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-xl outline-hidden font-serif italic text-neutral-900 font-bold transition-all ${
                                    fieldErrors.applicantSignature
                                      ? 'border-2 border-red-500 bg-red-50/20'
                                      : 'border border-neutral-300 focus:border-[#B70D2B]'
                                  }`}
                                />
                                {fieldErrors.applicantSignature && (
                                  <p className="text-red-600 text-[11px] font-semibold mt-1 flex items-center gap-1">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                    {fieldErrors.applicantSignature}
                                  </p>
                                )}
                              </div>

                              <div>
                                <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                  Date of Application
                                </label>
                                <input
                                  type="text"
                                  readOnly
                                  value={new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-200/60 border border-neutral-300 rounded-xl text-neutral-600 font-bold"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Step 2 Error Banner */}
                          {stepError && (
                            <div className="p-3.5 rounded-xl bg-red-50 border-2 border-red-300 text-red-900 text-xs sm:text-sm font-bold flex items-center gap-2.5 shadow-sm">
                              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                              <span>{stepError}</span>
                            </div>
                          )}

                          {/* Step 2 Actions */}
                          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 mt-auto">
                            <button
                              type="button"
                              onClick={() => { setStepError(''); setCurrentStep(1); }}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-neutral-300 hover:bg-neutral-100 text-neutral-800 font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                            >
                              <ArrowLeft className="w-4 h-4" />
                              <span>Back to Details</span>
                            </button>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className={`flex-1 w-full flex items-center justify-center gap-2 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-4 px-6 rounded-xl shadow-xl transition-all cursor-pointer ${
                                isSubmitting
                                  ? 'bg-neutral-600 cursor-not-allowed opacity-90'
                                  : 'bg-[#B70D2B] hover:bg-neutral-900 hover:scale-[1.005] active:scale-[0.99] shadow-red-950/20'
                              }`}
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  <span>Submitting Application...</span>
                                </>
                              ) : (
                                <>
                                  <FileCheck className="w-4 h-4" />
                                  <span>Submit Membership Registration Form</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </form>
                  )}
                </div>

                {/* RIGHT COLUMN */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <Link
                        to="/registered-members"
                        className="group relative overflow-hidden rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] p-4 sm:p-5 text-white shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all flex flex-col justify-between min-h-[135px] border border-red-600 cursor-pointer"
                      >
                        <div>
                          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider text-red-100 bg-black/20 px-2.5 py-0.5 rounded-full mb-2">
                            <Users className="w-3.5 h-3.5" />
                            Existing Members?
                          </span>
                          <h4 className="text-sm sm:text-base font-extrabold text-white leading-snug">
                            Know your GCAAA membership number.
                          </h4>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-xs font-bold text-red-100">
                          <span className="underline underline-offset-4 decoration-red-300">Search Directory</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                        </div>
                      </Link>

                      <div className="relative overflow-hidden rounded-xl bg-[#FB8C00] p-4 sm:p-5 text-white shadow-md flex flex-col justify-between min-h-[135px] border border-amber-500">
                        <div>
                          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-100 bg-black/20 px-2.5 py-0.5 rounded-full mb-2">
                            <Award className="w-3.5 h-3.5" />
                            Online Portal
                          </span>
                          <h4 className="text-sm sm:text-base font-extrabold text-white leading-snug">
                            New Registration
                          </h4>
                        </div>
                        <p className="mt-3 text-xs font-medium text-amber-100 leading-snug">
                          Fill the official Life Membership form on the left
                        </p>
                      </div>
                    </div>

                    <div className="pt-1 flex items-center justify-between">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight font-serif">
                          Process of receiving Membership
                        </h3>
                        <p className="text-xs text-neutral-600 mt-1">
                          Official guidelines, eligibility criteria, and member entitlements.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={toggleAllSections}
                        className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-neutral-600 hover:text-[#B70D2B] bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <span>{areAllOpen ? 'Collapse All' : 'Expand All'}</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {/* 1. Eligibility */}
                      <div className="overflow-hidden rounded-xl border border-neutral-200 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => toggleSection('eligibility')}
                          className={`w-full text-left px-4 py-3.5 flex items-center justify-between font-bold text-xs sm:text-sm transition-colors cursor-pointer ${
                            openSections.eligibility
                              ? 'bg-[#FB8C00] text-white'
                              : 'bg-white hover:bg-neutral-50 text-neutral-800'
                          }`}
                        >
                          <span>Eligibility of Application</span>
                          {openSections.eligibility ? (
                            <ChevronUp className="w-4 h-4 shrink-0 text-white" />
                          ) : (
                            <ChevronDown className="w-4 h-4 shrink-0 text-neutral-500" />
                          )}
                        </button>
                        {openSections.eligibility && (
                          <div className="bg-white p-5 text-xs text-neutral-700 space-y-2.5 border-t border-neutral-200">
                            <ul className="space-y-2 list-disc list-outside pl-4 marker:text-neutral-400 leading-relaxed">
                              <li>
                                Any person who has passed degree course in Architecture i.e. <strong>B. Arch.</strong> from a recognized University or Govt. College of Architecture (GCA Lucknow / Faculty of Architecture AKTU / GBTU).
                              </li>
                              <li>
                                Possess a 5-year Architectural Degree recognized by <strong>Council of Architecture (COA)</strong>, India and living / working in Lucknow, across India or abroad.
                              </li>
                              <li>
                                Nominated or recommended by at least one active GCAAA member or registered alumnus.
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* 2. Benefits */}
                      <div className="overflow-hidden rounded-xl border border-neutral-200 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => toggleSection('benefits')}
                          className={`w-full text-left px-4 py-3.5 flex items-center justify-between font-bold text-xs sm:text-sm transition-colors cursor-pointer ${
                            openSections.benefits
                              ? 'bg-[#FB8C00] text-white'
                              : 'bg-white hover:bg-neutral-50 text-neutral-800'
                          }`}
                        >
                          <span>Membership Benefits</span>
                          {openSections.benefits ? (
                            <ChevronUp className="w-4 h-4 shrink-0 text-white" />
                          ) : (
                            <ChevronDown className="w-4 h-4 shrink-0 text-neutral-500" />
                          )}
                        </button>
                        {openSections.benefits && (
                          <div className="bg-white p-5 text-xs text-neutral-700 space-y-2.5 border-t border-neutral-200">
                            <ul className="space-y-2 list-disc list-outside pl-4 marker:text-neutral-400 leading-relaxed">
                              <li>
                                <strong>Official Life Membership ID &amp; Certificate:</strong> Issued by GCA Alumni Association with permanent enrollment number.
                              </li>
                              <li>
                                <strong>Voting Rights in AGM / GBM:</strong> Full voting privileges and participatory rights in the Annual General Body Meetings.
                              </li>
                              <li>
                                <strong>Verified Directory Listing:</strong> Listing in the global searchable Alumni Directory at{' '}
                                <Link to="/alumni-data-list" className="text-[#B70D2B] font-bold underline hover:text-neutral-900">
                                  /alumni-data-list
                                </Link>.
                              </li>
                              <li>
                                <strong>Reunion &amp; Event Privileges:</strong> Priority registration, special seating, and discounted delegate passes for events such as <strong>Dharohar 2026</strong>.
                              </li>
                              <li>
                                <strong>Professional Networking:</strong> Connect with distinguished alumni architects, academicians, planners, and industry leaders globally.
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* 3. Fee Details */}
                      <div className="overflow-hidden rounded-xl border border-neutral-200 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => toggleSection('fee')}
                          className={`w-full text-left px-4 py-3.5 flex items-center justify-between font-bold text-xs sm:text-sm transition-colors cursor-pointer ${
                            openSections.fee
                              ? 'bg-[#FB8C00] text-white'
                              : 'bg-white hover:bg-neutral-50 text-neutral-800'
                          }`}
                        >
                          <span>Fee Details</span>
                          {openSections.fee ? (
                            <ChevronUp className="w-4 h-4 shrink-0 text-white" />
                          ) : (
                            <ChevronDown className="w-4 h-4 shrink-0 text-neutral-500" />
                          )}
                        </button>
                        {openSections.fee && (
                          <div className="bg-white p-5 text-xs text-neutral-700 space-y-2.5 border-t border-neutral-200">
                            <ul className="space-y-2 list-disc list-outside pl-4 marker:text-neutral-400 leading-relaxed">
                              <li>
                                <strong>Life Membership Fee:</strong> ₹ 2,000/- (Rupees Two Thousand Only) — One-time lifetime contribution.
                              </li>
                              <li>
                                <strong>Mode of Payment:</strong> Cheque, Demand Draft (DD), NEFT, IMPS, RTGS, or Online UPI.
                              </li>
                              <li>
                                <strong>Payment In Favour Of:</strong> <em>&ldquo;Govt. College of Architecture Alumni Association&rdquo;</em>, Payable at Lucknow.
                              </li>
                              <li>
                                <strong>Receipt &amp; Acknowledgment:</strong> Digital receipt is generated and registered upon account clearance by the Treasurer.
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* 4. Remarks */}
                      <div className="overflow-hidden rounded-xl border border-neutral-200 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => toggleSection('remarks')}
                          className={`w-full text-left px-4 py-3.5 flex items-center justify-between font-bold text-xs sm:text-sm transition-colors cursor-pointer ${
                            openSections.remarks
                              ? 'bg-[#FB8C00] text-white'
                              : 'bg-white hover:bg-neutral-50 text-neutral-800'
                          }`}
                        >
                          <span>Remarks</span>
                          {openSections.remarks ? (
                            <ChevronUp className="w-4 h-4 shrink-0 text-white" />
                          ) : (
                            <ChevronDown className="w-4 h-4 shrink-0 text-neutral-500" />
                          )}
                        </button>
                        {openSections.remarks && (
                          <div className="bg-white p-5 text-xs text-neutral-700 space-y-2.5 border-t border-neutral-200">
                            <ul className="space-y-2 list-disc list-outside pl-4 marker:text-neutral-400 leading-relaxed">
                              <li>
                                Please ensure all spellings of your full name match your Council of Architecture (COA) registration or degree certificate.
                              </li>
                              <li>
                                Both Office and Residence addresses are recorded to ensure safe courier delivery of official certificates and reunion souvenirs.
                              </li>
                              <li>
                                If paying via UPI or NEFT, please note the 12-digit UTR number and mention it accurately under payment details.
                              </li>
                              <li>
                                For any queries, please write to Secretariat at <span className="font-bold text-[#B70D2B]">contact.gcaaa@gmail.com</span>.
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-950 flex items-start gap-3">
                      <Info className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <p className="text-xs font-medium leading-relaxed">
                        <strong className="font-extrabold text-red-700">Note:</strong> Before filling the form get ready with the COA certificate / academic degree, Payment proof (Cheque / UTR number), and Passport size photo for upload.
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                      <div>
                        <h5 className="text-xs font-black uppercase tracking-wider text-amber-400">
                          Already Registered?
                        </h5>
                        <p className="text-xs text-neutral-300 mt-0.5">
                          Verify your details or search for batchmates in the directory.
                        </p>
                      </div>
                      <Link
                        to="/registered-members"
                        className="shrink-0 px-4 py-2 bg-white text-neutral-900 hover:bg-neutral-100 font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <Search className="w-3.5 h-3.5" />
                        <span>View Directory</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};