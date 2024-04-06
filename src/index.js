import selectElement from './modules/drag-element';
import selectArea from './modules/select-area';

const areaDrag = document.querySelector('.area-drag');
const inputSymbols = document.getElementById('symbols');
const generateButton = document.getElementById('generate');

inputSymbols.oninput = () => {
  if (inputSymbols.value.length < 1) {
    generateButton.disabled = true;
  } else generateButton.disabled = false;
};

generateButton.onclick = () => {
  const content = inputSymbols.value
    .trim()
    .split('')
    .reduce(
      (acc, s, i) =>
        acc +
        `<div class="un-selected symbol-wrapper" 
              style="left:${i * 50 + 10}px; top:20px">
            <span class="symbol-content">${s}</span> 
         </div>`,
      '<div class="area-frame"></div>'
    );

  areaDrag.innerHTML = content;

  const symbolElements = document.querySelectorAll('.un-selected');
  symbolElements?.forEach(el => {
    selectElement(el);
  });

  selectArea(areaDrag);
};
