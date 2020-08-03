

document.getElementById('generate').addEventListener('click', performeAction);
function performeAction(e) {
    //Get the date
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    const baseurl = "http://api.openweathermap.org/data/2.5/weather?zip=";
    const key = "&appid=eff0d8a1856b456cffe08f87e8f5884c&units=imperial";
    const content = document.getElementById('fav').value;
    const zip = document.getElementById('zip').value;
    getData(baseurl, zip, key)
        .then(function (data) {
            console.log(data);
            postData('http://localhost:8000/addAll', { date: newDate, datatemp: data.main.temp, content, cloud: data.clouds.all, feelslike: data.main.feels_like} )
               
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
function changebackground(){
    data.clouds.all.value > 3 ? document.getElementById('domUpdate').style.backgroundImage = "https://i.ibb.co/hmS7QtG/sunshine-sky-abstract-yellow-clouds-background.jpg" : document.getElementById('domUpdate').style.backgroundImage = "https://ibb.co/PGDH4jW";
}
const updateUI = async () => {
    const request = await fetch('http://localhost:8000/getall');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = newDate;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = content;
        document.getElementById('felslike').innerHTML = allData.feelslike;

    } catch (error) {
        console.log("error", error);
    }
    changebackground();
}
