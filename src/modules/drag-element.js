import { frameCollapse, symbolCollapse } from './helper';

function selectElement(elem) {
  let startX = 0,
    startY = 0,
    endX = 0,
    endY = 0,
    dragAllow = false;
  const symbolDrag = e => {
    e.preventDefault();
    e.stopPropagation();

    if (e.ctrlKey || e.buttons !== 1 || !dragAllow) return;

    const selectedElements = document.querySelectorAll('.selected');

    endX = startX - e.clientX;
    endY = startY - e.clientY;

    startX = e.clientX;
    startY = e.clientY;

    selectedElements.forEach(el => {
      el.style.left = el.offsetLeft - endX + 'px';
      el.style.top = el.offsetTop - endY + 'px';
    });
  };

  const mouseUp = e => {
    const unSelectedElements = document.querySelectorAll('.un-selected');
    const selectedElements = document.querySelectorAll('.selected');
    const dragArea = document.querySelector('.area-drag');
    let collapse = false;

    e.preventDefault();
    e.stopPropagation();
    if (e.ctrlKey) return;

    dragAllow = false;
    document.onmouseup = null;
    document.onmousemove = null;

    if (selectedElements.length === 1) {
      elem.classList.add('un-selected');
      elem.classList.remove('selected');

      if (frameCollapse(elem, dragArea)) {
        elem.style.left = elem.dataset.homeX;
        elem.style.top = elem.dataset.homeY;
        return;
      }

      try {
        unSelectedElements.forEach(unSelected => {
          if (symbolCollapse(elem, unSelected)) {
            elem.style.left = unSelected.offsetLeft + 'px';
            elem.style.top = unSelected.offsetTop + 'px';
            unSelected.style.left = elem.dataset.homeX;
            unSelected.style.top = elem.dataset.homeY;
            throw new Error();
          }
        });
      } catch (error) {
        return;
      }
    }

    try {
      selectedElements.forEach(selected => {
        if (frameCollapse(selected, dragArea)) throw new Error();

        unSelectedElements.forEach(unSelected => {
          if (symbolCollapse(selected, unSelected)) throw new Error();
        });
      });
    } catch (error) {
      selectedElements.forEach(selected => {
        selected.classList.add('un-selected');
        selected.classList.remove('selected');
        selected.style.left = selected.dataset.homeX;
        selected.style.top = selected.dataset.homeY;
      });
      return;
    }

    selectedElements.forEach(selected => {
      selected.classList.add('un-selected');
      selected.classList.remove('selected');
    });
  };

  const mouseDown = e => {
    e.preventDefault();
    e.stopPropagation();

    const selectedElements = document.querySelectorAll('.selected');

    if (e.ctrlKey) {
      elem.classList.toggle('un-selected');
      elem.classList.toggle('selected');
    } else if (selectedElements.length < 1) {
      elem.classList.toggle('un-selected');
      elem.classList.toggle('selected');
    }

    elem.dataset.homeX = elem.offsetLeft + 'px';
    elem.dataset.homeY = elem.offsetTop + 'px';

    startX = e.clientX;
    startY = e.clientY;
    dragAllow = e.target.classList.contains('selected');

    document.onmouseup = mouseUp;
    document.onmousemove = symbolDrag;
  };

  elem.onmousedown = mouseDown;
}

export default selectElement;
