//création de la div qui contiendra le graph et l'insert dans le HTML:
let createGraphic = (nom, cible) => {
    let div = document.createElement('div');
    div.id = nom;
    cible.insertAdjacentElement('beforebegin', div);
}
createGraphic('graph1', table1);
createGraphic('graph2', table2);
createGraphic('graph3', bodyContent);

//récupération des données et création d'un tableau:
//source des données de table1m
let tbody = table1.getElementsByTagName("tbody");
let tr = tbody[0].getElementsByTagName("tr");
// Tableau de données:
let donnees=[];
let fonctionTableau=()=>{
    for (i=1;i<tr.length;i++){
        let pays=[];
        let th = tr[i].getElementsByTagName("th");
        let div = th[0].getElementsByTagName("div");
        let number = div[0].innerHTML;
        pays.push(number);
        let td = tr[i].getElementsByTagName("td");
            for (y=0;y<td.length;y++){
                let contenu = td[y].innerHTML;
                pays.push(contenu);
            }
        donnees.push(pays);
    }
}
fonctionTableau();

//creer dimple
let svg = dimple.newSvg("#graph1", 840, 620);
let data = [];
for (i=0;i<donnees.length;i++){
    for (let y=2002;y<2013;y++){
        let dataDetail = {"Année":y, "Infractions":donnees[i][y-2000], "Pays":donnees[i][1]};
        if(dataDetail.Infractions != ':'){
            data.push(dataDetail);
        }
    }
}
let chart = new dimple.chart(svg, data);
chart.addCategoryAxis("x", "Année");
chart.addMeasureAxis("y", "Infractions");
chart.addSeries("Pays", dimple.plot.line);
chart.addLegend(60, 10, 500, 120, "right");
chart.setBounds('20px', "150px", "80%", "70%"); 
chart.draw();

/////////////////////////////////////////////////////////////////////

let tbody2 = table2.getElementsByTagName("tbody");
let tr2 = tbody2[0].getElementsByTagName("tr");
// Tableau de données:
let donneesTwo=[];
let fonctionTableau2=()=>{
    for (i=1;i<tr2.length;i++){
        let pays=[];
        let th = tr2[i].getElementsByTagName("th");
        let div = th[0].getElementsByTagName("div");
        let number = div[0].innerHTML;
        pays.push(number);
        let td = tr2[i].getElementsByTagName("td");
            for (y=0;y<td.length;y++){
                let contenu = td[y].innerHTML;
                pays.push(contenu);
            }
        donneesTwo.push(pays);
    }
}
fonctionTableau2();

//creer dimple
let svg2 = dimple.newSvg("#graph2", 840, 620);
let data2 = [];
for (i=0;i<donneesTwo.length;i++){
    for (let y=2;y<4;y++){
        let dataDetail = {"Année":y, "Population":donneesTwo[i][y], "Pays":donneesTwo[i][1]};
        if (y==2) {
            dataDetail.Année = "2007-09";
        } else if (y==3) {
            dataDetail.Année = "2010-12                    ";
        }
        data2.push(dataDetail);
    }
}
let chart2 = new dimple.chart(svg2, data2);
chart2.addCategoryAxis("x", "Année");
chart2.addMeasureAxis("y", "Population");
chart2.addSeries("Pays", dimple.plot.line);
chart2.addLegend(60, 10, 500, 120, "right");
chart2.setBounds('20px', "150px", "80%", "70%"); 
chart2.draw();

//////////////////////////////////////////////////////////////////////


let svg3 = dimple.newSvg("#graph3", 840, 620);
let data3 = [];
let chart3 = new dimple.chart(svg3, data3);
chart3.addCategoryAxis("x", "X");
chart3.addMeasureAxis("y", "Y");
chart3.addSeries(null, dimple.plot.line); 

let ajax = () => {
    let xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://inside.becode.org/api/v1/data/random.json', true)  //Call the open function, GET-type of request, url, true-asynchronous
    xhr.onload = function() {  //Call the onload 
        if (this.status === 200) { //check if the status is 200(means everything is okay);
        object = JSON.parse(this.responseText);

        for (i=0;i<object.length;i++){
            let dataDetail = {"X":object[i][0], "Y":object[i][1]};
            data3.push(dataDetail);
        }
        chart3.draw();
        setInterval(ajax, 1000);
        }
    }
    xhr.send(); //Call send
}
ajax();