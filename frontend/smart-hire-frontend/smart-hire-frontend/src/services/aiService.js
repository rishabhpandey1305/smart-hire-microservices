import aiApi from "@/api/aiApi";

export const parseResume = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await aiApi.post(
    "/parse-resume",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const matchCandidate = async (
  candidateSkills,
  jobSkills
) => {

  const response = await aiApi.post(
    "/match",
    {
      candidateSkills,
      jobSkills,
    }
  );

  return response.data;

};

export const rankCandidates = async (
  candidates
) => {

  const response = await aiApi.post(
    "/rank-candidates",
    {
      candidates,
    }
  );

  return response.data;

};