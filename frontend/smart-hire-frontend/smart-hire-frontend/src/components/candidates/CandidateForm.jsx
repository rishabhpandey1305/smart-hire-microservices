import { useEffect, useState } from "react";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

function CandidateForm({
  onSubmit,
  loading = false,
  initialData,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        education: initialData.education || "",
        experience: initialData.experience || "",
        skills: initialData.skills || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        education: "",
        experience: "",
        skills: "",
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
      experience: Number(formData.experience),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <Input
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Rishabh Pandey"
        required
      />

      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="rishabh@gmail.com"
        required
      />

      <Input
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+91 9876543210"
        required
      />

      <Input
        label="Education"
        name="education"
        value={formData.education}
        onChange={handleChange}
        placeholder="B.Tech Information Technology"
        required
      />

      <Input
        label="Experience (Years)"
        type="number"
        name="experience"
        value={formData.experience}
        onChange={handleChange}
        placeholder="2"
        required
      />

      <div>
        <label className="block mb-2 font-medium text-slate-700">
          Skills
        </label>

        <textarea
          rows="4"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="Java, Spring Boot, React, MySQL..."
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

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Candidate"
          : "Create Candidate"}
      </Button>
    </form>
  );
}

export default CandidateForm;