// const url= "https://imagoarchive.it/fuseki/imago/query?output=json&query=";
// const named_graph = "https://imagoarchive.it/fuseki/imago/archive";
// const url= "http://localhost:3030/moving/query?output=json&query=";
// const named_graph = "urn:x-arq:UnionGraph";

data= [
    {
        "title": {
            "type": "literal",
            "value": "This cooperative produces traditional cheeses, mainly for export, using only local sheep's milk"
        },
        "country": {
            "type": "literal",
            "value": "Italy"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Traditional sheep's milk cheese"
        },
        "country": {
            "type": "literal",
            "value": "Portugal"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Traditional sheep's milk cottage cheese"
        },
        "country": {
            "type": "literal",
            "value": "Portugal"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "PDO cheese made from raw and whole cow's milk. It's consumption is unique in that it is eaten in the form of rosettes obtained with the help of the 'girolle'"
        },
        "country": {
            "type": "literal",
            "value": "Switzerland"
        }
    }
]


document.addEventListener('DOMContentLoaded', function () {
    // var json = []
    // console.log(data);
 
 
  
//  var query_text = "PREFIX narra: <https://dlnarratives.eu/ontology#>" +
//      "PREFIX ecrm: <http://erlangen-crm.org/current/>" +
//      "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
//      "" +
//      "SELECT DISTINCT ?title ?country " +
//      "WHERE {" +
//      "  ?event1 narra:partOfNarrative ?narrative ." +
//      "  ?narrative rdfs:label ?title ." +
//      "  ?narrative narra:isAboutCountry ?countryIRI." +
//      "  ?countryIRI rdfs:label ?country." +
//      "    {" +
//      "    ?event1 narra:hasEntity <https://dlnarratives.eu/resource/Q10943> ." +
//      "    ?event2 narra:partOfNarrative ?narrative ." +
//      "    ?event2 narra:hasEntity <https://dlnarratives.eu/resource/Q13439060> ." +
//      "  }" +
//      "  UNION" +
//      "  {" +
//      "    ?event1 narra:hasEntity <https://dlnarratives.eu/resource/Q10943> ." +
//      "    ?event2 narra:partOfNarrative ?narrative ." +
//      "    ?event2 narra:hasEntity <https://dlnarratives.eu/resource/Q13439060> ." +
//      "    FILTER (?event1 != ?event2)" +
//      "  }" +
//      "}";
                   
 
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


 



