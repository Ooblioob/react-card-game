import React from "react";

const TopNav = (props) => {
  return (
    <div className="w3-bar w3-top w3-black w3-large" style={{ zIndex: "4" }}>
      <button
        className="w3-bar-item w3-button w3-hover-none w3-hover-text-light-grey"
        onClick={props.menuClickHandler}
      >
        <i className="fa fa-bars"></i>  Menu
      </button>

      <a
        className="w3-bar-item w3-right w3-button"
        href="https://github.com/Ooblioob/react-card-game"
      >
        <i className="fa fa-github"></i>
      </a>
      <a
        className="w3-bar-item w3-right w3-button"
        href="https://github.com/Ooblioob/react-card-game/blob/master/README.md"
      >
        <i className="fa fa-book"></i> Docs
      </a>
    </div>
  );
};

export default TopNav;
