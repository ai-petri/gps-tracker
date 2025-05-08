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


navigator.geolocation.watchPosition(updatePosition);

function updatePosition(position)
{
    showPosition(position);
    updateTrack(position);
}

function showPosition(position)
{
    let coordinates = fromLonLat([position.coords.longitude, position.coords.latitude]);

    let point = vectorSource.getFeatureById("currentPosition");
    if(point)
    {
        point.getGeometry().setCoordinates(coordinates);
    }
    else
    {   
        point = new Feature({geometry: new Point(coordinates)});
        point.setStyle(new Style({image: new Circle({radius: 5, fill: new Fill({color: "blue"})})}));
        point.setId("currentPosition");
        vectorSource.addFeature(point);
    }

    map.getView().animate({
        center: coordinates,
        zoom: 14
    });
}

function updateTrack(position)
{
    let coordinates = fromLonLat([position.coords.longitude, position.coords.latitude]);

    let track = vectorSource.getFeatureById("track");
    if(track)
    {
        track.getGeometry().appendCoordinate(coordinates)
    }
    else
    {
        track = new Feature({geometry: new LineString([coordinates])});
        track.setStyle(new Style({stroke: new Stroke({color: "blue", width: 1})}));
        track.setId("track");
        vectorSource.addFeature(track);
    }
}
