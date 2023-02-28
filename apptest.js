//selectors
const sourcelatlng = document.getElementById("source")
const destlatlng = document.getElementById("dest")
const showdirection = document.getElementById("directbtn")
const fullscr = document.getElementById("fullscreen")
//map
var map = L.map('map').setView([22.675916849036845, 88.37859442454632], 9);

//google maps-streets
let googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
     maxZoom: 20,
     subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
googleStreets.addTo(map)

//marker
let myIcon1 = L.icon({
     iconUrl: './assets/location.png',
     iconSize: [40, 40]
});

let myIcon2 = L.icon({
     iconUrl: './assets/location2.png',
     iconSize: [40, 40]
})

// let marker1 = L.marker([22.675916849036845, 88.37859442454632], { icon: myIcon1, draggable: true })
// marker1.addTo(map)
{
     map.on("click", (s) => {
          console.log(s)
          // marker1.remove()
          marker2 = L.marker([s.latlng.lat, s.latlng.lng], { icon: myIcon1, draggable: false })
          marker2.addTo(map)
          slat_actual = s.latlng.lat
          slng_actual = s.latlng.lng
          slat = Number(slat_actual).toFixed(4)
          slng = Number(slng_actual).toFixed(4)
          sourcelatlng.value = `${slat}/${slng}`
     })
}
map.on("contextmenu", (d) => {
     console.log(d)
     destmarker = L.marker([d.latlng.lat, d.latlng.lng], { icon: myIcon2, draggable: false })
     destmarker.addTo(map)
     dlat_actual = d.latlng.lat
     dlng_actual = d.latlng.lng
     dlat = Number(dlat_actual).toFixed(4)
     dlng = Number(dlng_actual).toFixed(4)
     destlatlng.value = `${dlat}/${dlng}`
})

//Routing
showdirection.addEventListener("click", (sd) => {
     console.log(sd)
     // marker2.remove()
     destmarker.remove()
     L.Routing.control({
          waypoints: [
               L.latLng(slat_actual, slng_actual),
               // L.latLng[(slat_actual,slng_actual],{icon:myIcon2}),
               L.latLng(dlat_actual, dlng_actual)
          ]
     }).on('routesfound', (e) => {
          console.log(e)
          e.routes[0].coordinates
               .forEach((coordinates, index) => {
                    setTimeout(() => {
                         marker2.setLatLng([coordinates.lat, coordinates.lng])
                    }, 90 * index)
               });
     }).addTo(map);

})

//Mapscaling
L.control.scale({ position: 'bottomright' }).addTo(map)

//fullscreen
fullscr.addEventListener("click", (fs) => {
     fs.preventDefault()
     mapID = document.getElementById("map")
     mapID.requestFullscreen()

})
// 

document.getElementById("uses").addEventListener("click", e => {
     e.preventDefault()
     location.href = "#howtouse"
})
document.getElementById("features").addEventListener("click", e => {
     e.preventDefault()
     location.href = "#featuresall"
})
document.getElementById("visitus").addEventListener("click", e => {
     e.preventDefault()
     location.href = "#maparea"
})


// 27feb,23

// location
L.control.locate().addTo(map);

// map.setView([slat_actual, slng_actual], 14);

// API
const apiKey = "AAPKb9c96aa1935b473da9891691057267f5UuCJcSINB94njisgcQm8qRn_KFyU2W7X4bnPDUP0i-XKSmt3eZnwpWmpmiwcFn4n";
// control
L.Control.PlacesSelect = L.Control.extend({
     onAdd: function (map) {

          const placeCategories = [
               ["", "Choose a category..."],
               // ["Coffee shop", "Coffee shop"],
               ["Gas station", "Gas station"],
               // ["ATM", "ATM"],
               ["Food", "Food"],
               ["Hospital", "Hospital"],
               ["Police Station", "Police Station"]
               // ["Fire Station", "Fire Station"]
               // ["Parks and Outdoors", "Parks and Outdoors"]
          ];

          const select = L.DomUtil.create("select", "");
          select.setAttribute("id", "optionsSelect");
          select.setAttribute("style", "font-size: 16px;padding:4px 8px;");

          placeCategories.forEach((category) => {
               let option = L.DomUtil.create("option");
               option.value = category[0];
               option.innerHTML = category[1];
               select.appendChild(option);
          });

          return select;
     },

     onRemove: function (map) {
     }
});


L.control.placesSelect = function (opts) {
     return new L.Control.PlacesSelect(opts);
};

L.control.placesSelect({
     position: "topright"
}).addTo(map);

// layer
const layerGroup = L.layerGroup().addTo(map);

// 
function showPlaces(category) {

     L.esri.Geocoding
          .geocode({
               apikey: apiKey
          })
          .category(category)
          .nearby(map.getCenter(), 5)

          .run(function (error, response) {
               if (error) {
                    return;
               }

               layerGroup.clearLayers();

               response.results.forEach((searchResult) => {
                    L.marker(searchResult.latlng)
                         .addTo(layerGroup)
                         .bindPopup(`<b>${searchResult.properties.PlaceName}</b></br>${searchResult.properties.Place_addr}`);
               });

          });

}

const select = document.getElementById("optionsSelect");
select.addEventListener("change", () => {
     if (select.value !== "") {
          showPlaces(select.value);
     }
});


// ............................../
// Location mod

/**
 * Leaflet.AccuratePosition aims to provide an accurate device location when simply calling map.locate() doesn’t.
 * https://github.com/m165437/Leaflet.AccuratePosition
 *
 * Greg Wilson's getAccurateCurrentPosition() forked to be a Leaflet plugin
 * https://github.com/gwilson/getAccurateCurrentPosition
 *
 * Copyright (C) 2013 Greg Wilson, 2014 Michael Schmidt-Voigt
 */

// L.Map.include({
// 	_defaultAccuratePositionOptions: {
// 		maxWait: 10000,
// 		desiredAccuracy: 20
// 	},

// 	findAccuratePosition: function (options) {

// 		if (!navigator.geolocation) {
// 			this._handleAccuratePositionError({
// 				code: 0,
// 				message: 'Geolocation not supported.'
// 			});
// 			return this;
// 		}

// 		this._accuratePositionEventCount = 0;
// 		this._accuratePositionOptions = L.extend(this._defaultAccuratePositionOptions, options);
// 		this._accuratePositionOptions.enableHighAccuracy = true;
// 		this._accuratePositionOptions.maximumAge = 0;
		
// 		if (!this._accuratePositionOptions.timeout)
// 			this._accuratePositionOptions.timeout = this._accuratePositionOptions.maxWait;

// 		var onResponse = L.bind(this._checkAccuratePosition, this),
// 			onError = L.bind(this._handleAccuratePositionError, this),
// 			onTimeout = L.bind(this._handleAccuratePositionTimeout, this);

// 		this._accuratePositionWatchId = navigator.geolocation.watchPosition(
// 			onResponse,
// 			onError,
// 			this._accuratePositionOptions);

// 		this._accuratePositionTimerId = setTimeout(
// 			onTimeout,
// 			this._accuratePositionOptions.maxWait);
// 	},

// 	_handleAccuratePositionTimeout: function() {
// 		navigator.geolocation.clearWatch(this._accuratePositionWatchId);

// 		if (typeof this._lastCheckedAccuratePosition !== 'undefined') {
// 			this._handleAccuratePositionResponse(this._lastCheckedAccuratePosition);
// 		} else {
// 			this._handleAccuratePositionError({
// 				code: 3,
// 				message: 'Timeout expired'
// 			});
// 		}

// 		return this;
// 	},

// 	_cleanUpAccuratePositioning: function () {
// 		clearTimeout(this._accuratePositionTimerId);
// 		navigator.geolocation.clearWatch(this._accuratePositionWatchId);
// 	},

// 	_checkAccuratePosition: function (pos) {
// 		var accuracyReached = pos.coords.accuracy <= this._accuratePositionOptions.desiredAccuracy;

// 		this._lastCheckedAccuratePosition = pos;
// 		this._accuratePositionEventCount = this._accuratePositionEventCount + 1;

// 		if (accuracyReached && (this._accuratePositionEventCount > 1)) {
// 			this._cleanUpAccuratePositioning();
// 			this._handleAccuratePositionResponse(pos);
// 		} else {
// 			this._handleAccuratePositionProgress(pos);
// 		}
// 	},

// 	_prepareAccuratePositionData: function (pos) {
// 		var lat = pos.coords.latitude,
// 			lng = pos.coords.longitude,
// 			latlng = new L.LatLng(lat, lng),

// 			latAccuracy = 180 * pos.coords.accuracy / 40075017,
// 			lngAccuracy = latAccuracy / Math.cos(Math.PI / 180 * lat),

// 			bounds = L.latLngBounds(
// 				[lat - latAccuracy, lng - lngAccuracy],
// 				[lat + latAccuracy, lng + lngAccuracy]);

// 		var data = {
// 			latlng: latlng,
// 			bounds: bounds,
// 			timestamp: pos.timestamp
// 		};

// 		for (var i in pos.coords) {
// 			if (typeof pos.coords[i] === 'number') {
// 				data[i] = pos.coords[i];
// 			}
// 		}

// 		return data;
// 	},

// 	_handleAccuratePositionProgress: function (pos) {
// 		var data = this._prepareAccuratePositionData(pos);
// 		this.fire('accuratepositionprogress', data);
// 	},

// 	_handleAccuratePositionResponse: function (pos) {
// 		var data = this._prepareAccuratePositionData(pos);
// 		this.fire('accuratepositionfound', data);
// 	},

// 	_handleAccuratePositionError: function (error) {
// 		var c = error.code,
// 			message = error.message ||
// 				(c === 1 ? 'permission denied' :
// 				(c === 2 ? 'position unavailable' : 'timeout'));

// 		this._cleanUpAccuratePositioning();

// 		this.fire('accuratepositionerror', {
// 			code: c,
// 			message: 'Geolocation error: ' + message + '.'
// 		});
// 	}
// });

