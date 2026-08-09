import candidateApi from "@/api/candidateApi";

// Get all candidates
export const getCandidates = async () => {
  const response = await candidateApi.get("/candidates");
  return response.data;
};

// Get candidate by id
export const getCandidate = async (id) => {
  const response = await candidateApi.get(`/candidates/${id}`);
  return response.data;
};

// Create candidate
export const createCandidate = async (candidateData) => {
  const response = await candidateApi.post(
    "/candidates",
    candidateData
  );
  return response.data;
};

// Update candidate
export const updateCandidate = async (id, candidateData) => {
  const response = await candidateApi.put(
    `/candidates/${id}`,
    candidateData
  );
  return response.data;
};

// Delete candidate
export const deleteCandidate = async (id) => {
  const response = await candidateApi.delete(
    `/candidates/${id}`
  );
  return response.data;
};

// Upload resume
export const uploadResume = async (id, file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await candidateApi.post(
    `/candidates/${id}/resume`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Analyze resume using AI
export const analyzeResume = async (id) => {
  const response = await candidateApi.post(
    `/candidates/${id}/analyze`
  );

  return response.data;
};