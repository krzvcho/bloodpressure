import React from "react";

const TableViewIcon: React.FC<{ color?: string }> = ({ color = "currentColor" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke={color} strokeWidth="2"/>
    <rect x="3" y="9" width="18" height="2" fill={color} />
    <rect x="9" y="5" width="2" height="14" fill={color} />
    <rect x="15" y="5" width="2" height="14" fill={color} />
  </svg>
);

export default TableViewIcon;
