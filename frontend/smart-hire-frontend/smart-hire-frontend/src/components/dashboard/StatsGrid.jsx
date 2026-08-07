import StatCard from "./StatCard";

function StatsGrid({
  jobs,
  applications,
  candidates,
}) {

  const stats = [

    {
      title: "Candidates",
      value: candidates.length,
      icon: "👥",
      color: "from-blue-500 to-cyan-500",
    },

    {
      title: "Jobs",
      value: jobs.length,
      icon: "💼",
      color: "from-indigo-500 to-blue-500",
    },

    {
      title: "Applications",
      value: applications.length,
      icon: "📄",
      color: "from-emerald-500 to-green-500",
    },

    {
      title: "Shortlisted",
      value:
        applications.filter(
          app =>
            app.status === "SHORTLISTED"
        ).length,
      icon: "⭐",
      color: "from-orange-500 to-yellow-500",
    },

  ];

  return (

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {stats.map((stat) => (

        <StatCard
          key={stat.title}
          {...stat}
        />

      ))}

    </div>

  );

}

export default StatsGrid;