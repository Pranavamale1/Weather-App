import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function InfoBox({ info }) { 

 function getWeatherImage(weatherType) {
  if (!weatherType)
    return "https://images.unsplash.com/photo-1503264116251-35a269479413"; // neutral fallback

  const lower = weatherType.toLowerCase();

  // 🌁 Haze — your specific case
  if (lower.includes("haze")) {
    return "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&q=60&w=800"; 
  } 
  else if (lower.includes("cloud")) {
    return "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=60&w=800"; // cloudy
  } 
  else if (lower.includes("rain")) {
    return "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=60&w=800"; // rainy
  } 
  else if (lower.includes("drizzle")) {
    return "https://images.unsplash.com/photo-1530908295418-a12e326966ba?auto=format&fit=crop&q=60&w=800"; // drizzle
  } 
  else if (lower.includes("clear")) {
    return "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=60&w=800"; // sunny
  } 
  else if (lower.includes("snow")) {
    return "https://images.unsplash.com/photo-1608889179111-d1ac02b6bda2?auto=format&fit=crop&q=60&w=800"; // snowy
  } 
  else if (lower.includes("mist") || lower.includes("fog")) {
    return "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&q=60&w=800"; // misty/foggy
  } 
  else if (lower.includes("smoke")) {
    return "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=60&w=800"; // smoke
  } 
  else if (lower.includes("dust")) {
    return "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&q=60&w=800"; // dust storm
  } 
  else if (lower.includes("sand")) {
    return "https://images.unsplash.com/photo-1603839606520-8e4b5ab3a3da?auto=format&fit=crop&q=60&w=800"; // sand desert
  } 
  else if (lower.includes("ash")) {
    return "https://images.unsplash.com/photo-1610057097987-5182ff6d4e3d?auto=format&fit=crop&q=60&w=800"; // volcanic ash
  } 
  else if (lower.includes("thunder") || lower.includes("storm")) {
    return "https://images.unsplash.com/photo-1500674425229-f692875b0ab7?auto=format&fit=crop&q=60&w=800"; // thunderstorm
  } 
  else if (lower.includes("tornado")) {
    return "https://images.unsplash.com/photo-1590130157773-9b661d6d6f1e?auto=format&fit=crop&q=60&w=800"; // tornado
  } 
  else {
    return "https://images.unsplash.com/photo-1481450083889-69bee7cb4de8?auto=format&fit=crop&q=60&w=800"; // default
  }
}


  return (
    <div className="InfoBox">
      <h3>Weather Info - {info.city}</h3>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={getWeatherImage(info.weather)}
          title={info.weather}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {info.city}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} component="div">
            <div>Description: {info.description}</div>
            <div>Temperature: {info.temp}°C</div>
            <div>Min Temperature: {info.tempMin}°C</div>
            <div>Max Temperature: {info.tempMax}°C</div>
            <div>Humidity: {info.humidity}%</div>
            <div>Weather: {info.weather}</div>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
