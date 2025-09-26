interface EducationalInfoProps {
  errors: Record<string, string>;
  academicYears: Record<string, string>;
}

export default function EducationalInfo({ errors, academicYears }: EducationalInfoProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Educational Information</h2>
        <p className="text-gray-600">Please provide your academic details</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* University */}
        <div>
          <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-2">
            University <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="university"
            id="university"
            required
            defaultValue="Suez University"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.university ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Enter your university name"
          />
          {errors.university && (
            <p className="mt-1 text-sm text-red-600">{errors.university}</p>
          )}
        </div>

        {/* Faculty */}
        <div>
          <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-2">
            Faculty <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="faculty"
            id="faculty"
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.faculty ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="e.g., Faculty of Petroleum and Mining Engineering"
          />
          {errors.faculty && (
            <p className="mt-1 text-sm text-red-600">{errors.faculty}</p>
          )}
        </div>

        {/* Department */}
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
            Department <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="department"
            id="department"
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.department ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="e.g., Petroleum Engineering"
          />
          {errors.department && (
            <p className="mt-1 text-sm text-red-600">{errors.department}</p>
          )}
        </div>

        {/* Academic Year */}
        <div>
          <label htmlFor="academic_year" className="block text-sm font-medium text-gray-700 mb-2">
            Academic Year <span className="text-red-500">*</span>
          </label>
          <select
            name="academic_year"
            id="academic_year"
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.academic_year ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          >
            <option value="">Select your academic year</option>
            {Object.entries(academicYears).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.academic_year && (
            <p className="mt-1 text-sm text-red-600">{errors.academic_year}</p>
          )}
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-sm text-green-800">
          <strong>Academic Requirements:</strong> SPE Suez welcomes students from all academic years who are passionate about petroleum engineering and professional development.
        </p>
      </div>
    </div>
  );
}
