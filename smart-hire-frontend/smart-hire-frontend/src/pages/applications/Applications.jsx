import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ApplicationHeader from "@/components/applications/ApplicationHeader";
import ApplicationSearch from "@/components/applications/ApplicationSearch";
import ApplicationList from "@/components/applications/ApplicationList";
import ApplicationModal from "@/components/applications/ApplicationModal";
import ApplicationForm from "@/components/applications/ApplicationForm";
import StatusModal from "@/components/applications/StatusModal";
import StatusForm from "@/components/applications/StatusForm";

import Loading from "@/components/common/Loading";
import ErrorMessage from "@/components/common/ErrorMessage";

import {
  getApplications,
  createApplication,
  updateStatus,
  deleteApplication,
} from "@/services/applicationService";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);

  const [search, setSearch] = useState("");

  const [candidateFilter, setCandidateFilter] = useState("");
  const [jobFilter, setJobFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);

  const [selectedApplication, setSelectedApplication] =
    useState(null);

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    const query = search.toLowerCase();

    const filtered = applications.filter((application) => {
      const matchesSearch =
        application.candidateId
          .toString()
          .includes(query) ||
        application.jobId
          .toString()
          .includes(query) ||
        application.status
          .toLowerCase()
          .includes(query);

      const matchesCandidate =
        candidateFilter === "" ||
        application.candidateId.toString() ===
          candidateFilter;

      const matchesJob =
        jobFilter === "" ||
        application.jobId.toString() === jobFilter;

      return (
        matchesSearch &&
        matchesCandidate &&
        matchesJob
      );
    });

    setFilteredApplications(filtered);
  }, [
    search,
    applications,
    candidateFilter,
    jobFilter,
  ]);

  async function loadApplications() {
    try {
      setLoading(true);

      const data = await getApplications();

      setApplications(data);
      setFilteredApplications(data);
    } catch (error) {
      console.error(error);

      setError("Unable to load applications.");
    } finally {
      setLoading(false);
    }
  }

  function handleCreate() {
    setShowModal(true);
  }

  async function handleCreateApplication(
    applicationData
  ) {
    try {
      setCreating(true);

      await createApplication(applicationData);

      toast.success(
        "Application created successfully."
      );

      setShowModal(false);

      await loadApplications();
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to create application."
      );
    } finally {
      setCreating(false);
    }
  }

  function handleEdit(application) {
    setSelectedApplication(application);

    setStatusModal(true);
  }

  async function handleUpdateStatus(status) {
    try {
      setUpdating(true);

      await updateStatus(
        selectedApplication.id,
        status
      );

      toast.success(
        "Status updated successfully."
      );

      setStatusModal(false);

      await loadApplications();
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to update status."
      );
    } finally {
      setUpdating(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    try {
      await deleteApplication(id);

      toast.success(
        "Application deleted successfully."
      );

      await loadApplications();
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to delete application."
      );
    }
  }

  if (loading) {
    return (
      <Loading message="Loading Applications..." />
    );
  }

  if (error) {
    return (
      <ErrorMessage message={error} />
    );
  }

  return (
    <>
      <div className="space-y-6">
        <ApplicationHeader
          onCreate={handleCreate}
        />

        <ApplicationSearch
          value={search}
          onChange={setSearch}
        />

        <div className="flex gap-4 flex-wrap">
          <input
            type="number"
            placeholder="Candidate ID"
            value={candidateFilter}
            onChange={(e) =>
              setCandidateFilter(e.target.value)
            }
            className="border rounded-lg px-4 py-2"
          />

          <input
            type="number"
            placeholder="Job ID"
            value={jobFilter}
            onChange={(e) =>
              setJobFilter(e.target.value)
            }
            className="border rounded-lg px-4 py-2"
          />

          <button
            onClick={() => {
              setCandidateFilter("");
              setJobFilter("");
            }}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Clear Filters
          </button>
        </div>

        <ApplicationList
          applications={filteredApplications}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <ApplicationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Create Application"
      >
        <ApplicationForm
          onSubmit={handleCreateApplication}
          loading={creating}
        />
      </ApplicationModal>

      <StatusModal
        isOpen={statusModal}
        onClose={() =>
          setStatusModal(false)
        }
      >
        {selectedApplication && (
          <StatusForm
            currentStatus={
              selectedApplication.status
            }
            loading={updating}
            onSubmit={handleUpdateStatus}
          />
        )}
      </StatusModal>
    </>
  );
}

export default Applications;