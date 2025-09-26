interface AboutSPEProps {
  errors: Record<string, string>;
}

export default function AboutSPE({ errors }: AboutSPEProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">About SPE Suez</h2>
        <p className="text-gray-600">Tell us about your motivation and expectations</p>
      </div>

      <div className="space-y-6">
        {/* Previous Experience */}
        <div>
          <label htmlFor="previous_experience" className="block text-sm font-medium text-gray-700 mb-2">
            Do you have previous experience to apply for volunteering work? If you have, please explain it in detail. <span className="text-red-500">*</span>
          </label>
          <textarea
            name="previous_experience"
            id="previous_experience"
            required
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical ${
              errors.previous_experience ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Please describe any previous volunteering experience, leadership roles, or relevant activities you have participated in. If you have no previous experience, please explain why you want to start volunteering and what motivates you to join SPE Suez."
          />
          {errors.previous_experience && (
            <p className="mt-1 text-sm text-red-600">{errors.previous_experience}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Be honest and detailed. Previous experience is not required, but we want to understand your background.
          </p>
        </div>

        {/* Why SPE */}
        <div>
          <label htmlFor="why_spe" className="block text-sm font-medium text-gray-700 mb-2">
            Why are you applying for SPE Suez Student Chapter? <span className="text-red-500">*</span>
          </label>
          <textarea
            name="why_spe"
            id="why_spe"
            required
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical ${
              errors.why_spe ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Explain your motivation for joining SPE Suez Student Chapter. What attracts you to our organization? How does it align with your career goals and interests in petroleum engineering?"
          />
          {errors.why_spe && (
            <p className="mt-1 text-sm text-red-600">{errors.why_spe}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Help us understand your genuine interest in SPE and petroleum engineering.
          </p>
        </div>

        {/* Expected Benefits */}
        <div>
          <label htmlFor="expected_benefits" className="block text-sm font-medium text-gray-700 mb-2">
            Do you think that you will benefit from joining SPE and how? <span className="text-red-500">*</span>
          </label>
          <textarea
            name="expected_benefits"
            id="expected_benefits"
            required
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical ${
              errors.expected_benefits ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Describe how you expect to benefit from joining SPE Suez. Consider professional development, networking opportunities, technical knowledge, leadership skills, and career advancement. Be specific about your expectations."
          />
          {errors.expected_benefits && (
            <p className="mt-1 text-sm text-red-600">{errors.expected_benefits}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Think about both personal and professional benefits you hope to gain.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Take your time to think about these questions. Your answers should be authentic and reflect your genuine interest in petroleum engineering and professional development. Quality matters more than quantity.
        </p>
      </div>
    </div>
  );
}
