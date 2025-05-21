
const API_KEY = 'cb636cae3fc0233d73e87fab657ae099';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const getWeatherDataWithCallback = (city, callback) => {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => callback(null, data))
        .catch(error => callback(error, null));
};

const getWeatherDataWithPromise = (city) => {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    reject('City not found');
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject('Error fetching data'));
    });
};

const getWeatherDataWithAsyncAwait = async (city) => {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        alert('Error fetching data');
    }
};

const updateWeatherUI = (weatherData) => {
    const cityName = document.getElementById('city-name');
    const temp = document.getElementById('temp');
    const description = document.getElementById('description');

    cityName.textContent = weatherData.name;
    temp.textContent = `Temperature: ${weatherData.main.temp}°C`;
    description.textContent = `Condition: ${weatherData.weather[0].description}`;

    updateTemperatureChart(weatherData.main.temp);
};

const updateTemperatureChart = (temp) => {
    const ctx = document.getElementById('temp-chart').getContext('2d');
    if (window.weatherChart) {
        window.weatherChart.destroy(); 
    }

    window.weatherChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Temperature'],
            datasets: [{
                label: 'Temperature (°C)',
                data: [temp],
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 50
                }
            }
        }
    });
};


const handleWeatherButtonClickWithCallback = () => {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();

    if (!city) {
        alert('Please enter a city');
        return;
    }
    getWeatherDataWithCallback(city, (error, weatherData) => {
        if (error) {
            alert(error);
        } else {
            updateWeatherUI(weatherData);
        }
    });
};

const handleWeatherButtonClickWithPromise = () => {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();

    if (!city) {
        alert('Please enter a city');
        return;
    }

    getWeatherDataWithPromise(city)
        .then(weatherData => {
            updateWeatherUI(weatherData);
        })
        .catch(error => {
            alert(error);
        });
};

const handleWeatherButtonClickWithAsyncAwait = async () => {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const weatherData = await getWeatherDataWithAsyncAwait(city);
    if (weatherData) {
        updateWeatherUI(weatherData);
    }
};

document.getElementById('get-weather-btn').addEventListener('click', handleWeatherButtonClickWithAsyncAwait);  // Use async/await
