const body = document.querySelector("body");

const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const sidebarOpen = document.querySelector("#sidebarOpen");
const sidebarClose = document.querySelector(".collapse_sidebar");
const sidebarExpand = document.querySelector(".expand_sidebar");
sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));

sidebarClose.addEventListener("click", () => {
  sidebar.classList.add("close", "hoverable");
});
sidebarExpand.addEventListener("click", () => {
  sidebar.classList.remove("close", "hoverable");
});

sidebar.addEventListener("mouseenter", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.remove("close");
  }
});
sidebar.addEventListener("mouseleave", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.add("close");
  }
});



submenuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    item.classList.toggle("show_submenu");
    submenuItems.forEach((item2, index2) => {
      if (index !== index2) {
        item2.classList.remove("show_submenu");
      }
    });
  });
});

if (window.innerWidth < 768) {
  sidebar.classList.add("close");
} else {
  sidebar.classList.remove("close");
}

//

function Afficher (i) {

    // hidden les graphes
    var dsh = document.getElementById("gr");
// cachons le dashboard
    if (dsh) {
     dsh.setAttribute("hidden", true);
    }

  var tableExistante=document.getElementById('idT');  
  var supR=document.getElementById('matriculeInput');  



  if (tableExistante) {

       var parentElement=supR.parentNode;  
       parentElement.removeChild(supR);

       var cinquiemeLigne = tableExistante.getElementsByTagName('tr')[4];
    if (cinquiemeLigne) {
        // Récupération de la première colonne (index 0) de la 5e ligne
       var premiereColonne = cinquiemeLigne.getElementsByTagName('td')[0];

    // Récupération de la valeur
      var val=premiereColonne.innerText;
      }

        // La table existe, supprimez-la
        tableExistante.parentNode.removeChild(tableExistante);
    } else {
        // La table n'existe pas
        console.log('La table n\'existe pas.');
  }




  httpRequest=new XMLHttpRequest(); //J'instancie l'objet XMLHttpRequest


  //   if (val) {
  //     const url = '/api/persons?i=' + i + '&dt=' + val;
  // }
  // else {
  //   const url = '/api/persons?i=' + i ;
  // }
    const url = '/api/persons?i=' + i + '&dt=' + val;
    httpRequest.open('GET', url);
    // httpRequest.open('GET', '/api/persons1'); //Je parametre ma requete http (la route api persons va recevoir les données) (selectperson())

  httpRequest.onreadystatechange = doAfficherPersons; //quand la réponse arrive je définis la fonction a appeler (la c'est do Afficher Persons)

  httpRequest.send(); // envoyer la requete
}

function rechercher () {	

  matriculeInput=document.getElementById("matriculeInput");
  valeurSaisie=matriculeInput.value;
  console.log(valeurSaisie)


   var tableExistante = document.getElementById('idT');  

    if (tableExistante) {
      // La table existe, supprimez-la


    // Récupération de la 5e ligne (index 4) du tableau
       var cinquiemeLigne = tableExistante.getElementsByTagName('tr')[4];

     // Récupération de la première colonne (index 0) de la 5e ligne
       var premiereColonne = cinquiemeLigne.getElementsByTagName('td')[0];

    // Récupération de la valeur
      var val=premiereColonne.innerText;
      if (val=="2019") {
        k='a';
      }
      else if(val=="2020") {
        k='b';
      }
      else {
        k='c';
      }
      // console.log(valeur);
        tableExistante.parentNode.removeChild(tableExistante);
    } else {
        // La table n'existe pas
        console.log('La table n\'existe pas.');
  }

  httpRequest=new XMLHttpRequest();  

  console.log(val)

  var supR=document.getElementById('matriculeInput');  
  var parentElement=supR.parentNode;  
  parentElement.removeChild(supR);

    const url = '/api/persons1?i=' + k + '&val=' + valeurSaisie;
    httpRequest.open('GET', url);

  httpRequest.onreadystatechange = doAfficherPersons; //quand la réponse arrive je définis la fonction a appeler (la c'est do Afficher Persons)

  httpRequest.send(); // envoyer la requete

  // Afficher(valeurSaisie);


}

function doAfficherPersons () {




  if (httpRequest.readyState === XMLHttpRequest.DONE) {

   if (httpRequest.status === 200) {

    reponse = httpRequest.responseText;

     persons=JSON.parse(reponse);

     if (persons.length==0) {
       alert("etudiants n'existe pas");
       Afficher('a');
    }
     console.log(persons)
     // btn recher  ----------------------------------------
    const divc = document.createElement("div");
    divc.setAttribute("class", "chmpR");

    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("id", "matriculeInput");
    searchInput.setAttribute("placeholder", "Entrez le matricule");

    const searchButton = document.createElement("button");
    searchButton.setAttribute("class", "rech");
    searchButton.innerText = "Recherche";
    searchButton.addEventListener("click", rechercher);

    divc.append(searchInput);
    divc.append(searchButton);
    document.body.append(divc);


    //  -------------------------------------------------


     table=document.createElement("table");
     table.setAttribute('id', 'idT');
     rowh=document.createElement("tr");
     rowh.setAttribute("class", "row");

     col11= document.createElement("th");
     col1 = document.createElement("th");
     col2 = document.createElement("th");
     col3 = document.createElement("th");
     col4=document.createElement("th");
     col44=document.createElement("th");
     col444 = document.createElement("th");


     col444b1=document.createElement("button");
     col444b1.setAttribute("class","arrow1");
     col444b1.innerText="↑";
     col444b1.setAttribute("onclick", "Afficher('u')");
     //  down
     col444b2=document.createElement("button");
     col444b2.setAttribute("class","arrow2");
     col444b2.innerText="↓";
     col444b2.setAttribute("onclick", "Afficher('d')");

     col11.innerText = "annee";
     col1.innerText = "matricule";
     col2.innerText = "nom";
     col3.innerText = "prenom";	
     col4.innerText="sexe";
     col44.innerText="specialite";
    //----
     col44.append(col444b2);
    //----

     col444.innerText="moyenne";
     col444.append(col444b1);


     chbox = document.createElement("input");
     chbox.setAttribute("type","checkbox");




    rowh.append(col11);
    rowh.append(col1);
    rowh.append(col2);
    rowh.append(col3);
    rowh.append(col4);
    rowh.append(col44);
    rowh.append(col444);
    table.append(rowh);
     document.body.append(table);



    for (person of persons) { 

    doInsert(person.annee,person.matricule, person.nom, person.prenom, person.sexe, person.specialite , person.moyenne);
    }

   }
   else {
      alert('Petit soucis');
   }
  }
}

//la fonction doinsert va insérer une ligne en appelant la fonction doinsertrowtable et en mettant a jour le summary en appelant la fonction updatesummary
function doInsert(annee,matricule,nom, prenom, sexe,specialite,moyenne){	



  doInsertRowTable(annee,matricule,nom, prenom, sexe,specialite,moyenne);				

}

//Pour ajouter une ligne!
function doInsertRowTable(annee, matricule, nom, prenom, sexe, specialite, moyenne) {
    const row = document.createElement("tr");
    row.setAttribute("class", "row");

    const col11 = document.createElement("td");
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col44 = document.createElement("td");
    const col444 = document.createElement("td");

    col11.innerText = annee;
    col1.innerText = matricule;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = sexe;
    col44.innerText = specialite;
    col444.innerText = moyenne;



    col11.setAttribute("class", "col_number");
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col44.setAttribute("class", "col_text");
    col444.setAttribute("class", "col_text");

    row.append(col11);
    row.append(col1);
    row.append(col2);
    row.append(col3);
    row.append(col4);
    row.append(col44);
    row.append(col444);

    table.append(row);
}
function actualiser(){
  location.reload();
}


init();

function init(){	 
  getinfo1(); 
  getinfo2();
  getinfo3();
  getinfo4();

}

function getinfo1 () {

  httpRequest = new XMLHttpRequest();  

  httpRequest.open('GET', '/api/info1'); 
  httpRequest.onreadystatechange = doAfficher1; 
  httpRequest.send(); // envoyer la requete
}



function doAfficher1 () {

  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {

      reponse = httpRequest.responseText;
      Data1=JSON.parse(httpRequest.response);

      var labels = Data1.map(function(e) {
        return e.annee;
      });

      var data = Data1.map(function(e) {
         return e.nb_etudiants;
      });


      // Create a bar chart using Chart.js
      new Chart(document.getElementById("bar-chart"),{



        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Nombre d'etudiant",
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
                    data: data,
                }
            ]
        },
        options: {
            responsive: false, // Désactiver la réponse automatique
            maintainAspectRatio: false, // Désactiver le maintien du rapport d'aspect
            legend: { display: false },
            title: {
                display: true,
                text: 'Le nombre d’étudiants par années'
            },
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: false,
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
       });

    }
  }

}

function getinfo2 () {

  httpRequest2 = new XMLHttpRequest();  

  httpRequest2.open('GET', '/api/info2'); 
  httpRequest2.onreadystatechange = doAfficher2; 
  httpRequest2.send(); 
  doAfficher2();

}


function doAfficher2 () {

  if (httpRequest2.readyState === XMLHttpRequest.DONE) {
    if (httpRequest2.status === 200) {

      data2 = JSON.parse(httpRequest2.response);

      var labels = data2.annee;

      for(d of data2.datasets){
        d.fill = false;                  
        d.borderColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        d.borderWidth=2;
        d.radius=1;      
      }    

      var data = data2.datasets;

      new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
          labels: labels,
          datasets: data
        },
        options: { 
          scales:{
            xAxes:[{
              ticks:{
                fontColor: 'black'
              }
            }],
            yAxes:[{
              ticks:{
                beginAtZero:true,
                fontColor: 'black',
                stepSize: 20
            }
            }]
          },        
          responsive: true,
          maintainAspectRatio: true,
          title: {
            display: false,
            fontColor: 'white'
          },
          legend:{
            position:'top',
            labels:{
              fontColor:'black'
            }
          }
        }
      });
    }
  }
}
function getinfo3 () {

  httpRequest3 = new XMLHttpRequest();  

  httpRequest3.open('GET', '/api/info3'); 
  httpRequest3.onreadystatechange = doAfficher3; 
  httpRequest3.send(); 
  doAfficher3();

}


function doAfficher3 () {

  if (httpRequest3.readyState === XMLHttpRequest.DONE) {
    if (httpRequest3.status === 200) {
      jsonData = JSON.parse(httpRequest3.response);

      if (Array.isArray(jsonData)) {
        var labels = jsonData.map(function(e) {
          return e.annee;
        });

        var data = jsonData.map(function(e) {
          return e.nb_etudiants;
        });

        new Chart(document.getElementById("pie-chart"), {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: "Population (millions)",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: data
            }]
          },
          options: {
            title: {
              display: true,
              text: "Les années"
            }
          }
        });
      } else {
        console.error('La réponse pour /api/info2 n\'est pas un tableau JSON.');
      }
    }
  }
}


function getinfo4 () {

  httpRequest4 = new XMLHttpRequest();  

  httpRequest4.open('GET', '/api/info4'); 
  httpRequest4.onreadystatechange = doAfficher4; 
  httpRequest4.send(); 
  doAfficher4();

}


function doAfficher4 () {

  if (httpRequest4.readyState===XMLHttpRequest.DONE) {
    if (httpRequest4.status===200) {
      jsonData=JSON.parse(httpRequest4.response);

      var labels=jsonData.map(function (e) {
        return e.specialite;
      });

      var data=jsonData.map(function (e) {
        return e.nb_etudiants;
      });

      new Chart(document.getElementById("doughnut-chart"),{
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: [ "#3e95cd","#8e5ea2","#3cba9f","#e8c3b9","#c45850" ],
              data: data
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Les spécialités'
          }
        }
      });

    }
  }
}
