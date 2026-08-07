function AIMatchCard({
  result,
}) {
  const score = result.matchScore;

  let color = "text-red-600";

  if (score >= 80) {
    color = "text-green-600";
  } else if (score >= 60) {
    color = "text-yellow-600";
  }

  return (
    <div className="space-y-8">

      <div className="text-center">

        <h2 className="text-xl font-semibold">
          Match Score
        </h2>

        <p className={`text-6xl font-bold mt-4 ${color}`}>
          {score}%
        </p>

      </div>

      <div>

        <h3 className="font-bold text-lg mb-3">
          ✅ Matched Skills
        </h3>

        <div className="flex flex-wrap gap-2">

          {result.matchedSkills.map((skill) => (
            <span
              key={skill}
              className="bg-green-100 text-green-700 px-4 py-2 rounded-full"
            >
              {skill}
            </span>
          ))}

        </div>

      </div>

      <div>

        <h3 className="font-bold text-lg mb-3">
          ❌ Missing Skills
        </h3>

        <div className="flex flex-wrap gap-2">

          {result.missingSkills.map((skill) => (
            <span
              key={skill}
              className="bg-red-100 text-red-700 px-4 py-2 rounded-full"
            >
              {skill}
            </span>
          ))}

        </div>

      </div>

      <div className="bg-slate-100 rounded-xl p-5">

        <h3 className="font-bold">
          AI Recommendation
        </h3>

        <p className="mt-3">

          {score >= 80 &&
            "Excellent candidate. Strong recommendation for interview."}

          {score >= 60 &&
            score < 80 &&
            "Good candidate. Consider for technical evaluation."}

          {score < 60 &&
            "Low match. Candidate may require additional skills."}

        </p>

      </div>

    </div>
  );
}

export default AIMatchCard;