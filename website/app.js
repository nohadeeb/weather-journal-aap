

document.getElementById('generate').addEventListener('click', performeAction);
function performeAction(e) {
    //Get the date
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    const baseurl = "http://api.openweathermap.org/data/2.5/weather?zip=";
    const key = "&appid=eff0d8a1856b456cffe08f87e8f5884c&units=imperial";
    const feelings = document.getElementById('feelings');
    const zip = document.getElementById('zip').value;
    getData(baseurl, zip, key)
        .then(function (data) {
            console.log(data);
// this object will be connected to newEntry object on server.js
            postData('/addAll', { date: newDate, datatemp: data.main.temp, feelings: feelings,  cloud: data.clouds.all, feelslike: data.main.feels_like} )
        //this is where i will directly get my data from the api
               
        })
        
         .then(
             updateUI()
         )
    
};
const getData = async (baseurl, zip, key)=>{
    const response = await fetch( baseurl + zip + key);
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

const postData = async (url='', data={}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
        
    });
    
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
 
}
function changebackground() {
    cloud.value > 60 ? document.getElementById('entryHolder').style.backgroundImage = "https://i.ibb.co/hmS7QtG/sunshine-sky-abstract-yellow-clouds-background.jpg" : document.getElementById('entryHolder').style.backgroundImage = "https://ibb.co/PGDH4jW";
    console.log(cloud.value);
}

const updateUI = async () => {
    const request = await fetch('/getall');
    try {
        const allData = await request.json();
 // to update my ui i have to use the allData variable and connect it with newEntry object items which alredy was declared on server.js
 // newEntry object on server.js takes it's items from the postData object items
        document.getElementById('date').innerHTML = ` date :  ${allData.date}`;
        document.getElementById('temp').innerHTML = `temperature : ${allData.temp} `;
        document.getElementById('addFeelings').innerHTML = `i feel :${feelings.value}`;
        document.getElementById('feelslike').innerHTML = `feels like :${allData.feelslike}`;
        document.getElementById('cloud').innerHTML = `cloud :${allData.cloud}`;
 

    } catch (error) {
        console.log("error", error);

    }

    changebackground()
}
