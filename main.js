let loc = document.getElementById('location');
let temp = document.getElementById('temp');
let time = document.getElementById('time');
let icon = document.getElementById('myImage');

let date = new Date();
let weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

let day = weekday[date.getDay()];
let screenTime = `${date.getHours()}:${date.getMinutes()}`;



window.addEventListener('load',() => {
    let lat,long;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            lat = position.coords.latitude;
            long = position.coords.longitude;

            const api = `http://api.weatherapi.com/v1/current.json?key=0fe797d0076f435da9c55516211409&q=${lat},${long}&aqi=yes`;    
        
            fetch(api)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const{country,localtime,region} = data.location
                const{temp_c,} = data.current
                console.log(data);
                loc.innerText = `${region},${country.slice(0,2).toUpperCase()}`
                icon.src = data.current.condition.icon;
                temp.innerHTML = `${temp_c}<span>&#176;c</span>`;
                time.innerText = `${day}, ${screenTime}`;
            }).catch(error => {
                console.error(error);
            })
        })

    }
})


