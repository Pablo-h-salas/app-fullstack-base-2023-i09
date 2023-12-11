
var M;
class Main implements EventListenerObject {
    public usuarios: Array<Usuario> = new Array<Usuario>();


    private buscarPersonas() {


        for (let u of this.usuarios) {
            console.log(u.mostrar(), this.usuarios.length);
        }
    }

    private buscarDevices(user_id: number) {

        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {

            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log(xmlRequest.responseText, xmlRequest.readyState);
                    let respuesta = xmlRequest.responseText;
                    let datos: Array<Device> = JSON.parse(respuesta);

                    let ul = document.getElementById("listaDisp");
                    // Limpia la lista al inicio
                    ul.innerHTML = "";

                    for (let d of datos) {
                        if (user_id == d.id_user) {
                            let itemList =
                                ` <li class="collection-item avatar">
                        <img src="./static/images/`

                            if (0 == d.type) {
                                itemList += `lampara`
                            } else if (1 == d.type) {
                                itemList += `cortina-inteligente`
                            } else if (2 == d.type) {
                                itemList += `ventilador`
                            } else if (3 == d.type) {
                                itemList += `monitor-de-tv`
                            } else if (4 == d.type) {
                                itemList += `acondicionador-de-aire`
                            } else if (5 == d.type) {
                                itemList += `garaje`
                            }

                            itemList += `.png" alt="" class="circle">
                        <span class="title">${d.name}</span>
                        <p>
                         ${d.description}
                        </p>`

                            // poner un input range solo a los que corresponden (los no binarios)
                            if (!d.binario) {

                                itemList +=
                                    `<div class "range_input">
                            <input type = "range" id = "range_${d.id}" class = "range-min" min = "0" max = "100" value = "${d.initial_value}">
                            </div>`
                            }

                            itemList += `
                        
                        <a href="#!" class="secondary-content">
                        <div class="switch">    
                        <label>
                          Off
                          <input type="checkbox"`;

                            itemList += `nuevoAtt="${d.id}" id="cb_${d.id}"`

                            if (d.state) {
                                itemList += ` checked `
                            }

                            itemList += `>
                          <span class="lever"></span>
                          On
                        </label>
                      </div>
                        </a>
                      </li>`
                            ul.innerHTML += itemList;
                        }
                    } // fin del for
                    // Recuperar cada uno de los checkbox y asignarles el evento de escucha al click.
                    // this contiene el metodo HandleEvent
                    for (let d of datos) {
                        if (d.id_user == user_id) {
                            let checkbox = document.getElementById("cb_" + d.id);
                            let range = document.getElementById("range_" + d.id);
                            checkbox.addEventListener("click", this);
                            if (range != null) {
                                range.addEventListener("click", this);
                            }
                        }
                    }

                } else {
                    console.log("no encontre nada");
                }
            }

        }
        xmlRequest.open("GET", "http://localhost:8000/devices", true)
        xmlRequest.send();
    }

    private ejecutarPost(id: number, state: boolean | undefined, initial_value: number | undefined) {
        let xmlRequest = new XMLHttpRequest();
        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("llego resputa", xmlRequest.responseText);
                } else {
                    alert("Salio mal la consulta");
                }
            }
        }

        xmlRequest.open("POST", "http://localhost:8000/device", true)
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        //s contiene la informacion a enviar
        let s = {
            id: id,
            state: state,
            initial_value: initial_value
        };
        xmlRequest.send(JSON.stringify(s));
    }

    private cargarUsuario(): void {
        let iNombre = <HTMLInputElement>document.getElementById("iNombre");
        let iPassword = <HTMLInputElement>document.getElementById("iPassword");
        let pInfo = document.getElementById("pInfo");
        if (iNombre.value.length > 3 && iPassword.value.length > 3) {
            let usuari1: Usuario = new Usuario(iNombre.value, "user", iPassword.value, 23);
            this.usuarios.push(usuari1);
            iNombre.value = "";
            iPassword.value = "";


            pInfo.innerHTML = "Se cargo correctamente!";
            pInfo.className = "textoCorrecto";

        } else {
            pInfo.innerHTML = "Usuairo o contraseña incorrecta!!!";
            pInfo.className = "textoError";
        }


    }

    private buscarUsuarios(): void {

        let iNombre = <HTMLInputElement>document.getElementById("iNombre");
        let iPassword = <HTMLInputElement>document.getElementById("iPassword");
        let pInfo = document.getElementById("pInfo");
        let htitulo = document.getElementById("titulo");
        //let modal1 = document.getElementById("modal1");

        let usuario_actual: Usuarios | undefined;

        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {

            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("llego respuesta");
                    let respuesta = xmlRequest.responseText;
                    let datos: Array<Usuarios> = JSON.parse(respuesta);
                    for (let d of datos) {
                        if (iNombre.value == d.user && iPassword.value == d.password) {
                            usuario_actual = d;
                        }
                    }

                    if (usuario_actual != undefined) {
                        htitulo.innerHTML = `Bienvenido ${usuario_actual.nombre}`
                        console.log(usuario_actual);
                        // ejercutar funcion de listar dispositivos y pasar el id_user
                        this.buscarDevices(usuario_actual.id_user);
                        this.cerrarModal("btnSalirModal1");
                    }
                    else {
                        console.log("no se encontro Usuarios o contrasena incorrecta");
                        pInfo.innerHTML = "Usuario o contraseña incorrecta!!!";
                        pInfo.className = "textoError";
                    }
                }

            }
        }
        xmlRequest.open("GET", "http://localhost:8000/usuarios", true)
        xmlRequest.send();

    }

    private sumarDispositivo(): void {
        console.log("presiono sumar dispositivos");

        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {

            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    //console.log(xmlRequest.responseText, xmlRequest.readyState);
                    let respuesta = xmlRequest.responseText;
                    let datos: Array<Device_type> = JSON.parse(respuesta);
                    // recupaerar listaTipos
                    let sel = document.getElementById("listaTipos") as HTMLSelectElement;;
                    //sel.innerHTML = "";

                    for (let d of datos) {
                        // let itemList =
                        //     `<option value="${d.id_tipo}">${d.descripcion}</option>`;

                        let option = document.createElement("option");
                        option.value = d.id_tipo.toString(); // Asegúrate de convertir a string si es necesario
                        option.textContent = d.descripcion;

                        //sel.innerHTML += itemList;
                        sel.appendChild(option);

                    }
                    console.log("hola que tal");
                    //console.log(sel);

                    // for (let d of datos) {
                    //     let checkbox = document.getElementById("cb_" + d.id);

                    //     checkbox.addEventListener("click", this);
                    // }

                } else {
                    console.log("no encontre nada");
                }
            }

        }
        xmlRequest.open("GET", "http://localhost:8000/tipos_dispositivos", true)
        xmlRequest.send();

    }

    private cerrarModal(btnSalirId: string): void {
        let btnSalir = document.getElementById(btnSalirId);
        if (btnSalir) {
            btnSalir.click();
        }
    }



    handleEvent(object: Event): void {
        let elemento = <HTMLElement>object.target;

        if ("btnListar" == elemento.id) {
            //this.buscarDevices();          
        } else if ("btnGuardar" == elemento.id) {
            this.cargarUsuario();
            console.log("presionaste guardar");
        } else if ("btnIngresar" == elemento.id) {
            this.buscarUsuarios();
        } else if ("btnSumar" == elemento.id) {
            this.sumarDispositivo();

        } else if ("editarDisp" == elemento.id) {
            console.log("editar dispositivo");
        } else if (elemento.id.startsWith("cb_")) {
            let checkbox = <HTMLInputElement>elemento;
            console.log(checkbox.getAttribute("nuevoAtt"), checkbox.checked, elemento.id.substring(3, elemento.id.length));

            this.ejecutarPost(parseInt(checkbox.getAttribute("nuevoAtt")), checkbox.checked, undefined);
        } else if (elemento.id.startsWith("range_")) {
            let range = <HTMLInputElement>elemento;
            this.ejecutarPost(parseInt(elemento.id.substring(6)), undefined, parseInt(range.value));

        }



    }

}


window.addEventListener("load", () => {

    // Inicializacion de Formulario (form select CSS)
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, "");

    var elemsModal = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elemsModal, "");


    let main1: Main = new Main();

    let boton = document.getElementById("btnListar");
    boton.addEventListener("click", main1);

    let botonGuardar = document.getElementById("btnGuardar");
    botonGuardar.addEventListener("click", main1);

    // botones de ingresar de la ventana usuarios
    let botonIngresar = document.getElementById("btnIngresar");
    botonIngresar.addEventListener("click", main1);

    // sumar y agregar dispositivos
    let botonSumarDisp = document.getElementById("btnSumar");
    botonSumarDisp.addEventListener("click", main1);

    let botonEditarDisp = document.getElementById("editarDisp");
    botonEditarDisp.addEventListener("click", main1);

    // let checkbox = document.getElementById("cb");
    // checkbox.addEventListener("click", main1);





});

