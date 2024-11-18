document.addEventListener("DOMContentLoaded", () => {
  const spinner = document.getElementById("loadingSpinner");
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent immediate navigation
      const targetURL = event.target.href;

      // Show spinner
      spinner.classList.remove("d-none");

      // Navigate to the URL after a delay
      setTimeout(() => {
        window.location.href = targetURL;
      }, 2000); // 2-second delay
    });
  });
});
