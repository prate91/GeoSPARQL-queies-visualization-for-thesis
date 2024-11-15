const url= "https://geosparql.isti.cnr.it/fuseki/moving/query?output=json&query=";
// const named_graph = "https://imagoarchive.it/fuseki/imago/archive";
// const url= "http://localhost:3030/moving/query?output=json&query=";
const named_graph = "urn:x-arq:UnionGraph";

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
"SELECT ?nlabel ?clabel ?wktLau " +
"WHERE { " +
"       {" +
"    ?narra narra:isAboutCountry ?country ;" +
"            narra:isAboutLAU ?lau ;" +
"            rdfs:label ?nlabel ." +
"    ?country rdfs:label ?clabel ." +
"    ?lau geo:hasGeometry ?glau ." +
"    ?glau geo:asWKT ?wktLau ." +
"}" +
"    FILTER(geof:sfIntersects(" +
"        ?wktLau," +
"        geof:buffer(" +
"            \"POINT(11.12108 46.06787)\"^^geo:wktLiteral," +
"        0.5, uom:degree))). " +
"}";
                  
                 
var query = url + encodeURIComponent(query_text);
console.log(query);

// Fetch current annotation
fetch(query,
      {
         method: 'GET',
         headers: headers,
         mode: 'cors' // questo forse va tolto se non si usa HTTPS?
      })
      .then((response) => {
         return response.json();
      })
      .then((context) => {
         /*
            Qui riceviamo il context in JSON, quindi possiamo
            prendere la variabile "data" e aggiornarla. Volendo si
            può fare la stessa cosa anche per la variabile "json"
            che contiene il JSON formattato
         */
         data = context.results.bindings;
         console.log(data);
          //init leaflet  map
      var map = new L.Map('map');  
      
      map.addControl(new L.Control.Fullscreen());                     
             
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
         maxZoom: 18
      }).addTo(map);
      var italy = new L.LatLng(46.06787, 11.12108); 
      map.setView(italy, 10);

      // Example usage:
      const degrees = 0.6; // Replace with your desired number of degrees
      const latitude = 46.06787; // Replace with your desired latitude

      const distanceInMeters = degreesToKmAtLatitude(degrees, latitude);
      console.log(`${degrees} degrees at latitude ${latitude} is approximately ${distanceInMeters} meters.`);

     
      var circle = L.circle([46.06787, 11.12108], {
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
         var outputString = data[key].wktLau.value.replace('<http://www.opengis.net/def/crs/OGC/1.3/CRS84>', '');

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
        


      })
      .catch((error) => {
         console.error('Error:', error);
      });
    });


 



