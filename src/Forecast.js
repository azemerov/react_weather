import { useState, useRef, useEffect } from "react";
//import { Routes, Route } from "react-router-dom";
//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import { makeRequest, getdate, getval, geticon } from "./ForecastAPI";
import Container from 'react-bootstrap/Container';
import InputField from "./InputField";
import Stack from 'react-bootstrap/Stack';

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

  console.log('draw Forecast');
  return (
    <Container fluid className="Forecast">

      <Stack className="top" direction="horizontal">
        <InputField id="zip" className="m-2" initvalue={zip} type="text" placeholder="Type ZIP code and press Enter" onEnterValue={(val) => {setZip(val);}}  />
        <div className="m-2">{forecast && forecast.location.name+", "+forecast.location.region+", "+forecast.location.country}</div>
        <InputField id="dt" className="m-4" initvalue={dt} type="text" placeholder="Type DT in yyyy-mm-dd format and press Enter" onEnterValue={(val) => {setDt(val);}} />
        </Stack>
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
      <Details forecast={forecast} currentIdx={currentIdx} />
    </Container>
  );
}

function Day({vals, index, onClickHandler}) {
   //console.log('Draw Day component #'+index);
   return <div className="day">
     <Card style={{ width: '170px', margin: 0, }} onClick={() => onClickHandler(vals, index)}>
      <Card.Header><b>{getdate(vals, index)}</b></Card.Header>
      <Card.Body>
          <img src={geticon(vals, index)} className="card-img-fluid"></img>
          <div>{getval(vals, index, "mintemp_c")+"-"+getval(vals, index, "maxtemp_c")+" C"}</div>
          <div>{getval(vals, index, "maxwind_kph")+"-"+getval(vals, index, "maxwind_kph")+" km/h"}</div>
          <div>Humidity: {getval(vals, index, "avghumidity")+" %"}</div>
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


function Details({forecast, currentIdx}) {
  //console.log("draw Details="+text);
  //return <Container >{text}</Container>;

  if (forecast  && currentIdx >= -1)
  return    <Container  > 
          {currentIdx}<br />
          {getdate(forecast, currentIdx)}<br />
          {"Temp: "+getval(forecast, currentIdx, "mintemp_c")+"-"+getval(forecast, currentIdx, "maxtemp_c")+" C "} <br />
          {"Max.Wind: "+getval(forecast, currentIdx, "maxwind_kph")+" km/h "} <br/>
          {getval(forecast, currentIdx, "daily_will_it_rain")===0 ? "Dry " : "Rain "}<br/> 
          {getval(forecast, currentIdx, "daily_chance_of_rain")+"% "}<br/>
          {"Precip.: "+getval(forecast, currentIdx, "totalprecip_mm")+"mm"}
      </Container>;
  else return <>
  </>
  

}
