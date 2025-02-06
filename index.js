
async function getData() {
    console.log("Inside getData function");
    console.log("Going to call weather api");

    const city = document.querySelector("#city");
    if (!city) {
        console.error("Please enter a city!");
        return;
    }
    else {
        try {
            const cityName = city.value.trim().toLowerCase();
            const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=NCMKMZWCWQWD5T9S8PPB59QNL`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error("Couldn't fetch website data");
            }
            console.log("Promise resolved, fetched: " + response);
            const data = await response.json();
            console.log("Weather data: " + JSON.stringify(data));

            populateDisplay(data);
        }
        catch (error) {
            console.log(error);
        }

    }
}


function populateDisplay(data) {
    const city = document.querySelector(".city-name");
    const date = document.querySelector(".date");
    const desc = document.querySelector(".desc");
    const temp = document.querySelector(".average");
    const highest = document.querySelector(".high-input");
    const lowest = document.querySelector(".low-input");
    const windspeedOutput = document.querySelector(".ws-input");
    const humidityOutput = document.querySelector(".hum-input");

    const cityOutput = data.resolvedAddress;
    city.textContent = cityOutput;
    console.log(cityOutput);

    const dateOutput = data.days[0].datetime;
    date.textContent = dateOutput;
    console.log(dateOutput);

    const descriptionOutput = data.description;
    desc.textContent = `"${descriptionOutput}"`;
    console.log(descriptionOutput);
    addPicture(descriptionOutput);

    let fString = data.days[0].temp;
    let fahrenheit = Number(fString);
    let celsius = Math.round(((fahrenheit - 32) / (9/5)) * 10) / 10;
    let tempOutput = celsius.toString();
    temp.textContent = tempOutput + "°C";
    console.log(tempOutput);

    let fStringHigh = data.days[0].tempmax;
    let fahrenheitHigh = Number(fStringHigh);
    let celsiusHigh = Math.round(((fahrenheitHigh - 32) / (9/5)) * 10) / 10;
    let maxTempOutput = celsiusHigh.toString();
    highest.textContent = maxTempOutput + "°C";
    console.log(maxTempOutput);

    let fStringLow = data.days[0].tempmin;
    let fahrenheitLow = Number(fStringLow);
    let celsiusLow = Math.round(((fahrenheitLow - 32) / (9/5)) * 10) / 10;
    let minTempOutput = celsiusLow.toString();
    lowest.textContent = minTempOutput + "°C";
    console.log(tempOutput);

    const ws = data.days[0].windspeed;
    windspeedOutput.textContent = ws + "m/s";
    console.log(windspeedOutput);

    const hum = data.days[0].humidity;
    humidityOutput.textContent = hum + "%";
    console.log(humidityOutput);
}

function addPicture(description) {
    let img = document.querySelector("img");
    if (/\brain\b/i.test(description)) {
        img.src = "./images/rain.jpg";
    } 
    else if (/\bsun\b/i.test(description)) {
        img.src = "./images/sun.jpg";
    }
    else if (/\bsnow\b/i.test(description)) {
        img.src = "./images/snow.jpg";
    }
    else if (/\bcloudy\b/i.test(description)) {
        img.src = "./images/cloudy.jpg";
    }
}