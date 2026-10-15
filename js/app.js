// 1. Selección de elementos del DOM que vamos a manipular
const paletteContainer = document.getElementById('palette-container');
const btnGenerate = document.getElementById('generate-btn');const paletteSizeSelect = document.getElementById('palette-size');
const colorFormatSelect = document.getElementById('color-format');
const toast = document.getElementById('toast');

// 2. Función para generar un color aleatorio en formato HEX (#A1B2C3)
function getRandomHex() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// 3. Función para generar un color aleatorio en formato HSL (hsl(120, 50%, 60%))
function getRandomHsl() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 50) + 50; // Tonos saturados
  const l = Math.floor(Math.random() * 40) + 40; // Brillo equilibrado
  return `hsl(${h}, ${s}%, ${l}%)`;
}

// 4. Mostrar microfeedback visual (Toast) al usuario
function showToast(message) {
  toast.textContent = message;
  toast.classList.remove('hidden'); // Mostramos el toast
  
  // Lo volvemos a ocultar después de 2 segundos
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2000);
}

// 5. Copiar el código de color al portapapeles al hacer clic
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`¡Copiado: ${text}!`);
  });
}

// 6. Función principal para construir y renderizar la paleta en pantalla
function renderPalette() {
  const size = parseInt(paletteSizeSelect.value);
  const format = colorFormatSelect.value;

  // Limpiamos el contenedor antes de generar los nuevos colores
  paletteContainer.innerHTML = '';

  for (let i = 0; i < size; i++) {
    // Generamos el color según el formato seleccionado
    const colorCode = format === 'HEX' ? getRandomHex() : getRandomHsl();

    // Creación de la tarjeta dinámicamente en el DOM
    const card = document.createElement('article');
    card.classList.add('color-card');
    card.title = "Haz clic para copiar";

    const colorBox = document.createElement('div');
    colorBox.classList.add('color-box');
    colorBox.style.backgroundColor = colorCode;

    const codeLabel = document.createElement('div');
    codeLabel.classList.add('color-info');
    codeLabel.textContent = colorCode;

    // Agregar evento de clic a la tarjeta para copiar el color
    card.addEventListener('click', () => {
      copyToClipboard(colorCode);
    });

    // Unimos las partes dentro de la tarjeta y la tarjeta dentro del contenedor
    card.appendChild(colorBox);
    card.appendChild(codeLabel);
    paletteContainer.appendChild(card);
  }
}

// 7. Escuchadores de eventos para hacer interactiva la app
btnGenerate.addEventListener('click', () => {
  renderPalette();
  showToast('¡Nueva paleta generada!');
});

paletteSizeSelect.addEventListener('change', renderPalette);
colorFormatSelect.addEventListener('change', renderPalette);

// Cargar una paleta automáticamente al abrir la página
document.addEventListener('DOMContentLoaded', renderPalette);