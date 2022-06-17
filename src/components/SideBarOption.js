import React from "react";
import "./SideBarOption.css";

export default function SideBarOption({ Icon, title, number, selected }) {
  return (
    <div className={`sideBarOption ${selected && "sidebarOption_active"}`}>
      <Icon />
      <h3>{title}</h3>
      <p>{number}</p>
    </div>
  );
}
