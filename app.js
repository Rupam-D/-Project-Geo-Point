//selectors
const sourcelatlng = document.getElementById("source")
const destlatlng = document.getElementById("dest")
const showdirection=document.getElementById("directbtn")
const fullscr=document.getElementById("fullscreen")
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
marker1.addTo(map)


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
showdirection.addEventListener("click",(sd)=>{
     console.log(sd)
     // marker2.remove()
     destmarker.remove()
     L.Routing.control({
          waypoints: [
               L.latLng(slat_actual,slng_actual),
               // L.latLng[(slat_actual,slng_actual],{icon:myIcon2}),
               L.latLng(dlat_actual,dlng_actual)
          ]
     }).on('routesfound', (e)=>{
          console.log(e)
          e.routes[0].coordinates
          .forEach((coordinates,index) => {
               setTimeout(()=>{
               marker2.setLatLng([coordinates.lat, coordinates.lng])},90*index)
          });
     }).addTo(map);

})

//Mapscaling
L.control.scale({position:'bottomright'}).addTo(map)

//fullscreen
fullscr.addEventListener("click",(fs)=>{
     fs.preventDefault()
     mapID=document.getElementById("map")
     mapID.requestFullscreen()

})
// 

document.getElementById("uses").addEventListener("click",e=>{
     e.preventDefault()
     location.href="#howtouse"
})
document.getElementById("features").addEventListener("click",e=>{
     e.preventDefault()
     location.href="#featuresall"
})
document.getElementById("visitus").addEventListener("click",e=>{
     e.preventDefault()
     location.href="#maparea"
})



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
