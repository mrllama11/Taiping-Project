// Ensure JavaScript is fully connected and DOM elements are accessible
// document.addEventListener("DOMContentLoaded", function () { ini dom content loaded penting banget buat bisa delay2
//DOMContentLoaded Event: This ensures that the script runs only after the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  // loading overlay nanti yang kasi blur item
  const loadingOverlay = document.getElementById("loadingOverlay");
  const modalElement = document.getElementById("agentFormGeneral");

  //  this is for the Learn More Button own the service TAB
  const buttonLearnMore = document.getElementById("buttonLearnMore");
  const spinner = document.getElementById("spinnerLearnMore");
  // pas pencet learn more
  const buttonText = document.getElementById("buttonTextLearnMore");

  // Hide spinner and overlay on initial page load
  loadingOverlay.style.display = "none";
  spinner.style.display = "none";

  // Event listener for the "Learn More" button
  buttonLearnMore.addEventListener("click", (event) => {
    event.preventDefault();

    // Show the loading overlay and spinner, hide the button text
    loadingOverlay.style.display = "flex";
    spinner.style.display = "inline-block";
    buttonText.style.display = "none";

    // Set a timeout for 3 seconds
    setTimeout(() => {
      // Hide the loading overlay and spinner
      loadingOverlay.style.display = "none";
      spinner.style.display = "none";
      buttonText.style.display = "inline";

      // Show the modal using Bootstrap's modal component
      // Modal Initialization: const modal = new bootstrap.Modal(modalElement); initializes the modal, ensuring it displays properly.
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }, 3000); // 3000 milliseconds = 3 seconds
  });
});
