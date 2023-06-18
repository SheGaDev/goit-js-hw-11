const btn_open_close = document.querySelector(".open-close-menu");
const formSort = document.querySelector(".cover-menu");
const resetSort = document.querySelector("[data-reset-sort]");
let isOpen = false;
let interval;
let px = -62;
function animate() {
    const elMenu = document.querySelector(".wrapper-cover-menu");
    const elCover = document.querySelector(".hidden-cover-menu");
    if (isOpen) {
        px++;
        elMenu.style.top = `${px}px`;
        if (px === 0) {
            elCover.style.visibility = "visible";
        }
        if (px >= 60) clearInterval(interval);
    } else {
        px--;
        elMenu.style.top = `${px}px`;
        if (px === 0) {
            elCover.style.visibility = "hidden";
        }
        if (px <= -62) clearInterval(interval);
    }
}
function menu(pixabay) {
    btn_open_close.addEventListener("click", () => {
        isOpen = isOpen ? false : true;
        interval = setInterval(animate, 1);
    });
    formSort.addEventListener("submit", event => {
        event.preventDefault();
        const data = new FormData(formSort);
        for (const entry of data) {
            if (entry[0] === "type-sort") pixabay.sortSettings.type = entry[1];
            if (entry[0] === "model-sort") pixabay.sortSettings.model = entry[1];
        }
    });
    resetSort.addEventListener("click", () => pixabay.sortSettings.model = null);

}

export { menu };