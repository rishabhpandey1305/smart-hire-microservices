import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function TopSkillsChart({
  candidates,
}) {

  const skills = {};

  candidates.forEach((candidate) => {

    candidate.skills
      .split(",")
      .forEach((skill) => {

        const key = skill.trim();

        skills[key] =
          (skills[key] || 0) + 1;

      });

  });

  const data =
    Object.keys(skills).map((skill) => ({
      skill,
      count: skills[skill],
    }));

  return (

    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-xl font-semibold mb-6">
        Top Skills
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="skill" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#2563eb"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default TopSkillsChart;