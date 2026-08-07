import CandidateCard from "./CandidateCard";
import EmptyCandidates from "./EmptyCandidates";

function CandidateList({
  candidates,
  onEdit,
  onDelete,
  onRefresh,
  onAnalyze,
}) {

  if (candidates.length === 0) {
    return <EmptyCandidates />;
  }

  return (

    <div className="grid gap-6">

      {candidates.map((candidate) => (

        <CandidateCard
          key={candidate.id}
          candidate={candidate}
          onEdit={onEdit}
          onDelete={onDelete}
          onRefresh={onRefresh}
          onAnalyze={onAnalyze}
        />

      ))}

    </div>

  );

}

export default CandidateList;