import { useEffect, useState } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import { fromLonLat } from 'ol/proj'; // For transforming coordinates


function MapView({long, latt}) {
    const [map, setMap] = useState(null);

    useEffect(() => {
        const initmap = new Map({
        target: "map",
        layers: [
            new TileLayer({
            source: new OSM(),
            }),
        ],
        view: new View({
            center: [-90.00, 32.00],
            zoom: 13,
        }),
        });
        setMap(initmap);

        return () => {
            initmap.setTarget(null); // Clean up on unmount
        };
    }, []);

    useEffect(() => {
        console.log("Longitude: "+long+", Lattitude: "+latt);
        if (map) {
            const view = map.getView();
            const newCenter = fromLonLat([long, latt]);
            view.setCenter(newCenter);
            view.setZoom(13); // Optional: set a new zoom level
        }
    }, [map, long, latt]);

    return <div id="map" style={{ width: "50%", height: "400px" }} />;
}

export default MapView;
