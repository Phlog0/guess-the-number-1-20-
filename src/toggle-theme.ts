type ProjectTheme = "dark" | "light";
export function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  if (!(currentTheme === "light" || currentTheme === "dark")) {
    throw new Error("Ошибка с темой " + currentTheme);
  }

  let newTheme: ProjectTheme;
  console.log({ currentTheme });
  if (currentTheme === "dark") {
    newTheme = "light";
  } else {
    newTheme = "dark";
  }

  localStorage.setItem("theme", newTheme);
  html.setAttribute("data-theme", newTheme);
}
