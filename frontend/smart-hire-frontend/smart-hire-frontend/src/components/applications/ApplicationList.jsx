import ApplicationCard from "./ApplicationCard";
import EmptyApplications from "./EmptyApplications";

function ApplicationList({
  applications,
  onEdit,
  onDelete,
}) {

  if (applications.length === 0) {
    return <EmptyApplications />;
  }

  return (

    <div className="grid gap-6">

      {applications.map((application) => (

        <ApplicationCard
          key={application.id}
          application={application}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      ))}

    </div>

  );

}

export default ApplicationList;