var uiTrip = {};


(function (self) {

    self.inc = 0;

    //
    // Boutons ajouter via
    //
    self.viaMore = function () {

        // id pour récupérer id du tableau quand submit
        var id = 'via_' + self.inc++;

        // création d'éléments
        var viaList = document.createElement("li");
        viaList.setAttribute('class', 'field');

        var viaDiv = document.createElement("div");
        viaDiv.setAttribute('class', 'ui action input');
      
        var viaSelect = document.createElement('select')
        viaSelect.setAttribute('class', 'tripForm ui dropdown');
        viaSelect.setAttribute('id', id);
        viaSelect.setAttribute('name', id);


        var viaButton = document.createElement("button");
        viaButton.setAttribute('class', 'ui button');
        viaButton.setAttribute('style', 'margin-left: 5px');
        viaButton.setAttribute('onclick', 'uiTrip.viaLess(this)');
        viaButton.textContent = 'X';

        viaDiv.appendChild(viaSelect);
        viaDiv.appendChild(viaButton);
        viaList.appendChild(viaDiv);

        // element ajouter à chaque +
        var viaEnd = document.getElementById("viaEnd");
        document.getElementById("parentVia").insertBefore(viaList, viaEnd);

        // recharger l'ajax
        listAddress.init('#'+id);

};


    //
    // Boutons supprimer via
    //
    self.viaLess = function (e) {
        e.parentNode.parentNode.remove();
    };

    //
    // Boutons Conducteur
    //
    self.driver = function (e) {

        let fieldFirst = document.getElementById('cars_user_first');
        let labelCar = document.createElement('label');
        let inputCar = document.createElement('select');
        labelCar.innerHTML = "Voiture";
        inputCar.setAttribute('class', 'ui dropdown');
        inputCar.setAttribute('id', 'car_user_id');
        inputCar.setAttribute('name', 'car_user_id');

        let fieldSecond = document.getElementById('cars_user_second');
        let labelPlace = document.createElement('label');
        let inputPlace = document.createElement('input');
        labelPlace.innerHTML = "Nbr. de places";
        inputPlace.setAttribute('id', 'nb_seats');
        inputPlace.setAttribute('type', 'number');
        inputPlace.setAttribute('name', 'nb_seats');


        if (e.checked) {

            fieldFirst.appendChild(labelCar);
            fieldFirst.appendChild(inputCar);

            fieldSecond.appendChild(labelPlace);
            fieldSecond.appendChild(inputPlace);

            //ajax de ./list-car-user.js
            listCars.init();

        } else {

            while (fieldFirst.firstChild) {
                fieldFirst.removeChild(fieldFirst.firstChild);
            }

            while (fieldSecond.firstChild) {
                fieldSecond.removeChild(fieldSecond.firstChild);
            }
        }
    }

    // Permuter les couleurs des jours
    self.days = function(e){

        if(e.className === "ui circular large label"){
            e.className = "ui green circular large label";
            e.setAttribute('data-id', true)
        } else {
            e.className = "ui circular large label";
            e.setAttribute('data-id', false)
        }
    }



})(uiTrip);

