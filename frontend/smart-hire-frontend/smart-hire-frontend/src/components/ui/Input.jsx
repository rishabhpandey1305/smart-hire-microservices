import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      placeholder,
      name,
      value,
      onChange,
      onBlur,
      error,
      required = false,
      disabled = false,
      rightElement,
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={name}
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={`
              w-full
              rounded-lg
              border
              px-4
              py-3
              pr-12
              outline-none
              transition

              ${
                error
                  ? "border-red-500 focus:ring-2 focus:ring-red-300"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-300"
              }

              ${
                disabled
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-white"
              }
            `}
          />

          {rightElement && (
            <div className="absolute inset-y-0 right-4 flex items-center">
              {rightElement}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;