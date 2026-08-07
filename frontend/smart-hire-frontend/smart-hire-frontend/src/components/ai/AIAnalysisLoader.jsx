function AIAnalysisLoader() {
  return (
    <div className="py-16 flex flex-col items-center">

      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>

      <h2 className="mt-6 text-xl font-semibold">
        AI is analyzing the resume...
      </h2>

      <p className="text-slate-500 mt-2">
        Please wait a few seconds.
      </p>

    </div>
  );
}

export default AIAnalysisLoader;