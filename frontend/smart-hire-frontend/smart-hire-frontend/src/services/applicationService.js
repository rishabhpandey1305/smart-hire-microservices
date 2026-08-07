import applicationApi from "@/api/applicationApi";

export const getApplications = async () => {
  const response = await applicationApi.get("/applications");
  return response.data;
};

export const getApplication = async (id) => {
  const response = await applicationApi.get(`/applications/${id}`);
  return response.data;
};

export const createApplication = async (applicationData) => {
  const response = await applicationApi.post(
    "/applications",
    applicationData
  );

  return response.data;
};

export const updateStatus = async (id, status) => {
  const response = await applicationApi.put(
    `/applications/${id}/status`,
    {
      status,
    }
  );

  return response.data;
};

export const deleteApplication = async (id) => {
  const response = await applicationApi.delete(
    `/applications/${id}`
  );

  return response.data;
};

export const getApplicationsByCandidate = async (id) => {
  const response = await applicationApi.get(
    `/applications/candidate/${id}`
  );

  return response.data;
};

export const getApplicationsByJob = async (id) => {
  const response = await applicationApi.get(
    `/applications/job/${id}`
  );

  return response.data;
};