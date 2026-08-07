import { useState } from "react";
import toast from "react-hot-toast";

import { uploadResume } from "@/services/candidateService";

function ResumeUpload({
  candidateId,
  onUploadSuccess,
}) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload() {
    if (!file) {
      toast.error("Please select a resume.");
      return;
    }

    try {
      setUploading(true);

      await uploadResume(candidateId, file);

      toast.success("Resume uploaded successfully.");

      setFile(null);

      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error(error);

      toast.error("Unable to upload resume.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mt-4 border-t pt-4">
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </button>
    </div>
  );
}

export default ResumeUpload;