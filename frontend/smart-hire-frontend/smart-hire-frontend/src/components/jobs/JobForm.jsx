import { useEffect, useState } from "react";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

function JobForm({
  onSubmit,
  loading = false,
  initialData,
}) {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requiredSkills: "",
    location: "",
    salary: "",
  });

  useEffect(() => {

    if (initialData) {

      setFormData({
        title: initialData.title || "",
        description:
          initialData.description || "",
        requiredSkills:
          initialData.requiredSkills || "",
        location:
          initialData.location || "",
        salary:
          initialData.salary || "",
      });

    } else {

      setFormData({
        title: "",
        description: "",
        requiredSkills: "",
        location: "",
        salary: "",
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
      ...formData,
      salary: Number(formData.salary),
    });

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <Input
        label="Job Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Java Backend Developer"
        required
      />

      <div>

        <label className="block mb-2 font-medium text-slate-700">
          Job Description
        </label>

        <textarea
          rows="5"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the job role..."
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            outline-none
            transition
          "
          required
        />

      </div>

      <Input
        label="Required Skills"
        name="requiredSkills"
        value={formData.requiredSkills}
        onChange={handleChange}
        placeholder="Java, Spring Boot, MySQL"
        required
      />

      <Input
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Noida"
        required
      />

      <Input
        label="Salary"
        type="number"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
        placeholder="1200000"
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
          ? "Update Job"
          : "Create Job"}
      </Button>

    </form>

  );

}

export default JobForm;