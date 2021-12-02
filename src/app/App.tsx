import React, { useEffect, useState } from 'react';
import './App.css';
import userService from '../service/userService';

function handleMessage(listener: (event: MessageEvent<any>) => void) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', listener);
  }
}

function removeHandleMessage(listener: (event: MessageEvent<any>) => void) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.removeEventListener('message', listener);
  }
}

function App() {
  const [nameToDisplay, setName] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  function messageListener(event: MessageEvent<any>) {
    if (event.data) setToastMessage(event.data);
  }

  useEffect(() => {
    handleMessage(messageListener);
    return () => removeHandleMessage(messageListener);
  }, []);

  async function handeUserInfo() {
    if (navigator.onLine) {
      const { name } = await userService.fetchUserOnline();
      userService.saveUserOffline(name?.first);

      setName(name?.first);
    } else {
      const name = userService.fetchUserOffline();

      setName(name || '');
    }
  }

  return (
    <div className="App">
      <div id="snackbar" className={toastMessage ? 'show' : ''}>{toastMessage}</div>
      <header className="App-header">
        <p>{nameToDisplay}</p>
        <button className="button" onClick={handeUserInfo}>Encontrar nome</button>
      </header>
    </div>
  );
}

export default App;
