import { useEffect, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentJobs from "@/components/dashboard/RecentJobs";
import RecentApplications from "@/components/dashboard/RecentApplications";

import { getJobs } from "@/services/jobService";
import { getApplications } from "@/services/applicationService";
import { getCandidates } from "@/services/candidateService";
import ApplicationStatusChart
from "@/components/dashboard/charts/ApplicationStatusChart";
import TopCandidates from "@/components/dashboard/TopCandidates";
import RecentActivity from "@/components/dashboard/RecentActivity";

import TopSkillsChart
from "@/components/dashboard/charts/TopSkillsChart";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const [jobsResult, applicationsResult, candidatesResult] =
        await Promise.allSettled([
          getJobs(),
          getApplications(),
          getCandidates(),
        ]);

      const jobsData =
        jobsResult.status === "fulfilled"
          ? jobsResult.value
          : [];

      const applicationsData =
        applicationsResult.status === "fulfilled"
          ? applicationsResult.value
          : [];

      const candidatesData =
        candidatesResult.status === "fulfilled"
          ? candidatesResult.value
          : [];

      setJobs(jobsData);
      setApplications(applicationsData);
      setCandidates(candidatesData);

    } catch (err) {

      console.error(err);

      setError("Failed to load dashboard.");

    } finally {

      setLoading(false);

    }
  }

  if (loading) {
    return (
      <div className="text-center py-20 text-lg">
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-20">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHeader />

      <StatsGrid
        jobs={jobs}
        applications={applications}
        candidates={candidates}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          <ApplicationStatusChart
              applications={applications}
          />

          <TopSkillsChart
              candidates={candidates}
          />

      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        <RecentActivity
          jobs={jobs}
          applications={applications}
        />

        <TopCandidates
          candidates={candidates}
        />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentJobs jobs={jobs} />

        <RecentApplications
          applications={applications}
        />
      </div>
    </div>
  );
}

export default Dashboard;