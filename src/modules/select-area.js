import { symbolCollapse } from './helper';

function selectArea(area) {
  let startX = 0,
    startY = 0,
    endX = 0,
    endY = 0;

  const areaFrame = document.querySelector('.area-frame');

  const frameSelect = e => {
    e.preventDefault();
    e.stopPropagation();

    endX =
      e.clientX - area.offsetLeft < area.clientWidth
        ? e.clientX - area.offsetLeft - startX
        : endX;

    endY =
      e.clientY - area.offsetTop < area.clientHeight
        ? e.clientY - area.offsetTop - startY
        : endY;

    areaFrame.style.width = endX + 'px';
    areaFrame.style.height = endY + 'px';
  };

  const mouseUp = e => {
    e.preventDefault();
    e.stopPropagation();

    const unSelectedElements = document.querySelectorAll('.un-selected');

    unSelectedElements.forEach(selected => {
      if (symbolCollapse(selected, areaFrame)) {
        selected.classList.remove('un-selected');
        selected.classList.add('selected');

        selected.dataset.homeX = selected.offsetLeft + 'px';
        selected.dataset.homeY = selected.offsetTop + 'px';
      }
    });

    areaFrame.style.width = '0px';
    areaFrame.style.height = '0px';
    areaFrame.style.left = '0px';
    areaFrame.style.top = '0px';
    document.onmouseup = null;
    document.onmousemove = null;
  };

  const mouseDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const selectedElements = document.querySelectorAll('.selected');
    selectedElements.forEach(el => {
      el.classList.remove('selected');
      el.classList.add('un-selected');
    });

    startX = e.clientX - area.offsetLeft;
    startY = e.clientY - area.offsetTop;

    areaFrame.style.left = startX + 'px';
    areaFrame.style.top = startY + 'px';
    document.onmouseup = mouseUp;
    document.onmousemove = frameSelect;
  };

  area.onmousedown = mouseDown;
}

export default selectArea;
