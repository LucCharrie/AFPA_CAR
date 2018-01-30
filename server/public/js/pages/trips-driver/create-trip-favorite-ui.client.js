var uiTrip = {};


(function (self) {

  //
    // Boutons ajouter via
    //
    self.viaMore = function () {

        var id = 'via_' + self.inc++;

        var viaList = document.createElement("li");
        viaList.setAttribute('class', 'field');

        var viaDiv = document.createElement("div");
        viaDiv.setAttribute('class', 'ui action input');

        var viaInput = document.createElement("input");
        viaInput.setAttribute("id", id);
        viaInput.setAttribute('class', 'address_auto');
        viaInput.setAttribute('type', 'text');
        viaInput.setAttribute('placeholder', 'Ajouter une destination');

        var viaButton = document.createElement("button");
        viaButton.setAttribute('class', 'ui button');
        viaButton.setAttribute('onclick', 'uiTrip.viaLess(this)');
        viaButton.textContent = 'X';

        viaDiv.appendChild(viaInput);
        viaDiv.appendChild(viaButton);
        viaList.appendChild(viaDiv)

        var viaEnd = document.getElementById("viaEnd");
        document.getElementById("parentVia").insertBefore(viaList, viaEnd);

        //.ajaxREQ();
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
        inputCar.setAttribute('id', 'cars_user');
        inputCar.setAttribute('name', 'cars_user');

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




})(uiTrip);

