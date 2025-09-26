import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

const steps = [
  { id: 1, name: 'Introduction', title: 'SPE Suez Recruitment' },
  { id: 2, name: 'Personal', title: 'Personal Information' },
  { id: 3, name: 'Education', title: 'Educational Information' },
  { id: 4, name: 'About SPE', title: 'About SPE Suez' },
  { id: 5, name: 'Committee', title: 'About Committee' },
];

export default function StepIndicator({ currentStep, totalSteps, onStepClick }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <nav aria-label="Progress">
        <ol className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className={`${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} relative`}>
              {step.id < currentStep ? (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-blue-600" />
                  </div>
                  <button
                    onClick={() => onStepClick(step.id)}
                    className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition-colors group"
                  >
                    <Check className="h-5 w-5 text-white" aria-hidden="true" />
                    <span className="sr-only">{step.name}</span>
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        {step.title}
                      </div>
                    </div>
                  </button>
                </>
              ) : step.id === currentStep ? (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white group">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600" aria-hidden="true" />
                    <span className="sr-only">{step.name}</span>
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                      <div className="bg-blue-600 text-white text-xs rounded py-1 px-2 whitespace-nowrap font-medium">
                        {step.title}
                      </div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
                        <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-blue-600"></div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <div className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400 transition-colors">
                    <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300 transition-colors" aria-hidden="true" />
                    <span className="sr-only">{step.name}</span>
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        {step.title}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
