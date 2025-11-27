import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

function WeatherPage() {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() !== "") {
            fetchWeather(query);
        }
    };

    const fetchWeather = (city) => {
        setLoading(true);

        const API_KEY = "e96c6a4f503fa1be2f29bd846d23b726";

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                setWeather(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };


    const toCelsius = (k) => (k - 273.15).toFixed(1);

    return (
        <div style={{ maxWidth: "500px", margin: "30px auto" }}>
            {/* SEARCH BAR */}
            <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Control
                    type="search"
                    placeholder="Enter city"
                    className="me-2"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button variant="outline-primary" type="submit">
                    Search
                </Button>
            </Form>


            {loading && (
                <div className="text-center mt-4">
                    <Spinner animation="border" />
                </div>
            )}


            {!loading && !weather && (
                <p className="text-center mt-4">Enter a city to check the weather.</p>
            )}


            {!loading && weather && weather.cod !== 200 && (
                <p className="text-center mt-4 text-danger">
                    City not found. Try again.
                </p>
            )}


            {!loading && weather && weather.cod === 200 && (
                <Card className="p-4 mt-4 shadow">
                    <div className="text-center">
                        <h2>{weather.name}, {weather.sys.country}</h2>


                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt="weather icon"
                        />


                        <h3>{toCelsius(weather.main.temp)}°C</h3>
                        <p className="text-muted fs-5">
                            {weather.weather[0].description}
                        </p>
                    </div>

                    <hr />

                    <p><strong>Feels Like:</strong> {toCelsius(weather.main.feels_like)}°C</p>
                    <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
                    <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
                    <p><strong>Cloud Cover:</strong> {weather.clouds.all}%</p>

                    <hr />

                    <p><strong>Sunrise:</strong> {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
                    <p><strong>Sunset:</strong> {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
                </Card>
            )}
        </div>
    );
}

export default WeatherPage;
