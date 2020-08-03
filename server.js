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
const projectData = {};//array to store out data
app.get('/getall', getApiData); // get the data tha was stored in the dataArray
function getApiData(req,res){
    res.send(projectData);// send the response that was stored on our dataArray
}
app.post('/addAll', addWeatherDatafunc); // post request with a callback func addWeatherfunc
function addWeatherDatafunc(req, res){
    const newEntry={
        temp: req.body.datatemp,
        date: req.body.date,
        content: content,
        cloud: req.body.cloud,
        feelslike: req.body.feelslike
    }
    console.log(newEntry);
    projectData.push(newEntry); // push these data that we got from the api to our array
}
