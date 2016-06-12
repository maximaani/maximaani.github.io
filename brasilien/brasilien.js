/*Script Brasilien*/
window.onload = function() {

    var map = L.map('map');
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    /*routing_machine*/
    var routing = L.Routing.control({
		show: false,
        waypoints: [
            L.latLng(-15.8, -47.85), /*Brasília*/
            L.latLng(-10.951944, -61.951667), /*Ji-Paraná*/
            L.latLng(-8.758611, -63.881944), /*Porto Velho*/
            L.latLng(-9.2452, -64.852), /*Nova California*/
            L.latLng(-9.971111, -67.811111) /*Rio Branco*/
        ]
    }).addTo(map);

    // Variable für den Tipp Marker definieren
    var tipp_marker;
	
    // Routing control hinzufügen und minimieren
    var routing_control = L.Routing.control({
        show: false
    }).addTo(map);
	
    // Klicks auf Karte verarbeiten
    map.on("click", function(event) {
        if (tipp_marker) {
            // Wegpunkte setzen und Routing control zeigen
            routing_control.setWaypoints([
                tipp_marker.getLatLng(),
                event.latlng
            ]);
            routing_control.show();
            // Tipp Marker löschen
            map.removeLayer(tipp_marker);
            tipp_marker = null;
        } else {
            // Routing control minimieren
            routing_control.hide()
                // Tipp anzeigen und Marker merken
            tipp_marker = L.marker(event.latlng).addTo(map);
            tipp_marker.bindPopup('Ziel klicken ...').openPopup();
        }


    });

    L.control.scale({
        'imperial': true
    }).addTo(map);
}