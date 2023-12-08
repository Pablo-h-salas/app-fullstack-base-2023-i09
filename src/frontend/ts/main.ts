
var M;
class Main implements EventListenerObject{
    public usuarios: Array<Usuario>= new Array<Usuario>();
  

    private buscarPersonas() {

   
        for (let u of this.usuarios) {
            console.log(u.mostrar(),this.usuarios.length);
        }
    }
    
    private buscarDevices(user_id:number) {
        
         console.log(typeof user_id);     
        let xmlRequest = new XMLHttpRequest();
        
        xmlRequest.onreadystatechange = () => {
     
            if (xmlRequest.readyState == 4) {
                if(xmlRequest.status==200){
                    console.log(xmlRequest.responseText, xmlRequest.readyState);    
                    let respuesta = xmlRequest.responseText;
                    let datos:Array<Device> = JSON.parse(respuesta);
                    
                    let ul = document.getElementById("listaDisp"); 

                    for (let d of datos) {
                       if (user_id == d.id_user){
                        let itemList=
                        ` <li class="collection-item avatar">
                        <img src="./static/images/`

                        if (0==d.type){
                            itemList+=`lampara`
                        } else if (1==d.type){
                            itemList+=`cortina-inteligente`
                        } else if (2==d.type){
                            itemList+=`ventilador`
                        } else if(3==d.type){
                            itemList+=`monitor-de-tv`
                        } else if (4==d.type){
                            itemList+=`acondicionador-de-aire`
                        } else if (5==d.type){
                            itemList+=`garaje`
                        }
                        
                        itemList+=`.png" alt="" class="circle">
                        <span class="title">${d.name}</span>
                        <p>
                         ${d.description}
                        </p>
                        <a href="#!" class="secondary-content">
                        <div class="switch">
                        <label>
                          Off
                          <input type="checkbox"`;

                          itemList +=`nuevoAtt="${d.id}" id="cb_${d.id}"`

                        if (d.state) {
                            itemList+= ` checked `
                        }
                        
                        itemList+= `>
                          <span class="lever"></span>
                          On
                        </label>
                      </div>
                        </a>
                      </li>`
                      ul.innerHTML += itemList;
                    }
                    } // fin del for
                    // asignamos un id a cada uno de los checkbox creados 
                    // this contiene el metodo HandleEvent
                    for (let d of datos) {
                        let checkbox = document.getElementById("cb_" + d.id);
                        checkbox.addEventListener("click", this);
                    }
                    
                }else{
                    console.log("no encontre nada");
                }
            }
            
        }
        xmlRequest.open("GET","http://localhost:8000/devices",true)
        xmlRequest.send();
    }

    private ejecutarPost(id:number,state:boolean) {
        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("llego resputa",xmlRequest.responseText);        
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
            state: state   };
        xmlRequest.send(JSON.stringify(s));
    }

    private cargarUsuario(): void{
        let iNombre =<HTMLInputElement> document.getElementById("iNombre");
        let iPassword = <HTMLInputElement>document.getElementById("iPassword");
        let pInfo = document.getElementById("pInfo");
        if (iNombre.value.length > 3 && iPassword.value.length > 3) {
            let usuari1: Usuario = new Usuario(iNombre.value, "user", iPassword.value,23);
            this.usuarios.push(usuari1);
            iNombre.value = "";
            iPassword.value = "";
           
            
            pInfo.innerHTML = "Se cargo correctamente!";
            pInfo.className ="textoCorrecto";
            
        } else {
            pInfo.innerHTML = "Usuairo o contraseña incorrecta!!!";
            pInfo.className ="textoError";
        }
        
        
    }

    private buscarUsuarios(): void{
        
        let iNombre = <HTMLInputElement> document.getElementById("iNombre");
        let iPassword = <HTMLInputElement>document.getElementById("iPassword");
        let pInfo = document.getElementById("pInfo");
        let htitulo = document.getElementById("titulo");

        let xmlRequest = new XMLHttpRequest();
        
        xmlRequest.onreadystatechange = () => {
         
            if (xmlRequest.readyState == 4) {
                if(xmlRequest.status==200){
                    console.log("llego respuesta");
                    let respuesta = xmlRequest.responseText;
                    let datos:Array<Usuarios> = JSON.parse(respuesta);
                    for (let d of datos) {
                        if (iNombre.value == d.user && iPassword.value == d.password){
                            htitulo.innerHTML = `Bienvenido ${d.nombre}`
                            // ejercutar funcion de listar dispositivos y pasar el id_user
                            this.buscarDevices(d.id_user);
                        }else{
                            console.log("no se encontro Usuarios");
                        }
                    }
                 }
            
            }
        }
        xmlRequest.open("GET","http://localhost:8000/usuarios",true)
        xmlRequest.send();
        
    }
    
    

    handleEvent(object: Event): void {
        let elemento = <HTMLElement>object.target;
        
        
        if ("btnListar" == elemento.id) {
           //this.buscarDevices();          
        } else if ("btnGuardar" == elemento.id) {
            this.cargarUsuario();
            console.log("presionaste guardar");
        } else if("btnIngresar"== elemento.id) {
            this.buscarUsuarios();
            console.log("presionaste ingresar");
        } else if (elemento.id.startsWith("cb_")) {
            let checkbox = <HTMLInputElement>elemento;
            console.log(checkbox.getAttribute("nuevoAtt"),checkbox.checked, elemento.id.substring(3, elemento.id.length));
            
            this.ejecutarPost(parseInt(checkbox.getAttribute("nuevoAtt")),checkbox.checked);
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
    botonGuardar.addEventListener("click",main1);

    // botones de ingresar de la ventana usuarios
    let botonIngresar = document.getElementById("btnIngresar");
    botonIngresar.addEventListener("click", main1);

    let checkbox = document.getElementById("cb");
    checkbox.addEventListener("click", main1);


   
});

