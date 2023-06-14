const theme = localStorage.getItem("userTheme");
const classes = {
    light: ["header-light-theme", "light-theme", "light-theme-card"],
    dark: ["header-dark-theme", "dark-theme", "dark-theme-card"]
};
(() => {
    if (!theme) return;
    if(theme === "dark") {
        changeTheme(classes.light, classes.dark);
        return;
    }
    changeTheme(classes.dark, classes.light);
})();

function changeTheme(oldTarget, newTarget) {
    for (let i = 0; i < 3; i++) {
        const elements = document.querySelectorAll(`.${oldTarget[i]}`);
        if (!elements.length) continue;
        elements.forEach(el => {
            el.classList.remove(oldTarget[i]);
            el.classList.add(newTarget[i]);
        });
    }
}
