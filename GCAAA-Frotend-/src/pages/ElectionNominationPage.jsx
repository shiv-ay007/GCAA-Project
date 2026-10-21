import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Vote,
  CheckCircle2,
  AlertCircle,
  Camera,
  RotateCcw,
  Send,
  Loader2,
  Printer,
  ShieldCheck,
  User,
  Users,
  FileText,
  X,
  ChevronDown,
  Search,
  ExternalLink,
  Check,
  Gavel,
  CalendarDays,
  FileSignature,
} from 'lucide-react';
import logoImg from '@/assets/images/logo.png';
import buildingHeroImg from '@/assets/images/GCAAA_college_building.jpg';
import {
  submitElectionNomination,
  verifyMembershipNumber,
} from '@/Api/electionNominationApi';

// Posts list with details & eligibility rules matching official notification
export const ELECTION_POSTS = [
  {
    sno: 1,
    post: 'President',
    seats: '1 Post',
    eligibility: 'Lifetime Member of GCAAA',
  },
  {
    sno: 2,
    post: 'Vice President',
    seats: '1 Post',
    eligibility: 'Lifetime Member of GCAAA',
  },
  {
    sno: 3,
    post: 'General Secretary',
    seats: '1 Post',
    eligibility: 'Lifetime Member of GCAAA (Residential proof of Lucknow required)',
  },
  {
    sno: 4,
    post: 'Joint Secretary',
    seats: '1 Post',
    eligibility: 'Lifetime Member of GCAAA',
  },
  {
    sno: 5,
    post: 'Treasurer',
    seats: '1 Post',
    eligibility: 'Lifetime Member of GCAAA (Residential proof of Lucknow required)',
  },
  {
    sno: 6,
    post: 'Executive Member (i)',
    seats: '1 Post',
    eligibility: 'Nominated by Patron College',
  },
  {
    sno: 7,
    post: 'Executive Member (ii)',
    seats: '2 Posts',
    eligibility: 'Lifetime Member of GCAAA (Residential proof of Lucknow required)',
  },
  {
    sno: 8,
    post: 'Executive Member (iii)',
    seats: '3 Posts',
    eligibility: 'Lifetime Member of GCAAA',
  },
];

const INITIAL_FORM_STATE = {
  post: '',
  candidate: {
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    membershipNo: '',
    photo: '',
    photoName: '',
    signature: '',
    signatureName: '',
  },
  proposer: {
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    membershipNo: '',
    photo: '',
    photoName: '',
  },
  seconder: {
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    membershipNo: '',
    photo: '',
    photoName: '',
  },
  declarationAgreed: false,
};

export const ElectionNominationPage = () => {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem('gcaaa_election_nomination_draft');
      return saved ? JSON.parse(saved) : INITIAL_FORM_STATE;
    } catch {
      return INITIAL_FORM_STATE;
    }
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);

  // Live Membership Verification Status
  const [verificationStatus, setVerificationStatus] = useState({
    candidate: { loading: false, verified: false, member: null, error: '' },
    proposer: { loading: false, verified: false, member: null, error: '' },
    seconder: { loading: false, verified: false, member: null, error: '' },
  });

  // Auto-save draft in localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gcaaa_election_nomination_draft', JSON.stringify(formData));
    } catch {
      // ignore quota / private browsing errors
    }
  }, [formData]);

  // Toast auto-clear
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 6000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Live Membership Number Verifier against Database
  const checkMembershipNumber = async (section, rawNo) => {
    const cleanNo = (rawNo || '').trim().toUpperCase();
    if (!cleanNo) {
      setVerificationStatus((prev) => ({
        ...prev,
        [section]: { loading: false, verified: false, member: null, error: '' },
      }));
      return null;
    }

    setVerificationStatus((prev) => ({
      ...prev,
      [section]: { loading: true, verified: false, member: null, error: '' },
    }));

    try {
      const res = await verifyMembershipNumber(cleanNo);
      if (res && res.exists && res.data) {
        const member = res.data;

        setVerificationStatus((prev) => ({
          ...prev,
          [section]: { loading: false, verified: true, member, error: '' },
        }));

        // Resolve member details
        let resolvedName = member.name || '';
        if (!resolvedName && (member.firstName || member.lastName)) {
          resolvedName = [member.salutation, member.firstName, member.middleName, member.lastName]
            .filter(Boolean)
            .join(' ');
        }

        const resolvedMobile = (
          member.mobile ||
          member.residenceAddress?.phone ||
          member.officeAddress?.phone ||
          ''
        )
          .replace(/\D/g, '')
          .slice(0, 10);

        const resolvedEmail = member.email || '';

        let resolvedAddress = '';
        if (typeof member.address === 'string' && member.address.trim()) {
          resolvedAddress = member.address.trim();
        } else if (member.residenceAddress) {
          resolvedAddress = [
            member.residenceAddress.street,
            member.residenceAddress.city,
            member.residenceAddress.country,
          ]
            .filter(Boolean)
            .join(', ');
        } else if (member.officeAddress) {
          resolvedAddress = [member.officeAddress.street, member.officeAddress.city]
            .filter(Boolean)
            .join(', ');
        }

        // Auto-fill member details into form
        setFormData((prev) => ({
          ...prev,
          [section]: {
            ...prev[section],
            fullName: resolvedName || prev[section].fullName,
            mobile: resolvedMobile || prev[section].mobile,
            email: resolvedEmail || prev[section].email,
            address: resolvedAddress || prev[section].address,
          },
        }));

        // Clear field errors for auto-filled fields
        setFieldErrors((prev) => {
          const next = { ...prev };
          delete next[`${section}.membershipNo`];
          if (resolvedName) delete next[`${section}.fullName`];
          if (resolvedMobile) delete next[`${section}.mobile`];
          if (resolvedEmail) delete next[`${section}.email`];
          if (resolvedAddress) delete next[`${section}.address`];
          return next;
        });

        setToastMessage({
          type: 'success',
          text: `Verified: ${resolvedName || cleanNo}! Details have been auto-filled.`,
        });

        return member;
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        `Membership No. '${cleanNo}' was not found in registered members database.`;
      setVerificationStatus((prev) => ({
        ...prev,
        [section]: { loading: false, verified: false, member: null, error: msg },
      }));
      setFieldErrors((prev) => ({
        ...prev,
        [`${section}.membershipNo`]: msg,
      }));
      return null;
    }
  };

  // Handle text input changes
  const handleInputChange = (section, field, value) => {
    if (section === 'root') {
      setFormData((prev) => ({ ...prev, [field]: value }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));

      // If membership number changed, reset verified state
      if (field === 'membershipNo') {
        setVerificationStatus((prev) => ({
          ...prev,
          [section]: { loading: false, verified: false, member: null, error: '' },
        }));
      }
    }

    // Clear error for field
    const errorKey = section === 'root' ? field : `${section}.${field}`;
    if (fieldErrors[errorKey]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[errorKey];
        return next;
      });
    }
  };

  // Handle Photo / Signature upload with base64 conversion & validation (Max 10MB)
  const handleFileUpload = (section, field, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setToastMessage({
        type: 'error',
        text: 'Please select an image file (JPG, PNG or WEBP).',
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setToastMessage({
        type: 'error',
        text: 'Image size exceeds 10MB limit. Please upload a smaller file.',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: base64,
          [`${field}Name`]: file.name,
        },
      }));

      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[`${section}.${field}`];
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (section, field = 'photo') => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: '',
        [`${field}Name`]: '',
      },
    }));
  };

  const handlePhotoUpload = (section, e) => handleFileUpload(section, 'photo', e);
  const removePhoto = (section) => removeFile(section, 'photo');

  // Validation function
  const validateForm = async () => {
    const errors = {};

    if (!formData.post) {
      errors['post'] = 'Please select the post you are applying for.';
    }

    // Candidate validation
    if (!formData.candidate.fullName.trim()) {
      errors['candidate.fullName'] = 'Candidate Full Name is required';
    }
    if (!formData.candidate.mobile.trim()) {
      errors['candidate.mobile'] = 'Candidate Mobile Number is required';
    } else if (!/^[0-9]{10}$/.test(formData.candidate.mobile.trim())) {
      errors['candidate.mobile'] = 'Enter valid 10-digit mobile number';
    }
    if (!formData.candidate.email.trim()) {
      errors['candidate.email'] = 'Candidate Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.candidate.email.trim())) {
      errors['candidate.email'] = 'Enter valid email address';
    }
    if (!formData.candidate.address.trim()) {
      errors['candidate.address'] = 'Candidate Address is required';
    }
    if (!formData.candidate.membershipNo.trim()) {
      errors['candidate.membershipNo'] = 'Candidate GCAAA Membership Number is required';
    }
    if (!formData.candidate.photo) {
      errors['candidate.photo'] = 'Candidate photograph is mandatory';
    }
    if (!formData.candidate.signature) {
      errors['candidate.signature'] = 'Candidate signature is mandatory';
    }

    // Proposer validation
    if (!formData.proposer.fullName.trim()) {
      errors['proposer.fullName'] = 'Proposer Full Name is required';
    }
    if (!formData.proposer.mobile.trim()) {
      errors['proposer.mobile'] = 'Proposer Mobile is required';
    } else if (!/^[0-9]{10}$/.test(formData.proposer.mobile.trim())) {
      errors['proposer.mobile'] = 'Enter valid 10-digit mobile number';
    }
    if (!formData.proposer.address.trim()) {
      errors['proposer.address'] = 'Proposer Address is required';
    }
    if (!formData.proposer.membershipNo.trim()) {
      errors['proposer.membershipNo'] = 'Proposer Membership No. is required';
    }
    if (!formData.proposer.photo) {
      errors['proposer.photo'] = 'Proposer signature is mandatory';
    }

    // Seconder validation
    if (!formData.seconder.fullName.trim()) {
      errors['seconder.fullName'] = 'Seconder Full Name is required';
    }
    if (!formData.seconder.mobile.trim()) {
      errors['seconder.mobile'] = 'Seconder Mobile is required';
    } else if (!/^[0-9]{10}$/.test(formData.seconder.mobile.trim())) {
      errors['seconder.mobile'] = 'Enter valid 10-digit mobile number';
    }
    if (!formData.seconder.address.trim()) {
      errors['seconder.address'] = 'Seconder Address is required';
    }
    if (!formData.seconder.membershipNo.trim()) {
      errors['seconder.membershipNo'] = 'Seconder Membership No. is required';
    }
    if (!formData.seconder.photo) {
      errors['seconder.photo'] = 'Seconder signature is mandatory';
    }

    // Declaration validation
    if (!formData.declarationAgreed) {
      errors['declarationAgreed'] = 'You must accept the election declaration statement';
    }

    // Uniqueness validation among Candidate, Proposer, and Seconder
    const cNo = formData.candidate.membershipNo.trim().toUpperCase();
    const pNo = formData.proposer.membershipNo.trim().toUpperCase();
    const sNo = formData.seconder.membershipNo.trim().toUpperCase();

    if (cNo && pNo && cNo === pNo) {
      errors['proposer.membershipNo'] =
        'Proposer cannot have the same GCAAA Membership Number as Candidate.';
    }
    if (cNo && sNo && cNo === sNo) {
      errors['seconder.membershipNo'] =
        'Seconder cannot have the same GCAAA Membership Number as Candidate.';
    }
    if (pNo && sNo && pNo === sNo) {
      errors['seconder.membershipNo'] =
        'Proposer and Seconder cannot have the same GCAAA Membership Number.';
    }

    // Live Database Existence Verification for all 3 numbers
    if (cNo && !errors['candidate.membershipNo']) {
      const verifiedCand = verificationStatus.candidate.verified
        ? verificationStatus.candidate.member
        : await checkMembershipNumber('candidate', cNo);
      if (!verifiedCand) {
        errors['candidate.membershipNo'] = `Membership No. '${cNo}' is not registered in GCAAA database.`;
      }
    }

    if (pNo && !errors['proposer.membershipNo']) {
      const verifiedProp = verificationStatus.proposer.verified
        ? verificationStatus.proposer.member
        : await checkMembershipNumber('proposer', pNo);
      if (!verifiedProp) {
        errors['proposer.membershipNo'] = `Proposer Membership No. '${pNo}' is not registered in GCAAA database.`;
      }
    }

    if (sNo && !errors['seconder.membershipNo']) {
      const verifiedSec = verificationStatus.seconder.verified
        ? verificationStatus.seconder.member
        : await checkMembershipNumber('seconder', sNo);
      if (!verifiedSec) {
        errors['seconder.membershipNo'] = `Seconder Membership No. '${sNo}' is not registered in GCAAA database.`;
      }
    }

    return errors;
  };

  // Reset form
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the form? All entered details will be cleared.')) {
      setFormData(INITIAL_FORM_STATE);
      setFieldErrors({});
      setVerificationStatus({
        candidate: { loading: false, verified: false, member: null, error: '' },
        proposer: { loading: false, verified: false, member: null, error: '' },
        seconder: { loading: false, verified: false, member: null, error: '' },
      });
      localStorage.removeItem('gcaaa_election_nomination_draft');
      setToastMessage({ type: 'info', text: 'Form has been reset.' });
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToastMessage(null);

    const errors = await validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsSubmitting(false);
      setToastMessage({
        type: 'error',
        text: 'Validation failed. Please fill all mandatory fields and ensure verified membership numbers.',
      });
      window.scrollTo({ top: 380, behavior: 'smooth' });
      return;
    }

    try {
      const response = await submitElectionNomination(formData);
      const generatedId = response.nominationId || `GCA-NOM-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      setSubmitSuccess({
        nominationId: generatedId,
        post: formData.post,
        candidateName: formData.candidate.fullName,
        candidateMembership: formData.candidate.membershipNo,
        candidateMobile: formData.candidate.mobile,
        candidateEmail: formData.candidate.email,
        candidateAddress: formData.candidate.address,
        candidatePhoto: formData.candidate.photo,
        candidateSignature: formData.candidate.signature,
        proposerName: formData.proposer.fullName,
        proposerMembership: formData.proposer.membershipNo,
        proposerMobile: formData.proposer.mobile,
        proposerAddress: formData.proposer.address,
        proposerPhoto: formData.proposer.photo,
        seconderName: formData.seconder.fullName,
        seconderMembership: formData.seconder.membershipNo,
        seconderMobile: formData.seconder.mobile,
        seconderAddress: formData.seconder.address,
        seconderPhoto: formData.seconder.photo,
        submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      });

      localStorage.removeItem('gcaaa_election_nomination_draft');
    } catch (error) {
      console.warn('Backend submission error:', error);
      const errDetail =
        error.response?.data?.message ||
        'Failed to submit nomination. Please ensure all membership numbers are registered in GCAAA records.';

      setToastMessage({
        type: 'error',
        text: errDetail,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPostObj = ELECTION_POSTS.find((p) => p.post === formData.post);

  // Reusable Membership Number Field with inline verification indicator
  const renderMembershipInput = (section, label) => {
    const status = verificationStatus[section];
    const value = formData[section].membershipNo;
    const error = fieldErrors[`${section}.membershipNo`];

    return (
      <div>
        <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-1">
          {label} <span className="text-red-600 font-black">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="e.g. U15289, U41001, LM-124"
            value={value}
            onBlur={() => checkMembershipNumber(section, value)}
            onChange={(e) =>
              handleInputChange(section, 'membershipNo', e.target.value.toUpperCase())
            }
            className={`w-full px-3.5 py-2.5 bg-neutral-50 rounded-lg border text-sm font-mono tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white pr-20 ${
              error
                ? 'border-red-500 bg-red-50/50'
                : status.verified
                ? 'border-emerald-500 bg-emerald-50/30'
                : 'border-neutral-300'
            }`}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
            {status.loading ? (
              <span className="text-[10px] text-neutral-500 flex items-center gap-1 px-1.5 py-0.5 bg-neutral-200/80 rounded">
                <Loader2 className="w-3 h-3 animate-spin text-[#8B0000]" />
                Checking
              </span>
            ) : status.verified ? (
              <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 px-2 py-0.5 bg-emerald-100 rounded border border-emerald-300">
                <Check className="w-3 h-3" />
                Verified
              </span>
            ) : (
              <button
                type="button"
                onClick={() => checkMembershipNumber(section, value)}
                disabled={!value.trim()}
                className="text-[10px] bg-neutral-200 hover:bg-[#8B0000] hover:text-white disabled:opacity-40 text-neutral-800 font-bold px-2 py-1 rounded transition-colors cursor-pointer"
              >
                Verify
              </button>
            )}
          </div>
        </div>

        {status.verified && status.member && (
          <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 shrink-0" />
            <span>
              Verified: <strong>{status.member.name}</strong> ({status.member.year || 'Alumnus'})
            </span>
          </p>
        )}

        {error && (
          <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-[#f8fafc] text-neutral-900 min-h-screen pb-20 selection:bg-red-600 selection:text-white">
      {/* ========================================================
          PRINT ONLY VIEW (Identical to Alumni Registration Official Print)
      ======================================================== */}
      <div className="hidden print:block w-full bg-white text-neutral-900 font-sans p-2 m-0 max-w-[210mm] mx-auto">
        <div className="border-2 border-neutral-900 rounded-xl p-5 space-y-3.5">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-3 gap-4">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="GCAAA Logo" className="h-16 w-auto object-contain shrink-0" />
              <div>
                <h1 className="text-base font-black tracking-tight text-neutral-900 uppercase font-serif leading-tight">
                  Govt. College of Architecture Alumni Association
                </h1>
                <p className="text-[10px] text-neutral-700 font-medium">
                  Faculty of Architecture, AKTU (formerly GCA Lucknow / GBTU), Tagore Marg, Lucknow – 226007
                </p>
                <p className="text-[10px] text-[#B70D2B] font-bold">
                  Email: gcaaa07@gmail.com | Phone: +91 98392 70036 | Website: www.gcaalumniassociation.com
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-block px-2.5 py-0.5 bg-neutral-900 text-white text-[9px] font-black uppercase tracking-wider rounded">
                Official Nomination Copy
              </span>
              <p className="text-[10px] font-bold text-neutral-700 mt-1">
                Date: {submitSuccess?.submittedAt || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
              <p className="text-[9px] font-mono font-bold text-neutral-500">
                Ref: {submitSuccess?.nominationId || 'GCA-NOM-2026-OFFICIAL'}
              </p>
            </div>
          </div>

          {/* Banner */}
          <div className="bg-neutral-100 py-1.5 px-3 rounded text-center border border-neutral-300">
            <h2 className="text-xs font-black uppercase tracking-widest text-neutral-900">
              Executive Committee Biennial Election (2026 – 2028) • Official Nomination Receipt
            </h2>
          </div>

          {/* Post Applied Highlight */}
          <div className="flex items-center justify-between p-2 rounded bg-neutral-50 border border-neutral-200 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-500">Post Contested:</span>{' '}
              <strong className="text-sm font-black text-[#8B0000] uppercase font-serif">
                {submitSuccess?.post || formData.post || 'N/A'}
              </strong>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-neutral-500 font-semibold">Term:</span>{' '}
              <strong className="text-xs font-bold text-neutral-900">2026 – 2028</strong>
            </div>
          </div>

          {/* 1. Candidate Information */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-1.5">
              1. Candidate Credentials &amp; Contact Details
            </h3>
            <div className="flex items-start gap-4">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] flex-1">
                <div>
                  <span className="text-neutral-500 font-semibold">Candidate Name:</span>{' '}
                  <strong className="text-neutral-900">
                    {submitSuccess?.candidateName || formData.candidate.fullName || 'N/A'}
                  </strong>
                </div>
                <div>
                  <span className="text-neutral-500 font-semibold">GCAAA Membership No:</span>{' '}
                  <strong className="font-mono text-neutral-900">
                    {submitSuccess?.candidateMembership || formData.candidate.membershipNo || 'N/A'}
                  </strong>
                </div>
                <div>
                  <span className="text-neutral-500 font-semibold">Contact Mobile:</span>{' '}
                  <strong className="text-neutral-900">
                    {submitSuccess?.candidateMobile || formData.candidate.mobile || 'N/A'}
                  </strong>
                </div>
                <div>
                  <span className="text-neutral-500 font-semibold">Email Address:</span>{' '}
                  <span className="text-neutral-800">
                    {submitSuccess?.candidateEmail || formData.candidate.email || 'N/A'}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-neutral-500 font-semibold">Complete Address:</span>{' '}
                  <span className="text-neutral-800">
                    {submitSuccess?.candidateAddress || formData.candidate.address || 'N/A'}
                  </span>
                </div>
              </div>
              {(submitSuccess?.candidatePhoto || formData.candidate.photo) && (
                <div className="shrink-0 text-center">
                  <img
                    src={submitSuccess?.candidatePhoto || formData.candidate.photo}
                    alt="Candidate"
                    className="w-20 h-24 object-cover rounded border border-neutral-300 shadow-2xs"
                  />
                  <span className="text-[8px] text-neutral-500 uppercase block mt-0.5 font-bold">
                    Candidate Photo
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 2. Proposer & Seconder Endorsement */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-1.5">
              2. Endorsement by Registered Life Members
            </h3>
            <div className="grid grid-cols-2 gap-3 text-[10px]">
              {/* Proposer */}
              <div className="p-2.5 rounded bg-neutral-50 border border-neutral-200">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase text-neutral-500 block">
                      Proposer Particulars:
                    </span>
                    <p>
                      <span className="text-neutral-500 font-semibold">Name:</span>{' '}
                      <strong className="text-neutral-900">
                        {submitSuccess?.proposerName || formData.proposer.fullName || 'N/A'}
                      </strong>
                    </p>
                    <p>
                      <span className="text-neutral-500 font-semibold">Mem No:</span>{' '}
                      <strong className="font-mono text-neutral-900">
                        {submitSuccess?.proposerMembership || formData.proposer.membershipNo || 'N/A'}
                      </strong>
                    </p>
                    <p>
                      <span className="text-neutral-500 font-semibold">Mobile:</span>{' '}
                      <span>{submitSuccess?.proposerMobile || formData.proposer.mobile || 'N/A'}</span>
                    </p>
                    <p>
                      <span className="text-neutral-500 font-semibold">Address:</span>{' '}
                      <span>{submitSuccess?.proposerAddress || formData.proposer.address || 'N/A'}</span>
                    </p>
                  </div>
                  {(submitSuccess?.proposerPhoto || formData.proposer.photo) && (
                    <img
                      src={submitSuccess?.proposerPhoto || formData.proposer.photo}
                      alt="Proposer"
                      className="w-14 h-16 object-cover rounded border border-neutral-300 shrink-0"
                    />
                  )}
                </div>
              </div>

              {/* Seconder */}
              <div className="p-2.5 rounded bg-neutral-50 border border-neutral-200">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase text-neutral-500 block">
                      Seconder Particulars:
                    </span>
                    <p>
                      <span className="text-neutral-500 font-semibold">Name:</span>{' '}
                      <strong className="text-neutral-900">
                        {submitSuccess?.seconderName || formData.seconder.fullName || 'N/A'}
                      </strong>
                    </p>
                    <p>
                      <span className="text-neutral-500 font-semibold">Mem No:</span>{' '}
                      <strong className="font-mono text-neutral-900">
                        {submitSuccess?.seconderMembership || formData.seconder.membershipNo || 'N/A'}
                      </strong>
                    </p>
                    <p>
                      <span className="text-neutral-500 font-semibold">Mobile:</span>{' '}
                      <span>{submitSuccess?.seconderMobile || formData.seconder.mobile || 'N/A'}</span>
                    </p>
                    <p>
                      <span className="text-neutral-500 font-semibold">Address:</span>{' '}
                      <span>{submitSuccess?.seconderAddress || formData.seconder.address || 'N/A'}</span>
                    </p>
                  </div>
                  {(submitSuccess?.seconderPhoto || formData.seconder.photo) && (
                    <img
                      src={submitSuccess?.seconderPhoto || formData.seconder.photo}
                      alt="Seconder"
                      className="w-14 h-16 object-cover rounded border border-neutral-300 shrink-0"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Declaration & Scrutiny Signatures */}
          <div>
            <div className="p-2 bg-neutral-50 border border-neutral-200 rounded text-[9.5px] text-neutral-700 italic leading-tight">
              <strong>Declaration:</strong> &ldquo;I hereby declare that the information provided in this nomination form is true and correct to the best of my knowledge. I am eligible to contest for the selected post as per the election rules and constitution of GCAAA. I agree to abide by the decision of the Election Returning Officer.&rdquo;
            </div>
            <div className="grid grid-cols-2 gap-6 pt-4 text-[10px] items-end">
              <div>
                {submitSuccess?.candidateSignature || formData.candidate.signature ? (
                  <div className="h-10 flex items-end pb-1 border-b border-neutral-400">
                    <img
                      src={submitSuccess?.candidateSignature || formData.candidate.signature}
                      alt="Candidate Signature"
                      className="max-h-9 max-w-[140px] object-contain"
                    />
                  </div>
                ) : (
                  <div className="border-b border-neutral-400 pb-1 font-serif italic text-xs font-bold text-neutral-900">
                    {submitSuccess?.candidateName || formData.candidate.fullName}
                  </div>
                )}
                <span className="text-[9px] font-bold text-neutral-500 uppercase mt-0.5 block">
                  Digital Signature of Candidate
                </span>
              </div>
              <div className="text-right">
                <div className="border-b border-neutral-400 pb-1 text-[11px] font-bold text-neutral-800">
                  Returning Officer (Scrutiny &amp; Seal)
                </div>
                <span className="text-[9px] font-bold text-neutral-500 uppercase mt-0.5 block">
                  For GCAAA Election Committee 2026–2028
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-neutral-300 text-center text-[8.5px] text-neutral-500 leading-tight">
            <p>Note: This is an official computer-generated nomination submission receipt. Nomination validity is subject to final voter roll scrutiny.</p>
            <p className="font-semibold text-neutral-700 mt-0.5">
              Govt. College of Architecture Alumni Association • FOAP-AKTU Campus, Lucknow • Ph: +91 98392 70036 • gcaaa07@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* SCREEN VIEW */}
      <div className="print:hidden">
        {/* Toast Notification */}
        {toastMessage && (
        <div className="fixed top-20 right-5 z-50 max-w-md animate-in slide-in-from-top-3">
          <div
            className={`p-4 rounded-xl shadow-2xl flex items-center gap-3 border backdrop-blur-md ${
              toastMessage.type === 'error'
                ? 'bg-red-950/95 text-red-100 border-red-700/80'
                : toastMessage.type === 'info'
                ? 'bg-blue-950/95 text-blue-100 border-blue-700/80'
                : 'bg-emerald-950/95 text-emerald-100 border-emerald-700/80'
            }`}
          >
            {toastMessage.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            <p className="text-xs sm:text-sm font-medium">{toastMessage.text}</p>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-auto text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          1. SLEEK MINIMAL HERO BANNER (No buttons, exactly like reference)
      ======================================================== */}
      <section className="relative overflow-hidden py-12 sm:py-16 flex items-center justify-center border-b border-neutral-300">
        {/* Background Campus Image */}
        <img
          src={buildingHeroImg}
          alt="Government College of Architecture"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />

        {/* Content: Title & Breadcrumb Only */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 text-center text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase font-serif drop-shadow-md">
            Election Nomination
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-neutral-300 mt-2 font-semibold">
            <Link to="/" className="hover:text-red-400 transition-colors">
              HOME
            </Link>
            <span className="text-red-500 font-bold">—</span>
            <span className="text-amber-400">ELECTION NOMINATION</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. MAIN FORM CONTAINER (Exact Navbar Width: max-w-[1400px])
      ======================================================== */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 mt-6 sm:mt-8">
        {/* Top Dark Banner Card (Matching Reference Image) */}
        <div className="relative overflow-hidden rounded-2xl bg-neutral-900 text-white p-5 sm:p-6 mb-6 shadow-md border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Gavel className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-400 block font-serif">
                GOVERNMENT COLLEGE OF ARCHITECTURE ALUMNI ASSOCIATION
              </span>
              <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white font-serif mt-0.5">
                Election Nomination Form
              </h2>
              <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
                Executive Body Election 2026 – 2028 · Please provide accurate candidate, proposer and
                seconder information along with required supporting documents.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setShowSchedule((prev) => !prev)}
              className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <CalendarDays className="w-4 h-4" />
              <span>{showSchedule ? 'Hide Election Schedule' : 'View Election Schedule & Notice'}</span>
            </button>
            <img src={logoImg} alt="GCAAA Logo" className="hidden lg:block h-12 w-auto object-contain opacity-90" />
          </div>
        </div>

        {/* Official Election Notice & Schedule Accordion */}
        {showSchedule && (
          <div className="mb-6 bg-white rounded-2xl border-2 border-amber-500/40 shadow-md p-5 sm:p-7 overflow-hidden transition-all animate-in fade-in">
            <div className="text-center max-w-3xl mx-auto mb-6">
              <span className="text-xs font-bold tracking-widest text-[#142A4A] uppercase block">
                GCAAA Official Notification
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#142A4A] tracking-tight uppercase mt-0.5">
                Election Notice & Schedule
              </h3>
              <p className="text-xs font-bold tracking-wider text-[#C4973B] uppercase mt-1">
                Election Committee &bull; 2026
              </p>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                The Election Committee hereby announces the schedule for the GCAAA Elections 2026. All members are requested to participate actively and uphold the spirit of fairness, mutual respect and unity throughout the election process.
              </p>
            </div>

            {/* Schedule Table */}
            <div className="overflow-x-auto max-w-3xl mx-auto rounded-xl border border-neutral-300 shadow-2xs mb-6">
              <table className="w-full text-xs sm:text-sm border-collapse text-left">
                <thead>
                  <tr className="bg-[#142A4A] text-white">
                    <th className="py-2.5 px-3 sm:px-4 font-bold border-r border-[#233e66] w-2/5">
                      Date / Timeline
                    </th>
                    <th className="py-2.5 px-3 sm:px-4 font-bold">
                      Election Event & Activity
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr className="bg-white hover:bg-neutral-50">
                    <td className="py-2.5 px-3 sm:px-4 font-bold text-neutral-900 border-r border-neutral-200">21 October 2026</td>
                    <td className="py-2.5 px-3 sm:px-4 text-neutral-800">Declaration of Election</td>
                  </tr>
                  <tr className="bg-[#F8FAFC] hover:bg-neutral-50">
                    <td className="py-2.5 px-3 sm:px-4 font-bold text-neutral-900 border-r border-neutral-200">22&ndash;25 October 2026</td>
                    <td className="py-2.5 px-3 sm:px-4 text-neutral-800 font-semibold text-[#8B0000]">Filing of Nominations (4 days)</td>
                  </tr>
                  <tr className="bg-white hover:bg-neutral-50">
                    <td className="py-2.5 px-3 sm:px-4 font-bold text-neutral-900 border-r border-neutral-200">26&ndash;27 October 2026</td>
                    <td className="py-2.5 px-3 sm:px-4 text-neutral-800">Withdrawal of Nominations (2 days)</td>
                  </tr>
                  <tr className="bg-[#F8FAFC] hover:bg-neutral-50">
                    <td className="py-2.5 px-3 sm:px-4 font-bold text-neutral-900 border-r border-neutral-200">28 October 2026</td>
                    <td className="py-2.5 px-3 sm:px-4 text-neutral-800">Declaration of Final Candidate List</td>
                  </tr>
                  <tr className="bg-white hover:bg-neutral-50">
                    <td className="py-2.5 px-3 sm:px-4 font-bold text-neutral-900 border-r border-neutral-200">29&ndash;31 October 2026</td>
                    <td className="py-2.5 px-3 sm:px-4 text-neutral-800">Canvassing (3 days)</td>
                  </tr>
                  <tr className="bg-[#F8FAFC] hover:bg-neutral-50">
                    <td className="py-2.5 px-3 sm:px-4 font-bold text-neutral-900 border-r border-neutral-200">1 November 2026</td>
                    <td className="py-2.5 px-3 sm:px-4 text-neutral-800 font-bold text-emerald-800">Voting</td>
                  </tr>
                  <tr className="bg-white hover:bg-neutral-50">
                    <td className="py-2.5 px-3 sm:px-4 font-bold text-neutral-900 border-r border-neutral-200">2 November 2026</td>
                    <td className="py-2.5 px-3 sm:px-4 text-neutral-800">Counting of Votes and Declaration of Results</td>
                  </tr>
                  <tr className="bg-[#F8FAFC] hover:bg-neutral-50">
                    <td className="py-2.5 px-3 sm:px-4 font-bold text-neutral-900 border-r border-neutral-200">5 November 2026</td>
                    <td className="py-2.5 px-3 sm:px-4 text-neutral-800">First AGM of the Newly Elected Executive Body</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Code of Conduct */}
            <div className="max-w-3xl mx-auto bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C4973B] block mb-1">
                Code of Conduct
              </span>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Members are requested to refrain from campaigning on the official GCAAA community group. All election-related activities should be conducted in a healthy, cordial and respectful environment. Let us preserve the harmony, dignity and integrity of our association and ensure a fair and transparent election process.
              </p>
              <p className="text-xs font-bold text-[#142A4A] mt-2">
                Your participation and cooperation are sincerely appreciated.
              </p>
              <span className="text-[11px] text-neutral-500 font-medium block mt-0.5">
                By Order of the Election Committee, GCAAA
              </span>
            </div>
          </div>
        )}

        {/* Main Form Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ========================================================
              CARD 01: ELECTION DETAILS
          ======================================================== */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200/90 p-5 sm:p-7 space-y-5">
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-3">
              <span className="w-8 h-8 rounded-lg bg-neutral-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                01
              </span>
              <div>
                <h3 className="font-bold text-neutral-900 text-base">Election Details</h3>
                <p className="text-xs text-neutral-500">
                  Select the post and view candidate eligibility guidelines
                </p>
              </div>
            </div>

            {/* Post Applied For */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-1">
                Post Applied For <span className="text-red-600 font-black">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.post}
                  onChange={(e) => handleInputChange('root', 'post', e.target.value)}
                  className={`w-full px-3.5 py-2.5 bg-neutral-50 rounded-lg border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white appearance-none pr-10 ${
                    fieldErrors['post'] ? 'border-red-500 bg-red-50/50' : 'border-neutral-300'
                  }`}
                >
                  <option value="">-- Select Post --</option>
                  {ELECTION_POSTS.map((item) => (
                    <option key={item.post} value={item.post}>
                      {item.post} ({item.seats}) — {item.eligibility}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-neutral-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {fieldErrors['post'] && (
                <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {fieldErrors['post']}
                </p>
              )}
            </div>

            {selectedPostObj && (
              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Eligibility Requirement for {selectedPostObj.post}:</strong>{' '}
                  {selectedPostObj.eligibility}
                </span>
              </div>
            )}
          </div>

          {/* ========================================================
              CARD 02: CANDIDATE DETAILS
          ======================================================== */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200/90 p-5 sm:p-7 space-y-5">
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-3">
              <span className="w-8 h-8 rounded-lg bg-neutral-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                02
              </span>
              <div>
                <h3 className="font-bold text-neutral-900 text-base">Candidate Details</h3>
                <p className="text-xs text-neutral-500">
                  Enter candidate's official registration and contact details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Columns: Text Inputs */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-1">
                      Candidate Name <span className="text-red-600 font-black">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={formData.candidate.fullName}
                      onChange={(e) => handleInputChange('candidate', 'fullName', e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-neutral-50 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white ${
                        fieldErrors['candidate.fullName']
                          ? 'border-red-500 bg-red-50/50'
                          : 'border-neutral-300'
                      }`}
                    />
                    {fieldErrors['candidate.fullName'] && (
                      <p className="text-xs text-red-600 font-semibold mt-1">
                        {fieldErrors['candidate.fullName']}
                      </p>
                    )}
                  </div>

                  {/* Membership Number */}
                  {renderMembershipInput('candidate', 'GCAAA Membership No.')}

                  {/* Mobile No. */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-1">
                      Mobile No. <span className="text-red-600 font-black">*</span>
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={formData.candidate.mobile}
                      onChange={(e) =>
                        handleInputChange(
                          'candidate',
                          'mobile',
                          e.target.value.replace(/\D/g, '')
                        )
                      }
                      className={`w-full px-3.5 py-2.5 bg-neutral-50 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white ${
                        fieldErrors['candidate.mobile']
                          ? 'border-red-500 bg-red-50/50'
                          : 'border-neutral-300'
                      }`}
                    />
                    {fieldErrors['candidate.mobile'] && (
                      <p className="text-xs text-red-600 font-semibold mt-1">
                        {fieldErrors['candidate.mobile']}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-1">
                      Email Address <span className="text-red-600 font-black">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={formData.candidate.email}
                      onChange={(e) => handleInputChange('candidate', 'email', e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-neutral-50 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white ${
                        fieldErrors['candidate.email']
                          ? 'border-red-500 bg-red-50/50'
                          : 'border-neutral-300'
                      }`}
                    />
                    {fieldErrors['candidate.email'] && (
                      <p className="text-xs text-red-600 font-semibold mt-1">
                        {fieldErrors['candidate.email']}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-1">
                      Complete Address <span className="text-red-600 font-black">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full address"
                      value={formData.candidate.address}
                      onChange={(e) => handleInputChange('candidate', 'address', e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-neutral-50 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white ${
                        fieldErrors['candidate.address']
                          ? 'border-red-500 bg-red-50/50'
                          : 'border-neutral-300'
                      }`}
                    />
                    {fieldErrors['candidate.address'] && (
                      <p className="text-xs text-red-600 font-semibold mt-1">
                        {fieldErrors['candidate.address']}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Columns: Candidate Photograph & Candidate Signature */}
              <div className="lg:col-span-5 xl:col-span-4 grid grid-cols-2 gap-3 sm:gap-4 justify-items-center w-full">
                {/* 1. Candidate Photograph */}
                <div className="flex flex-col items-center justify-center w-full max-w-[160px]">
                  <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-2 text-center whitespace-nowrap">
                    Photograph <span className="text-red-600 font-black">*</span>
                  </label>
                  <div
                    className={`relative w-full h-40 sm:h-44 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-2 text-center transition-all ${
                      fieldErrors['candidate.photo']
                        ? 'border-red-500 bg-red-50/40'
                        : 'border-neutral-300 bg-neutral-50 hover:bg-neutral-100 hover:border-red-400'
                    }`}
                  >
                    {formData.candidate.photo ? (
                      <div className="relative w-full h-full group">
                        <img
                          src={formData.candidate.photo}
                          alt="Candidate preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                          <label className="cursor-pointer bg-white text-neutral-900 text-[11px] font-bold py-1 px-2.5 rounded shadow hover:bg-neutral-100">
                            Change
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              className="hidden"
                              onChange={(e) => handleFileUpload('candidate', 'photo', e)}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => removeFile('candidate', 'photo')}
                            className="bg-red-600 text-white text-[11px] font-bold py-1 px-2.5 rounded shadow hover:bg-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                        <div className="relative mb-1.5">
                          <div className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500">
                            <Camera className="w-4 h-4" />
                          </div>
                          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-600 text-white flex items-center justify-center text-[9px] font-bold">
                            +
                          </span>
                        </div>
                        <span className="text-xs font-bold text-neutral-800">Upload Photo</span>
                        <span className="text-[10px] text-neutral-500 mt-0.5">JPG, PNG</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="hidden"
                          onChange={(e) => handleFileUpload('candidate', 'photo', e)}
                        />
                      </label>
                    )}
                  </div>
                  {fieldErrors['candidate.photo'] && (
                    <p className="text-xs text-red-600 font-semibold mt-1 text-center">
                      {fieldErrors['candidate.photo']}
                    </p>
                  )}
                </div>

                {/* 2. Candidate Signature */}
                <div className="flex flex-col items-center justify-center w-full max-w-[160px]">
                  <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-2 text-center whitespace-nowrap">
                    Upload Signature <span className="text-red-600 font-black">*</span>
                  </label>
                  <div
                    className={`relative w-full h-40 sm:h-44 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-2 text-center transition-all ${
                      fieldErrors['candidate.signature']
                        ? 'border-red-500 bg-red-50/40'
                        : 'border-neutral-300 bg-neutral-50 hover:bg-neutral-100 hover:border-red-400'
                    }`}
                  >
                    {formData.candidate.signature ? (
                      <div className="relative w-full h-full group">
                        <img
                          src={formData.candidate.signature}
                          alt="Candidate signature preview"
                          className="w-full h-full object-contain bg-white rounded-lg p-1"
                        />
                        <div className="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                          <label className="cursor-pointer bg-white text-neutral-900 text-[11px] font-bold py-1 px-2.5 rounded shadow hover:bg-neutral-100">
                            Change
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              className="hidden"
                              onChange={(e) => handleFileUpload('candidate', 'signature', e)}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => removeFile('candidate', 'signature')}
                            className="bg-red-600 text-white text-[11px] font-bold py-1 px-2.5 rounded shadow hover:bg-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                        <div className="relative mb-1.5">
                          <div className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500">
                            <FileSignature className="w-4 h-4 text-neutral-600" />
                          </div>
                          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#1A365D] text-white flex items-center justify-center text-[9px] font-bold">
                            +
                          </span>
                        </div>
                        <span className="text-xs font-bold text-neutral-800">Upload Signature</span>
                        <span className="text-[10px] text-neutral-500 mt-0.5">JPG, PNG</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="hidden"
                          onChange={(e) => handleFileUpload('candidate', 'signature', e)}
                        />
                      </label>
                    )}
                  </div>
                  {fieldErrors['candidate.signature'] && (
                    <p className="text-xs text-red-600 font-semibold mt-1 text-center">
                      {fieldErrors['candidate.signature']}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              CARD 03: PROPOSER DETAILS
          ======================================================== */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200/90 p-5 sm:p-7 space-y-5">
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-3">
              <span className="w-8 h-8 rounded-lg bg-neutral-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                03
              </span>
              <div>
                <h3 className="font-bold text-neutral-900 text-base">Proposer Details</h3>
                <p className="text-xs text-neutral-500">
                  Enter proposer's official registration and contact details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              <div className="lg:col-span-3 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-1">
                      Proposer Name <span className="text-red-600 font-black">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={formData.proposer.fullName}
                      onChange={(e) => handleInputChange('proposer', 'fullName', e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-neutral-50 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white ${
                        fieldErrors['proposer.fullName']
                          ? 'border-red-500 bg-red-50/50'
                          : 'border-neutral-300'
                      }`}
                    />
                    {fieldErrors['proposer.fullName'] && (
                      <p className="text-xs text-red-600 font-semibold mt-1">
                        {fieldErrors['proposer.fullName']}
                      </p>
                    )}
                  </div>

                  {/* Membership Number */}
                  {renderMembershipInput('proposer', 'GCAAA Membership No.')}

                  {/* Mobile No. */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-1">
                      Mobile No. <span className="text-red-600 font-black">*</span>
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={formData.proposer.mobile}
                      onChange={(e) =>
                        handleInputChange(
                          'proposer',
                          'mobile',
                          e.target.value.replace(/\D/g, '')
                        )
                      }
                      className={`w-full px-3.5 py-2.5 bg-neutral-50 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white ${
                        fieldErrors['proposer.mobile']
                          ? 'border-red-500 bg-red-50/50'
                          : 'border-neutral-300'
                      }`}
                    />
                    {fieldErrors['proposer.mobile'] && (
                      <p className="text-xs text-red-600 font-semibold mt-1">
                        {fieldErrors['proposer.mobile']}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-1">
                      Email Address <span className="text-neutral-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={formData.proposer.email}
                      onChange={(e) => handleInputChange('proposer', 'email', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 rounded-lg border border-neutral-300 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-1">
                      Complete Address <span className="text-red-600 font-black">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full address"
                      value={formData.proposer.address}
                      onChange={(e) => handleInputChange('proposer', 'address', e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-neutral-50 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white ${
                        fieldErrors['proposer.address']
                          ? 'border-red-500 bg-red-50/50'
                          : 'border-neutral-300'
                      }`}
                    />
                    {fieldErrors['proposer.address'] && (
                      <p className="text-xs text-red-600 font-semibold mt-1">
                        {fieldErrors['proposer.address']}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Proposer Photograph Upload */}
              <div className="flex flex-col items-center justify-center">
                <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-2">
                  Upload Signature <span className="text-red-600 font-black">*</span>
                </label>
                <div
                  className={`relative w-40 h-44 sm:w-44 sm:h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-2 text-center transition-all ${
                    fieldErrors['proposer.photo']
                      ? 'border-red-500 bg-red-50/40'
                      : 'border-neutral-300 bg-neutral-50 hover:bg-neutral-100'
                  }`}
                >
                  {formData.proposer.photo ? (
                    <div className="relative w-full h-full group">
                      <img
                        src={formData.proposer.photo}
                        alt="Proposer preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                        <label className="cursor-pointer bg-white text-neutral-900 text-xs font-bold py-1 px-3 rounded shadow hover:bg-neutral-100">
                          Change
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={(e) => handlePhotoUpload('proposer', e)}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => removePhoto('proposer')}
                          className="bg-red-600 text-white text-xs font-bold py-1 px-3 rounded shadow hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                      <div className="relative mb-2">
                        <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500">
                          <Camera className="w-5 h-5" />
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold">
                          +
                        </span>
                      </div>
                      <span className="text-xs font-bold text-neutral-800">Upload Signature</span>
                      <span className="text-[10px] text-neutral-500 mt-0.5">JPG, PNG</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload('proposer', e)}
                      />
                    </label>
                  )}
                </div>
                {fieldErrors['proposer.photo'] && (
                  <p className="text-xs text-red-600 font-semibold mt-1 text-center">
                    {fieldErrors['proposer.photo']}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ========================================================
              CARD 04: SECONDER DETAILS
          ======================================================== */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200/90 p-5 sm:p-7 space-y-5">
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-3">
              <span className="w-8 h-8 rounded-lg bg-neutral-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                04
              </span>
              <div>
                <h3 className="font-bold text-neutral-900 text-base">Seconder Details</h3>
                <p className="text-xs text-neutral-500">
                  Enter seconder's official registration and contact details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              <div className="lg:col-span-3 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-1">
                      Seconder Name <span className="text-red-600 font-black">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={formData.seconder.fullName}
                      onChange={(e) => handleInputChange('seconder', 'fullName', e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-neutral-50 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white ${
                        fieldErrors['seconder.fullName']
                          ? 'border-red-500 bg-red-50/50'
                          : 'border-neutral-300'
                      }`}
                    />
                    {fieldErrors['seconder.fullName'] && (
                      <p className="text-xs text-red-600 font-semibold mt-1">
                        {fieldErrors['seconder.fullName']}
                      </p>
                    )}
                  </div>

                  {/* Membership Number */}
                  {renderMembershipInput('seconder', 'GCAAA Membership No.')}

                  {/* Mobile No. */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-1">
                      Mobile No. <span className="text-red-600 font-black">*</span>
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={formData.seconder.mobile}
                      onChange={(e) =>
                        handleInputChange(
                          'seconder',
                          'mobile',
                          e.target.value.replace(/\D/g, '')
                        )
                      }
                      className={`w-full px-3.5 py-2.5 bg-neutral-50 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white ${
                        fieldErrors['seconder.mobile']
                          ? 'border-red-500 bg-red-50/50'
                          : 'border-neutral-300'
                      }`}
                    />
                    {fieldErrors['seconder.mobile'] && (
                      <p className="text-xs text-red-600 font-semibold mt-1">
                        {fieldErrors['seconder.mobile']}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-1">
                      Email Address <span className="text-neutral-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={formData.seconder.email}
                      onChange={(e) => handleInputChange('seconder', 'email', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 rounded-lg border border-neutral-300 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-1">
                      Complete Address <span className="text-red-600 font-black">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full address"
                      value={formData.seconder.address}
                      onChange={(e) => handleInputChange('seconder', 'address', e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-neutral-50 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white ${
                        fieldErrors['seconder.address']
                          ? 'border-red-500 bg-red-50/50'
                          : 'border-neutral-300'
                      }`}
                    />
                    {fieldErrors['seconder.address'] && (
                      <p className="text-xs text-red-600 font-semibold mt-1">
                        {fieldErrors['seconder.address']}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Seconder Photograph Upload */}
              <div className="flex flex-col items-center justify-center">
                <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-2">
                  Upload Signature <span className="text-red-600 font-black">*</span>
                </label>
                <div
                  className={`relative w-40 h-44 sm:w-44 sm:h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-2 text-center transition-all ${
                    fieldErrors['seconder.photo']
                      ? 'border-red-500 bg-red-50/40'
                      : 'border-neutral-300 bg-neutral-50 hover:bg-neutral-100'
                  }`}
                >
                  {formData.seconder.photo ? (
                    <div className="relative w-full h-full group">
                      <img
                        src={formData.seconder.photo}
                        alt="Seconder preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                        <label className="cursor-pointer bg-white text-neutral-900 text-xs font-bold py-1 px-3 rounded shadow hover:bg-neutral-100">
                          Change
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={(e) => handlePhotoUpload('seconder', e)}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => removePhoto('seconder')}
                          className="bg-red-600 text-white text-xs font-bold py-1 px-3 rounded shadow hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                      <div className="relative mb-2">
                        <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500">
                          <Camera className="w-5 h-5" />
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold">
                          +
                        </span>
                      </div>
                      <span className="text-xs font-bold text-neutral-800">Upload Signature</span>
                      <span className="text-[10px] text-neutral-500 mt-0.5">JPG, PNG</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload('seconder', e)}
                      />
                    </label>
                  )}
                </div>
                {fieldErrors['seconder.photo'] && (
                  <p className="text-xs text-red-600 font-semibold mt-1 text-center">
                    {fieldErrors['seconder.photo']}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ========================================================
              CARD 05: DECLARATION & SUBMISSION
              (Know Your GCAAA Number button placed ONLY HERE as requested)
          ======================================================== */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200/90 p-5 sm:p-7 space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-3">
              <span className="w-8 h-8 rounded-lg bg-neutral-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                05
              </span>
              <div>
                <h3 className="font-bold text-neutral-900 text-base">Declaration &amp; Submission</h3>
                <p className="text-xs text-neutral-500">
                  Review terms and submit official election nomination
                </p>
              </div>
            </div>

            {/* Declaration Checkbox */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                fieldErrors['declarationAgreed']
                  ? 'border-red-500 bg-red-50/50'
                  : 'border-neutral-200 bg-neutral-50'
              }`}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.declarationAgreed}
                  onChange={(e) =>
                    handleInputChange('root', 'declarationAgreed', e.target.checked)
                  }
                  className="mt-1 w-4 h-4 text-red-600 border-neutral-300 rounded focus:ring-red-600 cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
                  I hereby declare that the information provided in this form is true and correct to the
                  best of my knowledge. I am eligible to contest for the selected post as per the election
                  rules of GCAAA.
                </span>
              </label>
              {fieldErrors['declarationAgreed'] && (
                <p className="text-xs text-red-600 font-semibold mt-2 pl-7 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {fieldErrors['declarationAgreed']}
                </p>
              )}
            </div>

            {/* SINGLE MINIMAL "KNOW YOUR GCAAA NUMBER" BUTTON RIGHT ABOVE SUBMIT */}
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-neutral-600 flex items-center gap-2">
                <Search className="w-4 h-4 text-[#8B0000] shrink-0" />
                <span>
                  Don't know your or your proposer/seconder's GCAAA Membership Number? Look up in the directory.
                </span>
              </div>
              <Link
                to="/registered-members"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-neutral-900 hover:bg-[#8B0000] text-white rounded-lg font-bold text-xs inline-flex items-center gap-1.5 transition-colors shadow-sm shrink-0 cursor-pointer"
              >
                <span>Know Your GCAAA Number</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            {/* Action Buttons: Reset & Submit */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 border border-neutral-300 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Form</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 bg-[#8B0000] hover:bg-red-800 disabled:bg-neutral-400 text-white rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-red-950/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying &amp; Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Nomination</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* ========================================================
          SUCCESS / CONFIRMATION MODAL & RECEIPT
      ======================================================== */}
      {submitSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white text-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="bg-[#8B0000] text-white p-5 text-center relative shrink-0">
              <button
                onClick={() => setSubmitSuccess(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 border border-white/20">
                <CheckCircle2 className="w-7 h-7 text-emerald-300" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">
                Nomination Submitted Successfully!
              </h3>
              <p className="text-xs text-amber-200 font-medium mt-0.5">
                GCAAA Executive Body Election 2026 – 2028
              </p>
            </div>

            {/* Printable Receipt Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between p-3.5 bg-neutral-100 rounded-xl border border-neutral-200 gap-2">
                <div>
                  <span className="text-[11px] text-neutral-500 uppercase tracking-wider block font-semibold">
                    Nomination Reference ID
                  </span>
                  <span className="text-base sm:text-lg font-black text-[#8B0000] font-mono tracking-wider">
                    {submitSuccess.nominationId}
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[11px] text-neutral-500 uppercase tracking-wider block font-semibold">
                    Submission Timestamp
                  </span>
                  <span className="font-semibold text-neutral-800">
                    {submitSuccess.submittedAt}
                  </span>
                </div>
              </div>

              {/* Candidate Info Summary */}
              <div className="border border-neutral-200 rounded-xl p-4 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#8B0000] flex items-center gap-1.5 border-b pb-2">
                  <User className="w-4 h-4" />
                  Candidate Particulars
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-neutral-500 block text-[11px]">Post Applied For:</span>
                    <strong className="text-neutral-900">{submitSuccess.post}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[11px]">Full Name:</span>
                    <strong className="text-neutral-900">{submitSuccess.candidateName}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[11px]">GCAAA Membership No:</span>
                    <strong className="font-mono text-neutral-900">
                      {submitSuccess.candidateMembership}
                    </strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[11px]">Mobile / Email:</span>
                    <span className="text-neutral-800">
                      {submitSuccess.candidateMobile} · {submitSuccess.candidateEmail}
                    </span>
                  </div>
                </div>
              </div>

              {/* Endorsements Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-neutral-200 rounded-xl p-3.5 space-y-1">
                  <h5 className="font-bold text-[11px] uppercase tracking-wider text-neutral-600">
                    Proposer
                  </h5>
                  <p className="font-bold text-neutral-900">{submitSuccess.proposerName}</p>
                  <p className="text-neutral-600 font-mono text-[11px]">
                    Mem: {submitSuccess.proposerMembership}
                  </p>
                </div>
                <div className="border border-neutral-200 rounded-xl p-3.5 space-y-1">
                  <h5 className="font-bold text-[11px] uppercase tracking-wider text-neutral-600">
                    Seconder
                  </h5>
                  <p className="font-bold text-neutral-900">{submitSuccess.seconderName}</p>
                  <p className="text-neutral-600 font-mono text-[11px]">
                    Mem: {submitSuccess.seconderMembership}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs">
                <p className="font-bold flex items-center gap-1.5 mb-0.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  Official Note:
                </p>
                <p>
                  Your nomination has been recorded. The Election Returning Officer will verify
                  the lifetime membership status and residential proofs before publishing the final
                  valid nominations list.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto px-4 py-2 border border-neutral-300 hover:bg-neutral-100 rounded-lg font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save Receipt</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSubmitSuccess(null);
                  setFormData(INITIAL_FORM_STATE);
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#8B0000] hover:bg-red-800 text-white rounded-lg font-bold text-xs uppercase tracking-wider shadow cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
