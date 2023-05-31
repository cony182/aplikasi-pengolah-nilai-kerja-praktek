import React from "react";

const Button = (props) => {
   return (
      <button className={props.className ? props.className : "px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900"}>{props.name}</button>
   );
};

export default Button;
