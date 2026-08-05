import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CandidateHeader from "@/components/candidates/CandidateHeader";
import CandidateSearch from "@/components/candidates/CandidateSearch";
import CandidateList from "@/components/candidates/CandidateList";
import CandidateModal from "@/components/candidates/CandidateModal";
import CandidateForm from "@/components/candidates/CandidateForm";

import Loading from "@/components/common/Loading";
import ErrorMessage from "@/components/common/ErrorMessage";
import { matchCandidate } from "@/services/aiService";
import AIAnalysisModal from "@/components/ai/AIAnalysisModal";
import AIAnalysisLoader from "@/components/ai/AIAnalysisLoader";
import AIAnalysisCard from "@/components/ai/AIAnalysisCard";

import {
  getCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate,
} from "@/services/candidateService";

import { parseResume } from "@/services/aiService";

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [selectedCandidate, setSelectedCandidate] =
    useState(null);

  /* ---------------- AI STATES ---------------- */

  const [analysisModal, setAnalysisModal] =
    useState(false);

  const [analysisLoading, setAnalysisLoading] =
    useState(false);

  const [analysis, setAnalysis] = useState(null);
  const [matchResult, setMatchResult] =
    useState(null);

  /* ------------------------------------------- */

  useEffect(() => {
    loadCandidates();
  }, []);

  useEffect(() => {
    const query = search.toLowerCase();

    const filtered = candidates.filter((candidate) => {
      return (
        candidate.name.toLowerCase().includes(query) ||
        candidate.email.toLowerCase().includes(query) ||
        candidate.phone.toLowerCase().includes(query) ||
        candidate.education.toLowerCase().includes(query) ||
        candidate.skills.toLowerCase().includes(query)
      );
    });

    setFilteredCandidates(filtered);
  }, [search, candidates]);

  async function loadCandidates() {
    try {
      setLoading(true);

      const data = await getCandidates();

      setCandidates(data);
      setFilteredCandidates(data);
    } catch (error) {
      console.error(error);

      setError("Unable to load candidates.");
    } finally {
      setLoading(false);
    }
  }

  function handleCreate() {
    setSelectedCandidate(null);

    setShowModal(true);
  }

  async function handleCreateCandidate(candidateData) {
    try {
      setCreating(true);

      await createCandidate(candidateData);

      toast.success("Candidate created successfully.");

      setShowModal(false);

      await loadCandidates();
    } catch (error) {
      console.error(error);

      toast.error("Unable to create candidate.");
    } finally {
      setCreating(false);
    }
  }

  function handleEdit(candidate) {
    setSelectedCandidate(candidate);

    setShowModal(true);
  }

  async function handleUpdateCandidate(candidateData) {
    try {
      setCreating(true);

      await updateCandidate(
        selectedCandidate.id,
        candidateData
      );

      toast.success("Candidate updated successfully.");

      setShowModal(false);

      setSelectedCandidate(null);

      await loadCandidates();
    } catch (error) {
      console.error(error);

      toast.error("Unable to update candidate.");
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Delete this candidate?"
    );

    if (!confirmed) return;

    try {
      await deleteCandidate(id);

      toast.success("Candidate deleted.");

      await loadCandidates();
    } catch (error) {
      console.error(error);

      toast.error("Unable to delete candidate.");
    }
  }

  /* =======================================================
     AI RESUME ANALYSIS
  ======================================================= */

  async function handleAnalyze(candidate) {
    if (!candidate.resumeUrl) {
      toast.error("Resume not uploaded.");

      return;
    }

    try {
      setAnalysisModal(true);

      setAnalysisLoading(true);

      setAnalysis(null);
      setMatchResult(null);
      const response = await fetch(
        `http://localhost:8083/${candidate.resumeUrl}`
      );
      if (!response.ok) {
          throw new Error("Unable to fetch resume.");
      }

      const blob = await response.blob();

      const file = new File(
        [blob],
        "resume.pdf",
        {
          type: "application/pdf",
        }
      );

      const result =
        await parseResume(file);

      setAnalysis(result);
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to analyze resume."
      );
    } finally {
      setAnalysisLoading(false);
    }
  }
  async function handleJobSelect(job) {

    if (!job) return;

    try {

      const candidateSkills =
        analysis.skills;

      const jobSkills =
        job.requiredSkills
          .split(",")
          .map(skill => skill.trim());

      const result =
        await matchCandidate(
          candidateSkills,
          jobSkills
        );

      setMatchResult(result);

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to calculate match score."
      );

    }

  }

  /* ======================================================= */

  if (loading) {
    return (
      <Loading message="Loading Candidates..." />
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

        <CandidateHeader
          onCreate={handleCreate}
        />

        <CandidateSearch
          value={search}
          onChange={setSearch}
        />

        <CandidateList
          candidates={filteredCandidates}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRefresh={loadCandidates}
          onAnalyze={handleAnalyze}
        />

      </div>

      <CandidateModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedCandidate(null);
        }}
        title={
          selectedCandidate
            ? "Edit Candidate"
            : "Create Candidate"
        }
      >
        <CandidateForm
          initialData={selectedCandidate}
          onSubmit={
            selectedCandidate
              ? handleUpdateCandidate
              : handleCreateCandidate
          }
          loading={creating}
        />
      </CandidateModal>

      <AIAnalysisModal
        isOpen={analysisModal}
        onClose={() =>
          setAnalysisModal(false)
        }
      >
        {analysisLoading ? (
          <AIAnalysisLoader />
        ) : (
          analysis && (
            <AIAnalysisCard
                analysis={analysis}
                matchResult={matchResult}
                onJobSelect={handleJobSelect}
            />
          )
        )}
      </AIAnalysisModal>
    </>
  );
}

export default Candidates;