window.onload = function() {
    
	// Legendenobjekt mit Bezeichnungen nach Typnummern
        var legendLabels = {
            10 : 'NP-Zentrum / Ausstellung',
            11 : 'NP-Infostelle / Infopunkt',
            12 : 'NP-Themenweg',
            13 : 'Natur-Schauplatz',
            14 : 'Forschungseinrichtung',
            20 : 'Alpengasthof',
            21 : 'Parkplatz',
            22 : 'Taxizubringer',
            23 : 'Mautstraße',
            24 : 'Bergbahn',
            25 : 'Kutschenzubringer',
            26 : 'Hütte mit Übernachtung',
            27 : 'Hütte ohne Übernachtung',
            28 : 'Biwak / Selbstversorgerhütte',
            29 : 'Lehrweg (nicht NP)',
            30 : 'Sehenswürdigkeit (Schloss, Burg)',
            31 : 'Museum',
            32 : 'Mountainbike',
            33 : 'Wasserfall',
            34 : 'Wildpark',
            35 : 'Bergwerk',
            36 : 'Mühle',
            37 : 'Aussichtsplattform',
            40 : 'TVB Infobüro'
        };
	
	var map = L.map('routingmap', {
        layers: [
            L.tileLayer("http://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            })
        ],
        center: [47.26, 11.38],
        zoom: 10
    });

    L.control.scale({
        'imperial': false
    }).addTo(map);

    var markers = L.markerClusterGroup({
		disableClusteringAtZoom : 14
	});
	map.addLayer(markers);
	
	var pois = L.geoJson(window.POIS, {
        onEachFeature: function(feature, layer) {
            //console.log(feature);
            var description = feature.properties.NAME;
            if (feature.properties.SEEHOEHE > 0 && feature.properties.SEEHOEHE < 9999) {
                //Seehöhe dazuschreiben
                description += " (" + feature.properties.SEEHOEHE + "m)";
            }
            layer.bindPopup(description);
        },
		pointToLayer : function (feature, latlng) {
			return L.marker(latlng, {
				icon : L.icon({
					iconUrl : 'icons/nphtt_' + feature.properties.POI_TYP + '.png',
					iconSize: [36, 36],
					iconAnchor: [18, 18],
					popupAnchor: [0, -8]
				}),
			});
		}
	}).addTo(markers);

    map.fitBounds(pois.getBounds());

    //console.log(window.POIS);
	

	
	
	
	
	
	
};