import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50">
      <h1 className="text-6xl font-bold text-slate-900">404</h1>

      <p className="text-lg text-slate-600">
        Page not found
      </p>

      <Link
        to="/"
        className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}