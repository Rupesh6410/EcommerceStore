import React from "react";

const ProgressStep = ({ step1, step2, step3 }) => {
  const steps = [
    { label: "Login", active: step1 },
    { label: "Shipping", active: step2 },
    { label: "Summary", active: step3 },
  ];

  return (
    <div className="flex flex-col items-center justify-center sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 px-4 py-6">
      {steps.map((step, index) => (
        <React.Fragment key={step.label}>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold ${
                step.active ? "bg-primary" : "bg-gray-300"
              }`}
            >
              {step.active ? "✓" : index + 1}
            </div>
            <span
              className={`mt-2 text-sm font-medium ${
                step.active ? "text-primary" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>

          {/* Connector line except after the last step */}
          {index < steps.length - 1 && (
            <div
              className={`hidden sm:block w-24 h-1 rounded ${
                steps[index + 1].active ? "bg-primary" : "bg-gray-300"
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressStep;
