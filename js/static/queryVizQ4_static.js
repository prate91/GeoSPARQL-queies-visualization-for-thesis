// const url= "https://imagoarchive.it/fuseki/imago/query?output=json&query=";
// const named_graph = "https://imagoarchive.it/fuseki/imago/archive";
// const url= "http://localhost:3030/moving/query?output=json&query=";
// const named_graph = "urn:x-arq:UnionGraph";

data= [
    {
        "title": {
            "type": "literal",
            "value": "Almenland mining tunnel cheese (Almenland Stollenkäse)"
        },
        "country": {
            "type": "literal",
            "value": "Austria"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Goats - dairy products"
        },
        "country": {
            "type": "literal",
            "value": "Czech Republic"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Sheep - dairy products"
        },
        "country": {
            "type": "literal",
            "value": "Czech Republic"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Picodon AOP"
        },
        "country": {
            "type": "literal",
            "value": "France"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Epirus Feta is PDO cheese made of sheep and goat milk in the Epirus region, Ammotopos Arta"
        },
        "country": {
            "type": "literal",
            "value": "Greece"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Production of Graviera cheese (Gruyere) in the area Amari, on the western slopes of Psiloritis mountain"
        },
        "country": {
            "type": "literal",
            "value": "Greece"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Nivegy-valley artisan chese makers"
        },
        "country": {
            "type": "literal",
            "value": "Hungary"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "This farm produces high quality certified milk and cheese in a mountain nature park"
        },
        "country": {
            "type": "literal",
            "value": "Italy"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Organic Farming"
        },
        "country": {
            "type": "literal",
            "value": "Norway"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "PGI (Protected Geographical Indication) Goat cheese / Undredal Brown Cheese"
        },
        "country": {
            "type": "literal",
            "value": "Norway"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Pultost cow cheese"
        },
        "country": {
            "type": "literal",
            "value": "Norway"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "'BRÂNZĂ DE BURDUF'"
        },
        "country": {
            "type": "literal",
            "value": "Romania"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "'BRĂNZĂ HOREZU'"
        },
        "country": {
            "type": "literal",
            "value": "Romania"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "'MOZZARELLA'"
        },
        "country": {
            "type": "literal",
            "value": "Romania"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Dried saussage made of localy produced sheep, goat, beef or donkey meat mixture, PDO application"
        },
        "country": {
            "type": "literal",
            "value": "Serbia"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "White cheese in brine, produced of mixed milk - cow and sheep milk"
        },
        "country": {
            "type": "literal",
            "value": "Serbia"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Suckling goat from Malaga"
        },
        "country": {
            "type": "literal",
            "value": "Spain"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Goat's milk cheese made by hand directly on the mountain pasture"
        },
        "country": {
            "type": "literal",
            "value": "Switzerland"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Gruyère is a typical Swiss cheese, produced in the mountain pastures in summer"
        },
        "country": {
            "type": "literal",
            "value": "Switzerland"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Jogitz yogurt made from Goat's milk (several flavours)"
        },
        "country": {
            "type": "literal",
            "value": "Switzerland"
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
    },
    {
        "title": {
            "type": "literal",
            "value": "alpine pasture cheese with organic sheep's milk"
        },
        "country": {
            "type": "literal",
            "value": "Switzerland"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "cow's milk that has not been pasteurised, sterilised or thermised and is sold directly"
        },
        "country": {
            "type": "literal",
            "value": "Switzerland"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Special kind of tulum cheese from goat and sheep milk"
        },
        "country": {
            "type": "literal",
            "value": "Turkey"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Traditional local cheese from goat and sheep milk"
        },
        "country": {
            "type": "literal",
            "value": "Turkey"
        }
    },
    {
        "title": {
            "type": "literal",
            "value": "Mountain region hard white cows milk cheese with PGI from Caerphillly LAU1 region within Wales"
        },
        "country": {
            "type": "literal",
            "value": "United Kingdom"
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
//      "  {" +
//      "    ?event1 narra:hasEntity <https://dlnarratives.eu/resource/Q10943> ." +
//      "    ?event2 narra:partOfNarrative ?narrative ." +
//      "    ?event2 narra:hasEntity <https://dlnarratives.eu/resource/Q2934> ." +
//      "  }" +
//      "  UNION" +
//      "  {" +
//      "    ?event1 narra:hasEntity <https://dlnarratives.eu/resource/Q830> ." +
//      "    ?event2 narra:partOfNarrative ?narrative ." +
//      "    ?event2 narra:hasEntity <https://dlnarratives.eu/resource/Q2934> ." +
//      "  }" +
//      "  UNION" +
//      "  {" +
//      "    ?event1 narra:hasEntity <https://dlnarratives.eu/resource/Q11748378> ." +
//      "    ?event2 narra:partOfNarrative ?narrative ." +
//      "    ?event2 narra:hasEntity <https://dlnarratives.eu/resource/Q2934> ." +
//      "  }" +
//      "  UNION" +
//      "    {" +
//      "    ?event1 narra:hasEntity <https://dlnarratives.eu/resource/Q10943> ." +
//      "    ?event2 narra:partOfNarrative ?narrative ." +
//      "    ?event2 narra:hasEntity <https://dlnarratives.eu/resource/Q11748378> ." +
//      "  }" +
//      "    UNION" +
//      "    {" +
//      "    ?event1 narra:hasEntity <https://dlnarratives.eu/resource/Q10943> ." +
//      "    ?event2 narra:partOfNarrative ?narrative ." +
//      "    ?event2 narra:hasEntity <https://dlnarratives.eu/resource/Q830> ." +
//      "  }" +
//      "  UNION" +
//      "  {" +
//      "    ?event1 narra:hasEntity <https://dlnarratives.eu/resource/Q10943> ." +
//      "    ?event2 narra:partOfNarrative ?narrative ." +
//      "    ?event2 narra:hasEntity <https://dlnarratives.eu/resource/Q11748378> ." +
//      "    FILTER (?event1 != ?event2)" +
//      "  }" +
//      "  UNION" +
//      "  {" +
//      "    ?event1 narra:hasEntity <https://dlnarratives.eu/resource/Q10943> ." +
//      "    ?event2 narra:partOfNarrative ?narrative ." +
//      "    ?event2 narra:hasEntity <https://dlnarratives.eu/resource/Q2934> ." +
//      "    FILTER (?event1 != ?event2)" +
//      "  }" +
//      "  UNION" +
//      "   {" +
//      "    ?event1 narra:hasEntity <https://dlnarratives.eu/resource/Q10943> ." +
//      "    ?event2 narra:partOfNarrative ?narrative ." +
//      "    ?event2 narra:hasEntity <https://dlnarratives.eu/resource/Q830> ." +
//      "    FILTER (?event1 != ?event2)" +
//      "  }" +
//      "  UNION" +
//      "  {" +
//      "    ?event1 narra:hasEntity <https://dlnarratives.eu/resource/Q10943> ." +
//      "    ?event2 narra:partOfNarrative ?narrative ." +
//      "    ?event2 narra:hasEntity <https://dlnarratives.eu/resource/Q11748378> ." +
//      "    ?event3 narra:partOfNarrative ?narrative ." +
//      "    ?event3 narra:hasEntity <https://dlnarratives.eu/resource/Q2934> ." +
//      "    ?event4 narra:partOfNarrative ?narrative ." +
//      "    ?event4 narra:hasEntity <https://dlnarratives.eu/resource/Q830> ." +
//      "    FILTER (?event1 != ?event2 && ?event1 != ?event3 && ?event2 != ?event3 && ?event1!=?event4 && ?event2!=?event4 && ?event3!=?event4 )" +
//      "  }" +
//      "}" +
//      "ORDER BY lcase(?country)";
                   
    
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


 



