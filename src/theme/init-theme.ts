export function initTheme() {
  const html = document.documentElement;
  const theme = localStorage.getItem("theme");
  console.log("found", theme);
  if (theme) {
    if (theme === "dark") {
      console.log("a");
      html.setAttribute("data-theme", "dark");
      return;
    } else {
      html.setAttribute("data-theme", "light");
    }
    return;
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  console.log({ prefersDark });
  if (prefersDark) {
    html.setAttribute("data-theme", "dark");
  } else {
    html.setAttribute("data-theme", "light");
  }
}
