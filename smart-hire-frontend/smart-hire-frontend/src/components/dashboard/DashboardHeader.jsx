function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (

  <div className="flex justify-between items-center bg-white rounded-2xl shadow-sm border p-8">

      <div>

          <h1 className="text-4xl font-bold">

              👋 Welcome Back Recruiter

          </h1>

          <p className="text-slate-500 mt-3">

              Manage your hiring pipeline
              with AI-powered insights.

          </p>

      </div>

      <div className="text-right">

          <p className="text-slate-500">

              Today

          </p>

          <h2 className="font-semibold text-lg">

              {today}

          </h2>

      </div>

  </div>

  );
}

export default DashboardHeader;