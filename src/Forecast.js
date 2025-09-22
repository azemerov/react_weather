import { useState, useRef, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import { makeRequest, getdate, getval, geticon } from "./ForecastAPI";
import Container from 'react-bootstrap/Container';
import InputField from "./InputField";
import Stack from 'react-bootstrap/Stack';

export function Forecast({type}) {
  const [forecast, setForecast] = useState();
  const [zip, setZip]           = useState("76040");
  const [dt, setDt]             = useState("");
  const [currentIdx, setCurrentIdx] = useState(-1);

  useEffect(() => {
    (
      async () => {
        let response = await makeRequest(type, zip, dt);
        setForecast(response.body);
      }
    )();
  }, [zip, dt]);
         
  function onDayClick(forecast, index) {
    setCurrentIdx(index);
  }

  console.log('draw Forecast');
  return (
    <Container fluid className="Forecast">

      <Stack className="top" direction="horizontal">
        <InputField id="zip" className="m-2" initvalue={zip} type="text" placeholder="Type ZIP code and press Enter" onEnterValue={(val) => {setZip(val);}}  />
        <div className="m-2"><b>{forecast && forecast.location.name+", "+forecast.location.region+", "+forecast.location.country}</b></div>
        <InputField id="dt" className="m-4" initvalue={dt} type="text" placeholder="Type DT in yyyy-mm-dd format and press Enter" onEnterValue={(val) => {setDt(val);}} />
      </Stack>
      <Stack direction="horizontal">
         {
          (forecast && "forecast" in forecast) ? 
            forecast["forecast"]["forecastday"].map(
              (day, i) => { return <Day vals={forecast} index={i} onClickHandler={onDayClick}>...</Day> }
            ) : <></>
          
          }
          <Details forecast={forecast} currentIdx={currentIdx} />
        </Stack>
    </Container>
  );
}

function Day({vals, index, onClickHandler}) {

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

  if (forecast && currentIdx > -1)
    return <Container className="with-border" style={{ width: '300px', margin: '10px', }} >  
          {getdate(forecast, currentIdx)}<br />
          {"Temp: "+getval(forecast, currentIdx, "mintemp_c")+"-"+getval(forecast, currentIdx, "maxtemp_c")+" C "} <br />
          {"Max.Wind: "+getval(forecast, currentIdx, "maxwind_kph")+" km/h "} <br/>
          {getval(forecast, currentIdx, "daily_will_it_rain")===0 ? "Dry " : "Rain "}<br/> 
          {getval(forecast, currentIdx, "daily_chance_of_rain")+"% "}<br/>
          {"Precip.: "+getval(forecast, currentIdx, "totalprecip_mm")+"mm"}
      </Container>;
  else 
    return <Container className="with-border" style={{ width: '300px', margin: '10px', }} >
        <i>click on a day...</i>
        </Container>;
}
