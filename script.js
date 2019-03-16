//add JSONView extension to reformat json into a more readable format
let request = new XMLHttpRequest();
let url = "https://api.sunrise-sunset.org/json?lat=26.928386&lng=-72.284730"; //stores url of the API endpoint
//coord: 26.928386, -72.284730
request.open("GET", url, true);
request.onload = function() { //will execute the callback function once sent
    let data = JSON.parse(this.response);
    let sunrise = document.getElementById("sunrise");
    let sunset = document.getElementById("sunset");
    if (request.status >= 200 && request.status < 400) {
            //condition for when request is succesful, status code of request 
            sunrise.textContent = convertToEST(data.results.sunrise);
            sunset.textContent = convertToEST(data.results.sunset);
        }
        else {
            sunrise.textContent = "Sunrise not found!";
            sunset.textContent = "Sunset not found";
        }
    
};
request.send();

function convertToEST(utc) {
    let utcHours = utc.substr(0, utc.indexOf(":"));
    let utcMinSec = utc.substr(utc.indexOf(":")+1);
    let est = parseInt(utcHours, 10) - 5;
    est += ":" + utcMinSec;
    return est;
}
