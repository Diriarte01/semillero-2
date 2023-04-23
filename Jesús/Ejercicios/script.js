const productos = [
	{nombre: "Lavadora", categoria: "electrodomesticos"},
	{nombre: "Secadora", categoria: "electrodomesticos"},
	{nombre: "Camisa", categoria: "ropa"},
	{nombre: "Pantalón", categoria: "ropa"},
	{nombre: "Televisor", categoria: "electronicos"},
	{nombre: "Tablet", categoria: "electronicos"}
];

function mostrarProductos() {
	const categoriaSeleccionada = document.getElementById("categoria").value;
	const productosFiltrados = productos.filter(producto => producto.categoria === categoriaSeleccionada);
	
	const productosDiv = document.getElementById("productos");
	productosDiv.innerHTML = "";
	if (productosFiltrados.length > 0) {
		const ul = document.createElement("ul");
		productosFiltrados.forEach(producto => {
			const li = document.createElement("li");
			li.textContent = producto.nombre;
			ul.appendChild(li);
		});
		productosDiv.appendChild(ul);
	} else {
		productosDiv.textContent = "No se encontraron productos.";
	}
}



