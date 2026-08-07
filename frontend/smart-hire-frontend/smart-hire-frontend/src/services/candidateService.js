import candidateApi from "@/api/candidateApi";

export const getCandidates = async () => {
  const response = await candidateApi.get("/candidates");
  return response.data;
};

export const getCandidate = async (id) => {
  const response = await candidateApi.get(`/candidates/${id}`);
  return response.data;
};

export const createCandidate = async (candidateData) => {
  const response = await candidateApi.post(
    "/candidates",
    candidateData
  );

  return response.data;
};

export const updateCandidate = async (id, candidateData) => {
  const response = await candidateApi.put(
    `/candidates/${id}`,
    candidateData
  );

  return response.data;
};

export const deleteCandidate = async (id) => {
  const response = await candidateApi.delete(
    `/candidates/${id}`
  );

  return response.data;
};

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