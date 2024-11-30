import React from "react";

const Button = ({ backgroundStyle, content, link }) => {
  return (
    <a
      className={`bg-red-50 px-10 py-5 hover:opacity-50 cursor-pointer rounded-xl ${backgroundStyle}`}
    >
      {content}
    </a>
  );
};

export default Button;
