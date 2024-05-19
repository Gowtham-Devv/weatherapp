import React, { useState, useEffect } from 'react';
import "../Styles/WeatherApp.css";
import { FaSearch } from "react-icons/fa";
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";

const WeatherDetails = ({ icon }) => {
    return (
        <div className='imgContainer d-flex justify-content-center'>
            <img src={icon} alt="Weather Icon" />
        </div>
    );
};

function WeatherApp() {
    const api_key = "3a0b1ac4ae2077a356754876cebafa34";
    const [text, setText] = useState("");
    const [icon, setIcon] = useState("");
    const [temp, setTemp] = useState("");
    const [city, setCity] = useState("");
    const [humidity, setHumidity] = useState("");
    const [wind, setWind] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchWeather = async (cityName) => {
        setLoading(true);
        let Url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`;

        try {
            let res = await fetch(Url);
            let data = await res.json();
            if (data.cod === 200) {
                setTemp(data.main.temp);
                setCity(data.name);
                setHumidity(data.main.humidity);
                setWind(data.wind.speed);
                setIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            } else {
                console.error("City not found");
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const Search = () => {
        if (text) {
            fetchWeather(text);
        }
    };

    useEffect(() => {
        // Fetch default weather data for the default city
        fetchWeather("Erode");
    }, []);

    const handleCity = (e) => {
        setText(e.target.value);
    };

    const handleKey = (e) => {
        if (e.key === "Enter") {
            Search();
        }
    };

    return (
        <main id='wapp'>
            <div className='container-fluid bgBack'>
                <div className="container Weather">
                    <div className='text-center Brand'> Weather App </div>
                    <div className='ContentDiv'>
                        <div className='inputContainer mt-4'>
                            <input
                                type="text"
                                className='cityInput'
                                value={text}
                                placeholder='Search City'
                                onChange={handleCity}
                                onKeyDown={handleKey}
                            />
                            <FaSearch className='fasearch' onClick={Search} />
                        </div>
                        <WeatherDetails icon={icon} />
                        <div className="InfoDiv text-center">
                            <h3 className='mb-1 display-5'>{temp}<sup>o</sup>C</h3>
                            <h3 className='display-6'>{city}</h3>
                        </div>
                        <div className='InfoNextDiv d-flex text-center'>
                            <div className='InfoContent'>
                                <h5>Humidity</h5>
                                <h5><span className='Humidity'><WiHumidity /></span>{humidity}%</h5>
                            </div>
                            <div className='InfoContent'>
                                <h5>Wind Speed</h5>
                                <h5><span className='me-2'><FaWind /></span>{wind} km/h</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default WeatherApp;
