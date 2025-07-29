const toggle = document.getElementById("theme-toggle");
const saved  = localStorage.getItem("theme") || "light";

if (saved === "dark") {
    document.documentElement.classList.add("dark");
}

toggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
});
