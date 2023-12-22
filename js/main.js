const listaProductos = document.querySelector("#listaProductos")
const listaCompra = document.querySelector("#listaCompra")
const miCarrito = document.createElement("ul")
miCarrito.id = "miCarrito"
let productosEnCarro = {};
const borrarLista = document.querySelector("#borrarLista");

const fragment = document.createDocumentFragment();

const arrayProductos = ["Patacas", "Mandarinas", "Tomates", "Chuletas", "Jamones", "Chorizo", "Fuet"];

const pruebaClick = document.addEventListener("click", (ev) => {
    console.log(ev.target)
});

const imprimirListaProductos = () => {

    const productos = document.createElement("ul");
    productos.id = "productos";

    arrayProductos.forEach((item) => {
        const objetoLista = document.createElement('li');
        const boton = document.createElement('button');
        boton.type = "button";
        boton.id = item;
        boton.textContent = 'Añadir';

        objetoLista.textContent = item;

        objetoLista.appendChild(boton);
        fragment.append(objetoLista);
    });
    productos.append(fragment);
    listaProductos.appendChild(productos);
};

const aniadirProductosAlCarro = (producto) => {
    if (productosEnCarro[producto]) {
        productosEnCarro[producto]++;
    } else {
        productosEnCarro[producto] = 1;
    }

    actualizarListaCompra();
    guardarCarroEnLocal();
};

const botonAniadir = (ev) => {
    if (ev.target.tagName === "BUTTON" && ev.target.textContent === "Añadir") {
        const productoSeleccionado = ev.target.parentNode.firstChild.textContent;
        aniadirProductosAlCarro(productoSeleccionado);
    }
};


const borrarProductosDelCarro = () => {
    miCarrito.innerHTML = "";
    productosEnCarro = {};

    guardarCarroEnLocal();
};

const actualizarListaCompra = () => {
    miCarrito.innerHTML = "";

    for (const producto in productosEnCarro) {
        const cantidad = productosEnCarro[producto];

        const objetoEnCarro = document.createElement("li");
        objetoEnCarro.textContent = `${producto} x${cantidad}`;


        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.textContent = "Eliminar";


        botonEliminar.addEventListener("click", () => {
            productosEnCarro[producto]--;
            if (productosEnCarro[producto] === 0) {
                delete productosEnCarro[producto];
            }

            actualizarListaCompra();
            guardarCarroEnLocal();
        });

        objetoEnCarro.appendChild(botonEliminar);
        miCarrito.appendChild(objetoEnCarro);
    }
    listaCompra.appendChild(miCarrito);
};


const guardarCarroEnLocal = () => {
    localStorage.setItem("miCesta", JSON.stringify(productosEnCarro));
};

const cargarCarroDesdeLocal = () => {
    const cestaEnLocal = localStorage.getItem("miCesta");
    if (cestaEnLocal) {
        productosEnCarro = JSON.parse(cestaEnLocal);
        actualizarListaCompra();
    }
};

const borrarTodaMiCesta = () => {
    borrarListaDelCarro();
};

const borrarListaDelCarro = () => {
    borrarProductosDelCarro();
    guardarCarroEnLocal();
};

document.addEventListener("DOMContentLoaded", () => {
    imprimirListaProductos();
    cargarCarroDesdeLocal();
    listaProductos.addEventListener("click", botonAniadir);
    const borrarListaBtn = document.querySelector("#borrarLista");
    borrarListaBtn.addEventListener("click", borrarTodaMiCesta);
});