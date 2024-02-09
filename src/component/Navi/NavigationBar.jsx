import React, { useState } from "react";
import "./FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Wrapper, StyledNav, NavLink } from "./NavigationBar.styled";

const NavigationBar = ({ setNavigationBarHeight }) => {
  const [activeNav, setActiveNav] = useState(localStorage.getItem('activeNav') || 'home');

  const handleClick = (navItem) => {
    setActiveNav(navItem);
    localStorage.setItem('activeNav', navItem);
  }

  return (
    <Wrapper>
      <StyledNav>
        <NavLink to="/" onClick={() => handleClick('home')}>
          <div>
            <FontAwesomeIcon
              icon="house"
              style={{ fontSize: '1.5em' }}
              className={activeNav === 'home' ? "active" : "nav-item"}
            />
            <p className={activeNav === 'home' ? "active" : "nav-item"}>홈</p>
          </div>
        </NavLink>
        <NavLink to="/reservation" onClick={() => handleClick('reservation')}>
          <div>
            <FontAwesomeIcon
              icon="calendar-check"
              style={{ fontSize: '1.5em' }}
              className={activeNav === 'reservation' ? "active" : "nav-item"}
            />
            <p className={activeNav === 'reservation' ? "active" : "nav-item"}>예약</p>
          </div>
        </NavLink>
        <NavLink to="/map" onClick={() => handleClick('map')}>
          <div>
            <FontAwesomeIcon
              icon="map-location-dot"
              style={{ fontSize: '1.5em' }}
              className={activeNav === 'map' ? "active" : "nav-item"}
            />
            <p className={activeNav === 'map' ? "active" : "nav-item"}>지도 </p>
          </div>
        </NavLink>
        <NavLink to="/mypage" onClick={() => handleClick('mypage')}>
          <div>
            <FontAwesomeIcon
              icon="circle-user"
              style={{ fontSize: '1.5em' }}
              className={activeNav === 'mypage' ? "active" : "nav-item"}
            />
            <p className={activeNav === 'mypage' ? "active" : "nav-item"}>마이페이지</p>
          </div>
        </NavLink>
      </StyledNav>
    </Wrapper>
  );
};

export default NavigationBar;
