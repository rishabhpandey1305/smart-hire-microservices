function EmptyJobs() {
  return (
    <div className="bg-white rounded-xl border p-10 text-center">
      <h2 className="text-2xl font-semibold text-slate-700">
        No Jobs Found
      </h2>

      <p className="text-slate-500 mt-3">
        Create your first job posting to start hiring candidates.
      </p>
    </div>
  );
}

export default EmptyJobs;