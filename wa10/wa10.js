let modeSelect = document.querySelector("#js-mode");
let button = document.querySelector("#js-new-palette");

modeSelect.addEventListener('change', getRandomPalette);
button.addEventListener('click', getRandomPalette);

function getRandomHex() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  return hex.padStart(6, '0');
}

async function getRandomPalette() {
  let mode = modeSelect.value;
  const baseColor = getRandomHex();
  const endpoint = `https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=${mode}&count=5`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    const colors = data.colors;

    const palette = document.getElementById('js-palette');
    palette.innerHTML = '';

    colors.forEach(color => {
      const hex = color.hex.value;
      const bar = document.createElement('div');
      bar.className = 'color-bar';
      bar.style.backgroundColor = hex;
      bar.textContent = hex;
      palette.appendChild(bar);
    });
  } catch (error) {
    console.error('Error fetching palette:', error);
  }
}

getRandomPalette();
