import React from "react";
import config from "../config";

const Header = ({ selected, updateSelection }) => (
  <header>
    <nav>
      <ul>
        {config.pages.map(p => (
          <li key={p[0]}>
            <button
              className={selected === p ? "selected" : ""}
              onClick={() => updateSelection(p)}
            >
              {p[0]}
            </button>
          </li>
        ))}
      </ul>
    </nav>
    <h2>{selected[1]}</h2>
  </header>
);

export default Header;
