import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox"
import { useState } from "react"
export default function WeatherApp({infoobj}) {
    const[weatherData,setWeatherData] = useState({
    city:"Pune",
    description: "broken clouds",
    humidity: 77,
    temp: 25.78,
    tempMax: 25.78,
    tempMin: 25.78,
    weather: "Clouds",
  })
  function updateData(infoFromSearchBox){
    setWeatherData(infoFromSearchBox);
    console.log("Data received in WeatherApp:", infoFromSearchBox);
  }
    return(
        <div>
            <h1>Weather App</h1>
            <SearchBox Data={updateData}/>
            <InfoBox info = {weatherData}/>
        </div>
    )
}