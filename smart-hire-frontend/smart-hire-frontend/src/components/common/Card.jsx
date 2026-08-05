function Card({

  children,

  className = "",

}) {

  return (

    <div
      className={`
        bg-white
        rounded-2xl
        shadow-sm
        border
        border-slate-200
        p-6
        hover:shadow-lg
        transition-all
        duration-300
        ${className}
      `}
    >

      {children}

    </div>

  );

}

export default Card;