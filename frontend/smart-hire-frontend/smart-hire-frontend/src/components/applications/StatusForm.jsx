import { useState } from "react";

function StatusForm({
  currentStatus,
  loading,
  onSubmit,
}) {

  const [status, setStatus] = useState(currentStatus);

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(status);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="w-full border rounded-lg px-4 py-3"
      >
        <option value="PENDING">
          PENDING
        </option>

        <option value="SHORTLISTED">
          SHORTLISTED
        </option>

        <option value="REJECTED">
          REJECTED
        </option>

        <option value="HIRED">
          HIRED
        </option>
      </select>

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg"
      >
        {loading
          ? "Updating..."
          : "Update Status"}
      </button>

    </form>
  );
}

export default StatusForm;