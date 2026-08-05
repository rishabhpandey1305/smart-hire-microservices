function CandidateRankingCard({
  rankings,
}) {

  return (
    <div className="space-y-4">

      {rankings.map((candidate) => (

        <div
          key={candidate.rank}
          className="flex justify-between items-center bg-white border rounded-xl p-5 shadow-sm"
        >

          <div className="flex items-center gap-5">

            <div className="text-3xl">

              {candidate.rank === 1 && "🥇"}

              {candidate.rank === 2 && "🥈"}

              {candidate.rank === 3 && "🥉"}

              {candidate.rank > 3 &&
                `#${candidate.rank}`}

            </div>

            <div>

              <h2 className="text-xl font-semibold">
                {candidate.name}
              </h2>

            </div>

          </div>

          <div>

            <span className="text-2xl font-bold text-blue-600">
              {candidate.matchScore}%
            </span>

          </div>

        </div>

      ))}

    </div>
  );
}

export default CandidateRankingCard;