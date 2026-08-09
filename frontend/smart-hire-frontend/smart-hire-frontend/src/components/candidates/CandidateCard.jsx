import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";

import ResumeUpload from "./ResumeUpload";

function CandidateCard({
  candidate,
  onEdit,
  onDelete,
  onRefresh,
  onAnalyze,
}) {
  const skills =
    candidate.skills
      ?.split(",")
      .map((skill) => skill.trim()) || [];

  return (
    <Card className="hover:-translate-y-1 transition-all duration-300">

      <div className="flex flex-col lg:flex-row lg:justify-between gap-8">

        {/* Left Section */}

        <div className="flex-1">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">

              {candidate.name.charAt(0).toUpperCase()}

            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-800">
                {candidate.name}
              </h2>

              <div className="flex gap-2 mt-2">

                <Badge color="blue">
                  {candidate.education}
                </Badge>

                <Badge color="green">
                  {candidate.experience} Years
                </Badge>

              </div>

            </div>

          </div>

          <div className="mt-6 space-y-2">

            <p className="text-slate-600">
              📧 {candidate.email}
            </p>

            <p className="text-slate-600">
              📞 {candidate.phone}
            </p>

          </div>

          <div className="mt-6">

            <h3 className="font-semibold text-slate-700 mb-3">
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">

              {skills.map((skill) => (
                <Badge
                  key={skill}
                  color="gray"
                >
                  {skill}
                </Badge>
              ))}

            </div>

          </div>

          <div className="mt-6 flex items-center gap-3">

            {candidate.resumeUrl ? (

              <Badge color="green">
                📄 Resume Uploaded
              </Badge>

            ) : (

              <Badge color="red">
                No Resume
              </Badge>

            )}

          </div>

          <div className="mt-5">

            <ResumeUpload
              candidateId={candidate.id}
              onUploadSuccess={onRefresh}
            />

          </div>

        </div>

        {/* Right Section */}

        <div className="flex flex-col gap-3 lg:w-56">

          <Button
            onClick={() => onAnalyze(candidate.id)}
            className="w-full"
          >
            🤖 Analyze Resume
          </Button>

          <Button
            variant="secondary"
            onClick={() => onEdit(candidate)}
            className="w-full"
          >
            ✏️ Edit Candidate
          </Button>

          <Button
            variant="danger"
            onClick={() => onDelete(candidate.id)}
            className="w-full"
          >
            🗑 Delete Candidate
          </Button>

        </div>

      </div>

    </Card>
  );
}

export default CandidateCard;