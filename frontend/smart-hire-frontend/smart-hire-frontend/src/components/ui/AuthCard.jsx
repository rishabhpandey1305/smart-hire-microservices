function AuthCard({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

      <div className="text-center mb-8">

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-600 text-2xl font-bold text-white">
          SH
        </div>

        <h1 className="text-3xl font-bold text-gray-800">
          {title}
        </h1>

        <p className="mt-2 text-gray-500">
          {subtitle}
        </p>

      </div>

      {children}

    </div>
  );
}

export default AuthCard;