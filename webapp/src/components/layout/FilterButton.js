import React, { useState } from "react";

import FilterCard from "./FilterCard";

const FilterButton = ({ title, content }) => {
  const [isHidden, setIsHidden] = useState(true);

  const handleClick = () => {
    setIsHidden(false);
  };

  const handleClose = () => {
    setIsHidden(true);
  };

  return (
    <div>
      {isHidden ? (
        <button onClick={handleClick}>{title}</button>
      ) : (
        <FilterCard />
      )}
    </div>
  );
};

export default FilterButton;
