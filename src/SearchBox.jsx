import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import { useState } from "react";
// ❌ Note: setWeatherData aur WeatherApp ka import yahan zaroori nahi hai, isliye hata diya
// import setWeatherData from "./WeatherApp";
// import WeatherApp from "./WeatherApp";

export default function SearchBox({Data}) { // updateData prop receive kiya
    // ❌ infoObj ko yahan declare karne ki zaroorat nahi, yeh handleSubmit mein hi declared hai
    // let infoObj; 
    
    const API_URL = "http://api.openweathermap.org/geo/1.0/direct"; // ? hata diya, taaki parameters acche se lagayein
    
    const API_KEY = "PASTE_YOUR_API_KEY";
    const[city,setCity] = useState("");

    async function getWeatherData(){
        //if city name entered y user has any space or odd characters then they will be removed by using encodeURIComponent()
        let encodedCity = encodeURIComponent(city);
        
        // 1. GeoCoding API Call: unit=metric parameter GeoCoder API ke liye zaroori nahi hai, hata diya
        let response = await fetch(`${API_URL}?q=${encodedCity}&limit=1&appid=${API_KEY}`);
      
      // 🛑 Error Check 1: Agar Geocoding response fail ho
        if (!response.ok) {
            throw new Error(`Geocoding Error: ${response.status}. Please check network.`);
        }
      //Here we just fetched the longitude and latitude of a place using GeoCoder API
      //Now we will give these cooedinates to our main API which will give us Actual Weather Info
      //This "arr"  contains array of objects
      //this data is of Lon and Lat
      let arr = await response.json();

      // 🛑 Error Check 2: Agar city nahi mili
      if (!arr || arr.length === 0) {
          throw new Error("City not found. Please check spelling.");
      }


      //Here comes the actual Weather data
      // 2. Weather API Call
     let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${arr[0].lat}&lon=${arr[0].lon}&appid=${API_KEY}&units=metric`);
     
      // 🛑 Error Check 3: Agar Weather API fail ho
      if (!data.ok) {
          throw new Error(`Weather API Error: ${data.status}. Check API Key activation.`);
      }
      
    let response2 = await data.json();
    
    // ❌ FIX 1: updateData() call yahan se remove kiya gaya hai!
    // updateData() 
     
let obj = {
    // 💡 Improvement: City name Geocoding data se lena behtar hai
    city: arr[0].name, 
    // ❌ FIX 2: await ko response2.main.temp se hata diya gaya hai (JSON parse ke baad zaroori nahi)
    temp: response2.main.temp, 
    tempMin: response2.main.temp_min,
    tempMax: response2.main.temp_max,
    humidity: response2.main.humidity,
    weather: response2.weather[0].main,
    description: response2.weather[0].description,
}
    return obj;
    }

  
    //Function to Track event
    function handleChange(event){
        //The value inside input box will be tracked and set here 
        //Note:- onChange is an EventListener
        setCity(event.target.value);
    }
   async function handleSubmit(event){
        event.preventDefault();
        console.log(city);
        
        // 💡 Improvement: Error handling ke liye try...catch block lagayein
        try {
            let infoObj = await getWeatherData();
            Data(infoObj);
            console.log("Info Object from SearchBox:", infoObj);
        } catch (error) {
            console.error("Weather Fetch Failed:", error.message);
            // Yahan aap user ko error dikhane ke liye koi state set kar sakte hain
        }
        
        //Clear Textfield after submit button clicked
        setCity("");
    }
   
  return (
    <div>
      <h3>Search Cities</h3>
      {/* 💡 Improvement: form ko submit event se link karein */}
      <form onSubmit={handleSubmit}> 
        <TextField
          id="city"
          label="Search Cities"
          variant="outlined"
          size="small"
          required
          onChange={handleChange}
          value={city}
        />
        &nbsp; &nbsp;
        <Button variant="contained" size="medium" type="submit"> {/* type="submit" add kiya */}
          Search
        </Button>
      </form>
     
    </div>
  );
}