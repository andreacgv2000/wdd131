// js/form.js

// Arreglo proporcionado por la asignación
const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

window.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('productSelect');

  products.forEach(prod => {
    const option = document.createElement('option');
    option.value = prod.id;         // valor del option = id
    option.textContent = prod.name; // lo que se ve = nombre del producto
    select.appendChild(option);
  });
});
