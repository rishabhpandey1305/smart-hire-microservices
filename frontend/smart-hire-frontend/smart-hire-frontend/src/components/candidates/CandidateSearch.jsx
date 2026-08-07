import Input from "@/components/common/Input";

function CandidateSearch({
  value,
  onChange,
}) {
  return (
    <div className="w-full">

      <Input
        placeholder="🔍 Search candidates by name, email, skills or education..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />

    </div>
  );
}

export default CandidateSearch;