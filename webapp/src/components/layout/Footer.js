import React from "react";

const Footer = ({ themeStyle }) => {
  const classTheme =
    themeStyle === "dark"
      ? "fixed-bottom bg-dark stack-top"
      : "fixed-bottom bg-light stack-top";

  return (
    <footer className={classTheme}>
      <div className="text-center p-3">
        <span className="text-muted">LoMap application.</span>
      </div>
    </footer>
  );
};

export default Footer;
