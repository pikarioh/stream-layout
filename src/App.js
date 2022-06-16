import './App.css';
import State from './components/State';
import Telemetry from './components/Telemetry';
import Timer from './components/Timer';
import { useStopwatch } from 'react-timer-hook';
import { useEffect, useState } from 'react';


const socket = new WebSocket("ws://localhost:8085");

socket.addEventListener('open', (_) => {
  socket.send("initFrontPanel");
});

function App() {

  const {
    seconds,
    minutes,
    hours,
    /* days, */
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  useEffect(() => socket.addEventListener('message', async (event) => {
    const text = await event.data.text();
    console.log(text);
    switch (text) {
      case "start": 
        start(); 
        break;
      case "pause":
        pause();
        break;
      case "reset":
        reset();
        break;
      default: 
        console.error("gfys")
    }
  }),  
  )

  return (
    <div className="App">
      <div className="center__layout">
        <div className={`layout__timer${ isRunning ? " layout__timer-active" : "" }`} style={{textAlign: 'center'}}>
        <div style={{fontSize: '40px'}}>
          <span>T + </span>
          <span>{hours.toString().padStart(2, "0")}</span>
          :<span>{minutes.toString().padStart(2, "0")}</span>
          :<span>{seconds.toString().padStart(2, "0")}</span>
        </div>
        {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
        {/* <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={reset}>Reset</button> */}
      </div>
      </div>
      <State />
      <Telemetry />
    </div>
  );
}

export default App;
