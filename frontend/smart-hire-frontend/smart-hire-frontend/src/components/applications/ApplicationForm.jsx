import { useEffect, useState } from "react";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

function ApplicationForm({
  onSubmit,
  loading = false,
  initialData,
}) {
  const [formData, setFormData] = useState({
    candidateId: "",
    jobId: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        candidateId: initialData.candidateId || "",
        jobId: initialData.jobId || "",
      });
    } else {
      setFormData({
        candidateId: "",
        jobId: "",
      });
    }
  }, [initialData]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      candidateId: Number(formData.candidateId),
      jobId: Number(formData.jobId),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <Input
        label="Candidate ID"
        type="number"
        name="candidateId"
        value={formData.candidateId}
        onChange={handleChange}
        placeholder="Enter Candidate ID"
        required
      />

      <Input
        label="Job ID"
        type="number"
        name="jobId"
        value={formData.jobId}
        onChange={handleChange}
        placeholder="Enter Job ID"
        required
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Application"
          : "Create Application"}
      </Button>

    </form>
  );
}

export default ApplicationForm;