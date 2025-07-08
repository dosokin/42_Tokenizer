import {getGrillz42Contract, getGrillzFarm42Contract} from "./ethClient.js";
import L from "leaflet"
import {eventToFarm, getCurrentAddress} from "./utils.js";
import {getBuildEvents} from "./utils.js";


export function getSelectedLocation() {
    return selectedLocation;
}


function displayFarm(farm, currentAddress, map) {

    let icon;

    if (currentAddress === farm.owner) {
        icon = new L.Icon({
            iconUrl: 'cricket-circle.png',
            iconSize: [45, 35],
            popupAnchor: [0, -5],
        })
    } else {
        icon = new L.Icon({
            iconUrl: 'cricket-blue.png',
            iconSize: [35, 25],
            popupAnchor: [0, -5],
        })
    }


    let marker = L.marker([farm.latitude, farm.longitude], {icon: icon,})
        .bindPopup(`<b>${farm.name}</b><br>Built by ${farm.owner}`)
        .addTo(map)

    markers.push(marker);
}

function formatLongitude(longitude) {

    if (longitude > 180){
        while (!(longitude > -180 && longitude < 180)) {
            longitude -= 360;
        }
    } else if (longitude < -180) {
        while (!(longitude > -180 && longitude < 180)){
            longitude += 360;
        }
    }

    return longitude;
}

function loadMap() {

    map = L.map('map').setView([30, 0], 0);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions"></a>',
        subdomains: 'abcd',
        maxZoom: 12,
        minZoom: 2,
    }).addTo(map);

    function onMapClick(e) {
        marker
            .setLatLng(e.latlng)
            .addTo(map);
        selectedLocation = e.latlng;
        selectedLocation.lng = formatLongitude(selectedLocation.lng);
    }

    if (window.location.pathname.includes("farm")) {
        map.on("click", onMapClick)
    } else {
        map.setMaxBounds(map.getBounds());
    }


    return map
}

export async function updateMap() {

    if (!map) {
        loadMap();
    } else {
        markers.forEach((marker) => map.removeLayer(marker));
        markers = [];
    }

    const currentAddress = await getCurrentAddress();

    const events = await getBuildEvents();

    events.forEach((e) => {
        const farm = eventToFarm(e);
        displayFarm(farm, currentAddress, map);
    });

}


let map;
let selectedLocation;
let marker = L.marker();
let markers = [];

if (window.ethereum) {

    window.ethereum.on('accountsChanged', updateMap);
    updateMap();

    const contract = getGrillzFarm42Contract();

    const filter = contract.filters.BuildFarm();

    contract.on(filter, async (e) => {
        const farm = eventToFarm(e);

        const currentAddress = await getCurrentAddress();

        displayFarm(farm, currentAddress, map);
    })

} else {
    loadMap();

    for (let i = 0; i < 42; i++) {
        let latitude = Math.round(Math.random() * 90);
        if (latitude % 2){
            latitude *= -1;
        }
        let longitude = Math.round(Math.random() * 180);
        if (longitude % 2){
            longitude *= -1;
        }

        markers.push([latitude, longitude]);
    }

    markers.forEach((coords) => {
        L.marker(coords,
            {
                icon: new L.Icon({
                    iconUrl: 'cricket-blue.png',
                    iconSize: [35, 25],
                    popupAnchor: [0, -5],
                })
            })
            .addTo(map)
    });
}


