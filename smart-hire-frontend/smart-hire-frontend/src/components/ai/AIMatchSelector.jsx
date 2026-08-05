import { useEffect, useState } from "react";
import { getJobs } from "@/services/jobService";

function AIMatchSelector({
  onSelect,
}) {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    async function loadJobs() {

      const data = await getJobs();

      setJobs(data);

    }

    loadJobs();

  }, []);

  return (

    <select
      onChange={(e) => {

        const job = jobs.find(
          j => j.id === Number(e.target.value)
        );

        onSelect(job);

      }}
      className="w-full border rounded-lg px-4 py-3"
    >

      <option value="">
        Select Job
      </option>

      {jobs.map(job => (

        <option
          key={job.id}
          value={job.id}
        >
          {job.title}
        </option>

      ))}

    </select>

  );

}

export default AIMatchSelector;