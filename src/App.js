
import './App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //need these for React-Boostrap

function App() {
  //state
  const [apiData, setApiData] = useState({}); //this will store the response
  const [getState, setGetState] = useState('los angeles'); // this will store the location from the input field
  const [state, setState] = useState('los angeles'); // state will store a copy of the variable of 
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;
  
  //now we are going to make a api request using fetch
  useEffect(() =>{
    fetch(apiUrl).then((res) => res.json()).then((data) => setApiData(data));
  }, [apiUrl]);
  //the above will fetch the data from the api and store it in apiData
  //now we are going to write some functions to handle input
  //this function will get the input field and store it in getState
  const inputHandler = (event) => {
    setGetState(event.target.value);
  };
  //this function will copy the state from getState to state
  const submitHandler = () => {
    setState(getState);
  };
  //this function will convert apio data from Kelvin
  const kelvinToFarenheit = (k) => {
    //this is the math to convert that i found online
    k -= 273.15;
    k = k * 9;
    k = k / 5;
    k += 32;
    return parseInt(k)
  };

  return (
    <div className="App">
      <header className="d-flex justify-content-center align-items-center">
        <h2>React Weather</h2>
      </header>
      <div className="container" style={{ width: '450px' }}>
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
            <label for="location-name" class="col-form-label">Enter Location :</label>
            <input type="text" id="location-name" class="form-control" onChange={inputHandler} value={getState}/>
            <button className="btn btn-primary mt-2" onClick={submitHandler}>Search</button>
        </div> 
        <div className="card mt-3 mx-auto" >
          {apiData.main ? (
            <div class="card-body text-center">
              <img src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`} alt="weather status icon" className="weather-icon"/>
              <p className="h2">{kelvinToFarenheit(apiData.main.temp)}&deg;</p>
              <p className="h5"><strong>{apiData.name}</strong></p>
              <p className="h5"><strong>{apiData.weather[0].main}</strong></p>
              <p className="h5"><strong>Low of day {kelvinToFarenheit(apiData.main.temp_min)}&deg;</strong></p>
              <p className="h5"><strong>High of day {kelvinToFarenheit(apiData.main.temp_max)}&deg;</strong></p>
            </div>
          ) : (
            <h1>Try seaching for another place could not find data</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
