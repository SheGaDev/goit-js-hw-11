const gallery = document.querySelector(".gallery");
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

export { render };