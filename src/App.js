import React, {useState} from 'react';
import './App.css';
import Timekeeper from 'react-timekeeper';

function App() {

  const [time, setTime] = useState(0)
  const initialTime = ['6:30', '5:00', '3:30']
  const [result, setResult] = useState([initialTime[0], initialTime[1], initialTime[2]])

  function calcular(value) {
    let results = [value.hour12 - 6 , value.hour12 - 7 , value.hour12 - 9]
    for (let index = 0; index < results.length; index++) {
      if (results[index] <= 0) {
        results[index] = results[index] + 12
      }
    }

    if (value.minute == 0) {
      results[0] = results[0] + ':' + value.minute + '0'
      results[2] = results[2] + ':' + value.minute + '0'
    }
    if (value.minute > 0 && value.minute < 10) {
      results[0] = results[0] + ':0' + value.minute 
      results[2] = results[2] + ':0' + value.minute
    }
    if (value.minute >=10) {
      results[0] = results[0] + ':' + value.minute 
      results[2] = results[2] + ':' + value.minute
    }
    
    if (value.minute < 30) {
      results[1] = (results[1] - 1) + ':' + (value.minute + 30)
    }
    if (value.minute > 30 && value.minute < 40) {
      results[1] = results[1] + ':0' + (value.minute - 30)
    }
    if (value.minute == 30) {
      results[1] = results[1] + ':00'
    }
    if (value.minute >= 40) {
      results[1] = results[1] + ':' + (value.minute - 30)
    }

    setResult(results)
  }

  return (
    <div className="App">
      <div className="Inner-App">
        <header>
          <h1>Calculadora do Sono</h1>
          <p>Para um bom sono, procure acordar às:</p>
          <ul className="result">{
            result.map(result => (<li key={result}>{result}</li>))
          }</ul>
        </header>
        <Timekeeper className="timer" onChange={setTime} onLoad={setTime}/>
        <button onClick={() => calcular(time)}>Calcular</button>
      </div>
    </div>
  );
}

export default App;
