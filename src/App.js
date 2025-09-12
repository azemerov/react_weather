import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
//import InputField from '../components/InputField';
import Form from 'react-bootstrap/Form';

async function makeRequest(zip_code) {

    //alert('Your ZIP is: ' + zip_code);
    console.log('loading for zip=['+zip_code+']');
    let response;
    try {
      //response = await fetch("https://api.weatherapi.com/v1/current.json?q=76040&key=1265eb95a1c24244be4183635250609", {
      response = await fetch("https://api.weatherapi.com/v1/forecast.json?q="+zip_code+"&days=10&key=1265eb95a1c24244be4183635250609", {
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


function InputField(
  { name, label, type, placeholder, error, fieldRef }
) {
  //alert('Input fielddYour ZIP is: ' + fieldRef.value);
  return (
    <Form.Group controlId={name} className="left">
      {label && <Form.Label className="left">{label}</Form.Label>}
      <Form.Control
        className="left"
        type={type || 'text'}
        placeholder={placeholder}
        ref={fieldRef}
        defaultValue={fieldRef.value}
      />
      <Form.Text className="left">{error}</Form.Text>
    </Form.Group>
  );
}
function App() {
  const [day, setDay] = useState("unknown day");
  const [forecast, setForecast] = useState();
  const [zip, setZip] = useState("76040");
  const [fieldValue, setFieldValue] = useState(zip);

  const [formErrors, setFormErrors] = useState({});
  const zipField = useRef();
  zipField.value = zip;


  // async function getValue(name) {
  //   let response = await makeRequest(zip);
  //   return name+" = "+response.body["current"][name];
  // }

  useEffect(() => {
    (
      async () => {
        console.log('useEffect, zip='+zip);
        //getValues(setForecast)
        let response = await makeRequest(zip);
        setForecast(response.body);
      }
    )();
  }, [zip]);

  // async function buttonClickHandler(onResult) {
  //   let response = await makeRequest(zip);
  //   onResult(response.body);
  // }
//<button onClick={() => buttonClickHandler(setForecast)}>Load</button>
//error={formErrors.username}
//<Button variant="primary" onClick={() => buttonClickHandler(setForecast)}>Load</Button>
         
  const onSubmit = (ev) => {
    console.log('onSubmit');
    ev.preventDefault();
    //alert('Your ZIP is: ' + zipField.current.value);
    if (zipField.current==null || zipField.current.value==="") return;
    setZip(zipField.current.value);
  };  

  const handleChange = (event) => {
    //console.log('handleChange='+event.target.value);
    setFieldValue(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Prevent default form submission if the input is inside a form
      event.preventDefault(); 
      //console.log('handleKeyDown ENTER');
      setZip(fieldValue); // Update state on Enter
      //setCurrentZip(''); // Clear the input after submission (optional)
    }
  };

        // <Form onSubmit={onSubmit}>
        //   <InputField
        //     name="zipcode" label="" fieldRef={zipField}
        //   />
        //   <Button className="left" variant="primary" type="submit">Show forecast</Button>
        // </Form>

console.log('draw App');
  return (
    <div className="App">

      <div className="top">
        <input
          className="left"
          type="text"
          value={fieldValue} // Value is driven by state
          onChange={handleChange} // Updates state on change
          onKeyDown={handleKeyDown}
          placeholder="Type ZIP code and press Enter"
        />
        <div className="left">---</div>
        <div className="left">{forecast && forecast.location.name+", "+forecast.location.region+", "+forecast.location.country}</div>
      </div>
      <div className="bottom">
       <Day vals={forecast} index={0}>...</Day>
       <Day vals={forecast} index={1}>...</Day>
       <Day vals={forecast} index={2}>...</Day>
       <Day vals={forecast} index={3}>...</Day>
       <Day vals={forecast} index={4}>...</Day>
       <Day vals={forecast} index={5}>...</Day>
       <Day vals={forecast} index={6}>...</Day>
       <Day vals={forecast} index={7}>...</Day>
       <Day vals={forecast} index={8}>...</Day>
       <Day vals={forecast} index={9}>...</Day>
       
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
   //console.log('Draw Day component #'+index);
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
          <img src={geticon(vals, index)} className="card-img-fluid"></img>
          <div>{"Temp (C): "+getval(vals, index, "mintemp_c")+"-"+getval(vals, index, "maxtemp_c")}</div>
          <div>{"Cloud: "+getval(vals, index, "cloud")}</div>
          <div>{"Wind (kph): "+getval(vals, index, "maxwind_kph")+"-"+getval(vals, index, "maxwind_kph")}</div>
          <div>{"Precip (mm): "+getval(vals, index, "totalprecip_mm")}</div>
          <div>{getval(vals, index, "daily_will_it_rain")===0 ? "Dry" : "Rain "+getval(vals, index, "totalprecip_mm")+"mm"}</div>
          <div>{"Chance: "+getval(vals, index, "daily_chance_of_rain")+"%"}</div>
<Card.Text></Card.Text>
      </Card.Body>
     </Card>
  </div>
}

// TODO: try controlled input, like 
function ControlledInputExample() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <input
      type="text"
      value={inputValue} // Value is driven by state
      onChange={handleChange} // Updates state on change
    />
  );
}

export default App;
