"use client";
import React from "react";
import Spinner from "~/components/ui/spinner";
import { useLanguage } from "./providers";

const LoadingPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Spinner size="large" color="text-blue-600 dark:text-blue-400" />
      <p className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
        {t.loading}
      </p>
    </div>
  );
};

export default LoadingPage;
