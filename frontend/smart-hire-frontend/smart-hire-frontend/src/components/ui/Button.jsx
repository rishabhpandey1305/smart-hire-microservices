function Button({
  children,
  type = "button",
  variant = "primary",
  fullWidth = false,
  disabled = false,
  onClick,
}) {
  const baseClasses =
    "px-4 py-2 rounded-lg font-medium transition duration-200 focus:outline-none focus:ring-2";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300",

    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300",

    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {children}
    </button>
  );
}

export default Button;