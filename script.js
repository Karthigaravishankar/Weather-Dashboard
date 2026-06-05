const API_KEY = "b99c63fad7e07bc72590ace68cff4362";

async function getWeather(cityName){

let city = cityName || document.getElementById("cityInput").value;

if(!city){
alert("Enter city name");
return;
}

try{

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
);

const data = await response.json();

if (data.cod == "404" || data.cod == 404) {

    document.getElementById("error").textContent =
        "City Not Found";

    return;
}
updateUI(data);

}
catch(error){
console.log(error);
}

}

function updateUI(data){

document.getElementById("city").innerText =`${data.name}, ${data.sys.country}`;

document.getElementById("temp").innerText =Math.round(data.main.temp) + "°C";

document.getElementById("desc").innerText =data.weather[0].description;

document.getElementById("feels").innerText =data.main.feels_like + "°C";

document.getElementById("humidity").innerText =data.main.humidity + "%";

document.getElementById("wind").innerText =data.wind.speed + " m/s";

document.getElementById("pressure").innerText =data.main.pressure + " hPa";

document.getElementById("icon").src =`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

document.getElementById("sunrise").innerText =new Date(data.sys.sunrise * 1000).toLocaleTimeString();

document.getElementById("sunset").innerText =new Date(data.sys.sunset * 1000).toLocaleTimeString();
}

navigator.geolocation.getCurrentPosition(async position=>{

const lat = position.coords.latitude;
const lon = position.coords.longitude;

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
);

const data = await response.json();

updateUI(data);

});