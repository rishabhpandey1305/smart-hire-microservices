import Button from "@/components/common/Button";

function ApplicationHeader({ onCreate }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

      <div>

        <h1 className="text-4xl font-bold text-slate-800">
          📄 Applications
        </h1>

        <p className="text-slate-500 mt-3 text-lg">
          Track and manage all job applications from one place.
        </p>

      </div>

      <Button
        onClick={onCreate}
        className="w-full lg:w-auto"
      >
        + Create Application
      </Button>

    </div>
  );
}

export default ApplicationHeader;