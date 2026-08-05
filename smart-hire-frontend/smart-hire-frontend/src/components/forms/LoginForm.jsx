import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { login } from "@/services/authService";
import { saveToken } from "@/utils/tokenStorage";
import loginSchema from "@/validation/loginSchema";
import useAuth from "@/hooks/useAuth";

function LoginForm() {
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


const onSubmit = async (data) => {
  try {
    const response = await login(data);

    loginUser(response.token);
    console.log("Token received:", response.token);

    navigate("/", { replace: true });

  } catch (error) {
    console.error(error);

    if (error.response) {
      toast.error(
        error.response?.data?.message ||
        "Invalid email or password"
      );
    } else {
      toast.error("Unable to connect to the server.");
    }
  }
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      <Button
        type="submit"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}

export default LoginForm;