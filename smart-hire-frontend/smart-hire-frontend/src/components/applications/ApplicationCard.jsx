import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";

function ApplicationCard({
  application,
  onEdit,
  onDelete,
}) {

  function getStatusColor(status) {

    switch (status) {

      case "PENDING":
        return "yellow";

      case "SHORTLISTED":
        return "green";

      case "INTERVIEW":
        return "blue";

      case "REJECTED":
        return "red";

      default:
        return "gray";

    }

  }

  return (

    <Card className="hover:-translate-y-1 transition-all duration-300">

      <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

        {/* Left Section */}

        <div className="space-y-4 flex-1">

          <h2 className="text-2xl font-bold text-slate-800">
            📄 Application #{application.id}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">

            <div>

              <p className="text-sm text-slate-500">
                Candidate
              </p>

              <p className="font-semibold">
                👤 Candidate #{application.candidateId}
              </p>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Job
              </p>

              <p className="font-semibold">
                💼 Job #{application.jobId}
              </p>

            </div>

          </div>

          <div>

            <p className="text-sm text-slate-500 mb-2">
              Status
            </p>

            <Badge
              color={getStatusColor(application.status)}
            >
              {application.status}
            </Badge>

          </div>

        </div>

        {/* Right Section */}

        <div className="flex flex-col gap-3 lg:w-56">

          <Button
            variant="secondary"
            onClick={() =>
              onEdit(application)
            }
            className="w-full"
          >
            ✏️ Update Status
          </Button>

          <Button
            variant="danger"
            onClick={() =>
              onDelete(application.id)
            }
            className="w-full"
          >
            🗑 Delete
          </Button>

        </div>

      </div>

    </Card>

  );

}

export default ApplicationCard;