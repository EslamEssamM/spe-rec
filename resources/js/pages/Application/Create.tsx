import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Form } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Sparkles, Clock, Users, CheckCircle, ChevronDown, BookOpen, Briefcase, Award, FileText, Upload, UserCheck, TrendingUp, Share2, Camera, Target, Edit3, Palette, Globe, Calendar, Gamepad2, Truck, Zap, GraduationCap, BarChart3, Building2, Smartphone, Code } from 'lucide-react';

type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
  completedSteps?: number[];
  errorSteps?: number[];
};

// Utility function to scroll to top smoothly
const scrollToTop = (behavior: ScrollBehavior = 'smooth') => {
  window.scrollTo({ top: 0, behavior });
};

// Form step components (inline for enhanced UI)
const StepIndicator = ({ currentStep, totalSteps, onStepClick, completedSteps = [], errorSteps = [] }: StepIndicatorProps) => (
  <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-8 overflow-x-auto pb-2 px-2">
    {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
      const isActive = step === currentStep;
      const isCompleted = completedSteps.includes(step) || step < currentStep;
      const isClickable = step < currentStep || completedSteps.includes(step);
      const hasError = errorSteps.includes(step);

      return (
        <div key={step} className="flex items-center flex-shrink-0">
          <button
            type="button"
            onClick={() => isClickable && onStepClick && onStepClick(step)}
            disabled={!isClickable && !isActive}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold transition-all duration-300 ${
              hasError
                ? 'bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg animate-pulse'
                : isActive
                ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg transform scale-110'
                : isCompleted
                ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white hover:shadow-md hover:scale-105'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            } ${
              !isClickable && !isActive ? 'pointer-events-none opacity-60' : ''
            }`}
          >
            {hasError ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : isCompleted && !isActive ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> : step}
          </button>
          {step < totalSteps && (
            <div
              className={`w-4 sm:w-8 h-0.5 mx-1 sm:mx-2 transition-colors duration-300 flex-shrink-0 ${
                hasError ? 'bg-red-500' : isCompleted ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          )}
        </div>
      );
    })}
  </div>
);

interface FormData {
  full_name: string;
  email: string;
  mobile: string;
  facebook_link: string;
  personal_photo: File | null;
  university: string;
  faculty: string;
  department: string;
  academic_year: string;
  previous_experience: string;
  why_applying: string;
  how_benefit: string;
  committee_choices: string[];
  why_committee: string;
  committee_responsibilities: string;
  open_space: string;
}

interface Committee {
  id: number;
  name: string;
  description: string;
  responsibilities: string;
  is_open: boolean;
}

interface ApplicationFormProps {
  committees: Committee[];
  academicYears: Record<string, string>;
  formInstructions: {
    section1: {
      title: string;
      subtitle: string;
      tips: string[];
      note: string;
      contact: string;
    };
  };
}

type FormSectionProps = {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  errors: Record<string, string>;
  committees?: Committee[];
};

const fieldLabels: Record<keyof FormData, string> = {
  full_name: 'Full Name',
  email: 'Email',
  mobile: 'Mobile Number',
  facebook_link: 'Facebook Account Link',
  personal_photo: 'Personal Photo',
  university: 'University',
  faculty: 'Faculty',
  department: 'Department',
  academic_year: 'Academic Year',
  previous_experience: 'Previous Experience',
  why_applying: 'Application Motivation',
  how_benefit: 'Expected Benefit',
  committee_choices: 'Committee Selection',
  why_committee: 'Committee Motivation',
  committee_responsibilities: 'Committee Responsibilities',
  open_space: 'Open Space',
};

const PersonalInfo = ({ formData, setFormData, errors }: FormSectionProps) => {
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, personal_photo: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, personal_photo: null }));
    setPhotoPreview(null);
  };

  return (
    <div className="space-y-6">
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
        <input
          type="text"
        name="full_name"
        value={formData.full_name || ''}
        onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
        className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 group-hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 ${
          errors.full_name ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500 bg-white'
        }`}
        placeholder="Enter your full name"
      />
      {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>}
    </div>

    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail (Preferred Gmail) *</label>
      <input
        type="email"
        name="email"
        value={formData.email || ''}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 group-hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 ${
          errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500 bg-white'
        }`}
        placeholder="your.name@gmail.com"
      />
      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
    </div>

    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number: *</label>
      <input
        type="tel"
        name="mobile"
        value={formData.mobile || ''}
        onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
        className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 group-hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 ${
          errors.mobile ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500 bg-white'
        }`}
        placeholder="+20 1XX XXX XXXX"
      />
      {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
    </div>

    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Facebook Account Link *</label>
      <input
        type="url"
        name="facebook_link"
        value={formData.facebook_link || ''}
        onChange={(e) => setFormData(prev => ({ ...prev, facebook_link: e.target.value }))}
        className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 group-hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 ${
          errors.facebook_link ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500 bg-white'
        }`}
        placeholder="https://facebook.com/your.profile"
      />
      {errors.facebook_link && <p className="mt-1 text-sm text-red-600">{errors.facebook_link}</p>}
    </div>

    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Personal Photo *</label>
      <div className="space-y-4">
        {photoPreview ? (
          <div className="relative inline-block">
            <img
              src={photoPreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-xl border-2 border-gray-300 shadow-md"
            />
            <button
              type="button"
              onClick={removePhoto}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <label
            className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
              errors.personal_photo
                ? 'border-red-300 bg-red-50 hover:bg-red-100'
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-blue-400'
            }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mb-2 text-sm text-gray-700 font-medium">
                <span className="text-blue-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 2MB)</p>
            </div>
            <input
              type="file"
              name="personal_photo_input"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        )}
      </div>
      {errors.personal_photo && <p className="mt-1 text-sm text-red-600">{errors.personal_photo}</p>}
      <p className="mt-1 text-xs text-gray-500">Upload a clear, recent photo of yourself</p>
    </div>
  </div>
  );
};

const EducationInfo = ({ formData, setFormData, errors }: FormSectionProps) => (
  <div className="space-y-6">
    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-2">University *</label>
      <input
        type="text"
        name="university"
        value={formData.university || ''}
        onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
        className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 group-hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 ${
          errors.university ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500 bg-white'
        }`}
        placeholder="Suez University"
      />
      {errors.university && <p className="mt-1 text-sm text-red-600">{errors.university}</p>}
    </div>

    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Faculty *</label>
      <input
        type="text"
        name="faculty"
        value={formData.faculty || ''}
        onChange={(e) => setFormData(prev => ({ ...prev, faculty: e.target.value }))}
        className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 group-hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 ${
          errors.faculty ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500 bg-white'
        }`}
        placeholder="Faculty of Engineering"
      />
      {errors.faculty && <p className="mt-1 text-sm text-red-600">{errors.faculty}</p>}
    </div>

    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Department *</label>
      <input
        type="text"
        name="department"
        value={formData.department || ''}
        onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
        className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 group-hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 ${
          errors.department ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500 bg-white'
        }`}
        placeholder="Department name"
      />
      {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
    </div>

    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Academic Year *</label>
      <select
        name="academic_year"
        value={formData.academic_year || ''}
        onChange={(e) => setFormData(prev => ({ ...prev, academic_year: e.target.value }))}
        className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 group-hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white ${
          errors.academic_year ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500'
        }`}
      >
        <option value="" className="text-gray-500">Select your academic year</option>
        <option value="preparatory" className="text-gray-900">Preparatory Year (for Engineering Students)</option>
        <option value="first" className="text-gray-900">First Year</option>
        <option value="second" className="text-gray-900">Second Year</option>
        <option value="third" className="text-gray-900">Third Year</option>
        <option value="fourth" className="text-gray-900">Forth Year</option>
      </select>
      {errors.academic_year && <p className="mt-1 text-sm text-red-600">{errors.academic_year}</p>}
    </div>
  </div>
);

const ExperienceInfo = ({ formData, setFormData, errors }: FormSectionProps) => (
  <div className="space-y-6">
    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Do you have previous experience to apply for volunteering work? If you have, please explain it in detail. *</label>
      <textarea
        name="previous_experience"
        rows={4}
        value={formData.previous_experience || ''}
        onChange={(e) => setFormData(prev => ({ ...prev, previous_experience: e.target.value }))}
        className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 group-hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500 ${
          errors.previous_experience ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500 bg-white'
        }`}
        placeholder="Describe your previous volunteering experience in detail..."
      />
      {errors.previous_experience && <p className="mt-1 text-sm text-red-600">{errors.previous_experience}</p>}
    </div>

    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Why are you applying for SPE Suez Student Chapter? *</label>
      <textarea
        name="why_applying"
        rows={4}
        value={formData.why_applying || ''}
        onChange={(e) => setFormData(prev => ({ ...prev, why_applying: e.target.value }))}
        className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 group-hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500 ${
          errors.why_applying ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500 bg-white'
        }`}
        placeholder="Explain why you want to join SPE Suez Student Chapter..."
      />
      {errors.why_applying && <p className="mt-1 text-sm text-red-600">{errors.why_applying}</p>}
    </div>

    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Do you think that you will benefit from joining SPE and how? *</label>
      <textarea
        name="how_benefit"
        rows={4}
        value={formData.how_benefit || ''}
        onChange={(e) => setFormData(prev => ({ ...prev, how_benefit: e.target.value }))}
        className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 group-hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500 ${
          errors.how_benefit ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500 bg-white'
        }`}
        placeholder="Explain how you think you will benefit from joining SPE..."
      />
      {errors.how_benefit && <p className="mt-1 text-sm text-red-600">{errors.how_benefit}</p>}
    </div>
  </div>
);

const SkillsInfo = ({ formData, setFormData, errors, committees = [] }: FormSectionProps) => {
  // Static committee styling configuration
  const committeeStyles = {
    "Human resources Management (HRM)": {
      icon: UserCheck,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      selectedBorder: "border-blue-500",
      selectedBg: "bg-blue-100",
    },
    "Human resources Development (HRD)": {
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      selectedBorder: "border-green-500",
      selectedBg: "bg-green-100",
    },
    "Social Media": {
      icon: Share2,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      selectedBorder: "border-pink-500",
      selectedBg: "bg-pink-100",
    },
    "Multimedia": {
      icon: Camera,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      selectedBorder: "border-purple-500",
      selectedBg: "bg-purple-100",
    },
    "Direct Marketing": {
      icon: Target,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      selectedBorder: "border-red-500",
      selectedBg: "bg-red-100",
    },
    "Magazine Editing": {
      icon: Edit3,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      selectedBorder: "border-indigo-500",
      selectedBg: "bg-indigo-100",
    },
    "Magazine Design": {
      icon: Palette,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      selectedBorder: "border-orange-500",
      selectedBg: "bg-orange-100",
    },
    "International Relations (IR)": {
      icon: Globe,
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      selectedBorder: "border-teal-500",
      selectedBg: "bg-teal-100",
    },
    "Organizing Committee (OC)": {
      icon: Calendar,
      color: "from-violet-500 to-violet-600",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200",
      selectedBorder: "border-violet-500",
      selectedBg: "bg-violet-100",
    },
    "Extracurricular Committee (EC)": {
      icon: Gamepad2,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      selectedBorder: "border-cyan-500",
      selectedBg: "bg-cyan-100",
    },
    "Logistics": {
      icon: Truck,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      selectedBorder: "border-amber-500",
      selectedBg: "bg-amber-100",
    },
    "Energy4me": {
      icon: Zap,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      selectedBorder: "border-yellow-500",
      selectedBg: "bg-yellow-100",
    },
    "Academy": {
      icon: GraduationCap,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      selectedBorder: "border-emerald-500",
      selectedBg: "bg-emerald-100",
    },
    "Data Analysis": {
      icon: BarChart3,
      color: "from-slate-500 to-slate-600",
      bgColor: "bg-slate-50",
      borderColor: "border-slate-200",
      selectedBorder: "border-slate-500",
      selectedBg: "bg-slate-100",
    },
    "Business Development (BD)": {
      icon: Building2,
      color: "from-stone-500 to-stone-600",
      bgColor: "bg-stone-50",
      borderColor: "border-stone-200",
      selectedBorder: "border-stone-500",
      selectedBg: "bg-stone-100",
    },
    "Android": {
      icon: Smartphone,
      color: "from-lime-500 to-lime-600",
      bgColor: "bg-lime-50",
      borderColor: "border-lime-200",
      selectedBorder: "border-lime-500",
      selectedBg: "bg-lime-100",
    },
    "Web Development": {
      icon: Code,
      color: "from-sky-500 to-sky-600",
      bgColor: "bg-sky-50",
      borderColor: "border-sky-200",
      selectedBorder: "border-sky-500",
      selectedBg: "bg-sky-100",
    }
  };

  const handleCommitteeChange = (committee: string) => {
    const currentChoices = formData.committee_choices || [];

    if (currentChoices.includes(committee)) {
      // Remove if already selected
      setFormData(prev => ({
        ...prev,
        committee_choices: currentChoices.filter(choice => choice !== committee)
      }));
    } else {
      // Add if not selected and under limit of 1
      if (currentChoices.length < 1) {
        setFormData(prev => ({
          ...prev,
          committee_choices: [committee]
        }));
      }
    }
  };

  const selectedCount = formData.committee_choices?.length || 0;

  return (
    <div className="space-y-8">
      {/* Committee Selection */}
      <div className="group">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Choose Your Committee</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 px-2">Select the committee that aligns with your interests and skills</p>

          {/* Selection Status */}
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full shadow-sm max-w-full">
            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2 sm:mr-3 animate-pulse flex-shrink-0 ${
              selectedCount === 0 ? 'bg-gray-400' :
              selectedCount === 1 ? 'bg-blue-500' : 'bg-green-500'
            }`}></div>
            <span className={`text-xs sm:text-sm font-medium ${
              selectedCount >= 1 ? 'text-green-700' : 'text-blue-700'
            }`}>
              {selectedCount === 0 && "Please select 1 committee"}
              {selectedCount === 1 && <><span className="hidden sm:inline">1 committee selected (perfect!)</span><span className="sm:hidden">1 selected (perfect!)</span></>}
            </span>
          </div>
        </div>

        {/* Creative Committee Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {committees.map((committee) => {
            const isSelected = formData.committee_choices?.includes(committee.name) || false;
            const isDisabled = (!isSelected && selectedCount >= 1) || !committee.is_open;
            const styling = committeeStyles[committee.name as keyof typeof committeeStyles] || {
              icon: Briefcase,
              color: "from-gray-500 to-gray-600",
              bgColor: "bg-gray-50",
              borderColor: "border-gray-200",
              selectedBorder: "border-gray-500",
              selectedBg: "bg-gray-100",
            };
            const IconComponent = styling.icon;

            return (
              <div
                key={committee.id}
                className={`relative group transition-all duration-300 ${
                  isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95 cursor-pointer'
                }`}
                onClick={() => !isDisabled && handleCommitteeChange(committee.name)}
              >
                <div className={`relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  isSelected
                    ? `${styling.selectedBorder} ${styling.selectedBg} shadow-xl transform scale-105`
                    : isDisabled
                    ? `${styling.borderColor} bg-gray-50`
                    : `${styling.borderColor} ${styling.bgColor} hover:${styling.selectedBorder} hover:shadow-lg`
                }`}>

                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${styling.color} rounded-full`}></div>
                    <div className={`absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br ${styling.color} rounded-full`}></div>
                  </div>

                  {/* Closed Committee Overlay */}
                  {/* {!committee.is_open && (
                    <div className="absolute inset-0 bg-red-50 bg-opacity-90 flex items-center justify-center rounded-2xl z-20">
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-2 bg-red-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-red-700">Closed</span>
                      </div>
                    </div>
                  )} */}

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 animate-bounce-in z-10">
                      <div className={`w-8 h-8 bg-gradient-to-br ${styling.color} rounded-full flex items-center justify-center shadow-lg`}>
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${styling.color} rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className={`font-bold text-lg mb-2 transition-colors duration-300 ${
                      isSelected ? 'text-gray-900' : isDisabled ? 'text-gray-400' : 'text-gray-800 group-hover:text-gray-900'
                    }`}>
                      {committee.name}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors duration-300 mb-4 ${
                      isSelected ? 'text-gray-700' : isDisabled ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {committee.description}
                    </p>

                    {/* Status Indicators */}
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        committee.is_open
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {committee.is_open ? 'Open' : 'Closed'}
                      </span>

                      {isSelected && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Selected
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  {!isDisabled && !isSelected && committee.is_open && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  )}

                  {/* Selection Limit Reached Overlay */}
                  {!isSelected && selectedCount >= 1 && committee.is_open && (
                    <div className="absolute inset-0 bg-gray-100/80 rounded-2xl flex items-center justify-center z-10">
                      <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full shadow">
                        Already Selected
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selection Info */}
        {selectedCount === 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl">
              <Sparkles className="w-5 h-5 text-amber-500 mr-2 animate-pulse" />
              <span className="text-amber-800 font-medium">
                Select your committee to get started!
              </span>
            </div>
          </div>
        )}

        {errors.committee_choices && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 text-sm flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.committee_choices}
            </p>
          </div>
        )}

      </div>

      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Why did you choose this committee? *</label>
        <textarea
          name="why_committee"
          rows={4}
          value={formData.why_committee || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, why_committee: e.target.value }))}
          className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 group-hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500 ${
            errors.why_committee ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500 bg-white'
          }`}
          placeholder="Explain why you chose this specific committee..."
        />
        {errors.why_committee && <p className="mt-1 text-sm text-red-600">{errors.why_committee}</p>}
      </div>

      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-2">What do you know about the responsibilities of the committee you are applying for? (Be specific) *</label>
        <textarea
          name="committee_responsibilities"
          rows={4}
          value={formData.committee_responsibilities || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, committee_responsibilities: e.target.value }))}
          className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 group-hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500 ${
            errors.committee_responsibilities ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500 bg-white'
          }`}
          placeholder="Describe the specific responsibilities of your chosen committee..."
        />
        {errors.committee_responsibilities && <p className="mt-1 text-sm text-red-600">{errors.committee_responsibilities}</p>}
      </div>

      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Open Space</label>
        <textarea
          name="open_space"
          rows={3}
          value={formData.open_space || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, open_space: e.target.value }))}
          className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 group-hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500 ${
            errors.open_space ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500 bg-white'
          }`}
          placeholder="Any additional information you'd like to share..."
        />
        {errors.open_space && <p className="mt-1 text-sm text-red-600">{errors.open_space}</p>}
      </div>
    </div>
  );
};

const AdditionalInfo = ({ formData, setFormData, errors }: FormSectionProps) => (
  <div className="space-y-8">
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Review Your Application</h3>
      <p className="text-gray-700">Please review all the information you've provided before submitting your application.</p>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl">
          <span className="font-medium text-gray-700">Personal Information</span>
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl">
          <span className="font-medium text-gray-700">Education Details</span>
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl">
          <span className="font-medium text-gray-700">About SPE</span>
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl">
          <span className="font-medium text-gray-700">Committee Selection</span>
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl">
          <span className="font-medium text-gray-700">Application Complete</span>
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
      </div>
    </div>

    <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
      <p className="text-gray-600 mb-2">For any inquiries, do not hesitate to contact us on:</p>
      <p className="text-blue-600 font-medium">spesusc.hrm2026@gmail.com</p>
      <p className="text-gray-600 mt-4">Thanks in advance!</p>
    </div>
  </div>
);

export default function Create({ committees, academicYears, formInstructions }: ApplicationFormProps) {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    mobile: '',
    facebook_link: '',
    personal_photo: null,
    university: '',
    faculty: '',
    department: '',
    academic_year: '',
    previous_experience: '',
    why_applying: '',
    how_benefit: '',
    committee_choices: [], // Array for 2 committees
    why_committee: '',
    committee_responsibilities: '',
    open_space: '',
  });

  const totalSteps = 5;
  const isCommitteeSelectionValid = (() => {
    const count = formData.committee_choices?.length ?? 0;
    return count === 1;
  })();

  // Map fields to their corresponding steps
  const fieldToStepMap: Record<string, number> = {
    // Step 2: Personal Information
    full_name: 2,
    email: 2,
    mobile: 2,
    facebook_link: 2,
    personal_photo: 2,
    // Step 3: Educational Information
    university: 3,
    faculty: 3,
    department: 3,
    academic_year: 3,
    // Step 4: About SPE
    previous_experience: 4,
    why_applying: 4,
    how_benefit: 4,
    // Step 5: Committee Section
    committee_choices: 5,
    why_committee: 5,
    committee_responsibilities: 5,
    open_space: 5,
  };

  // Function to navigate to step with first error
  const navigateToErrorStep = (errors: Record<string, string>) => {
    const errorFields = Object.keys(errors).filter(field => field !== 'form');
    if (errorFields.length === 0) return;

    // Find the earliest step that has errors
    const errorSteps = errorFields
      .map(field => fieldToStepMap[field])
      .filter(step => step !== undefined)
      .sort((a, b) => a - b);

    if (errorSteps.length > 0) {
      const firstErrorStep = errorSteps[0];
      if (firstErrorStep !== currentStep) {
        setTimeout(() => {
          handleStepTransition(() => setCurrentStep(firstErrorStep));
        }, 500); // Small delay to let error display first
      }
    }
  };

  // Animation handler for step transitions with scroll to top
  const handleStepTransition = (callback: () => void) => {
    setIsTransitioning(true);
    // Scroll to top immediately when transitioning
    scrollToTop('smooth');
    setTimeout(() => {
      callback();
      setTimeout(() => setIsTransitioning(false), 150);
    }, 300);
  };

  const validateCommitteeSection = (): boolean => {
    const choices = formData.committee_choices ?? [];
    const newErrors: Record<string, string> = {};

    if (choices.length === 0) {
      newErrors.committee_choices = 'Please select one committee.';
    }

    if (choices.length > 1) {
      newErrors.committee_choices = 'Please select only one committee.';
      newErrors.form = 'Please select only one committee before submitting your application.';
    }

    if (!formData.why_committee?.trim()) {
      newErrors.why_committee = `${fieldLabels.why_committee} is required.`;
    }

    if (!formData.committee_responsibilities?.trim()) {
      newErrors.committee_responsibilities = `${fieldLabels.committee_responsibilities} is required.`;
    }

    if (Object.keys(newErrors).length > 0) {
      if (!newErrors.form) {
        newErrors.form = 'Please complete the committee section before submitting your application.';
      }

      setClientErrors(prev => ({
        ...prev,
        ...newErrors,
      }));

      return false;
    }

    setClientErrors(prev => {
      const updated = { ...prev };

      if (updated.form === 'Please complete the committee section before submitting your application.' || updated.form === 'Please adjust your committee selections before submitting your application.') {
        delete updated.form;
      }

      delete updated.committee_choices;
      delete updated.why_committee;
      delete updated.committee_responsibilities;

      return updated;
    });

    return true;
  };

  // Navigation functions
  const validateCurrentStep = (): boolean => {
    const currentFormData = formData;

    const setMissingFieldErrors = (
      missing: Array<keyof FormData>,
      message: string
    ): void => {
      const newErrors: Record<string, string> = { form: message };
      missing.forEach((field) => {
        newErrors[field] = `${fieldLabels[field]} is required.`;
      });
      setClientErrors(newErrors);

      // Navigate to the first step with missing fields
      if (missing.length > 0) {
        const errorStep = fieldToStepMap[missing[0]];
        if (errorStep && errorStep !== currentStep) {
          setTimeout(() => {
            handleStepTransition(() => setCurrentStep(errorStep));
          }, 500);
        }
      }
    };

    switch (currentStep) {
      case 1:
        setClientErrors({});
        return true;

      case 2: {
        const personalRequiredFields: Array<keyof FormData> = [
          'full_name',
          'email',
          'mobile',
          'facebook_link',
          'personal_photo',
        ];
        const personalMissing = personalRequiredFields.filter(
          (field) => {
            if (field === 'personal_photo') {
              return !currentFormData[field];
            }
            return !currentFormData[field]?.toString().trim();
          }
        );

        if (personalMissing.length > 0) {
          setMissingFieldErrors(
            personalMissing,
            'Please complete all required personal details before continuing.'
          );
          return false;
        }
        break;
      }

      case 3: {
        const educationRequiredFields: Array<keyof FormData> = [
          'university',
          'faculty',
          'department',
          'academic_year',
        ];
        const educationMissing = educationRequiredFields.filter(
          (field) => !currentFormData[field]?.toString().trim()
        );

        if (educationMissing.length > 0) {
          setMissingFieldErrors(
            educationMissing,
            'Please complete all required education details before continuing.'
          );
          return false;
        }
        break;
      }

      case 4: {
        const experienceRequiredFields: Array<keyof FormData> = [
          'previous_experience',
          'why_applying',
          'how_benefit',
        ];
        const experienceMissing = experienceRequiredFields.filter(
          (field) => !currentFormData[field]?.toString().trim()
        );

        if (experienceMissing.length > 0) {
          setMissingFieldErrors(
            experienceMissing,
            'Please complete all questions in this section before continuing.'
          );
          return false;
        }
        break;
      }

      case 5: {
        if (!validateCommitteeSection()) {
          return false;
        }
        break;
      }

      default:
        break;
    }

    setClientErrors({});
    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      handleStepTransition(() => setCurrentStep(currentStep + 1));
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setClientErrors({});
      handleStepTransition(() => setCurrentStep(currentStep - 1));
    }
  };

  const goToStep = (step: number) => {
    if (step === currentStep || step < 1 || step > totalSteps) {
      return;
    }

    if (step < currentStep) {
      setClientErrors({});
      handleStepTransition(() => setCurrentStep(step));
      return;
    }

    if (step === currentStep + 1 && validateCurrentStep()) {
      handleStepTransition(() => setCurrentStep(step));
    }
  };

  // Animated counters for stats
  const [counters, setCounters] = useState({
    applications: 0,
    members: 0,
    events: 0,
    years: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounters({
        applications: 1500,
        members: 250,
        events: 100,
        years: 15,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Update completed steps when moving forward
  useEffect(() => {
    if (currentStep > 1 && !completedSteps.includes(currentStep - 1)) {
      setCompletedSteps(prev => [...prev, currentStep - 1]);
    }
  }, [currentStep, completedSteps]);

  // Calculate which steps have errors based on both client and form errors
  const getErrorSteps = (formErrors: Record<string, string>, clientErrors: Record<string, string>) => {
    const allErrors = { ...formErrors, ...clientErrors };
    const errorFields = Object.keys(allErrors).filter(field => field !== 'form');
    const errorSteps = errorFields
      .map(field => fieldToStepMap[field])
      .filter(step => step !== undefined);
    return [...new Set(errorSteps)]; // Remove duplicates
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <>
      <Head title="Apply - SPE Suez" />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        {/* Navigation Header */}
        <nav className="bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                  <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">SPE Suez</span>
                </Link>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-6">
                <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Step {currentStep} of {totalSteps}</span>
                  <span className="sm:hidden">{currentStep}/{totalSteps}</span>
                </div>
                <div className="hidden sm:block w-24 md:w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <span className="text-xs sm:text-sm font-medium text-blue-600">{Math.round(progressPercentage)}%</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Progress Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-3 sm:py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <h1 className="text-sm sm:text-base md:text-lg font-bold truncate">SPE Suez Membership Application</h1>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="hidden lg:flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="text-sm">Join our amazing community!</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(totalSteps)].map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                        index + 1 <= currentStep
                          ? 'bg-white scale-125'
                          : completedSteps.includes(index + 1)
                          ? 'bg-green-300'
                          : 'bg-white/40'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          {/* Form Content */}
          <div className={`bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 mt-4 sm:mt-6 md:mt-8 border border-white/20 transition-all duration-500 ${isTransitioning ? 'opacity-50 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
            <Form
              action="/apply"
              method="post"
              onSubmit={(event) => {
                if (currentStep === totalSteps && !validateCommitteeSection()) {
                  event.preventDefault();
                }
              }}
            >
              {({
                errors: formErrors,
                hasErrors,
                processing,
                wasSuccessful,
                recentlySuccessful,
                clearErrors,
                resetAndClearErrors,
                defaults
              }) => {
                const combinedErrors = { ...formErrors, ...clientErrors };
                const hasClientErrors = Object.keys(clientErrors).length > 0;
                const shouldShowErrors = hasErrors || hasClientErrors;
                const errorSteps = getErrorSteps(formErrors, clientErrors);

                // Navigate to step with errors when server validation fails
                useEffect(() => {
                  if (hasErrors && Object.keys(formErrors).length > 0) {
                    navigateToErrorStep(formErrors);
                  }
                }, [hasErrors, formErrors]);

                return (
                  <>
                    {/* Step Indicator */}
                    <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-50 transform scale-95' : 'opacity-100 transform scale-100'}`}>
                      <StepIndicator
                        currentStep={currentStep}
                        totalSteps={totalSteps}
                        onStepClick={goToStep}
                        completedSteps={completedSteps}
                        errorSteps={errorSteps}
                      />
                    </div>
                    {/* Hidden inputs for all form data */}
                    <input type="hidden" name="full_name" value={formData.full_name || ''} />
                    <input type="hidden" name="email" value={formData.email || ''} />
                    <input type="hidden" name="mobile" value={formData.mobile || ''} />
                    <input type="hidden" name="facebook_link" value={formData.facebook_link || ''} />
                    {formData.personal_photo && (
                      <input
                        type="file"
                        name="personal_photo"
                        className="hidden"
                        ref={(input) => {
                          if (input && formData.personal_photo) {
                            const dataTransfer = new DataTransfer();
                            dataTransfer.items.add(formData.personal_photo);
                            input.files = dataTransfer.files;
                          }
                        }}
                      />
                    )}
                    <input type="hidden" name="university" value={formData.university || ''} />
                    <input type="hidden" name="faculty" value={formData.faculty || ''} />
                    <input type="hidden" name="department" value={formData.department || ''} />
                    <input type="hidden" name="academic_year" value={formData.academic_year || ''} />
                    <input type="hidden" name="previous_experience" value={formData.previous_experience || ''} />
                    <input type="hidden" name="why_applying" value={formData.why_applying || ''} />
                    <input type="hidden" name="how_benefit" value={formData.how_benefit || ''} />
                    <input type="hidden" name="why_committee" value={formData.why_committee || ''} />
                    <input type="hidden" name="committee_responsibilities" value={formData.committee_responsibilities || ''} />
                    <input type="hidden" name="open_space" value={formData.open_space || ''} />
                    {(formData.committee_choices ?? []).map((choice, index) => (
                      <input key={index} type="hidden" name="committee_choices[]" value={choice} />
                    ))}

                    {/* Validation Error Display */}
                    {combinedErrors.form && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span className="text-red-800 font-medium">{combinedErrors.form}</span>
                        </div>
                      </div>
                    )}

                    {/* Server-side Validation Errors with Navigation */}
                    {hasErrors && Object.keys(formErrors).length > 0 && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-red-800 mb-2">Please correct the following errors:</h3>
                            <div className="space-y-2">
                              {Object.entries(formErrors).map(([field, message]) => {
                                const stepNumber = fieldToStepMap[field];
                                const stepNames = {
                                  2: 'Personal Information',
                                  3: 'Educational Information',
                                  4: 'About SPE',
                                  5: 'Committee Selection'
                                };
                                const stepName = stepNumber ? stepNames[stepNumber as keyof typeof stepNames] : '';

                                return (
                                  <div key={field} className="flex items-center justify-between p-2 bg-white/60 backdrop-blur-sm rounded-lg">
                                    <div>
                                      <span className="text-red-700 font-medium">{fieldLabels[field as keyof FormData] || field}: </span>
                                      <span className="text-red-600">{message}</span>
                                    </div>
                                    {stepNumber && stepNumber !== currentStep && (
                                      <button
                                        type="button"
                                        onClick={() => handleStepTransition(() => setCurrentStep(stepNumber))}
                                        className="ml-2 px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full hover:bg-red-200 transition-colors"
                                      >
                                        Go to {stepName}
                                      </button>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 1: Introduction */}
                  {currentStep === 1 && (
                    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 sm:mb-6 shadow-lg">
                          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                          SPE Suez Recruitment
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 mb-3 sm:mb-4">قسم 1 من 5</p>
                        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
                          Please, read the following very carefully.
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                          <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                          Application filling tips:
                        </h2>
                        <div className="grid gap-4">
                          <div className="flex items-start space-x-3 group">
                            <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              1
                            </div>
                            <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">Read the questions very carefully, think about them, then type your answer.</p>
                          </div>
                          <div className="flex items-start space-x-3 group">
                            <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              2
                            </div>
                            <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">Make sure your answer is clear as possible as you can.</p>
                          </div>
                          <div className="flex items-start space-x-3 group">
                            <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              3
                            </div>
                            <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">Take all the time you need to answer the questions, your answers represent you!</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 shadow-lg">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-amber-800 mb-2">Note that:</h3>
                            <p className="text-amber-700 leading-relaxed">
                              If you are currently an Executive Board or High Board member at another Student Chapter in Suez University, you're not allowed to join SPE Suez.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 shadow-lg">
                        <div className="text-center">
                          <p className="text-gray-600 mb-2">For any inquiries, do not hesitate to contact us on:</p>
                          <p className="text-blue-600 font-medium text-lg">spesusc.hrm2026@gmail.com</p>
                          <p className="text-gray-600 mt-4 font-medium">Thanks in advance!</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Personal Information */}
                  {currentStep === 2 && (
                    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
                      <div className="text-center mb-6 sm:mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl mb-4 sm:mb-6 shadow-lg">
                          <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                          Personal Information
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600">قسم 2 من 5</p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2">الوصف (اختياري)</p>
                      </div>

                      <PersonalInfo
                        formData={formData}
                        setFormData={setFormData}
                        errors={combinedErrors}
                      />
                    </div>
                  )}

                  {/* Step 3: Educational Information */}
                  {currentStep === 3 && (
                    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
                      <div className="text-center mb-6 sm:mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-violet-600 rounded-2xl mb-4 sm:mb-6 shadow-lg">
                          <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                          Educational Information
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600">قسم 3 من 5</p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2">الوصف (اختياري)</p>
                      </div>

                      <EducationInfo
                        formData={formData}
                        setFormData={setFormData}
                        errors={combinedErrors}
                      />
                    </div>
                  )}

                  {/* Step 4: About SPE Suez */}
                  {currentStep === 4 && (
                    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
                      <div className="text-center mb-6 sm:mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl mb-4 sm:mb-6 shadow-lg">
                          <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                          About SPE Suez
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600">قسم 4 من 5</p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2">الوصف (اختياري)</p>
                      </div>

                      <ExperienceInfo
                        formData={formData}
                        setFormData={setFormData}
                        errors={combinedErrors}
                      />
                    </div>
                  )}

                  {/* Step 5: About Committee */}
                  {currentStep === 5 && (
                    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
                      <div className="text-center mb-6 sm:mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl mb-4 sm:mb-6 shadow-lg">
                          <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                          About Committee
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600">قسم 5 من 5</p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2">الوصف (اختياري)</p>
                      </div>

                      <SkillsInfo
                        formData={formData}
                        setFormData={setFormData}
                        errors={combinedErrors}
                        committees={committees}
                      />
                    </div>
                  )}

                  {/* Enhanced Navigation */}
                  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={previousStep}
                      disabled={currentStep === 1 || isTransitioning}
                      className={`group flex items-center justify-center px-4 sm:px-6 py-3 rounded-xl transition-all duration-300 order-2 sm:order-1 ${
                        currentStep === 1 || isTransitioning
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md hover:scale-105 shadow-sm border border-gray-200 active:scale-95'
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                      <span className="text-sm sm:text-base">Previous Step</span>
                    </button>

                    <div className="hidden sm:flex items-center space-x-3 order-1 sm:order-2">
                      <div className="text-sm font-medium text-gray-600">
                        Step {currentStep} of {totalSteps}
                      </div>
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 ease-out"
                          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        />
                      </div>
                    </div>

                    {currentStep < totalSteps ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={isTransitioning}
                        className={`group flex items-center justify-center px-4 sm:px-6 py-3 rounded-xl transition-all duration-300 order-1 sm:order-3 ${
                          isTransitioning
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:scale-105 active:scale-95'
                        } text-white shadow-md`}
                      >
                        <span className="text-sm sm:text-base">Next Step</span>
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={processing || isTransitioning || !isCommitteeSelectionValid}
                        className={`group flex items-center justify-center px-6 sm:px-8 py-3 rounded-xl transition-all duration-300 order-1 sm:order-3 ${
                          processing || isTransitioning || !isCommitteeSelectionValid
                            ? 'bg-green-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow-lg hover:scale-105 active:scale-95'
                        } text-white shadow-md font-semibold`}
                      >
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        <span className="text-sm sm:text-base">{processing ? 'Submitting...' : 'Submit Application'}</span>
                      </button>
                    )}
                  </div>

                  {currentStep === totalSteps && !isCommitteeSelectionValid && (
                    <p className="mt-4 text-sm text-red-600">
                      Select one committee to enable submission.
                    </p>
                  )}

                  {/* Enhanced Error Display */}
                  {shouldShowErrors && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl shadow-lg animate-shake">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-red-800 mb-1">Please correct the following errors:</h3>
                          <p className="text-red-700">Review the highlighted fields and try again.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Success Message */}
                  {wasSuccessful && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl shadow-lg animate-bounce-in">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-green-800 mb-1">Application Submitted Successfully! 🎉</h3>
                          <p className="text-green-700">Thank you for your application. We'll review it and get back to you soon.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  </>
                );
              }}
            </Form>
          </div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="fixed top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-xl animate-float" />
        <div className="fixed top-1/3 right-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-float-delayed" />
        <div className="fixed bottom-20 left-1/4 w-24 h-24 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-xl animate-float-slow" />
      </div>
    </>
  );
}
