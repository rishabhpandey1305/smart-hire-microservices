import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-blue-600 p-12 text-white">
          <h1 className="mb-4 text-4xl font-bold">
            AI-Based Smart Hire
          </h1>

          <p className="text-center text-lg text-blue-100">
            Streamline hiring with AI-powered recruitment,
            resume analysis, and candidate ranking.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;