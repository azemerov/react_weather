import { useState, useRef, useEffect } from "react";
//import { Routes, Route } from "react-router-dom";
//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import { makeRequest, getdate, getval, geticon } from "./ForecastAPI";
import Container from 'react-bootstrap/Container';


export function Forecast({type}) {
  const [day, setDay]           = useState("unknown day");
  const [forecast, setForecast] = useState();
  const [zip, setZip]           = useState("76040");
  const [dt, setDt]             = useState("");
  const [fieldValue, setFieldValue] = useState(zip);
  const [field2Value, setField2Value] = useState(dt);
  const [details, setDetails]       = useState("");
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [formErrors, setFormErrors] = useState({});
  const zipField = useRef();
  zipField.value = zip;

  useEffect(() => {
    (
      async () => {
        console.log('useEffect, type='+type+', zip='+zip);
        //getValues(setForecast)
        let response = await makeRequest(type, zip, dt);
        //console.log("response.body="+response.body);
        setForecast(response.body);
      }
    )();
  }, [zip, dt]);
         
  /*const onSubmit = (ev) => {
    console.log('onSubmit');
    ev.preventDefault();
    //alert('Your ZIP is: ' + zipField.current.value);
    if (zipField.current==null || zipField.current.value==="") return;
    setZip(zipField.current.value);
  };*/  

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

  const handleChange2 = (event) => {
    //console.log('handleChange='+event.target.value);
    setField2Value(event.target.value);
  };
  const handleKeyDown2 = (event) => {
    if (event.key === 'Enter') {
      // Prevent default form submission if the input is inside a form
      event.preventDefault(); 
      //console.log('handleKeyDown ENTER');
      setDt(field2Value); // Update state on Enter
      //setCurrentZip(''); // Clear the input after submission (optional)
    }
  };

  function onDayClick(forecast, index) {
    setDetails(
        getdate(forecast, index)+"     "+
        "Temp: "+getval(forecast, index, "mintemp_c")+"-"+getval(forecast, index, "maxtemp_c")+" C " +
        "Max.Wind: "+getval(forecast, index, "maxwind_kph")+" km/h " +
        (getval(forecast, index, "daily_will_it_rain")===0 ? "Dry " : "Rain ") + 
        getval(forecast, index, "daily_chance_of_rain")+"% "+
        "Precip.: "+getval(forecast, index, "totalprecip_mm")+"mm"
    );
    setCurrentIdx(index);
    //console.log("details="+details);
  }

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
            <input
            className="left"
            type="text"
            value={field2Value} // Value is driven by state
            onChange={handleChange2} // Updates state on change
            onKeyDown={handleKeyDown2}
            placeholder="Type DT in yyyy-mm-dd format and press Enter"
            />
        </div>
        <div className="days">
            <Day vals={forecast} index={0} onClickHandler={onDayClick}>...</Day>
            <Day vals={forecast} index={1} onClickHandler={onDayClick}>...</Day>
            <Day vals={forecast} index={2} onClickHandler={onDayClick}>...</Day>
            <Day vals={forecast} index={3} onClickHandler={onDayClick}>...</Day>
            <Day vals={forecast} index={4} onClickHandler={onDayClick}>...</Day>
            <Day vals={forecast} index={5} onClickHandler={onDayClick}>...</Day>
            <Day vals={forecast} index={6} onClickHandler={onDayClick}>...</Day>
            <Day vals={forecast} index={7} onClickHandler={onDayClick}>...</Day>
            <Day vals={forecast} index={8} onClickHandler={onDayClick}>...</Day>
            <Day vals={forecast} index={9} onClickHandler={onDayClick}>...</Day>
        </div>
      
        <Container  > 
            {currentIdx > -1} &&
            {getdate(forecast, currentIdx)}<br />
            {"Temp: "+getval(forecast, currentIdx, "mintemp_c")+"-"+getval(forecast, currentIdx, "maxtemp_c")+" C "} <br />
            {"Max.Wind: "+getval(forecast, currentIdx, "maxwind_kph")+" km/h "} <br/>
            {getval(forecast, currentIdx, "daily_will_it_rain")===0 ? "Dry " : "Rain "}<br/> 
            {getval(forecast, currentIdx, "daily_chance_of_rain")+"% "}<br/>
            {"Precip.: "+getval(forecast, currentIdx, "totalprecip_mm")+"mm"}
        </Container>
    </div>
  );
}

function Day({vals, index, onClickHandler}) {
   //console.log('Draw Day component #'+index);
   return <div className="day">
     <Card style={{ width: '170px', margin: 0, }} onClick={() => onClickHandler(vals, index)}>
      <Card.Header>{getdate(vals, index)}</Card.Header>
      <Card.Body>
        <Card.Title>{getdate(vals, index)}</Card.Title>
          <img src={geticon(vals, index)} className="card-img-fluid"></img>
          <div>{getval(vals, index, "mintemp_c")+"-"+getval(vals, index, "maxtemp_c")+" C"}</div>
          <div>{getval(vals, index, "maxwind_kph")+"-"+getval(vals, index, "maxwind_kph")+" km/h"}</div>
          
          
          <div>{
            (getval(vals, index, "daily_will_it_rain")===0 ? "Dry " : "Rain ") + 
            getval(vals, index, "daily_chance_of_rain")+"% "+
            getval(vals, index, "totalprecip_mm")+"mm"
            
            }
          </div>
<Card.Text></Card.Text>
      </Card.Body>
     </Card>
  </div>
}


function Details({text}) {
  //console.log("draw Details="+text);
  return <Container >{text}</Container>;
}
