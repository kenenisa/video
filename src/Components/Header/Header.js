import React from 'react'
import './Header.css';
//
export default function Header() {
    return (
         <header className="mdl-layout__header ">
    <div className="mdl-layout__header-row">
      <span className="mdl-layout-title">Title</span>
      <div className="mdl-layout-spacer"></div>
    
          <button id="demo-menu-lower-right"
                  className="mdl-button mdl-js-button mdl-button--icon">
            <i className="material-icons">more_vert</i>
          </button>

          <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
              htmlFor="demo-menu-lower-right">
            <li className="mdl-menu__item">Some Action</li>
            <li className="mdl-menu__item">Another Action</li>
            <li disabled className="mdl-menu__item">Disabled Action</li>
            <li className="mdl-menu__item">Yet Another Action</li>
          </ul>
  
    </div>
  </header>
    )
}
