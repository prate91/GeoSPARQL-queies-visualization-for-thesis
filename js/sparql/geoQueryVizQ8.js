const url= "https://geosparql.isti.cnr.it/fuseki/moving/query?output=json&query=";
// const named_graph = "https://imagoarchive.it/fuseki/imago/archive";
// const url= "http://localhost:3030/moving/query?output=json&query=";
const named_graph = "urn:x-arq:UnionGraph";



 function onEachFeature(feature, layer) {
   // does this feature have a property named popupContent?
   // console.log(feature.properties)
   if (feature.properties) {
       layer.bindPopup(feature.properties.LAU_NAME);
   }
}


document.addEventListener('DOMContentLoaded', function () {
   // var json = []
   // console.log(data);


let headers = new Headers();
//headers.append('X-CSRFToken', csrf);
headers.append('X-Requested-With', 'XMLHttpRequest');
 
var query_text = "PREFIX osmkey: <https://www.openstreetmap.org/wiki/Key:>" +
"PREFIX wd: <http://www.wikidata.org/entity/>" +
"PREFIX osm: <https://www.openstreetmap.org/>" +
"PREFIX wdt: <http://www.wikidata.org/prop/direct/>" +
"PREFIX uom: <http://www.opengis.net/def/uom/OGC/1.0/>" +
"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
"PREFIX geof: <http://www.opengis.net/def/function/geosparql/> " +
"PREFIX geo: <http://www.opengis.net/ont/geosparql#>" +
"PREFIX narra: <https://dlnarratives.eu/ontology#>" +
"PREFIX osm2rdfkey: <https://osm2rdf.cs.uni-freiburg.de/rdf/key#>" +
"" +
"SELECT DISTINCT ?clabel ?wktLau ?wkt " +
"WHERE { " +
"    ?narra narra:isAboutCountry ?country ;" +
"            narra:isAboutLAU ?lau ;" +
"            rdfs:label ?nlabel ." +
"    ?country rdfs:label ?clabel ." +
"    ?lau geo:hasGeometry ?glau ." +
"    ?glau geo:asWKT ?wktLau ." +
"{" +
"SELECT DISTINCT ?river_osm ?river_wd ?river_name ?length ?wkt WHERE {" +
"    SERVICE <https://qlever.cs.uni-freiburg.de/api/osm-planet> {" +
"        ?river_osm a osm:relation ;" +
"                osmkey:waterway ?waterway ;" +
"                geo:hasGeometry ?geometry ;" +
"                osmkey:name ?river_name ;" +
"                osm2rdfkey:wikidata ?river_wd ." +
"        ?geometry geo:asWKT ?wkt ." +
"    SERVICE <https://qlever.cs.uni-freiburg.de/api/wikidata> {" +
"        ?river_wd wdt:P31/wdt:P279* wd:Q4022 ;" +
"                wdt:P30 wd:Q46 ;" +
"                wdt:P2043 ?length ." +
"        FILTER (?length > 500)" +
"    }" +
"    }" +
"} ORDER BY DESC(?length) " +
"}" +
"FILTER(geof:sfIntersects(?wktLau, ?wkt)). " +
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
      var italy = new L.LatLng(42.504154,15.646361); 
      map.setView(italy, 4);
     
     
     
     
     var mcg = L.markerClusterGroup();
     
     // Position markers
     var allGeometry = [];
     var allRivers = [];
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
         var river_WKT = data[key].wkt.value

         var wicket = new Wkt.Wkt();
         var readGeometry = wicket.read(outputString);
         var geometry= readGeometry.toJson();
         
         var polygon = {
            "type": "Feature",
            "properties": {
               "popupcontent": "",
               "name": data[key].clabel.value
            },
            geometry
         };
         allGeometry.push(polygon);

         
         // var wicket_river = new Wkt.Wkt();
         // var readGeometry_river = wicket_river.read(river_WKT);
         // var geometry_river= readGeometry_river.toJson();
         // console.log(river_WKT);

        
         var geometry_river = wellknown(river_WKT)
         // var wicket_river = new Wkt.Wkt();
         // var readGeometry_fiume = wicket_river.read(river_WKT);
         // var geometry_river= readGeometry_fiume.toJson();

        
         
         // var polygon_river = {
         //    "type": "Feature",
         //    "properties": {
         //       "popupcontent": ""
         //    },
         //    geometry_river
         // };

         // console.log(polygon_river)
         allRivers.push(geometry_river);
       
       

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
              
               var riverStyle = {
                  "color": "#B0413E",
                  "weight": 5,
                  "opacity": 0.65
            }
            L.geoJSON(allRivers, {
               style: riverStyle
             }).addTo(mcg)

      


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


 



