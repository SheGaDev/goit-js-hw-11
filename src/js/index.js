import SimpleLightBox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Pixabay } from "./Pixabay.js";
const pixabay = new Pixabay();
const search = document.querySelector(".container-search");
const gallery = document.querySelector(".gallery");
const more_button = document.querySelector(".load-more");
const btn_open_close = document.querySelector(".open-close-menu");
const formSort = document.querySelector(".cover-menu");
const resetSort = document.querySelector("[data-reset-sort]");
let simpleLightBox;
let query;
let isOpen = false;
let interval;
let px = -62;
search.addEventListener("submit", async event => {
    event.preventDefault();
    query = event.currentTarget.query.value.trim();
    gallery.innerHTML = "";
    const res = await pixabay.fetchImages(query, 1);
    if (!res) {
        more_button.classList.add("is-hidden");
        return;
    }
    render(res);
    simpleLightBox = new SimpleLightBox(".gallery a");
    if (res.length >= 40) more_button.classList.remove("is-hidden");
    search.reset();
});
search.addEventListener("click", event => {
    if (!event.target.matches(".search-x-alt")) return;
    search.reset();
});
more_button.addEventListener("click", async () => {
    if (pixabay.getPage >= pixabay.getTotalPage) {
        more_button.classList.add("is-hidden");
        pixabay.logger("failure", "We're sorry, but you've reached the end of search results.");
        return;
    }
    const res = await pixabay.fetchImages(query);
    if (!res) return;
    render(res);
    simpleLightBox.refresh();
});
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
function render(images) {
    gallery.insertAdjacentHTML("beforeend", images
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <a href=${largeImageURL} class="gallery__link">
            <div class="dark-theme-card">
                <img class="gallery-item__img" src=${webformatURL} alt=${tags} loading="lazy">
                <div>
                    <p><b>Likes</b>${parseValue(likes)}</p>
                    <p><b>Views</b>${parseValue(views)}</p>
                    <p><b>Comments</b>${parseValue(comments)}</p>
                    <p><b>Downloads</b>${parseValue(downloads)}</p>
                </div>
            </div>
        </a>
    `).join(""));
}
function parseValue(value) {
    return value.toLocaleString("uk-UK");
}