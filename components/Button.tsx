import React from "react";

const Button = (props: {
  onClick: React.MouseEventHandler<HTMLSpanElement>;
  children: JSX.Element;
}): JSX.Element => {
  const { onClick, children } = props;
  return (
    <span
      className="bg-[#262A2B] text-white p-5 rounded-xl mb-8 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default Button;
