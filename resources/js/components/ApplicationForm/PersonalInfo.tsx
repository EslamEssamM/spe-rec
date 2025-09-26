interface PersonalInfoProps {
  errors: Record<string, string>;
}

export default function PersonalInfo({ errors }: PersonalInfoProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Please provide your personal details</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Full Name */}
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="full_name"
            id="full_name"
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.full_name ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Enter your full name as it appears on official documents"
          />
          {errors.full_name && (
            <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            E-mail (Preferred Gmail) <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="your.email@gmail.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            We recommend using Gmail for better communication
          </p>
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="mobile_number" className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="mobile_number"
            id="mobile_number"
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.mobile_number ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="e.g., +20 123 456 7890"
          />
          {errors.mobile_number && (
            <p className="mt-1 text-sm text-red-600">{errors.mobile_number}</p>
          )}
        </div>

        {/* Facebook Link */}
        <div>
          <label htmlFor="facebook_link" className="block text-sm font-medium text-gray-700 mb-2">
            Facebook Account Link <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="facebook_link"
            id="facebook_link"
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.facebook_link ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="https://facebook.com/your.profile"
          />
          {errors.facebook_link && (
            <p className="mt-1 text-sm text-red-600">{errors.facebook_link}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Please provide your full Facebook profile URL
          </p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Privacy Note:</strong> Your personal information will be kept confidential and used only for recruitment purposes. We respect your privacy and data security.
        </p>
      </div>
    </div>
  );
}
