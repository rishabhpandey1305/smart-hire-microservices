import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { register as registerUser } from "@/services/authService";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {

      const response = await registerUser({
        name: data.fullName,
        email: data.email,
        password: data.password,
        role: "CANDIDATE"
      });

      toast.success(response.message);

      navigate("/login", { replace: true });

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        required
        {...register("fullName")}
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        required
        {...register("email")}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Create a password"
        required
        {...register("password")}
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        required
        {...register("confirmPassword")}
      />

      <Button
        type="submit"
        fullWidth
      >
        Create Account
      </Button>
    </form>
  );
}

export default RegisterForm;