import React, { useState, useEffect } from 'react';
import '../styles/ScreenSizeChecker.css';

const ScreenSizeChecker = () => {
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

  return (
    <div className="screen-size-checker">
      {screenSize.width >= 1024 && screenSize.height >= 780 ? (
        <p>Your screen size is sufficient for viewing the profile page.</p>
      ) : (
        <p>Your screen size is not sufficient for viewing the profile page. Please adjust your screen resolution.</p>
      )}
    </div>
  );
};

export default ScreenSizeChecker;
