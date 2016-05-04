var map = L.map("routingmap");
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var routing = L.Routing.control({
waypoints: [
	L.latLng(47.26, 11.38), // oder [47.26, 11.38]
	L.latLng (47, 12.54)
	]
}).addTo(map);
map.setView([47.26,11.38], 9);