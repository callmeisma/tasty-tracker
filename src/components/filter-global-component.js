import React from "react";

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <input
      value={filter || ""}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="Search"
      style={{ width: "75%" }}
      className="p-1 text-center"
    />
  );
};
