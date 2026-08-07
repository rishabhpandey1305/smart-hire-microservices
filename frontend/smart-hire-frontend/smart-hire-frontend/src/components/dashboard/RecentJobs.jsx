function RecentJobs({ jobs }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-6">
        Recent Jobs
      </h2>

      <div className="space-y-5">
        {jobs.slice(0, 5).map((job) => (
          <div
            key={job.id}
            className="border-b last:border-none pb-4"
          >
            <h3 className="font-semibold">
              {job.title}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              {job.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentJobs;