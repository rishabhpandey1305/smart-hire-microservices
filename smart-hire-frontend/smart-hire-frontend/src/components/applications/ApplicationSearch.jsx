import Input from "@/components/common/Input";

function ApplicationSearch({
  value,
  onChange,
}) {
  return (
    <div className="w-full">

      <Input
        placeholder="🔍 Search applications by candidate, job or status..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />

    </div>
  );
}

export default ApplicationSearch;