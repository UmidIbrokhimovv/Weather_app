window.addEventListener('DOMContentLoaded', () => {

  let body = document.body

let ind = 0

let bgImgs = [
  '../assets/img/bg1.jpg',
  '../assets/img/bg2.jpg',
  '../assets/img/bg3.jpg',
  '../assets/img/bg4.jpg',
  '../assets/img/bg5.jpg'
]
function setBg() {
  body.style.backgroundImage = `url(${bgImgs[ind]})`
  ind++
  if (ind === 5) {
    ind = 0;
  }
}

setInterval(() => setBg(), 6000)

let menuBtn = document.querySelector('#menuBtn');
let closeMenuBtn = document.querySelector('#closeBtn');
let icon = document.querySelector('#icon');
let menu = document.querySelector("#menu")


menuBtn.addEventListener('click', () => {
  menu.classList.add('active-menu');
})
closeMenuBtn.addEventListener('click', () => {
  menu.classList.remove('active-menu');
})

// Elements
let inp = document.querySelector('#search-input-only');
let searchBtn = document.querySelector('#searchBtn');

let api = {
  key: '795284a4edc152ca0fa19dd1474e072d',
  baseUrl: 'https://api.openweathermap.org/data/2.5/'
}

searchBtn.addEventListener('click', () => {
  let inpValue = inp.value
  getResult(inpValue.trim());
})

function getResult(query) {
  fetch(`${api.baseUrl}weather?q=${query}&appid=${api.key}`)
    .then((weather) => {
      return weather.json();
    }).then((data) => {
      displayResult(data);
    })
}

function displayResult(weather) {
  let weatherDegre = document.querySelector('.weather-degre');
  weatherDegre.textContent = `${Math.floor(weather.main.temp - 273.15)}°`
  console.log(weather);
  let countryName = document.querySelector('.country-name');
  countryName.textContent = weather.name

  let cloudlyPrs = document.querySelector('.cloudly-prs');
  let humidityPrs = document.querySelector('.humidity-prs');
  let windPrs = document.querySelector('.wind-prs');

  humidityPrs.textContent = `${weather.main.humidity}%`
  windPrs.textContent = `${weather.wind.speed}km/h`
}

let date = document.querySelector('.now-date');

function getNowDate() {
  let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octomber', 'November', 'December']
  let days = ['Sunday','Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday']
  let nowDate = new Date
  let min = nowDate.getMinutes()
  let hr = nowDate.getHours()
  let sec = nowDate.getSeconds()
  let nowDay = days[nowDate.getDay()]
  let nowMonth = month[nowDate.getMonth()]
  let nowDayOnMonth = nowDate.getDate()
  if (hr < 10) {
    hr = '0' + hr
  }
  if (min < 10) {
    min = '0' + min
  }
  if (sec < 10) {
    sec = '0' + sec
  }
  date.textContent = hr + ':' + min + ':' + sec + ' - ' + nowDay + ', ' + nowDayOnMonth + ' ' + nowMonth + ' ' + nowDate.getFullYear()
}
setInterval(() => getNowDate(), 1)


})