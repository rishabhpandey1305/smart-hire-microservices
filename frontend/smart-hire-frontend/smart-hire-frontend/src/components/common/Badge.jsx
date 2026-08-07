function Badge({

  children,

  color = "blue",

}) {

  const colors = {

    blue:
      "bg-blue-100 text-blue-700",

    green:
      "bg-emerald-100 text-emerald-700",

    red:
      "bg-red-100 text-red-700",

    yellow:
      "bg-yellow-100 text-yellow-700",

    gray:
      "bg-slate-100 text-slate-700",

  };

  return (

    <span
      className={`
        inline-flex
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        ${colors[color]}
      `}
    >

      {children}

    </span>

  );

}

export default Badge;