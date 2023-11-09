import React from 'react';
import '../styles/UserMenuVertical.css';
import meditationIcon from '../assets/images/meditation.png';
import swimmingIcon from '../assets/images/swimming.png';
import bikingIcon from '../assets/images/biking.png';
import weightliftingIcon from '../assets/images/weightlifting.png';

const UserMenuVertical = () => {
  return (
    <div className="user-menu-vertical">
      <div className="nav-bar-vertical">
        <div
          className="nav-item-vertical"
          onClick={() => console.log("Navigate to Meditation")}
        >
          <img src={meditationIcon} alt="Meditation" />
        </div>
        <div
          className="nav-item-vertical"
          onClick={() => console.log("Navigate to Swimming")}
        >
          <img src={swimmingIcon} alt="Swimming" />
        </div>
        <div
          className="nav-item-vertical"
          onClick={() => console.log("Navigate to Biking")}
        >
          <img src={bikingIcon} alt="Biking" />
        </div>
        <div
          className="nav-item-vertical"
          onClick={() => console.log("Navigate to Weightlifting")}
        >
          <img src={weightliftingIcon} alt="Weightlifting" />
        </div>
      </div>
      <p>Copyright, SportSee 2020</p>
    </div>
  );
};

export default UserMenuVertical;
