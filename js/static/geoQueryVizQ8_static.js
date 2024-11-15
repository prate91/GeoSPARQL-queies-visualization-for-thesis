// const url= "https://imagoarchive.it/fuseki/imago/query?output=json&query=";
// const named_graph = "https://imagoarchive.it/fuseki/imago/archive";
const url= "http://localhost:3030/moving/query?output=json&query=";
const named_graph = "urn:x-arq:UnionGraph";

data = [
   {
       "nlabel": {
           "type": "literal",
           "value": "Wine and Tourism 1"
       },
       "clabel": {
           "type": "literal",
           "value": "Italy"
       },
       "pglau": {
           "type": "literal",
           "datatype": "http://www.opengis.net/ont/geosparql#wktLiteral",
           "value": "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> POLYGON ((6.995877 45.696217, 6.990143 45.699059, 6.984333 45.70769, 6.985769 45.714596, 6.983225 45.719327, 6.988144 45.732023, 6.973448 45.740376, 6.985112 45.748296, 6.988028 45.757568, 6.994891 45.760757, 7.004568 45.786261, 7.009543 45.789457, 7.02399 45.806032, 7.029818 45.809946, 7.034724 45.80926, 7.05388 45.783514, 7.055665 45.776235, 7.050958 45.762832, 7.059093 45.756498, 7.058636 45.75061, 7.052843 45.741729, 7.035606 45.731377, 7.027028 45.721532, 7.012164 45.716503, 7.010228 45.708273, 6.995877 45.696217))"
       }
   },
   {
       "nlabel": {
           "type": "literal",
           "value": "The farm sustainably produces apple and derived alcoholic beverages (cider)"
       },
       "clabel": {
           "type": "literal",
           "value": "Italy"
       },
       "pglau": {
           "type": "literal",
           "datatype": "http://www.opengis.net/ont/geosparql#wktLiteral",
           "value": "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> POLYGON ((7.18755 45.706703, 7.20365 45.709838, 7.216659 45.712005, 7.217716 45.703663, 7.230785 45.704537, 7.230518 45.700339, 7.214999 45.685779, 7.210723 45.678108, 7.221214 45.650672, 7.211275 45.65201, 7.206723 45.67273, 7.198031 45.683517, 7.194702 45.695921, 7.183701 45.703365, 7.18755 45.706703))"
       }
   },
   {
       "nlabel": {
           "type": "literal",
           "value": "Bio- Bakery"
       },
       "clabel": {
           "type": "literal",
           "value": "Italy"
       },
       "pglau": {
           "type": "literal",
           "datatype": "http://www.opengis.net/ont/geosparql#wktLiteral",
           "value": "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> POLYGON ((7.153236 45.755978, 7.161557 45.757223, 7.163508 45.765824, 7.174239 45.776185, 7.189245 45.779115, 7.19509 45.775355, 7.187347 45.766478, 7.18949 45.76173, 7.198462 45.752729, 7.218554 45.74757, 7.232431 45.734676, 7.235021 45.730582, 7.233896 45.725611, 7.240138 45.722277, 7.244152 45.712519, 7.247921 45.710187, 7.243433 45.705471, 7.230785 45.704537, 7.217716 45.703663, 7.216659 45.712005, 7.20365 45.709838, 7.20267 45.717717, 7.19659 45.726977, 7.171157 45.730628, 7.158571 45.745294, 7.153236 45.755978))"
       }
   }
]

function parseWKT(string){
   // let text = '27 months';
   let regex = /POINT\((?<longitude>-?\d+\.\d+) (?<latitude>-?\d+\.\d+)\)/;
   return [longitude, latitudeunit] = regex.exec(string) || [];
 
 }

 function onEachFeature(feature, layer) {
   // does this feature have a property named popupContent?
   // console.log(feature.properties)
   if (feature.properties) {
       layer.bindPopup(feature.properties.LAU_NAME);
   }
}

function degreesToKmAtLatitude(degrees, latitude) {
   // Radius of the Earth in kilometers
   const earthRadiusKm = 6371;

   // Calculate the circumference of the circle at the specified latitude
   const circumferenceAtLatitude = 2 * Math.PI * earthRadiusKm * Math.cos(latitude * Math.PI / 180);

   // Calculate the distance in kilometers
   const distanceKm = (degrees / 360) * circumferenceAtLatitude;

   return distanceKm*1000;
}




document.addEventListener('DOMContentLoaded', function () {
   // var json = []
   // console.log(data);


let headers = new Headers();
//headers.append('X-CSRFToken', csrf);
headers.append('X-Requested-With', 'XMLHttpRequest');
 
var query_text = "PREFIX uom: <http://www.opengis.net/def/uom/OGC/1.0/>" +
"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
"PREFIX geof: <http://www.opengis.net/def/function/geosparql/> " +
"PREFIX geo: <http://www.opengis.net/ont/geosparql#>" +
"PREFIX narra: <https://dlnarratives.eu/ontology#>" +
"" +
"SELECT ?nlabel ?clabel ?pglau " +
"FROM <"+named_graph+">" +
"WHERE { " +
"    {   " +
"         ?narra narra:isAboutCountry ?country ;" +
"           narra:isAboutLAU ?lau ;" +
"    	      rdfs:label ?nlabel ." +
"          ?country rdfs:label ?clabel ." +
"          ?lau geo:hasGeometry ?glau ." +
"          ?glau geo:asWKT ?pglau ." +
"   " +
"    } " +
"  " +
"    FILTER(geof:sfIntersects(?pglau, geof:buffer(\"POINT(7.3196649 45.7370885)\"^^<http://www.opengis.net/ont/geosparql#wktLiteral>, 0.3, uom:degree))). " +
"}";
                  
                 
var query = url + encodeURIComponent(query_text);
console.log(query);


          //init leaflet  map
      var map = new L.Map('map');  
      
      map.addControl(new L.Control.Fullscreen());                     
             
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
         maxZoom: 18
      }).addTo(map);
      var italy = new L.LatLng(45.7370885, 7.3196649); 
      map.setView(italy, 10);

      // Example usage:
      const degrees = 0.3; // Replace with your desired number of degrees
      const latitude = 45.7370885; // Replace with your desired latitude

      const distanceInMeters = degreesToKmAtLatitude(degrees, latitude);
      console.log(`${degrees} degrees at latitude ${latitude} is approximately ${distanceInMeters} meters.`);

     
      var circle = L.circle([45.7370885, 7.3196649], {
         color: 'red',
         fillColor: '#f03',
         fillOpacity: 0.3,
         radius: distanceInMeters  
     }).addTo(map);
     
   
     
     var mcg = L.markerClusterGroup();
     
     // Position markers
     var allGeometry= [];
     for(let key in data){
         
         // var occurrences = data[key].n_occ.value;
         // if(data[key].occDeVulgari != 0 && data[key].work.name == "De Vulgari Eloquentia") {
         //     occurrences += "<b>Occorrenze:</b> " + data[key].occDeVulgari	+ "</br>"
         // }
         // if(data[key].occEgloge != 0 && data[key].work.name == "Egloge") {
         //     occurrences += "<b>Occorrenze:</b> " + data[key].occEgloge + "</br>"	
         // }
         // if(data[key].occEpistole != 0 && data[key].work.name == "Epistole") {
         //     occurrences += "<b>Occorrenze:</b> " + data[key].occEpistole + "</br>"	
         // }
         // if(data[key].occMonarchia != 0 && data[key].work.name == "Monarchia") {
         //     occurrences += "<b>Occorrenze:</b> " + data[key].occMonarchia + "</br>"	
         // }
         // if(data[key].occQuestio != 0 && data[key].work.name == "Questio de Aqua et Terra") {
         //     occurrences += "<b>Occorrenze:</b> " + data[key].occQuestio + "</br>"	
         // }

      
         // Replace the specified string
         var outputString = data[key].pglau.value.replace('<http://www.opengis.net/def/crs/OGC/1.3/CRS84>', '');

         var wicket = new Wkt.Wkt();
         var readGeometry = wicket.read(outputString);
         var geometry= readGeometry.toJson()
         
         var polygon = {
            "type": "Feature",
            "properties": {
               "popupcontent": "",
               "name": data[key].nlabel.value
            },
            geometry
         };
         allGeometry.push(polygon);

      }
       
                 
         var greenIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
         
         });
               //   } else {
                 
               //         var greenIcon = new L.Icon({
               //         iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
               //         shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
               //         iconSize: [25, 41],
               //         iconAnchor: [12, 41],
               //         popupAnchor: [1, -34],
               //         shadowSize: [41, 41]
               //        }); 
 
                 
                 
               //   }
         
               // console.log(data[key].coord.value) 
              
           
          var polygonStyle = {
            "color": "#ff7800",
            "weight": 5,
            "opacity": 0.65
      }
               L.geoJSON(allGeometry, {
                  onEachFeature: function (feature, layer) {
                   layer.bindPopup('<a target="_blank" href="https://www.wikidata.org/wiki/'+feature.properties.id+'"><p>'+feature.properties.name+'</p></a>');
                  },
                  style: polygonStyle
                }).addTo(mcg)

               
               
               //  var mark= L.marker([coord[2],coord[1]], {icon: greenIcon}).bindPopup("</br><b>Luogo:</b> "+ data[key].placeName.value +"<br/>"+ "<b>Biblioteca:</b> " + data[key].libraryName.value +"<br/><br/>"+ "<button type='button' class='btn btn-primary show-manuscript' data-iri='"+data[key].library.value+"' onclick='showManuscripts(this)'>Mostra manoscritti</button> ").addTo(mcg) // Add into the MCG instead of directly to the map.
                

   
     mcg.addTo(map);
        


    });


 



