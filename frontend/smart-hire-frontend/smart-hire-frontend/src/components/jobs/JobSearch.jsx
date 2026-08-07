import Input from "@/components/common/Input";

function JobSearch({
  value,
  onChange,
}) {
  return (
    <div className="w-full">

      <Input
        placeholder="🔍 Search jobs by title, location or skills..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />

    </div>
  );
}

export default JobSearch;