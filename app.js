// ==== Datos de productos ====
const productosJSON = [
  { id: 1, nombre: "Portátil Asus i5", precio: 900.00, imagen: "IMAGENES/portatiles/asusi5.1.jfif" },
  { id: 2, nombre: "Portátil Asus i5 VivoBook", precio: 980.00, imagen: "IMAGENES/portatiles/asusi5.jfif" },
  { id: 3, nombre: "Portátil Asus Rog Saphorus", precio: 950.00, imagen: "IMAGENES/portatiles/asusr9.jfif" },
  { id: 4, nombre: "Portátil HP i3", precio: 750.00, imagen: "IMAGENES/portatiles/hpi3.jfif" },
  { id: 5, nombre: "Portátil HP i5", precio: 880.00, imagen: "IMAGENES/portatiles/hpi7.jfif" },
  { id: 6, nombre: "Portátil Gamer HP", precio: 1000.00, imagen: "IMAGENES/portatiles/hppavilion.jfif" },
  { id: 7, nombre: "De escritorio All in One", precio: 770.00, imagen: "IMAGENES/descritorio/allinone1.jfif" },
  { id: 8, nombre: "De escritorio Asrock i5", precio: 850.00, imagen: "IMAGENES/descritorio/asrock.jpg" },
  { id: 9, nombre: "De escritorio Core i5", precio: 900.00, imagen: "IMAGENES/descritorio/pc-magic_2.jpg" },
  { id: 10, nombre: "Auricular Gamer", precio: 170.00, imagen: "IMAGENES/accesorios/auricula2.jfif" },
  { id: 11, nombre: "Auricular SemiGamer", precio: 100.00, imagen: "IMAGENES/accesorios/auricular1.jfif" },
  { id: 12, nombre: "Auricular Básico", precio: 50.00, imagen: "IMAGENES/accesorios/auricular3.jfif" }
];

// ==== VARIABLES GLOBALES ====
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ==== MOSTRAR PRODUCTOS ====
function mostrarProductos() {
  const contenedor = document.querySelector('#contenedor-productos');
  contenedor.innerHTML = ""; // limpiar antes de renderizar

  productosJSON.forEach(producto => {
    const card = document.createElement('div');
    card.classList.add('producto-card');
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h2>${producto.nombre}</h2>
      <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
      <button data-id="${producto.id}" class="btn-agregar">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });

  // Escuchar clics de los botones
  document.querySelectorAll('.btn-agregar').forEach(btn => {
    btn.addEventListener('click', agregarAlCarrito);
  });
}

// ==== AGREGAR AL CARRITO ====
function agregarAlCarrito(e) {
  const idProducto = parseInt(e.target.dataset.id);
  const producto = productosJSON.find(p => p.id === idProducto);

  const itemEnCarrito = carrito.find(p => p.id === idProducto);
  if (itemEnCarrito) {
    itemEnCarrito.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
  mostrarCarrito();
}

// ==== GUARDAR EN LOCALSTORAGE ====
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ==== MOSTRAR CARRITO ====
function mostrarCarrito() {
  let contenedorCarrito = document.querySelector('#carrito');

  // Si no existe el contenedor, lo creamos (solo la primera vez)
  if (!contenedorCarrito) {
    contenedorCarrito = document.createElement('div');
    contenedorCarrito.id = 'carrito';
    contenedorCarrito.innerHTML = `
      <h3>🛒 Carrito de compras</h3>
      <div id="carrito-items"></div>
      <p id="carrito-total"></p>
      <button id="vaciar-carrito" class="btn-vaciar">Vaciar carrito</button>
    `;
    document.body.appendChild(contenedorCarrito);
  }

  const itemsContainer = contenedorCarrito.querySelector('#carrito-items');
  const totalContainer = contenedorCarrito.querySelector('#carrito-total');

  itemsContainer.innerHTML = "";
  let total = 0;

  carrito.forEach(prod => {
    total += prod.precio * prod.cantidad;
    const item = document.createElement('div');
    item.classList.add('item-carrito');
    item.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" width="60">
      <span>${prod.nombre}</span>
      <span>Cant: ${prod.cantidad}</span>
      <span>$${(prod.precio * prod.cantidad).toFixed(2)}</span>
      <button class="btn-eliminar" data-id="${prod.id}">❌</button>
    `;
    itemsContainer.appendChild(item);
  });

  totalContainer.textContent = `Total: $${total.toFixed(2)}`;

  // Eventos de botones
  contenedorCarrito.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', eliminarDelCarrito);
  });

  const vaciarBtn = contenedorCarrito.querySelector('#vaciar-carrito');
  vaciarBtn.addEventListener('click', vaciarCarrito);
}

// ==== ELIMINAR UN PRODUCTO DEL CARRITO ====
function eliminarDelCarrito(e) {
  const id = parseInt(e.target.dataset.id);
  carrito = carrito.filter(prod => prod.id !== id);
  guardarCarrito();
  mostrarCarrito();
}

// ==== VACIAR CARRITO ====
function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  mostrarCarrito();
}

// ==== INICIALIZAR ====
mostrarProductos();
mostrarCarrito();