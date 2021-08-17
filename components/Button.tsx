import { motion } from "framer-motion";
import React from "react";

const Button = (props: {
  onClick: React.MouseEventHandler<HTMLSpanElement>;
  children: JSX.Element;
}): JSX.Element => {
  const { onClick, children } = props;
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-[#262A2B] text-white p-5 rounded-xl mb-8 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </motion.span>
  );
};

export default Button;
