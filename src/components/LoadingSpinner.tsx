// LoadingSpinner.tsx

import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-4 border-purple-600 border-t-transparent"></div>
    </div>
  );
};

export default LoadingSpinner;
