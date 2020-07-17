var Animal;
(function (Animal) {
    //var tablaGlobal;
    var rowGlobal;
    window.addEventListener("load", function () {
        document.getElementById("btnGuardar").addEventListener("click", guardar);
        document.getElementById("btnModificar").addEventListener("click", modificar);
        document.getElementById("btnEliminar").addEventListener("click", eliminar);
        document.getElementById("tipoMascota").addEventListener("change", cambioMascota);
        document.getElementById("buscador").addEventListener("keyup", buscarFilter);
    });
    window.addEventListener("load", hideForm);
    var listaMascotas = new Array();
    function buscarFilter() {
        var tCuerpo = document.getElementById("tCuerpo");
        listaMascotas.filter(function (mascota) {
        });
        //alert(document.getElementById("buscador").value);
    }
    Animal.buscarFilter = buscarFilter;
    //Funcion de inicio para ocultar inputs
    function hideForm() {
        document.getElementById("infoPajaro").hidden = true;
        document.getElementById("infoGato").hidden = true;
    }
    Animal.hideForm = hideForm;
    //Funcion para mostrar u ocultar inputs segun se elija la masota
    function cambioMascota() {
        if (document.getElementById("tipoMascota").value == "1") {
            document.getElementById("infoPajaro").hidden = true;
            document.getElementById("infoGato").hidden = true;
            document.getElementById("infoPerro").hidden = false;
        }
        else if (document.getElementById("tipoMascota").value == "2") {
            document.getElementById("infoPajaro").hidden = true;
            document.getElementById("infoGato").hidden = false;
            document.getElementById("infoPerro").hidden = true;
        }
        else if (document.getElementById("tipoMascota").value == "3") {
            document.getElementById("infoPajaro").hidden = false;
            document.getElementById("infoGato").hidden = true;
            document.getElementById("infoPerro").hidden = true;
        }
    }
    Animal.cambioMascota = cambioMascota;
    //Funcion de Guardado en la Tabla
    function guardar() {
        var tCuerpo = document.getElementById("tCuerpo");
        var nombre = document.getElementById("nameM").value;
        var cantVidas = document.getElementById("cantVidas").value;
        var raza = document.getElementById("raza").value;
        var idRow;
        if (document.getElementById("tipoPajaro").value == "1") {
            var tipoPajaro = Animal.eTipo.Loro;
        }
        else if (document.getElementById("tipoPajaro").value == "2") {
            var tipoPajaro = Animal.eTipo.Rapiña;
        }
        var control = false;
        var row = document.createElement("tr");
        var cel1 = document.createElement("td");
        var cel2 = document.createElement("td");
        var text1;
        var text2;
        switch (document.getElementById("tipoMascota").value) {
            case "1":
                if (nombre != "" && raza != "") {
                    document.getElementById("nameM").className = "sinError";
                    document.getElementById("raza").className = "sinError";
                    var miPerro = new Animal.Perro(nombre, raza);
                    miPerro.id = calcularID();
                    idRow = miPerro.id;
                    listaMascotas.push(miPerro);
                    text1 = document.createTextNode(nombre);
                    text2 = document.createTextNode(raza);
                    control = true;
                }
                else {
                    alert("Debe completar todos los campos");
                    document.getElementById("nameM").className = "error";
                    document.getElementById("raza").className = "error";
                }
                break;
            case "2":
                if (nombre != "") {
                    document.getElementById("nameM").className = "sinError";
                    document.getElementById("cantVidas").className = "sinError";
                    var miGato = new Animal.Gato(nombre, cantVidas);
                    miGato.id = calcularID();
                    idRow = miGato.id;
                    listaMascotas.push(miGato);
                    text1 = document.createTextNode(nombre);
                    text2 = document.createTextNode(cantVidas.toString());
                    control = true;
                }
                else {
                    alert("Debe completar todos los campos");
                    document.getElementById("nameM").className = "error";
                    document.getElementById("cantVidas").className = "error";
                }
                break;
            case "3":
                if (nombre != "") {
                    document.getElementById("nameM").className = "sinError";
                    document.getElementById("tipoPajaro").className = "sinError";
                    var miPajaro = new Animal.Pajaro(nombre, tipoPajaro);
                    miPajaro.id = calcularID();
                    idRow = miPajaro.id;
                    listaMascotas.push(miPajaro);
                    text1 = document.createTextNode(nombre);
                    if (document.getElementById("tipoPajaro").value == "1") {
                        text2 = document.createTextNode("Loro");
                    }
                    else if (document.getElementById("tipoPajaro").value == "2") {
                        text2 = document.createTextNode("Rapiña");
                    }
                    control = true;
                }
                else {
                    alert("Debe completar todos los campos");
                    document.getElementById("nameM").className = "error";
                    document.getElementById("tipoPajaro").className = "error";
                }
                break;
        }
        if (control == true) {
            row.setAttribute("idMascota", idRow.toString());
            if (document.getElementById("tipoMascota").value == "1") {
                row.setAttribute("tipoMascota", "Perro");
            }
            else if (document.getElementById("tipoMascota").value == "2") {
                row.setAttribute("tipoMascota", "Gato");
            }
            else if (document.getElementById("tipoMascota").value == "3") {
                row.setAttribute("tipoMascota", "Pajaro");
            }
            cel1.appendChild(text1);
            cel2.appendChild(text2);
            row.appendChild(cel1);
            row.appendChild(cel2);
            row.addEventListener("dblclick", clickGrilla);
            tCuerpo.appendChild(row);
            //tablaGlobal = tCuerpo;
            control = false;
            document.getElementById("nameM").value = "";
            document.getElementById("raza").value = "";
            document.getElementById("cantVidas").value = 1;
            document.getElementById("tipoPajaro").value = "1";
        }
    }
    Animal.guardar = guardar;
    function modificar() {
        var control = false;
        if (rowGlobal.getAttribute("tipoMascota") == "Perro") {
            var nombre = document.getElementById("nameM").value;
            var raza = document.getElementById("raza").value;
            var tipoMascota = document.getElementById("tipoMascota").value;
            if (nombre != "" && raza != "" && tipoMascota == "1") {
                alert("entre");
                document.getElementById("nameM").className = "sinError";
                document.getElementById("raza").className = "sinError";
                rowGlobal.childNodes[0].innerHTML = nombre;
                rowGlobal.childNodes[1].innerHTML = raza;
                control = true;
            }
            else {
                alert("Todos los campos deben estar ocmpleto y el animal debe ser del mismo tipo");
                document.getElementById("nameM").className = "error";
                document.getElementById("raza").className = "error";
            }
        }
        else if (rowGlobal.getAttribute("tipoMascota") == "Gato") {
        }
        else if (rowGlobal.getAttribute("tipoMascota") == "Pajaro") {
        }
        if (control == true) {
            document.getElementById("nameM").value = "";
            document.getElementById("raza").value = "";
            document.getElementById("cantVidas").value = 1;
            document.getElementById("tipoPajaro").value = "1";
        }
    }
    Animal.modificar = modificar;
    function eliminar() {
        document.getElementById("nameM").value = "";
        document.getElementById("raza").value = "";
        document.getElementById("cantVidas").value = 1;
        document.getElementById("tipoPajaro").value = "1";
        rowGlobal.remove();
    }
    Animal.eliminar = eliminar;
    function clickGrilla(e) {
        var trClick = e.target.parentNode;
        rowGlobal = trClick;
        document.getElementById("nameM").value = trClick.childNodes[0].innerHTML;
        if (trClick.getAttribute("tipoMascota") == "Perro") {
            document.getElementById("tipoMascota").value = "1";
            document.getElementById("raza").value = trClick.childNodes[1].innerHTML;
            cambioMascota();
        }
        else if (trClick.getAttribute("tipoMascota") == "Gato") {
            document.getElementById("tipoMascota").value = "2";
            document.getElementById("cantVidas").value = trClick.childNodes[1].innerHTML;
            cambioMascota();
        }
        else if (trClick.getAttribute("tipoMascota") == "Pajaro") {
            document.getElementById("tipoMascota").value = "3";
            switch (trClick.childNodes[1].innerHTML) {
                case "Loro":
                    document.getElementById("tipoPajaro").value = "1";
                    break;
                case "Rapiña":
                    document.getElementById("tipoPajaro").value = "2";
                    break;
            }
            cambioMascota();
        }
    }
    Animal.clickGrilla = clickGrilla;
    //Calcular ID para la mascota
    function calcularID() {
        return listaMascotas.length + 1;
    }
})(Animal || (Animal = {}));
