export async function makeRequest(type, zip_code, dt) {

    //alert('Your ZIP is: ' + zip_code);
    console.log('ForecastAPI, loading for zip=['+zip_code+']');
    let response;
    try {
        let request = "https://api.weatherapi.com/v1/"+type+".json?q="+zip_code+"&days=10&key=1265eb95a1c24244be4183635250609";
        if (dt!="")
            request += "&dt="+dt;
        /*if (type=="future")
            request += "&dt=2025-10-01";
        else if (type=="history")
            request += "&dt=2025-01-01";
        */
      //response = await fetch("https://api.weatherapi.com/v1/current.json?q=76040&key=1265eb95a1c24244be4183635250609", {
      response = await fetch(request, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          //...options.headers,
        },
        body: null,
      });
      //let xxx = await response.json();
      console.log('have got response, ok='+response.ok+" status="+response.status); //+' xxx='+xxx;
    }
    catch (error) {
        console.log('ForecastAPI, error=['+error+']');
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

    return {
      ok: response.ok,
      status: response.status,
      body: response.status !== 204 ? await response.json() : null
    };
  }


export function getdate(vals, index) {
  if (vals==undefined) return  "-";
  else if (index < 0) return  "-";
  else if (vals["forecast"]["forecastday"].length < index+1) return "~";
  else return vals["forecast"]["forecastday"][index]["date"];
}

export function getval(vals, index, name) {
  if (vals==undefined) return  "-"; 
  else if (index < 0) return  "-";
  else if (vals["forecast"]["forecastday"].length < index+1) return "~";
  else return vals["forecast"]["forecastday"][index]["day"][name];
}

export function geticon(vals, index) {
  if (vals==undefined) return  "-"; 
  else if (index < 0) return  "-";
  else if (vals["forecast"]["forecastday"].length < index+1) return "~";
  else return "https:"+vals["forecast"]["forecastday"][index]["day"]["condition"]["icon"];
}
