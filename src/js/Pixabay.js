import * as env from "dotenv";
env.config();
import axios from "axios";
axios.defaults.baseURL = "https://pixabay.com/api/";
import { Notify } from 'notiflix';
console.log(process.env.API_KEY_PIXABAY)
class Pixabay {
    #API_KEY = process.env.API_KEY_PIXABAY;
    #perPage = 40;
    constructor() {
        this.images = [];
        this.sortSettings = {
            type: "ascending", // "descending"
            model: null // "views", "likes", "downloads", "comments"
        }
        this.page = 0;
        this.totalPage = 1;
    }
    async fetchImages(input, page) {
        if (!input.length) return this.logger("failure", "The search string cannot be empty. Please specify your search query.")
        if(!page) this.page += 1;
        else this.page = page;
        const res = await axios.get(`?key=${this.#API_KEY}&q=${input}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.#perPage}`)
        const { totalHits, hits } = res.data;
        this.totalPage = Math.ceil(totalHits / this.#perPage);
        if (!totalHits) {
            this.logger("failure", "The search string cannot be empty. Please specify your search query.")
            return null;
        }
        if(this.page === 1) this.logger("success", `Hooray! We found ${totalHits} images.`);
        this.images = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }));
        if (!this.sortSettings.model) return this.images;
        return this.sort(this.images);
    }
    sort(images) {
        return images.sort((a, b) => {
            if (this.sortSettings.type === "ascending")
                return a[this.sortSettings.model] - b[this.sortSettings.model];
            return b[this.sortSettings.model] - a[this.sortSettings.model];
        });
    }
    logger(type, value) {
        Notify[type](value);
    }
    get getTotalPage(){
        return this.totalPage;
    }
    get getPage(){
        return this.page;
    }
}
export { Pixabay };