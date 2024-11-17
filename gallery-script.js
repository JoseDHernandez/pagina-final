const Figures = document.querySelectorAll(".View figure");
const getIndex = Array.from(Figures).findIndex(
  (e) => e.firstElementChild.id == "ActualImg"
);
let index = getIndex != -1 ? getIndex : 0;
if (getIndex != -1 && Figures[getIndex].childElementCount == 2)
  Figures[getIndex].lastElementChild.className = "ActualCaption";
const Modal = document.querySelector(".Modal");
let Close = !0;

function OpenModal(Index) {
  Modal.open = Close;
  Modal.id = Close ? "Modal" : "ModalClose";
  Index = parseInt(Index);
  if (Index < Figures.length && Index >= 0)
    ViewSelected(!isNaN(Index) ? Index : 0);
  Close = !Close;
}
document.getElementById("Pre").addEventListener("click", () => {
  View(!1);
});
document.getElementById("Nex").addEventListener("click", () => {
  View(!0);
});
function ViewSelected(Index) {
  Show(index, !1);
  Show(Index, !0);
  index = Index;
}
function View(Type) {
  const tempIndex = Type ? index + 1 : index - 1;
  Show(index, !1);
  index =
    tempIndex < Figures.length && tempIndex >= -1
      ? tempIndex == -1
        ? Figures.length - 1
        : tempIndex
      : 0;
  Show(index, !0);
}
function Show(Index, Class) {
  const fig = Figures[Index];
  fig.firstElementChild.id = Class ? "ActualImg" : "";
  fig.firstElementChild.style.remove;
  if (fig.childElementCount == 2)
    fig.lastElementChild.className = Class ? "ActualCaption" : "";
}
const zoomStep = 0.2;
const maxZoom = 15;
Figures.forEach((Element) => {
  const img = Element.firstElementChild;
  img.className = "Img";
  img.onmousemove = (e) => {
    e.target.style.setProperty(
      "--x",
      (100 * e.offsetX) / e.target.offsetWidth + "%"
    );
    e.target.style.setProperty(
      "--y",
      (100 * e.offsetY) / e.target.offsetHeight + "%"
    );
  };
  let zoomLevel = 1;
  img.addEventListener("wheel", (event) => {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -1 : 1;
    if (delta == 1 && zoomLevel == maxZoom) {
      zoomLevel = maxZoom;
    } else {
      zoomLevel += delta * zoomStep;
      zoomLevel = Math.max(1, zoomLevel);
    }
    img.style.setProperty("--zoom", zoomLevel);
  });
});
document.addEventListener("keydown", (e) => {
  if (!Close) {
    if (e.keyCode == 39) {
      View(!0);
    } else if (e.keyCode == 37) {
      View(!1);
    }
  }
});
