import { Link } from "react-router-dom";

import AuthCard from "@/components/ui/AuthCard";
import RegisterForm from "@/components/forms/RegisterForm";

function Register() {
  return (
    <AuthCard
      title="Create Account"
      subtitle="Join SmartHire and start your journey"
    >
      <RegisterForm />

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </AuthCard>
  );
}

export default Register;