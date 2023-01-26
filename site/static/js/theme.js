class ThemeSwitcher {
  constructor(element) {
    this.element = element;
    this.themeSwitcherButton = this.element.querySelector("button");
    this.themeSwitcherItems = this.element.querySelectorAll("a");

    this.activeTheme = "light";

    this.init();
  }

  init() {
    if (!("theme" in localStorage)) {
      this.setLightTheme();
      // this.setSystemTheme();
    } else if (localStorage.theme === "dark") {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }

    this.addEventListeners();
  }

  setSystemTheme() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      this.setActiveThemeIcon("dark");
    } else {
      document.documentElement.classList.remove("dark");
      this.setActiveThemeIcon("light");
    }
    this.setActiveDropdownItem("system");
  }

  setDarkTheme() {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    this.setActiveThemeIcon("dark");
    this.setActiveDropdownItem("dark");
    this.activeTheme = "dark";
  }

  setLightTheme() {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    this.setActiveThemeIcon("light");
    this.setActiveDropdownItem("light");
    this.activeTheme = "light";
  }

  toggleTheme() {
    if (this.activeTheme === "dark") {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
  }

  setActiveThemeIcon(theme) {
    this.themeSwitcherButton.innerHTML = this.element.querySelector(
      `[data-theme-icon=${theme}]`
    ).innerHTML;
  }

  setActiveDropdownItem(theme) {
    this.element.querySelectorAll("[data-theme-icon]").forEach((item) => {
      item.classList.remove("text-blue-500");
    });
    this.element.querySelectorAll("[data-theme-name]").forEach((item) => {
      item.classList.remove("text-blue-500");
    });
    this.element
      .querySelector(`[data-theme-icon=${theme}]`)
      .classList.add("text-blue-500");
    this.element
      .querySelector(`[data-theme-name=${theme}]`)
      .classList.add("text-blue-500");
  }

  onThemeSwitcherItemClick(event) {
    const theme = event.target.dataset.theme;

    if (theme === "system") {
      localStorage.removeItem("theme");
      this.setSystemTheme();
    } else if (theme === "dark") {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }
  }

  addEventListeners() {
    const bindedOnThemeSwitcherItemClick =
      this.onThemeSwitcherItemClick.bind(this);

    this.themeSwitcherItems.forEach((item) => {
      item.addEventListener("click", bindedOnThemeSwitcherItemClick);
    });
  }
}

const themeSwitcher = document.querySelector("#theme-switcher");
let themeInstance;

if (themeSwitcher) {
  themeInstance = new ThemeSwitcher(themeSwitcher);
}

// Main page theme toggler
const themeToggler = document.querySelector("#theme-toggler");

if (themeToggler && themeInstance) {
  themeToggler.addEventListener("change", () => themeInstance.toggleTheme());

  if (themeInstance.activeTheme === "dark") {
    themeToggler.checked = true;
  }
}
