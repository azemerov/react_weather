import { Activity, useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import { makeRequest, getdate, getval, geticon } from "./ForecastAPI";
import Container from 'react-bootstrap/Container';
import InputField from "./InputField";
import Stack from 'react-bootstrap/Stack';
<<<<<<< HEAD
import OpenLayersMap from "./GeoMap.js";
=======
import MapView from "./MapView";
>>>>>>> 64d14a9cc77f5c6ba565015e2ec0fa44b9432b04

export function Forecast({type}) {
  console.log(`Forecast(${type})`);
  const [forecast, setForecast] = useState();
  const [zip, setZip]           = useState("76040");
  const [dt, setDt]             = useState("");
  const [currentIdx, setCurrentIdx] = useState(-1);
<<<<<<< HEAD
  const [lat, setLat] = useState(0.0);
  const [lon, setLon] = useState(0.0);

=======
  const [showWithActivity, setShowWithActivity] = useState(true);
  const [long, setLong] = useState(-96);
  const [latt, setLatt] = useState(32);
  
>>>>>>> 64d14a9cc77f5c6ba565015e2ec0fa44b9432b04
  useEffect(() => {
    (
      async () => {
        console.log("Forecast() zip|dt");
        let response = await makeRequest(type, zip, dt);
        setForecast(response.body);
        if (forecast && forecast.location)
        {
          console.log("forecast.location="+forecast.location.name+
            " "+forecast.location.country+
            ", "+forecast.location.lattitude+":"+forecast.location.longitute
          );
          setLat(forecast.location.lattitude);
          setLon(forecast.location.longitute);
        }
        else
        {
          console.log("undefined location");
          setLat(0.0); setLon(0.0);
        }
      }
    )();
<<<<<<< HEAD
  }, [zip, dt]);
=======
  }, [zip, dt, type]);
         
  useEffect(() => {
    if (forecast && forecast.location) {
      setLong(forecast.location.lon);
      setLatt(forecast.location.lat);
    }
  }, [forecast]);
>>>>>>> 64d14a9cc77f5c6ba565015e2ec0fa44b9432b04

  function onDayClick(forecast, index) {
    setCurrentIdx(index);
  }

  function doCoordinateSet(longitute, latitude) {
    try {
      // DO NOTHING setZip(longitute+","+latitude);
    }
    catch (error) {
      console.log(error);
    }
  }

  //console.log("doCoordinateSet=" + doCoordinateSet);
  return (
    <Container fluid className="Forecast">

      <Stack className="top" direction="horizontal">
        <InputField id="zip" className="m-2" initvalue={zip} type="text" placeholder="Type ZIP code and press Enter" onEnterValue={(val) => {setZip(val);}}  />
        { (forecast && forecast != undefined && forecast.location) ?
        <div className="m-2"><b>{forecast && forecast.location.name+", "+forecast.location.region+", "+forecast.location.country}</b></div>
        :
        <></>
        }
        <InputField id="dt" className="m-4" initvalue={dt} type="text" placeholder="Type DT in yyyy-mm-dd format and press Enter" onEnterValue={(val) => {setDt(val);}} />
        <button onClick={() => setLong((x) => x+10)}>East</button>
        <button onClick={() => setLatt((x) => x+10)}>North</button>
      </Stack>
      <Stack direction="horizontal" style={{"column-gap": "1em"}}>
         {
          (forecast && "forecast" in forecast) ? 
            forecast["forecast"]["forecastday"].map(
              (day, i) => { return <Day key={"Day:"+i} vals={forecast} index={i} onClickHandler={onDayClick}>...</Day> }
            ) : <></>
          }
          <Details forecast={forecast} currentIdx={currentIdx} style={{align_self: 'center', padding: '10px', width: '190px'}}/>
        </Stack>
        <Stack direction="horizontal" >
          <Details forecast={forecast} currentIdx={currentIdx} />
        </Stack>
        <button onClick={() => setShowWithActivity((x) => !x)}>
          {showWithActivity ? "Hide" : "Show"} Map
        </button>
        <Activity mode={showWithActivity ? "visible" : "hidden"}>
          <MapView long={long} latt={latt}></MapView>
        </Activity>
    </Container>
  );
}

function Day({vals, index, onClickHandler}) {

    return <div className="day">
     <Card style={{ width: '170px', margin: 0, }} onClick={() => onClickHandler(vals, index)}>
      <Card.Header><b>{getdate(vals, index)}</b></Card.Header>
      <Card.Body>
          <img src={geticon(vals, index)} className="card-img-fluid" alt="?"></img>
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
        <i>click on a day to show details ...</i>
        </Container>;
}
