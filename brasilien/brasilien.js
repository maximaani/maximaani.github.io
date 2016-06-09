/*Script Brasilien*/
window.onload = function() {

    var map = L.map('map', {
        center: [-15.5, -56.100],
        zoom: 5
    }); /*Cuiabá*/

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    /*Destination: Marker setzen*/
    var marker1 = L.marker([-15.8, -47.85]).addTo(map);
    marker1.bindPopup('<h1>Brasília</h1><p><h3>Infotext</h3></p>').openPopup(); /*openPopup lässt das Popup offen*/
    var marker2 = L.marker([-10.951944, -61.951667]).addTo(map);
    marker2.bindPopup('<h1>Ji-Paraná</h1><p><h3>Infotext</h3></p>')
    var marker3 = L.marker([-8.758611, -63.881944]).addTo(map);
    marker3.bindPopup('<h1>Porto Velho</h1><p><h3>Infotext</h3></p>')
    var marker4 = L.marker([-9.2452, -64.852]).addTo(map);
    marker4.bindPopup('<h1>Nova California</h1><p><h3>Infotext</h3></p>')
    var marker5 = L.marker([-9.971111, -67.811111]).addTo(map);
    marker5.bindPopup('<h1>Rio Branco</h1><p><h3>Infotext</h3></p>')
    var marker6 = L.marker([-22.908333, -43.196389]).addTo(map);
    marker6.bindPopup('<h1>Rio de Janeiro</h1><p><h3>Infotext</h3></p>').addTo(map);

    var markergroup = new L.featureGroup([marker1, marker2, marker3, marker4, marker5, marker6]);
    /*map.fitBounds(markergroup.getBounds()); hier funktioniert was nicht richtig*/
	
	var mouseposDiv = document.getElementById("mousepos");
    //Referenz auf Div
    // "click" die Koordinaten werden nur angezeigt, wenn man clickt; "mousemove" die Koordinaten werden bei jeder Mausbewegenung über die Karte angepasst
    map.on("mousemove", function(event) {
        console.log("Event ", event);
        mouseposDiv.innerHTML = "Lat: " + event.latlng.lat + "Lng: " + event.latlng.lng;

    });

    /*Ziehen von Polylines zwischen Destinationen*/
    var linie = L.polyline([
        [-15.8, -47.85],
        [-10.951944, -61.951667],
    ], {
        color: '#004d00',
        weight: 4
    }).addTo(map);


    var linie = L.polyline([
        [-10.951944, -61.951667],
        [-8.758611, -63.881944]
    ], {
        color: '#008000',
        weight: 4
    }).addTo(map);

    var linie = L.polyline([
        [-8.758611, -63.881944],
        [-9.2452, -64.852]
    ], {
        color: '#00b300',
        weight: 4
    }).addTo(map);

    var linie = L.polyline([
        [-9.2452, -64.852],
        [-9.971111, -67.811111]
    ], {
        color: '#00e600',
        weight: 4
    }).addTo(map);;

    var linie = L.polyline([
        [-9.971111, -67.811111],
        [-15.8, -47.85]
    ], {
        color: '#1aff1a',
        weight: 4
    }).addTo(map);
    map.fitBounds(linie.getBounds());

    /*Radius um die Hauptstadt Brasília*/
    var circle = L.circle([-15.8, -47.85], 90000, {
        color: '#cc5200',
        /*dark orange*/
        fillColor: '#cc5200',
        fillOpacity: 0.5
    }).addTo(map);

    /*Testversuch: setzen eines Polygons*/
    var polygon = L.polygon([
        [-9.2452, -64.852],
        [-9.9, -65],
        [-10, -65.5]
    ]).addTo(map);

    /*Panoramio einbetten*/

    var bounds = markergroup.getBounds();
    var url_panoramio = "http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20" +
        '&minx=' + bounds.getWest() +
        '&miny=' + bounds.getSouth() +
        '&maxx=' + bounds.getEast() +
        '&maxy=' + bounds.getNorth() +
        '&size=mini_square&mapfilter=true&callback=zeigBilder';
    var script = document.createElement("script");
    script.src = url_panoramio;
    document.getElementsByTagName('head')[0].appendChild(script);
    window.zeigBilder = function(data) {
        for (var i = 0; i < data.photos.length; i++) {
            // console.log("Photo Titel: ", i, data.photos[i].photo_title);
            var x = L.marker(
                [data.photos[i].latitude, data.photos[i].longitude], {
                    icon: L.icon({
                        iconUrl: data.photos[i].photo_file_url,
                        iconSize: [40, 40]
                    })
                }
            ).bindPopup("<h2>" + data.photos[i].photo_title + "</h2>" +
                "<a href=' " + data.photos[i].photo_url + "'>Link zum Foto</a>"
            ).addTo(map);
            // console.log(data.photos[i].photo_file_url)
        }
    }

    /*routing_machine*/
    var routing = L.Routing.control({
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

    /*Wikipedia einbetten*/
    var url_wiki = "http://api.geonames.org/wikipediaBoundingBoxJSON?username=oeggl" +
        '&west=' + bounds.getWest() +
        '&south=' + bounds.getSouth() +
        '&east=' + bounds.getEast() +
        '&north=' + bounds.getNorth() +
        '&lang=de' +
        '&callback=zeigWiki';
    var script2 = document.createElement("script");
    script2.src = url_wiki;
    document.getElementsByTagName('head')[0].appendChild(script2);
    window.zeigWiki = function(wikidata) {
        // marker add, popup add, link add
        for (var i2 = 0; i2 < wikidata.geonames.length; i2++) {
            // console.log("Wiki-Titel: " + wikidata.geonames[i2].title);
            var wik_mark = L.marker([wikidata.geonames[i2].lat, wikidata.geonames[i2].lng]);
            var icon = L.icon({
                iconUrl: "image/wikipedia_icon.png",
                iconSize: [40, 40]
            });
            wik_mark.setIcon(icon);
            wik_mark.bindPopup("<a href='http://" + wikidata.geonames[i2].wikipediaUrl +
                "'>" + wikidata.geonames[i2].title + "</a>");
            wik_mark.addTo(map);
            // console.log(wik_mark)

        }
    }
    L.control.scale({
        'imperial': true
    }).addTo(map);
}