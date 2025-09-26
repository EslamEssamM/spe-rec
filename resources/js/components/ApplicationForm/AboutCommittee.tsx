import { useState } from 'react';

interface Committee {
  id: number;
  name: string;
  description: string;
  responsibilities: string;
  is_open: boolean;
}

interface AboutCommitteeProps {
  errors: Record<string, string>;
  committees: Committee[];
}

export default function AboutCommittee({ errors, committees }: AboutCommitteeProps) {
  const [selectedCommittee, setSelectedCommittee] = useState<Committee | null>(null);

  const handleCommitteeChange = (committeeId: string) => {
    const committee = committees.find(c => c.id.toString() === committeeId);
    setSelectedCommittee(committee || null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">About Committee</h2>
        <p className="text-gray-600">Choose your preferred committee and tell us why</p>
      </div>

      <div className="space-y-6">
        {/* Committee Selection */}
        <div>
          <label htmlFor="committee_id" className="block text-sm font-medium text-gray-700 mb-2">
            Which committee do you want to join? <span className="text-red-500">*</span>
          </label>
          <select
            name="committee_id"
            id="committee_id"
            required
            onChange={(e) => handleCommitteeChange(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.committee_id ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          >
            <option value="">Select a committee</option>
            {committees
              .filter(committee => committee.is_open)
              .map((committee) => (
                <option key={committee.id} value={committee.id}>
                  {committee.name}
                </option>
              ))
            }
          </select>
          {errors.committee_id && (
            <p className="mt-1 text-sm text-red-600">{errors.committee_id}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            You can apply to only one committee. Choose carefully based on your interests and skills.
          </p>
        </div>

        {/* Committee Details */}
        {selectedCommittee && (
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{selectedCommittee.name}</h3>
            <p className="text-blue-800 mb-4">{selectedCommittee.description}</p>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Key Responsibilities:</h4>
              <p className="text-sm text-blue-700">{selectedCommittee.responsibilities}</p>
            </div>
          </div>
        )}

        {/* Why Committee */}
        <div>
          <label htmlFor="why_committee" className="block text-sm font-medium text-gray-700 mb-2">
            Why did you choose this committee? <span className="text-red-500">*</span>
          </label>
          <textarea
            name="why_committee"
            id="why_committee"
            required
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical ${
              errors.why_committee ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Explain why you chose this specific committee. What interests you about its work? How does it align with your skills, passions, and career goals? Be specific and thoughtful in your response."
          />
          {errors.why_committee && (
            <p className="mt-1 text-sm text-red-600">{errors.why_committee}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Show that you understand the committee's role and have genuine interest in its activities.
          </p>
        </div>

        {/* Committee Knowledge */}
        <div>
          <label htmlFor="committee_knowledge" className="block text-sm font-medium text-gray-700 mb-2">
            What do you know about the responsibilities of the committee you are applying for? (Be specific) <span className="text-red-500">*</span>
          </label>
          <textarea
            name="committee_knowledge"
            id="committee_knowledge"
            required
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical ${
              errors.committee_knowledge ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Demonstrate your understanding of the committee's responsibilities. What specific tasks, projects, or activities does this committee handle? How do they contribute to SPE Suez's overall mission? Show that you've researched the role."
          />
          {errors.committee_knowledge && (
            <p className="mt-1 text-sm text-red-600">{errors.committee_knowledge}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Research the committee thoroughly and demonstrate your understanding of its specific role.
          </p>
        </div>

        {/* Open Space */}
        <div>
          <label htmlFor="open_space" className="block text-sm font-medium text-gray-700 mb-2">
            Open Space (Optional)
          </label>
          <textarea
            name="open_space"
            id="open_space"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            placeholder="Is there anything else you'd like to share with us? Any additional information, questions, or comments that might help us understand you better as a candidate?"
          />
          <p className="mt-1 text-sm text-gray-500">
            This is your space to share anything else you think is relevant to your application.
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Important:</strong> You can only apply to one committee. Make sure you've chosen the committee that best fits your interests and skills before submitting your application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
