import jobApi from "@/api/jobApi";

export const getJobs = async () => {
  const response = await jobApi.get("/jobs");
  return response.data;
};

export const getJob = async (id) => {
  const response = await jobApi.get(`/jobs/${id}`);
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await jobApi.post("/jobs", jobData);
  return response.data;
};

export const updateJob = async (id, jobData) => {
  const response = await jobApi.put(`/jobs/${id}`, jobData);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await jobApi.delete(`/jobs/${id}`);
  return response.data;
};