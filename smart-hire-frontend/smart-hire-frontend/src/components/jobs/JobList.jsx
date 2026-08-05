import JobCard from "./JobCard";
import EmptyJobs from "./EmptyJobs";

function JobList({
  jobs,
  onEdit,
  onDelete,
  onRank,
}) {
  if (jobs.length === 0) {
    return <EmptyJobs />;
  }

  return (
    <div className="space-y-5">

      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onEdit={onEdit}
          onDelete={onDelete}
          onRank={onRank}
        />
      ))}

    </div>
  );
}

export default JobList;