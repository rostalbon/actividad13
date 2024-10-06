let productos = []
let rubros = []

actualizarLocalStorage()
actualizarRubros()
actualizarTabla()

function actualizarTabla() {
    let tabla = document.getElementById("cuerpoTabla")
    tabla.innerHTML = ``
    for (i = 0; i < productos.length; i++) {
        tabla.innerHTML += `<tr>
            <td>${i}</td>
            <td>${productos[i].nombre}</td>
            <td>${productos[i].rubro}</td>
            <td>${productos[i].stock}</td>
            <td>${productos[i].precio === "" ? "" : `$${productos[i].precio}`}</td>
            <td>
                <button class="editar" id="editar" value=${i} onclick="editar(value)"><img src="img/editar_btn.png" alt="Editar" class="editarImg"></button>
                <button class="eliminar" id="eliminar" value=${i} onclick="eliminar(value)"><img src="img/eliminar_btn.png" alt="Eliminar" class="eliminarImg"></button>
                </td>
            </tr>`
    }
}

function actualizarLocalStorage() {
    if ("rubros" in localStorage) {
        rubros = JSON.parse(localStorage.getItem("rubros"))
    } else {
        rubros = []
    }
    if ("productos" in localStorage) {
        productos = JSON.parse(localStorage.getItem("productos"))
    } else {
        productos = []
    }
}

// rubros
function actualizarRubros() {
    let lista = document.getElementById("listaRubros")
    let selectRubros = document.getElementById("rubros")
    let selectRubros2 = document.getElementById("rubrosAgrProd")
    let selectRubros3 = document.getElementById("rubrosEditProd")
    lista.innerHTML = ``
    selectRubros.innerHTML = ``
    selectRubros2.innerHTML = ``
    selectRubros3.innerHTML = ``
    for (i = 0; i < rubros.length; i++) {
        lista.innerHTML += `<p>${rubros[i]}</p>`
        selectRubros.innerHTML += `<option value=${i}>${rubros[i]}</option>`
        selectRubros2.innerHTML += `<option value=${i}>${rubros[i]}</option>`
        selectRubros3.innerHTML += `<option value=${i}>${rubros[i]}</option>`
    }
}
function modificarRubros() {
    let overlay = document.getElementById("overlay");
    overlay.style.display = 'block';
    let popup1 = document.getElementById("modificadorRubros");
    popup1.show()
    actualizarRubros()
}
function eliminarRubro() {
    let rubrosArray = document.getElementById("rubros")
    let rubroId = rubrosArray.options[rubrosArray.selectedIndex].value
    rubros.splice(rubroId, 1)
    localStorage.setItem("rubros", JSON.stringify(rubros))
    actualizarLocalStorage()
    actualizarRubros()
}
function agregarRubro() {
    let rubro = document.getElementById("rubroAgregado").value.toLowerCase()
    console.log(rubro)
    rubros.push(rubro)
    localStorage.setItem("rubros", JSON.stringify(rubros))
    actualizarLocalStorage()
    actualizarRubros()
    document.getElementById("rubroAgregado").value = ""
}
function cerrarRubros() {
    let overlay = document.getElementById("overlay");
    overlay.style.display = 'none';
    let popup1 = document.getElementById("modificadorRubros");
    popup1.close()
}

// productos
function agregarProducto() {
    actualizarRubros()
    let overlay = document.getElementById("overlay");
    overlay.style.display = 'block';
    let popup2 = document.getElementById("agregadorProductos");
    popup2.show()
}

function agregarProd() {
    let nombre = document.getElementById("nombreProducto").value
    let rubrosArray = document.getElementById("rubrosAgrProd")
    let rubroId = rubrosArray.options[rubrosArray.selectedIndex].value
    let stock = document.getElementById("stockProducto").value
    let precio = document.getElementById("precioProducto").value
    productos.forEach((producto) => {

    })
    if (nombre != "" && stock != "" && precio != "") {
        productos.push({nombre: nombre, rubro: rubros[rubroId], stock: stock, precio: precio, id: productos.length})
        localStorage.setItem("productos", JSON.stringify(productos))
        actualizarLocalStorage()
    } else {
        document.getElementById("alertaProd").innerHTML = "Llene todos los campos para continuar"
    }
    let tabla = document.getElementById("cuerpoTabla")
    tabla.innerHTML = ``
    for (i = 0; i < productos.length; i++) {
        tabla.innerHTML += `<tr>
            <td>${i}</td>
            <td>${productos[i].nombre}</td>
            <td>${productos[i].rubro}</td>
            <td>${productos[i].stock}</td>
            <td>${productos[i].precio === "" ? "" : `$${productos[i].precio}`}</td>
            <td>
                <button class="editar" id="editar" value=${i} onclick="editar(value)"><img src="img/editar_btn.png" alt="Editar" class="editarImg"></button>
                <button class="eliminar" id="eliminar" value=${i} onclick="eliminar(value)"><img src="img/eliminar_btn.png" alt="Eliminar" class="eliminarImg"></button>
                </td>
            </tr>`
    }
    document.getElementById("nombreProducto").value = ""
    document.getElementById("stockProducto").value = ""
    document.getElementById("precioProducto").value = ""
}

function cerrarProductos() {
    let overlay = document.getElementById("overlay");
    overlay.style.display = 'none';
    let popup2 = document.getElementById("agregadorProductos");
    popup2.close()
    document.getElementById("alertaProd").innerHTML = ""
    document.getElementById("nombreProducto").value = ""
    document.getElementById("stockProducto").value = ""
    document.getElementById("precioProducto").value = ""
}

// tabla
let idEditar = 0;

function editar(value) {
    let overlay = document.getElementById("overlay");
    overlay.style.display = 'block';
    let popup = document.getElementById("editarProd");
    popup.show()
    document.getElementById("nombreProd").innerHTML = productos[value].nombre
    document.getElementById("rubroProd").innerHTML = productos[value].rubro
    document.getElementById("stockProd").innerHTML = productos[value].stock
    document.getElementById("precioProd").innerHTML = productos[value].precio
    idEditar = value
}

function guardarNombreProd() {
    let text = document.getElementById("nombreIngProd").value
    if (text != "") {
        productos[idEditar].nombre = text
        localStorage.setItem("productos", JSON.stringify(productos))
        actualizarLocalStorage()
        document.getElementById("nombreProd").innerHTML = productos[idEditar].nombre
        actualizarTabla()
    } else {
        document.getElementById("nombreProd").innerHTML = "INGRESE UN NOMBRE"
    }
}

function guardarRubroProd() {
    let rubrosArray = document.getElementById("rubrosEditProd")
    let rubroId = rubrosArray.options[rubrosArray.selectedIndex].value
    let text = rubros[rubroId]
    if (text != "") {
        productos[idEditar].rubro = text
        localStorage.setItem("productos", JSON.stringify(productos))
        actualizarLocalStorage()
        document.getElementById("rubroProd").innerHTML = productos[idEditar].rubro
        actualizarTabla()
    } else {
        document.getElementById("rubroProd").innerHTML = "INGRESE UN RUBRO"
    }
}

function guardarStockProd() {
    let text = document.getElementById("stockEditProd").value
    if (text != "") {
        productos[idEditar].stock = text
        localStorage.setItem("productos", JSON.stringify(productos))
        actualizarLocalStorage()
        document.getElementById("stockProd").innerHTML = productos[idEditar].stock
        actualizarTabla()
    } else {
        document.getElementById("stockProd").innerHTML = "INGRESE UN NÚMERO"
    }
}

function guardarPrecioProd() {
    let text = document.getElementById("precioEditProd").value
    if (text > 0) {
        productos[idEditar].precio = text
        localStorage.setItem("productos", JSON.stringify(productos))
        actualizarLocalStorage()
        document.getElementById("precioProd").innerHTML = `$${productos[idEditar].precio}`
        actualizarTabla()
    } else {
        document.getElementById("precioProd").innerHTML = "INGRESE UN PRECIO"
    }
}

function cerrarEditar() {
    let overlay = document.getElementById("overlay");
    overlay.style.display = 'none';
    let popup = document.getElementById("editarProd");
    popup.close()
}

function eliminar(value) {
    productos.splice(value, 1)
    localStorage.setItem("productos", JSON.stringify(productos))
    actualizarLocalStorage()
    actualizarTabla()
}