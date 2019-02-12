import React from "react";
import "./List.css";

export function Reviews({ children }) {
  return (
    <div className="list-overflow-container" style={{width: 400, height: 400, backgroundColor: '#607d8b'}}>
      <ul className="list-group">{children}</ul>
    </div>
  );
}
