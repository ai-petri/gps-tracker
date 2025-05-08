import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import OSM from "ol/source/OSM";
import stylesheet from "ol/ol.css";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { LineString, Point } from "ol/geom";
import { Circle, Icon, Fill, Stroke } from 'ol/style';
import Style from "ol/style/Style";

const styleTag = document.createElement("style");
styleTag.innerHTML = stylesheet;
document.head.append(styleTag);

const div = document.createElement("div");
div.style.width = "100vw";
div.style.height = "100vh";
document.body.append(div);

const vectorSource = new VectorSource();

const map = new Map({
    target: div,
    layers:[
        new TileLayer({source: new OSM()}),
        new VectorLayer({source: vectorSource})
    ],
    view: new View({
        center: fromLonLat([0,0]),
        zoom:0
    })
});


navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(position)
{
    let coordinates = fromLonLat([position.coords.longitude, position.coords.latitude]);
    
    let point = new Feature({geometry: new Point(coordinates)});
    point.setStyle(new Style({image: new Circle({radius: 5, fill: new Fill({color: "blue"})})}))
    vectorSource.addFeature(point);

    map.getView().animate({
        center: coordinates,
        zoom: 12
    });
}