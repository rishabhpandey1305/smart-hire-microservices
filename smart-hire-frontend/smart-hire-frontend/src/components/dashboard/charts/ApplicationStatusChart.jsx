import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

function ApplicationStatusChart({
  applications,
}) {

  const statusMap = {};

  applications.forEach((application) => {

    statusMap[application.status] =
      (statusMap[application.status] || 0) + 1;

  });

  const data = Object.keys(statusMap).map(
    (status) => ({
      name: status,
      value: statusMap[status],
    })
  );

  return (
    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-xl font-semibold mb-6">
        Application Status
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default ApplicationStatusChart;