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
          🤖 AI Resume Analysis
        </h1>

        <p className="text-slate-500 mt-2">
          Resume parsed successfully.
        </p>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-2 gap-5">

        <div className="bg-blue-50 rounded-xl p-6">

          <p className="text-slate-500">
            Skills Detected
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {analysis.skills.length}
          </h2>

        </div>

        <div className="bg-purple-50 rounded-xl p-6">

          <p className="text-slate-500">
            Resume Length
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {analysis.resumeText.length}
          </h2>

        </div>

      </div>

      {/* Skills */}

      <div>

        <h2 className="text-xl font-bold mb-4">
          Extracted Skills
        </h2>

        <div className="flex flex-wrap gap-3">

          {analysis.skills.map((skill) => (

            <span
              key={skill}
              className="bg-blue-600 text-white px-4 py-2 rounded-full"
            >
              {skill}
            </span>

          ))}

        </div>

      </div>

      {/* Resume */}

      <div>

        <h2 className="text-xl font-bold mb-4">
          Resume Preview
        </h2>

        <div className="bg-slate-100 rounded-xl p-5 max-h-72 overflow-y-auto whitespace-pre-wrap text-sm leading-7">
          {analysis.resumeText}
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

              {matchResult.matchedSkills.map(skill => (

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

              {matchResult.missingSkills.map(skill => (

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
              AI Recommendation
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