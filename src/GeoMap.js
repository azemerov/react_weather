import { useEffect, useRef } from 'react';
import 'ol/ol.css'; // Import OpenLayers CSS
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { /*fromLonLat,*/ toLonLat } from 'ol/proj'; 

export default function OpenLayersMap({onCoordinateSet, latitude, longitude}) {
  const mapRef = useRef(); // Ref for the map container DOM element
  const olMap = useRef(); // Ref to store the OpenLayers map instance

  useEffect(() => {
    console.log("OpenLayersMap() onCoordinateSet="+onCoordinateSet);
    // Initialize the map when the component mounts
    olMap.current = new Map({
      target: mapRef.current, // Target the DOM element
      layers: [
        new TileLayer({
          source: new OSM(), // OpenStreetMap tile layer
        }),
      ],
      view: new View({
        center: [0, 0], // Initial center coordinates
        zoom: 5, // Initial zoom level
      }),
    });

    olMap.current.on('click', function(event) {
        // Get the coordinate in the map's view projection
        const viewCoordinate = event.coordinate;

        // Convert the coordinate to WGS84 (latitude and longitude)
        const coordinates = toLonLat(viewCoordinate);
        const [lon, lat] = coordinates;
        console.log(`Clicked at Longitude: ${lon}, Latitude: ${lat}`);
        if (onCoordinateSet)
          onCoordinateSet(lon, lat);
        // You can also display these coordinates in an HTML element
        // const coordinateDisplay = document.getElementById('coordinate-display');
        // if (coordinateDisplay)
        //   coordinateDisplay.innerText = `Lon: ${longitude.toFixed(4)}, Lat: ${latitude.toFixed(4)}`;
    });

    // Clean up the map when the component unmounts
    return () => {
      olMap.current.setTarget(undefined); // Detach the map from the DOM
      olMap.current = null;
    };
  }, []); // Run only once on mount

  useEffect(() => {
    const view = olMap.current.getView();
    var arr = latitude && longitude ? [latitude, longitude] : [0, 0];
    console.log("coordinates are changed: "+arr);
    view.setCenter(arr);
  }, [latitude, longitude]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
}
