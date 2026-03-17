import React from "react";

const ProgressStep = ({ step1, step2, step3 }) => {
  const steps = [
    { label: "Login", active: step1 },
    { label: "Shipping", active: step2 },
    { label: "Summary", active: step3 },
  ];

  return (
    <div className="flex flex-col items-center justify-center sm:flex-row sm:space-x-4 space-y-6 sm:space-y-0 px-4 py-8 mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.label}>
          <div className="flex flex-col items-center relative group">
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg transition-all duration-300 relative z-10 ${step.active
                  ? "bg-gradient-to-tr from-primary to-secondary shadow-[0_0_20px_rgba(79,70,229,0.5)] border border-white/20"
                  : "bg-card/80 border border-white/10 text-gray-500 backdrop-blur-md"
                }`}
            >
              {step.active ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              ) : (
                index + 1
              )}
            </div>

            {/* Step Label */}
            <span
              className={`absolute top-14 mt-2 text-sm font-semibold tracking-wide transition-colors whitespace-nowrap ${step.active ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" : "text-gray-500"
                }`}
            >
              {step.label}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div className="hidden sm:block w-20 md:w-32 h-[2px] relative overflow-hidden bg-white/5 rounded-full mt-[-2px]">
              <div
                className={`absolute inset-y-0 left-0 transition-all duration-700 ${steps[index + 1].active ? "w-full bg-gradient-to-r from-primary to-secondary shadow-[0_0_10px_rgba(79,70,229,0.8)]" : "w-0 bg-transparent"
                  }`}
              ></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressStep;
