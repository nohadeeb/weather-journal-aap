const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());
// intializng the main project folder 
//---------------------------  
// create a local server with node nad express
const port = 8000;
//-- writing an arrow function isan effecient way 
const server = app.listen(port, () => {
    console.log('server running');
    console.log(`running on localhost : ${port}`);
});// to make sure that server isruning properly
app.use(express.static('website'));
let projectData = {};//object to store data
app.get('/getall', getApiData); // get the data tha was stored in the dataArray
function getApiData(req,res){
    res.send(projectData);// send the response that was stored on our dataArray
}
app.post('/addAll', addWeatherDatafunc); // post request with a callback func addWeatherfunc
function addWeatherDatafunc(req, res){
    const newEntry={
        temp: req.body.datatemp,//defined on postData line 15
        date: req.body.date,//defined on postData line 15
        feelings: req.body.feelings,//defined on postData line 15
        cloud: req.body.cloud,//defined on postData line 15
        feelslike: req.body.feelslike,//defined on postData line 15
  
    }
    console.log(newEntry);
    projectData=newEntry; // if we stored data into an aarray we would use the push these data that we got from the api to our array
}
