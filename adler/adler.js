/*
 *	Adlerweg Script
 *	zeigt 3 Etappen des Adlerwegs auf einer Leaflet Karte mit Photos von Panoramio 	*	und Wikipedia Einträge werden hinzugefügt
 *	Hintergrund Karte: basemap.at
 */
window.onload = function() {

    var layers = { // http://www.basemap.at/wmts/1.0.0/WMTSCapabilities.xml
        geolandbasemap: L.tileLayer("http://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
            attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
        }),
        bmapoverlay: L.tileLayer("http://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
            attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
        }),
        bmapgrau: L.tileLayer("http://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
            attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
        }),
        bmaphidpi: L.tileLayer("http://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
            attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
        }),
        bmaporthofoto30cm: L.tileLayer("http://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
            attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
        }),
        osmLayer: L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>'
        })
    };

    var adlerkarte = L.map("adlerkarteDiv", {
        layers: [layers.geolandbasemap],
        center: [47.522, 12.429],
        zoom: 11
    });


    var etappe01 = L.geoJson(etappe01json, {
        style: {
            color: "#ff0000",
            weight: 6
        }
    });
    etappe01.bindPopup("<p<h1>1. Etappe</h1><h3>St. Johann bis Gaudeamushütte</h3></p>")

    var etappe02 = L.geoJson(etappe02json, {
        style: {
            color: "#0000ff",
            weight: 6
        }
    });
    etappe02.bindPopup("<p<h1>2. Etappe</h1><h3>Gaudeamushütte bis Hintersteiner See</h3></p>")

    var etappe03 = L.geoJson(etappe03json, {
        style: {
            color: "#00ff66",
            weight: 6
        }
    });
    etappe03.bindPopup("<p<h1>3. Etappe</h1><h3>Hintersteiner See bis Kufstein</h3></p>")

    var adlergroup = new L.featureGroup([etappe01, etappe02, etappe03]);
    adlerkarte.addLayer(adlergroup);
    adlerkarte.fitBounds(adlergroup.getBounds());

    L.control.layers({
        "Open Street Map": layers.osmLayer,
        "Geoland Basemap": layers.geolandbasemap,
        "Geoland Basemap Overlay": layers.bmapoverlay,
        "Geoland Basemap Grau": layers.bmapgrau,
        "Geoland Basemap High DPI": layers.bmaphidpi,
        "Geoland Basemap Orthofoto": layers.bmaporthofoto30cm
    }, {
        "Tracks": adlergroup
    }).addTo(adlerkarte);


    L.control.scale({
        'imperial': true
    }).addTo(adlerkarte);

    var bounds = adlergroup.getBounds();
    var url = "http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20" +
        '&minx=' + bounds.getWest() +
        '&miny=' + bounds.getSouth() +
        '&maxx=' + bounds.getEast() +
        '&maxy=' + bounds.getNorth() +
        '&size=mini_square&mapfilter=true&callback=zeigBilder';
    var script = document.createElement("script");
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
    window.zeigBilder = function(data) {
        for (var i = 0; i < data.photos.length; i++) {
            console.log("Fertig geladen: ", i, data.photos[i].photo_title);
            L.marker([data.photos[i].latitude, data.photos[i].longitude], {
                    icon: L.icon({
                        iconUrl: data.photos[i].photo_file_url
                    })
                }).bindPopup("<h2>" + data.photos[i].photo_title +
                    "</h2><a href='" + data.photos[i].photo_url + "'>Link zum Bild</a>")
                .addTo(adlerkarte);
        }
    }

    var urlwiki = "http://api.geonames.org/wikipediaBoundingBoxJSON?username=oeggl" +
        '&west=' + bounds.getWest() +
        '&south=' + bounds.getSouth() +
        '&east=' + bounds.getEast() +
        '&north=' + bounds.getNorth() +
        '&lang=de' +
        '&callback=zeigText';

    var scriptwiki = document.createElement("script");
    scriptwiki.src = urlwiki;
    document.getElementsByTagName('head')[0].appendChild(scriptwiki);
    window.zeigText = function(datawiki) {
        //marker add, popup add, link add
        for (var i = 0; i < datawiki.geonames.length; i++) {
            console.log("Wiki-Titel:" + datawiki.geonames[i].title);
            L.marker(
                [datawiki.geonames[i].lat, datawiki.geonames[i].lng], {
                    icon: L.icon({
                        iconUrl: 'wikipedia_icon.png',
                        iconSize: [40, 40]
                    })
                }
            ).bindPopup("<a href='http://" + datawiki.geonames[i].wikipediaUrl +
                "'>" + datawiki.geonames[i].title + "</a>").addTo(adlerkarte);


        }
    }
};