var rowGlobal;
window.onload=inicializador;

function inicializador()
{
    var gifCargando = document.getElementById("cargando");
    var gifCargando2 = document.getElementById("cargando2");
    var gifCargando3 = document.getElementById("cargando3");
    gifCargando.hidden = true;
    gifCargando2.hidden = true;
    gifCargando3.hidden = true;

    var contAgregar= document.getElementById("contAgregar");
    contAgregar.hidden = true;

    tCuerpo = document.getElementById("tCuerpo");   

    var btnCerrar = document.getElementById("btnCerrar");
    btnCerrar.onclick = function()
    {
        contAgregar.hidden = true;
        document.getElementById("fname").value = "";
        document.getElementById("lname").value = "";
    }

    var btnModificar = document.getElementById("btnModificar");
    btnModificar.onclick = function()
    {
        var nombre = document.getElementById("fname").value;
        var apellido = document.getElementById("lname").value;
        var fecha = document.getElementById("fecha").value;
        var masculino = document.getElementById("masculino");
        var femenino = document.getElementById("femenino");
        auxFecha = obtenerFecha(fecha);
        if(auxFecha < Date.now())
        {
            if(nombre.length >= 3 && apellido.length >= 3 && (masculino.checked == true || femenino.checked == true))
            {
                var resultado = confirm("Esta seguro que desea modificar una persona?");
                var httpPost = new XMLHttpRequest();
                if(resultado == true)
                {
                    gifCargando.hidden = false;
                    gifCargando2.hidden = false;
                    gifCargando3.hidden = false;
                    contAgregar.hidden = true;
                    httpPost.onreadystatechange=function()
                    {
                        if(httpPost.readyState==4&&http.status==200)
                        {
                                document.getElementById("lname").className="sinError";
                                document.getElementById("fname").className="sinError";
                                document.getElementById("fecha").className="sinError";
                                rowGlobal.childNodes[0].innerHTML = nombre;
                                rowGlobal.childNodes[1].innerHTML = apellido;
                                rowGlobal.childNodes[2].innerHTML = fecha;
                                if(masculino.checked == true)
                                {
                                    rowGlobal.childNodes[3].innerHTML = "Male";
                                }else if(femenino.checked == true)
                                {
                                    rowGlobal.childNodes[3].innerHTML = "Female"
                                }
                                gifCargando.hidden = true;
                                gifCargando2.hidden = true;
                                gifCargando3.hidden = true;    
                        }
                    }
    
                    httpPost.open("POST","http://localhost:3000/editar",true);
                    httpPost.setRequestHeader("Content-Type","application/json");
                    if(masculino.checked == true)
                    {
                        var json = {"id" : rowGlobal.getAttribute("idPersona"),"nombre" : nombre, "apellido" : apellido, "fecha" : fecha, "sexo" : "Male"};
                    }else if(femenino.checked == true)
                    {
                        var json = {"id" : rowGlobal.getAttribute("idPersona"),"nombre" : nombre, "apellido" : apellido, "fecha" : fecha, "sexo" : "Female"};
                    }
                    
                    httpPost.send(JSON.stringify(json));
                }       
            }else
            {
                document.getElementById("lname").className="error";
                document.getElementById("fname").className="error";
                alert("Nombre/Apellido deben tener mas de 3 caracteres");
                return;
            }
        }else
        {
            alert("La fecha debe ser menor al dia de hoy");
            document.getElementById("fecha").className="error";
            return;
        }
        
    }

    var btnEliminar = document.getElementById("btnEliminar");
    btnEliminar.onclick = function()
    {
        gifCargando.hidden = false;
        gifCargando2.hidden = false;
        gifCargando3.hidden = false;
        contAgregar.hidden = true;
        var httpPost = new XMLHttpRequest();
        httpPost.onreadystatechange=function()
        {
            if(httpPost.readyState==4&&http.status==200)
            {
                    rowGlobal.remove();
                    gifCargando.hidden = true;
                    gifCargando2.hidden = true;
                    gifCargando3.hidden = true;   
            }
        }
        httpPost.open("POST","http://localhost:3000/eliminar",true);
        httpPost.setRequestHeader("Content-Type","application/json");
        var json = {"id" : rowGlobal.getAttribute("idPersona")};
        httpPost.send(JSON.stringify(json));
    }

    var http = new XMLHttpRequest;
    http.onreadystatechange = callback;
    http.open("GET","http://localhost:3000/personas");
    http.send();

    function callback()
    {
        if(http.readyState===4)
        {
            if(http.status===200)
            {
                armarGrilla(JSON.parse(http.responseText));
            }else
            {
                console.log("Tenemos un error!!");
            }
        }
    }
   
    function armarGrilla(jsonObj)
    {
        var tCuerpo = document.getElementById("tCuerpo");
       
        for(var i = 0;i<jsonObj.length;i++)
        {
            var row = document.createElement("tr"); //Creo la fila
            var cel1 = document.createElement("td");
            var cel2 = document.createElement("td");
            var cel3 = document.createElement("td");
            var cel4 = document.createElement("td");
            var cel5 = document.createElement("td");
            //var text = document.createTextNode(jsonObj[i].id);
            row.setAttribute("idPersona",jsonObj[i].id);
            var text1 = document.createTextNode(jsonObj[i].nombre);
            var text2 = document.createTextNode(jsonObj[i].apellido);
            var text3 = document.createTextNode(jsonObj[i].fecha);
            var text4 = document.createTextNode(jsonObj[i].sexo);
            cel1.appendChild(text1);
            cel2.appendChild(text2);
            cel3.appendChild(text3);
            cel4.appendChild(text4);
            row.appendChild(cel1);
            row.appendChild(cel2);
            row.appendChild(cel3);
            row.appendChild(cel4);
            row.addEventListener("dblclick",clickGrilla);
            tCuerpo.appendChild(row);
        }
    }

    function clickGrilla(e)
    {
        console.log(e.target.parentNode);//se pueden utilizar los indices
        var trClick = e.target.parentNode;
        document.getElementById("fname").value = trClick.childNodes[0].innerHTML;
        document.getElementById("lname").value = trClick.childNodes[1].innerHTML;
        document.getElementById("fecha").value = trClick.childNodes[2].innerHTML;
        rowGlobal = trClick;
        if(trClick.childNodes[3].innerHTML == "Female")
        {
            document.getElementById("femenino").checked = true;
        }else
        {
            document.getElementById("masculino").checked = true;
        }
        contAgregar.hidden = false;
    }

    function obtenerFecha(auxFecha){

        let data= new Date();
        var fechaEnArray = auxFecha.split("-");//Divide un string en un array delimitado por -
        //osea nos da un array de 3 donde en el index 0 esta el año, 1 el mes y 2 el dia
        data.setFullYear(fechaEnArray[0]);
        //Los meses para un date arrancan de 0. Si los tenemos que setear -1 y cuando los mostramos +1
        data.setMonth(fechaEnArray[1]-1);
        data.setDate(fechaEnArray[2]);

        return data;
    }
    
}