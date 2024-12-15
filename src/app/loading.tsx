import React from "react";

import Spinner from "~/app/components/spinner";

const LoadingPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <Spinner size="large" color="text-blue-600" />
      <p className="mt-4 text-xl font-semibold text-gray-700">Loading...</p>
    </div>
  );
};

export default LoadingPage;
