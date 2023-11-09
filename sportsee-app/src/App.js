import React from 'react';
import ScreenSizeChecker from './utils/ScreenSizeChecker.jsx';
import UserMenuHorizontal from './components/UserMenuHorizontal.jsx';
import UserMenuVertical from './components/UserMenuVertical.jsx';

function App() {
  return (
    <div className="App">
      <ScreenSizeChecker />
      <UserMenuHorizontal />
      <UserMenuVertical />
    </div>
  );
}

export default App;
