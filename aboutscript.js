document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenu = document.getElementById("closeMenu");
  const overlay = document.getElementById("mobileOverlay");

  // If mobile menu doesn't exist on this page, exit safely
  if (!menuBtn || !mobileMenu) return;

  const mobileLinks = mobileMenu.querySelectorAll("a");

  function openMenu() {
    mobileMenu.classList.remove("translate-x-full");
    overlay?.classList.remove("hidden");
  }

  function closeMenuFn() {
    mobileMenu.classList.add("translate-x-full");
    overlay?.classList.add("hidden");
  }

  menuBtn.addEventListener("click", openMenu);

  closeMenu?.addEventListener("click", closeMenuFn);
  overlay?.addEventListener("click", closeMenuFn);

  mobileLinks.forEach(link => {
    link.addEventListener("click", closeMenuFn);
  });
});
