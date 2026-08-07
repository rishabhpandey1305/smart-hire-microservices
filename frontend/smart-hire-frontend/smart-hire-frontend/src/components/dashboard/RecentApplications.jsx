function RecentApplications({ applications }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-6">
        Recent Applications
      </h2>

      <div className="space-y-5">
        {applications.slice(0, 5).map((application) => (
          <div
            key={application.id}
            className="border-b last:border-none pb-4"
          >
            <h3 className="font-semibold">
              Candidate #{application.candidateId}
            </h3>

            <p className="text-sm text-slate-500">
              Job #{application.jobId}
            </p>

            <span className="text-blue-600 text-sm">
              {application.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentApplications;