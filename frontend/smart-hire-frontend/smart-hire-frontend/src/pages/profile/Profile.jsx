function Profile() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-slate-900">
        Profile
      </h1>

      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-6xl">🚧</div>

        <h2 className="text-2xl font-semibold text-slate-900">
          Coming Soon
        </h2>

        <p className="mt-2 max-w-md text-slate-500">
          Profile features will be available here in a future update.
        </p>
      </div>
    </div>
  );
}

export default Profile;