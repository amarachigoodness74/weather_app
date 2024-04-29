import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [weatherDetails, setWeatherDetails] = useState(null);

  useEffect(() => {
    const weatherData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: country,
              appid: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
            },
          }
        );
        console.log(response.data);
        setWeatherDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };

    weatherData();
  }, [country]);

  return (
    <>
      <div className="input-wrapper">
        <input
          className="country"
          type="text"
          onChange={(e) => setCountry(e.target.value)}
        />
        {error && <p>{error}</p>}
      </div>
      <div className="weather-details-wrapper">
        <h1>Weather Details {country && `For ${country}`}</h1>
        {loading && <p>loading...</p>}
        {weatherDetails && <p>lllllll</p>}
      </div>
    </>
  );
}

export default App;
