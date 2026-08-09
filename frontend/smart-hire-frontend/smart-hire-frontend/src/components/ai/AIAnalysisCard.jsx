import AIMatchSelector from "./AIMatchSelector";

function AIAnalysisCard({
  analysis,
  matchResult,
  onJobSelect,
}) {

  const score = matchResult?.matchScore ?? 0;

  let scoreColor = "text-red-600";
  let bgColor = "bg-red-100";
  let recommendation = "Poor Match";

  if (score >= 80) {
    scoreColor = "text-green-600";
    bgColor = "bg-green-100";
    recommendation = "Excellent Match";
  } else if (score >= 60) {
    scoreColor = "text-yellow-600";
    bgColor = "bg-yellow-100";
    recommendation = "Good Match";
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          🤖 Gemini AI Resume Analysis
        </h1>

        <p className="text-slate-500 mt-2">
          Resume analyzed successfully.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-5">

        <div className="bg-blue-50 rounded-xl p-6">
          <p className="text-slate-500">
            Skills Detected
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {analysis.skills?.length || 0}
          </h2>
        </div>

        <div className="bg-purple-50 rounded-xl p-6">
          <p className="text-slate-500">
            Resume Length
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {analysis.resumeText?.length || 0}
          </h2>
        </div>

      </div>

      {/* Gemini Insights */}
      {analysis.overallScore !== undefined && (
        <div className="grid grid-cols-2 gap-5">

          <div className="bg-emerald-50 rounded-xl p-6">
            <p className="text-slate-500">Overall Score</p>

            <h2 className="text-4xl font-bold mt-2 text-emerald-600">
              {analysis.overallScore}/100
            </h2>
          </div>

          <div className="bg-indigo-50 rounded-xl p-6">
            <p className="text-slate-500">Experience Level</p>

            <h2 className="text-3xl font-bold mt-2 text-indigo-600">
              {analysis.experienceLevel || "Unknown"}
            </h2>
          </div>

        </div>
      )}

      {/* Skills */}
      <div>

        <h2 className="text-xl font-bold mb-4">
          Extracted Skills
        </h2>

        <div className="flex flex-wrap gap-3">

          {analysis.skills?.map((skill) => (
            <span
              key={skill}
              className="bg-blue-600 text-white px-4 py-2 rounded-full"
            >
              {skill}
            </span>
          ))}

        </div>

      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-green-50 rounded-xl p-5">
          <h3 className="font-bold text-green-700 mb-3">
            💪 Strengths
          </h3>

          <ul className="space-y-2 text-sm">
            {analysis.strengths?.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-red-50 rounded-xl p-5">
          <h3 className="font-bold text-red-700 mb-3">
            ⚠️ Weaknesses
          </h3>

          <ul className="space-y-2 text-sm">
            {analysis.weaknesses?.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>

      </div>

      {/* Gemini Recommendation */}
      {analysis.recommendation && (
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="font-bold text-blue-700 text-lg mb-3">
            🤖 Gemini Recommendation
          </h3>

          <p className="leading-7 text-slate-700">
            {analysis.recommendation}
          </p>
        </div>
      )}

      {/* Resume Preview */}
      <div>

        <h2 className="text-xl font-bold mb-4">
          Resume Preview
        </h2>

        <div className="bg-slate-100 rounded-xl p-5 max-h-72 overflow-y-auto whitespace-pre-wrap text-sm leading-7">
          {analysis.resumeText || "No text extracted"}
        </div>

      </div>

      {/* Match */}
      <div>

        <h2 className="text-xl font-bold mb-4">
          AI Candidate Matching
        </h2>

        <AIMatchSelector
          onSelect={onJobSelect}
        />

      </div>

      {matchResult && (

        <div className="space-y-8 border rounded-2xl p-8">

          {/* Score */}
          <div className="text-center">

            <div
              className={`inline-flex h-40 w-40 items-center justify-center rounded-full ${bgColor}`}
            >
              <span
                className={`text-5xl font-bold ${scoreColor}`}
              >
                {score}%
              </span>
            </div>

            <h2 className="text-2xl font-bold mt-5">
              {recommendation}
            </h2>

          </div>

          {/* Matched */}
          <div>

            <h3 className="font-bold text-lg mb-3">
              ✅ Matched Skills
            </h3>

            <div className="flex flex-wrap gap-2">

              {matchResult.matchedSkills?.map(skill => (
                <span
                  key={skill}
                  className="bg-green-100 text-green-700 px-4 py-2 rounded-full"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

          {/* Missing */}
          <div>

            <h3 className="font-bold text-lg mb-3">
              ❌ Missing Skills
            </h3>

            <div className="flex flex-wrap gap-2">

              {matchResult.missingSkills?.map(skill => (
                <span
                  key={skill}
                  className="bg-red-100 text-red-700 px-4 py-2 rounded-full"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

          {/* Recommendation */}
          <div className="bg-slate-100 rounded-xl p-6">

            <h3 className="font-bold text-lg">
              AI Match Recommendation
            </h3>

            <p className="mt-4 leading-7">

              {score >= 80 &&
                "This candidate strongly matches the job requirements. Highly recommended for the interview process."}

              {score >= 60 &&
                score < 80 &&
                "This candidate has a good foundation and is suitable for further technical evaluation."}

              {score < 60 &&
                "This candidate is missing several required skills. Consider only if training or upskilling is planned."}

            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default AIAnalysisCard;