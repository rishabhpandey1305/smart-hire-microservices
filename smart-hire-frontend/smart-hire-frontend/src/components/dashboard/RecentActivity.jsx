function RecentActivity({
  jobs,
  applications,
}) {

  const activities = [];

  jobs.slice(0, 3).forEach((job) => {

    activities.push({
      id: `job-${job.id}`,
      text: `New Job Created: ${job.title}`,
      icon: "💼",
    });

  });

  applications
    .slice(0, 3)
    .forEach((application) => {

      activities.push({
        id: `app-${application.id}`,
        text: `Candidate #${application.candidateId} applied for Job #${application.jobId}`,
        icon: "📄",
      });

    });

  return (

    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-xl font-semibold mb-6">

        🕒 Recent Activity

      </h2>

      <div className="space-y-5">

        {activities.map((activity) => (

          <div
            key={activity.id}
            className="flex gap-4 items-start"
          >

            <div className="text-2xl">

              {activity.icon}

            </div>

            <p>

              {activity.text}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default RecentActivity;