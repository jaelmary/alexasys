// ==== Datos de servicios ====
const serviciosJSON = [
  { id: 1, nombre: "Mantenimiento PC de Escritorio", precio: 120.00, imagen: "imagenes/mantenimiento/escritorio.jpeg" },
  { id: 2, nombre: "Mantenimiento de Portátil", precio: 140.00, imagen: "imagenes/mantenimiento/portatil.jpeg" },
  { id: 3, nombre: "Formateo de PC de Escritorio", precio: 160.00, imagen: "imagenes/mantenimiento/formateoEscritorio.png" },
  { id: 4, nombre: "Formateo de Portátil", precio: 180.00, imagen: "imagenes/mantenimiento/formateoPortatil.png" }
];

// ==== Variables globales ====
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ==== Mostrar servicios ====
function mostrarServicios() {
  const contenedor = document.querySelector('#contenedor-servicios');
  contenedor.innerHTML = "";

  serviciosJSON.forEach(servicio => {
    const card = document.createElement('div');
    card.classList.add('producto-card');
    card.innerHTML = `
      <img src="${servicio.imagen}" alt="${servicio.nombre}">
      <h3>${servicio.nombre}</h3>
      <p><strong>Precio:</strong> $${servicio.precio.toFixed(2)}</p>
      <button data-id="${servicio.id}" class="btn-agregar">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });

  document.querySelectorAll('.btn-agregar').forEach(btn => {
    btn.addEventListener('click', agregarAlCarrito);
  });
}

// ==== Agregar al carrito ====
function agregarAlCarrito(e) {
  const id = parseInt(e.target.dataset.id);
  const servicio = serviciosJSON.find(s => s.id === id);

  const existente = carrito.find(p => p.id === id);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...servicio, cantidad: 1 });
  }

  guardarCarrito();
  mostrarCarrito();
}

// ==== Guardar en localStorage ====
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ==== Mostrar carrito ====
function mostrarCarrito() {
  let contenedorCarrito = document.querySelector('#carrito');

  if (!contenedorCarrito) {
    contenedorCarrito = document.createElement('div');
    contenedorCarrito.id = 'carrito';
    document.body.appendChild(contenedorCarrito);
  }

  contenedorCarrito.innerHTML = `
    <h3>🛒 Carrito de compras</h3>
    <div id="carrito-items"></div>
    <p id="carrito-total"></p>
    <button id="vaciar-carrito" class="btn-vaciar">Vaciar carrito</button>
  `;

  const itemsContainer = contenedorCarrito.querySelector('#carrito-items');
  const totalContainer = contenedorCarrito.querySelector('#carrito-total');

  itemsContainer.innerHTML = "";
  let total = 0;

  carrito.forEach(item => {
    total += item.precio * item.cantidad;
    const div = document.createElement('div');
    div.classList.add('item-carrito');
    div.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}" width="60">
      <span>${item.nombre}</span>
      <span>Cant: ${item.cantidad}</span>
      <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
      <button class="btn-eliminar" data-id="${item.id}">❌</button>
    `;
    itemsContainer.appendChild(div);
  });

  totalContainer.textContent = `Total: $${total.toFixed(2)}`;

  contenedorCarrito.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', eliminarDelCarrito);
  });

  contenedorCarrito.querySelector('#vaciar-carrito').addEventListener('click', vaciarCarrito);
}

// ==== Eliminar del carrito ====
function eliminarDelCarrito(e) {
  const id = parseInt(e.target.dataset.id);
  carrito = carrito.filter(p => p.id !== id);
  guardarCarrito();
  mostrarCarrito();
}

// ==== Vaciar carrito ====
function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  mostrarCarrito();
}

// ==== Inicializar ====
mostrarServicios();
mostrarCarrito();