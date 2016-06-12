/*Script Brasilien*/
window.onload = function() {

    var mapbraz = L.map('map_br');

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(mapbraz);

    var routing = L.Routing.control({
        show: false,
        waypoints: [
            L.latLng(-15.8, -47.85), /*Brasília*/
            L.latLng(-10.951944, -61.951667), /*Ji-Paraná*/
            L.latLng(-8.758611, -63.881944), /*Porto Velho*/
            L.latLng(-9.2452, -64.852), /*Nova California*/
            L.latLng(-9.971111, -67.811111) /*Rio Branco*/
        ]
    }).addTo(mapbraz);

    // Variable für den Tipp Marker definieren
    var tipp_marker;

    // Routing control hinzufügen und minimieren
    var routing_control = L.Routing.control({
        show: false
    }).addTo(mapbraz);

    // Klicks auf Karte verarbeiten
    mapbraz.on("click", function(event) {
        if (tipp_marker) {
            // Wegpunkte setzen und Routing control zeigen
            routing_control.setWaypoints([
                tipp_marker.getLatLng(),
                event.latlng
            ]);
            routing_control.show();
            // Tipp Marker löschen
            mapbraz.removeLayer(tipp_marker);
            tipp_marker = null;
        } else {
            // Routing control minimieren
            routing_control.hide()
                // Tipp anzeigen und Marker merken
            tipp_marker = L.marker(event.latlng).addTo(mapbraz);
            tipp_marker.bindPopup('Anklicken der Zieldestination: die Route wird berechnet ...').openPopup();
        }
    });

    /*Destination: Marker setzen*/
    var marker1 = L.marker([-15.8, -47.85]).addTo(mapbraz);
    marker1.bindPopup('<h1>Brasília</h1><p><h3>Wikipedia:<a href="https://de.wikipedia.org/wiki/Bras%C3%ADlia"> Link</a></h3></p>')
    var marker2 = L.marker([-10.951944, -61.951667]).addTo(mapbraz);
    marker2.bindPopup('<h1>Ji-Paraná</h1><p><h3>Wikipedia:<a href="https://de.wikipedia.org/wiki/Ji-Paran%C3%A1"> Link</a></h3></p>')
    var marker3 = L.marker([-8.758611, -63.881944]).addTo(mapbraz);
    marker3.bindPopup('<h1>Porto Velho</h1><p><h3>Wikipedia:<a href="https://de.wikipedia.org/wiki/Porto_Velho"> Link</a></h3></p>')
    var marker4 = L.marker([-9.2452, -64.852]).addTo(mapbraz);
    marker4.bindPopup('<h1>Nova California</h1><p><h3>Wikipedia (nur in Portugiesisch):<a href="https://pt.wikipedia.org/wiki/Nova_Calif%C3%B3rnia_(Porto_Velho)"> Link</a></h3></p>')
    var marker5 = L.marker([-9.971111, -67.811111]).addTo(mapbraz);
    marker5.bindPopup('<h1>Rio Branco</h1><p><h3>Wikipedia:<a href="https://de.wikipedia.org/wiki/Rio_Branco"> Link</a></h3></p>')
    var marker6 = L.marker([-22.908333, -43.196389]).addTo(mapbraz);
    marker6.bindPopup('<h1>Rio de Janeiro</h1><p><h3>Wikipedia:<a href="https://de.wikipedia.org/wiki/Rio_de_Janeiro"> Link</a></p>')


    var markergroup = new L.featureGroup([marker1, marker2, marker3, marker4, marker5, marker6]);
    mapbraz.fitBounds(markergroup.getBounds());

    var mouseposDiv = document.getElementById("mousepos");
    //Referenz auf Div
    // "click" die Koordinaten werden nur angezeigt, wenn man clickt; "mousemove" die Koordinaten werden bei jeder Mausbewegenung über die Karte angepasst
    mapbraz.on("mousemove", function(event) {
        console.log("Event ", event);
        mouseposDiv.innerHTML = "Lat: " + event.latlng.lat + "Lng: " + event.latlng.lng;

    });

    /*Ziehen von Polylines zwischen Destinationen*/
    var linie1 = L.polyline([
        [-15.8, -47.85],
        [-10.951944, -61.951667],
    ], {
        color: '#004d00',
        weight: 4
    }).addTo(mapbraz);

    var linie2 = L.polyline([
        [-10.951944, -61.951667],
        [-8.758611, -63.881944]
    ], {
        color: '#008000',
        weight: 4
    }).addTo(mapbraz);

    var linie3 = L.polyline([
        [-8.758611, -63.881944],
        [-9.2452, -64.852]
    ], {
        color: '#00b300',
        weight: 4
    }).addTo(mapbraz);

    var linie4 = L.polyline([
        [-9.2452, -64.852],
        [-9.971111, -67.811111]
    ], {
        color: '#00e600',
        weight: 4
    }).addTo(mapbraz);;

    var linie5 = L.polyline([
        [-9.971111, -67.811111],
        [-15.8, -47.85]
    ], {
        color: '#1aff1a',
        weight: 4
    }).addTo(mapbraz);

    /*Setzen eines Polygons für "Pastagem Plantada"*/

    var polygon1 = L.polygon([
        [-10.98, -61.54],
        [-11.0, -61.41],
        [-11.26, -61.31],
        [-11.52, -61.29],
        [-11.9, -61.52],
        [-11.73, -62.82],
        [-11.53, -62.55],
        [-11.16, -62.69],
        [-11.18, -62.83],
        [-10.90, -63.00],
        [-10.46, -63.21],
        [-10.32, -62.98],
        [-10.15, -62.26],
        [-10.97, -61.43],
    ]).addTo(mapbraz);

    polygon1.setStyle({
        color: '#8b4513',
        fillColor: '#8b4513'
    }); /*saddlebrown*/


    /*var circle = L.circle([-15.8, -47.85], 90000, {
		color: '#cc5200',
		fillColor:'#cc5200',
		fillOpacity:0.5
	}).addTo(mapbraz);*/
    /*Radius wurde wegen Überlagerung durch Panoramio deaktiviert*/

    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {

            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    /*Panoramio einbetten*/

    var bounds = markergroup.getBounds();
    var url_panoramio = "http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=30" +
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
            ).addTo(mapbraz);
            // console.log(data.photos[i].photo_file_url)
        }
    }

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
            wik_mark.addTo(mapbraz);
            // console.log(wik_mark)

        }

        L.control.scale({
            'imperial': true
        }).addTo(mapbraz);
    }
}