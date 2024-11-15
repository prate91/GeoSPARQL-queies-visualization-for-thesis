// const url= "https://geosparql.isti.cnr.it/fuseki/moving/query?output=json&query=";
// const named_graph = "https://imagoarchive.it/fuseki/imago/archive";
// const url= "http://localhost:3030/moving/query?output=json&query=";
// const named_graph = "urn:x-arq:UnionGraph";

data = [
    {
        "title": {
            "type": "literal",
            "value": "Firewood for households"
        },
        "country": {
            "type": "literal",
            "value": "North Macedonia"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Forestry seed and seedlings"
        },
        "country": {
            "type": "literal",
            "value": "North Macedonia"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Pine cones - Dry pine cones with purpose of decoration"
        },
        "country": {
            "type": "literal",
            "value": "North Macedonia"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Round wood for processing"
        },
        "country": {
            "type": "literal",
            "value": "North Macedonia"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "ECO-FERTILISER (WOOL PELLETS)"
        },
        "country": {
            "type": "literal",
            "value": "Romania"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Berries cultivated in Kopaonik Mountain/ National park, Dinaric Alps region; other mountain areas"
        },
        "country": {
            "type": "literal",
            "value": "Serbia"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Wild mushrooms collected in the mountainous area of Kopaonik mountain"
        },
        "country": {
            "type": "literal",
            "value": "Serbia"
        }
    }
]


document.addEventListener('DOMContentLoaded', function () {
   // var json = []
   // console.log(data);



 
// var query_text = "PREFIX narra:<https://dlnarratives.eu/ontology#> " +
// 	"PREFIX ecrm:<http://erlangen-crm.org/current/> " +
// 	"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
// 	"SELECT DISTINCT ?title ?country" +
// 	"WHERE { ?event narra:partOfNarrative ?narrative ." +
// 	"?narrative narra:isAboutCountry ?countryIRI." +
// 	"  ?countryIRI rdfs:label ?country." +
// 	"  ?narrative rdfs:label ?title ." +
// 	"  ?event narra:hasEntity <https://dlnarratives.eu/resource/Q169940> ." +
// 	"  } " +
// 	"order by lcase(?country)";
                  
 
    var table = document.getElementById('result-table');
      

    // Create table header
    const header = table.createTHead();
    const headerRow = header.insertRow(0);
   
    const headers = ["#","Title", "Country"];
    headers.forEach(headerText => {
       const th = document.createElement('th');
       const textNode = document.createTextNode(headerText);
       th.appendChild(textNode);
       headerRow.appendChild(th);
    });
   
    // Create table body
    const tbody = table.createTBody();
   
    // Populate table with data
    data.forEach(function (item, i) {
       const row = tbody.insertRow();
   
       const cell0 = row.insertCell(0);
       const textNode0 = document.createTextNode(i+1);
       cell0.appendChild(textNode0);
       
       const cell1 = row.insertCell(1);
       const textNode1 = document.createTextNode(item.title.value);
       cell1.appendChild(textNode1);
   
       const cell2 = row.insertCell(2);
       const textNode2 = document.createTextNode(item.country.value);
       cell2.appendChild(textNode2);
    });
    
   });
 



