import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
//import InputField from '../components/InputField';

async function makeRequest() {

    let response;
    try {
      //response = await fetch("https://api.weatherapi.com/v1/current.json?q=76040&key=1265eb95a1c24244be4183635250609", {
      response = await fetch("https://api.weatherapi.com/v1/forecast.json?q=76040&days=10&key=1265eb95a1c24244be4183635250609", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          //...options.headers,
        },
        body: null,
      });
    }
    catch (error) {
      response = {
        ok: false,
        status: 500,
        json: () => { return {
          code: 500,
          message: 'The server is unresponsive',
          description: error.toString(),
        }; }
      };
    }
    console.log('have got response');

    return {
      ok: response.ok,
      status: response.status,
      body: response.status !== 204 ? await response.json() : null
    };
  }


function App() {
  const [day, setDay] = useState("unknown day");
  const [values, setValues] = useState();

  async function getValue(name) {
    // return "XXX";
    let response = await makeRequest();
    return name+" = "+response.body["current"][name];
  }
  async function getValues(onResult) {
    let response = await makeRequest();
    onResult(response.body);
  }
//<button onClick={() => getValues(setValues)}>Load</button>
         
  return (
    <div className="App">
      <div className="top">
        <Button variant="primary" onClick={() => getValues(setValues)}>Load</Button>
      </div>
      <div className="bottom">
       <Day vals={values} index={0}>...</Day>
       <Day vals={values} index={1}>...</Day>
       <Day vals={values} index={2}>...</Day>
       <Day vals={values} index={3}>...</Day>
       <Day vals={values} index={4}>...</Day>
       <Day vals={values} index={5}>...</Day>
       <Day vals={values} index={6}>...</Day>
       <Day vals={values} index={7}>...</Day>
       <Day vals={values} index={8}>...</Day>
       <Day vals={values} index={9}>...</Day>
       
      </div>
    </div>
  );
}

function getdate(vals, index) {
  if (vals==undefined) return  "-";
  else if (vals["forecast"]["forecastday"].length < index+1) return "~";
  else return vals["forecast"]["forecastday"][index]["date"];
}

function getval(vals, index, name) {
  if (vals==undefined) return  "-"; 
  else if (vals["forecast"]["forecastday"].length < index+1) return "~";
  else return vals["forecast"]["forecastday"][index]["day"][name];
}

function geticon(vals, index) {
  if (vals==undefined) return  "-"; 
  else if (vals["forecast"]["forecastday"].length < index+1) return "~";
  else return "https:"+vals["forecast"]["forecastday"][index]["day"]["condition"]["icon"];
}

function Day({vals, index}) {
   console.log('Day component #'+index);
   /*
    <div><b>{getdate(vals, index)}</b></div>
    <div>{"Temp: "+getval(vals, index, "mintemp_c")+" - "+getval(vals, index, "maxtemp_c")+" C"}</div>
    <div>{"Wind: "+getval(vals, index, "maxwind_kph")+" - "+getval(vals, index, "maxwind_kph")+" KPH"}</div>
    <Card.Img src={geticon(vals, index)} class="card-img-fluid" />
    */
   return <div className="day">
     <Card style={{ width: '190px', margin: 0, }}>
      <Card.Header>{getdate(vals, index)}</Card.Header>
      <Card.Body>
        <Card.Title>{getdate(vals, index)}</Card.Title>
        <Card.Text>
          <img src={geticon(vals, index)} class="card-img-fluid"></img>
          <div>{"Temp (C): "+getval(vals, index, "mintemp_c")+"-"+getval(vals, index, "maxtemp_c")}</div>
          <div>{"Cloud: "+getval(vals, index, "cloud")}</div>
          <div>{"Wind (kph): "+getval(vals, index, "maxwind_kph")+"-"+getval(vals, index, "maxwind_kph")}</div>
          <div>{"Precip (mm): "+getval(vals, index, "totalprecip_mm")}</div>
          <div>{getval(vals, index, "daily_will_it_rain")===0 ? "Dry" : "Rain "+getval(vals, index, "totalprecip_mm")+"mm"}</div>
          <div>{"Chance: "+getval(vals, index, "daily_chance_of_rain")+"%"}</div>
        </Card.Text>
      </Card.Body>
     </Card>
  </div>
}

export default App;
