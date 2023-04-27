import React, { useState } from "react";

import FilterCard from "./FilterCard";

const FilterButton = ({ title }) => {
  const [isHidden, setIsHidden] = useState(true);

  const handleClick = () => {
    setIsHidden(false);
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
