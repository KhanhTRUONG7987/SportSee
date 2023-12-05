import React, { useState, useEffect } from 'react';
import '../styles/ScreenSizeChecker.css';

const ScreenSizeChecker = ({ children }) => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Initial size on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize.width < 1024 || screenSize.height < 780 ? (
    <div className="screen-size-checker">
      <p>Your screen size is not sufficient for viewing the profile page. Please adjust your screen resolution.</p>
    </div>
  ) : (
    // Render the children (user profile page) if screen size is sufficient
    <>{children}</>
  );
};

export default ScreenSizeChecker;
