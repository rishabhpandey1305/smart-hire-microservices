import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";

function JobCard({
  job,
  onEdit,
  onDelete,
  onRank,
}) {
  return (
    <Card className="hover:-translate-y-1 transition-all duration-300">

      <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

        {/* Left Section */}

        <div className="flex-1">

          <div className="flex items-center justify-between flex-wrap gap-3">

            <h2 className="text-2xl font-bold text-slate-800">
              {job.title}
            </h2>

            <Badge color="blue">
              📍 {job.location}
            </Badge>

          </div>

          <p className="text-slate-600 mt-4 leading-7">
            {job.description}
          </p>

          <div className="mt-6">

            <h3 className="font-semibold text-slate-700 mb-3">
              Required Skills
            </h3>

            <div className="flex flex-wrap gap-2">

              {job.requiredSkills
                ?.split(",")
                .map((skill) => (

                  <Badge
                    key={skill}
                    color="gray"
                  >
                    {skill.trim()}
                  </Badge>

                ))}

            </div>

          </div>

          <div className="mt-6 flex flex-wrap gap-6">

            <div>

              <p className="text-sm text-slate-500">
                Salary
              </p>

              <p className="font-semibold text-emerald-600 text-lg">
                ₹ {Number(job.salary).toLocaleString()}
              </p>

            </div>

          </div>

        </div>

        {/* Right Section */}

        <div className="flex flex-col gap-3 lg:w-52">

          <Button
            onClick={() => onRank(job)}
            className="w-full"
          >
            🤖 Rank Candidates
          </Button>

          <Button
            variant="secondary"
            onClick={() => onEdit(job)}
            className="w-full"
          >
            ✏️ Edit Job
          </Button>

          <Button
            variant="danger"
            onClick={() => onDelete(job.id)}
            className="w-full"
          >
            🗑 Delete Job
          </Button>

        </div>

      </div>

    </Card>
  );
}

export default JobCard;