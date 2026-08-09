import { useRef, useState } from "react";
import toast from "react-hot-toast";

import { uploadResume } from "@/services/candidateService";

function ResumeUpload({
  candidateId,
  onUploadSuccess,
}) {
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);

  async function handleUpload() {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      toast.error("Please select a resume.");
      return;
    }

    try {
      setUploading(true);

      await uploadResume(candidateId, file);

      toast.success("Resume uploaded successfully.");

      fileInputRef.current.value = "";

      if (onUploadSuccess) {
        await onUploadSuccess();
      }

    } catch (error) {
      console.error(error);

      toast.error("Unable to upload resume.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
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