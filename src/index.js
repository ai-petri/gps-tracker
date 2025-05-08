import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import OSM from "ol/source/OSM";
import stylesheet from "ol/ol.css";

const styleTag = document.createElement("style");
styleTag.innerHTML = stylesheet;
document.head.append(styleTag);

const div = document.createElement("div");
div.style.width = "100vw";
div.style.height = "100vh";
document.body.append(div);

const map = new Map({
    target: div,
    layers:[
        new TileLayer({source: new OSM()})
    ],
    view: new View({
        center: fromLonLat([0,0]),
        zoom:0
    })
});