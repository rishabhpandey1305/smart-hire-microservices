import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Input from "@/components/ui/Input";

function PasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      {...props}
      type={showPassword ? "text" : "password"}
      rightElement={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-500 hover:text-blue-600"
        >
          {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </button>
      }
    />
  );
}

export default PasswordInput;