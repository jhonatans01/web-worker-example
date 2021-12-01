import React, { useState } from 'react';
import './App.css';
import userService from '../service/userService';

function App() {
  const [nameToDisplay, setName] = useState('');

  const handeUserInfo = async () => {
    if (navigator.onLine) {
      const { name } = await userService.fetchUserOnline();
      userService.saveUserOffline(name?.first);

      setName(name?.first);
    } else {
      userService.fetchUserOffline();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>{nameToDisplay}</p>
        <button onClick={handeUserInfo}>Encontrar nome</button>
      </header>
    </div>
  );
}

export default App;
