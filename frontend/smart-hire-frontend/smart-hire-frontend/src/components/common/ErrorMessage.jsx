function ErrorMessage({ message }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
      <p className="text-red-600 font-medium">
        {message}
      </p>
    </div>
  );
}

export default ErrorMessage;