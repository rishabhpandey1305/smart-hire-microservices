function StatCard({
  title,
  value,
  icon,
  color,
}) {

  return (

    <div className={`

      bg-gradient-to-r
      ${color}
      rounded-2xl
      p-6
      text-white
      shadow-lg
      hover:scale-105
      transition-all
      duration-300

    `}>

      <div className="flex justify-between items-center">

        <div>

          <p className="text-white/80">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>

        </div>

        <div className="text-5xl">

          {icon}

        </div>

      </div>

    </div>

  );

}

export default StatCard;