import React from "react";

export default function Navbar({ setPage, currentPage }) {
  return (
    <div className="nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
        <div className="brand">Recipe Webapp</div>
      </div>
      <div className="nav-buttons" style={{ gap: '0' }}>
        <button 
          onClick={() => setPage("home")}
          className={currentPage === "home" ? "nav-tab-active" : "nav-tab"}
        >
          Home
        </button>
        <button 
          onClick={() => setPage("scan")}
          className={currentPage === "scan" ? "nav-tab-active" : "nav-tab"}
        >
          Scan Food
        </button>
      </div>
    </div>
  );
}
