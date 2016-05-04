var max = 0;
var min = 9999;
var up = 0;
var down = 0;
var diff = 0;
var letzter;
var aw1 = L.geoJson(etappe01json, {
    onEachFeature: function(feature, layer) {
        for (var i = 0; i < feature.geometry.coordinates.length; i++) {
            var c = feature.geometry.coordinates[i];
            max = Math.max(max, feature.geometry.coordinates[i][2]);
            min = Math.min(min, feature.geometry.coordinates[i][2]);
            console.log(i, ":", [2]);
            console.log(letzter, "-", c[2], (letzter - c[2]));
            if (letzter) {
				diff = diff + (c[2]- letzter);
                if (letzter < c[2]) {
                    up = up + (c[2]-letzter);
				} else if (letzter > c[2]){
                    down = down + (letzter-c[2]);
				} else {
					console.log("Letzter und aktueller Punkt sind gleich hoch");
				}
               }
            letzter = c[2];
        }
        console.log("up: ", up, "down: ", down, diff);
        console.log("MAX: ", max);
        console.log("MIN: ", min);
        // console.log("Feature: ", feature, "Layer: ", layer);
    }
});