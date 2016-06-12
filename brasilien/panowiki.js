/*Script Panoramio, Wikipedia, etc. */

window.onload = function() {

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