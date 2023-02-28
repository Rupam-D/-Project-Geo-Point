//selectors
const sourcelatlng = document.getElementById("source")
const destlatlng = document.getElementById("dest")
const showdirection = document.getElementById("directbtn")
const fullscr = document.getElementById("fullscreen")
//map
var map = L.map('map').setView([22.675916849036845, 88.37859442454632], 10);

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

let marker1 = L.marker([22.675916849036845, 88.37859442454632], { icon: myIcon1, draggable: true })
// marker1.addTo(map)

// var slat_actual;
// var slng_actual;

map.on("click",(s)=>{
     console.log(s)
     marker1.remove()
     marker2 = L.marker([s.latlng.lat, s.latlng.lng], { icon: myIcon1, draggable: false })
     marker2.addTo(map)
     slat_actual=s.latlng.lat
     slng_actual=s.latlng.lng
     slat = Number(slat_actual).toFixed(4)
     slng = Number(slng_actual).toFixed(4)
     sourcelatlng.value = `${slat}/${slng}`
})
map.on("contextmenu",(d)=>{
     console.log(d)
     destmarker = L.marker([d.latlng.lat, d.latlng.lng], { icon: myIcon2, draggable: false })
     destmarker.addTo(map)
     dlat_actual=d.latlng.lat
     dlng_actual=d.latlng.lng
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

// map.setView([slat_actual, slng_actual], 14);

// API
const apiKey = "AAPKb9c96aa1935b473da9891691057267f5UuCJcSINB94njisgcQm8qRn_KFyU2W7X4bnPDUP0i-XKSmt3eZnwpWmpmiwcFn4n";
// const basemapEnum = "ArcGIS:Navigation";
// ersi map
// L.esri.Vector.vectorBasemapLayer(googleStreets, {
//      apiKey: apiKey
// // }).addTo(map);

// control
L.Control.PlacesSelect = L.Control.extend({
     onAdd: function (map) {

          const placeCategories = [
               ["", "Choose a category..."],
               // ["Coffee shop", "Coffee shop"],
               ["Gas station", "Gas station"],
               ["Food", "Food"],
               ["Hospital", "Hospital"],
               ["Police Station", "Police Station"],
               ["Fire Station", "Fire Station"]
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
          // Nothing to do here
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
// console.log(slat_actual,slng_actual)

// 
function showPlaces(category) {

     L.esri.Geocoding
          .geocode({
               apikey: apiKey
          })
          .category(category)
          .nearby(map.getCenter(), 10)

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

// location
L.control.locate().addTo(map);


//lat lng display

// map.on("mousemove",(e)=>{
//      console.log(e.latlng.lat,e.latlng.lng)
// })
// ..........................................................
// let sourcefunc =() => {
//      map.on("click", (eve) => {
//           console.log(eve)
//           marker1.remove()
//           marker2 = L.marker([eve.latlng.lat, eve.latlng.lng], { icon: myIcon1, draggable: false })
//           marker2.addTo(map)
//           slat = Number(eve.latlng.lat).toFixed(4)
//           slng = Number(eve.latlng.lng).toFixed(4)
//           sourcelatlng.value = `${slat}/${slng}`
//           // console.log(slat/slng)
//      })
// }
// let destfunc=()=>{
//      map.on("click",(e)=>{
//           let myIcon2 = L.icon({
//                iconUrl: './assets/location2.png',
//                iconSize: [40, 40]
//           })
//           destmarker=L.marker([e.latlng.lat, e.latlng.lng], { icon: myIcon2, draggable: false })
//           destmarker.addTo(map)
//           dlat=Number(e.latlng.lat).toFixed(4)
//           dlng = Number(e.latlng.lng).toFixed(4)
//           destlatlng.value = `${dlat}/${dlng}`
//      })

// }
// ................................................
// let parentfunc=async()=>{
//      await sourcefunc()
//      console.log("f1")
//      await destfunc()
//      console.log("f2")
// }
// parentfunc()
// if( map.on("click", (eve) => {
//      console.log(eve)
//      marker1.remove()
//      marker2 = L.marker([eve.latlng.lat, eve.latlng.lng], { icon: myIcon1, draggable: false })
//      marker2.addTo(map)
//      slat = Number(eve.latlng.lat).toFixed(4)
//      slng = Number(eve.latlng.lng).toFixed(4)
//      sourcelatlng.value = `${slat}/${slng}`
//      // console.log(slat/slng)
// })){
//      map.on("click",(e)=>{
//           console.log(e)
//           // let myIcon2 = L.icon({
//           //      iconUrl: './assets/location2.png',
//           //      iconSize: [40, 40]
//           // })
//           // destmarker=L.marker([e.latlng.lat, e.latlng.lng], { icon: myIcon2, draggable: false })
//           // destmarker.addTo(map)
//           // dlat=Number(e.latlng.lat).toFixed(4)
//           // dlng = Number(e.latlng.lng).toFixed(4)
//           // destlatlng.value = `${dlat}/${dlng}`
//      })
// }

// if (map.on("click", (s) => {
//      console.log(s)
//      marker1.remove()
//      marker2 = L.marker([s.latlng.lat, s.latlng.lng], { icon: myIcon1, draggable: false })
//      marker2.addTo(map)
//      slat = Number(s.latlng.lat).toFixed(4)
//      slng = Number(s.latlng.lng).toFixed(4)
//      sourcelatlng.value = `${slat}/${slng}`
// })) {
//      map.on("oncontextmenu", (d) => {
//           d.preventDefault()
//           destmarker = L.marker([d.latlng.lat, d.latlng.lng], { icon: myIcon2, draggable: false })
//           destmarker.addTo(map)
//           dlat = Number(d.latlng.lat).toFixed(4)
//           dlng = Number(d.latlng.lng).toFixed(4)
//           destlatlng.value = `${dlat}/${dlng}`

//           // console.log(d)
//           // return false

//      })
// }
// let source = (s) => {
//      console.log(s)
//      marker1.remove()
//      marker2 = L.marker([s.latlng.lat, s.latlng.lng], { icon: myIcon1, draggable: false })
//      marker2.addTo(map)
//      slat = Number(s.latlng.lat).toFixed(4)
//      slng = Number(s.latlng.lng).toFixed(4)
//      sourcelatlng.value = `${slat}/${slng}`


// }
// let dest = (d) => {
//      destmarker = L.marker([d.latlng.lat, d.latlng.lng], { icon: myIcon2, draggable: false })
//      destmarker.addTo(map)
//      dlat = Number(d.latlng.lat).toFixed(4)
//      dlng = Number(d.latlng.lng).toFixed(4)
//      destlatlng.value = `${dlat}/${dlng}`

// }
