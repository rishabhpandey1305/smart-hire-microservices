function TopCandidates({ candidates }) {
  const sortedCandidates = [...candidates]
    .sort((a, b) => {
      const aSkills = a.skills
        ? a.skills.split(",").length
        : 0;

      const bSkills = b.skills
        ? b.skills.split(",").length
        : 0;

      return bSkills - aSkills;
    })
    .slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-xl font-semibold mb-6">
        🏆 Top Candidates
      </h2>

      <div className="space-y-4">

        {sortedCandidates.map((candidate, index) => (

          <div
            key={candidate.id}
            className="flex justify-between items-center border-b pb-4 last:border-none"
          >

            <div>

              <h3 className="font-semibold">

                {index === 0 && "🥇 "}
                {index === 1 && "🥈 "}
                {index === 2 && "🥉 "}

                {candidate.name}

              </h3>

              <p className="text-sm text-slate-500">

                {candidate.skills}

              </p>

            </div>

            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

              {candidate.skills
                ? candidate.skills.split(",").length
                : 0} Skills

            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TopCandidates;