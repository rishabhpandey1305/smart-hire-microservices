function Loading({ message = "Loading..." }) {
  return (
    <div className="flex items-center justify-center py-16">
      <p className="text-slate-500 text-lg">
        {message}
      </p>
    </div>
  );
}

export default Loading;