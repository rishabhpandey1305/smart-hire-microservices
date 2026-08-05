import { Link } from "react-router-dom";

import AuthCard from "@/components/ui/AuthCard";
import LoginForm from "@/components/forms/LoginForm";

function Login() {
  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Login to your Smart Hire account"
    >
      <LoginForm />

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-blue-600 hover:underline"
        >
          Register
        </Link>
      </p>
    </AuthCard>
  );
}

export default Login;