const paletteContainer = document.getElementById('palette-container');
const btnGenerate = document.getElementById('generate-btn');
const paletteSizeSelect = document.getElementById('palette-size');
const colorFormatSelect = document.getElementById('color-format');
const toast = document.getElementById('toast');

function getRandomHex() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomHsl() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 50) + 50;
  const l = Math.floor(Math.random() * 40) + 40;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2000);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`¡Copiado: ${text}!`);
  });
}

function renderPalette() {
  const size = parseInt(paletteSizeSelect.value);
  const format = colorFormatSelect.value;

  paletteContainer.innerHTML = '';

  for (let i = 0; i < size; i++) {
    const colorCode = format === 'HEX' ? getRandomHex() : getRandomHsl();

    const card = document.createElement('article');
    card.classList.add('color-card');
    card.title = "Haz clic para copiar";

    const colorBox = document.createElement('div');
    colorBox.classList.add('color-box');
    colorBox.style.backgroundColor = colorCode;

    const codeLabel = document.createElement('div');
    codeLabel.classList.add('color-info');
    codeLabel.textContent = colorCode;

    card.addEventListener('click', () => {
      copyToClipboard(colorCode);
    });

    card.appendChild(colorBox);
    card.appendChild(codeLabel);
    paletteContainer.appendChild(card);
  }
}

// Event listeners
btnGenerate.addEventListener('click', () => {
  renderPalette();
  showToast('¡Nueva paleta generada!');
});

paletteSizeSelect.addEventListener('change', renderPalette);
colorFormatSelect.addEventListener('change', renderPalette);

// Init
document.addEventListener('DOMContentLoaded', renderPalette);
