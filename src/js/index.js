import SimpleLightBox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Pixabay } from "./Pixabay.js";
const pixabay = new Pixabay();
const search = document.querySelector(".container-search");
const gallery = document.querySelector(".gallery");
const more_button = document.querySelector(".load-more");
import { menu } from "./sortMenu.js";
import { render } from "./render.js";
menu(pixabay);
let simpleLightBox;
let query;
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