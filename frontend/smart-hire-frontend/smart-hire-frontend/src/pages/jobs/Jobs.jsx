import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import JobHeader from "@/components/jobs/JobHeader";
import JobSearch from "@/components/jobs/JobSearch";
import JobList from "@/components/jobs/JobList";
import JobModal from "@/components/jobs/JobModal";
import JobForm from "@/components/jobs/JobForm";

import Loading from "@/components/common/Loading";
import ErrorMessage from "@/components/common/ErrorMessage";

import CandidateRankingModal from "@/components/ai/CandidateRankingModal";
import CandidateRankingCard from "@/components/ai/CandidateRankingCard";

import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "@/services/jobService";

import { getCandidates } from "@/services/candidateService";

import {
  matchCandidate,
  rankCandidates,
} from "@/services/aiService";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // AI Ranking
  const [rankingModal, setRankingModal] = useState(false);
  const [rankingLoading, setRankingLoading] = useState(false);
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    const query = search.toLowerCase();

    const filtered = jobs.filter((job) => {
      return (
        (job.title || "")
          .toLowerCase()
          .includes(query) ||
        (job.location || "")
          .toLowerCase()
          .includes(query) ||
        (job.requiredSkills || "")
          .toLowerCase()
          .includes(query)
      );
    });

    setFilteredJobs(filtered);
  }, [jobs, search]);

  async function loadJobs() {
    try {
      setLoading(true);

      const data = await getJobs();

      setJobs(data);
      setFilteredJobs(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load jobs.");
    } finally {
      setLoading(false);
    }
  }

  function handleCreate() {
    setSelectedJob(null);
    setShowModal(true);
  }

  function handleEdit(job) {
    setSelectedJob(job);
    setShowModal(true);
  }

  async function handleCreateJob(jobData) {
    try {
      setCreating(true);

      await createJob(jobData);

      toast.success("Job created successfully.");

      setShowModal(false);

      await loadJobs();
    } catch (error) {
      console.error(error);
      toast.error("Unable to create job.");
    } finally {
      setCreating(false);
    }
  }

  async function handleUpdateJob(jobData) {
    try {
      setCreating(true);

      await updateJob(selectedJob.id, jobData);

      toast.success("Job updated successfully.");

      setShowModal(false);
      setSelectedJob(null);

      await loadJobs();
    } catch (error) {
      console.error(error);
      toast.error("Unable to update job.");
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Delete this job?"
    );

    if (!confirmed) return;

    try {
      await deleteJob(id);

      toast.success("Job deleted successfully.");

      await loadJobs();
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete job.");
    }
  }

  // AI Candidate Ranking
  async function handleRank(job) {
    try {
      setRankingModal(true);
      setRankingLoading(true);
      setRankings([]);

      const candidates = await getCandidates();

      const jobSkills = (job.requiredSkills || "")
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      const rankingInput = await Promise.all(
        candidates.map(async (candidate) => {
          const candidateSkills = (candidate.skills || "")
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean);

          const result = await matchCandidate(
            candidateSkills,
            jobSkills
          );

          return {
            name: candidate.name,
            matchScore: result.matchScore,
          };
        })
      );

      const ranked =
        await rankCandidates(rankingInput);

      setRankings(ranked);
    } catch (error) {
      console.error(error);
      toast.error("Unable to rank candidates.");
    } finally {
      setRankingLoading(false);
    }
  }

  if (loading) {
    return (
      <Loading message="Loading Jobs..." />
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
        <JobHeader onCreate={handleCreate} />

        <JobSearch
          value={search}
          onChange={setSearch}
        />

        <JobList
          jobs={filteredJobs}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRank={handleRank}
        />
      </div>

      <JobModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedJob(null);
        }}
        title={
          selectedJob
            ? "Edit Job"
            : "Create Job"
        }
      >
        <JobForm
          initialData={selectedJob}
          onSubmit={
            selectedJob
              ? handleUpdateJob
              : handleCreateJob
          }
          loading={creating}
        />
      </JobModal>

      <CandidateRankingModal
        isOpen={rankingModal}
        onClose={() =>
          setRankingModal(false)
        }
      >
        {rankingLoading ? (
          <div className="py-16 text-center">
            <h2 className="text-2xl font-bold">
              🤖 AI Ranking Candidates...
            </h2>

            <p className="mt-4 text-slate-500">
              Comparing candidates with
              job requirements...
            </p>
          </div>
        ) : (
          <CandidateRankingCard
            rankings={rankings}
          />
        )}
      </CandidateRankingModal>
    </>
  );
}

export default Jobs;