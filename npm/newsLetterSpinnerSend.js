document.addEventListener("DOMContentLoaded", function () {
  const loadingOverlay = document.getElementById("loadingOverlay");
  // Get elements for the send button and spinner
  const newsletterButton = document.getElementById("newsletterSubmit");
  const newsletterSpinner = document.getElementById("spinnerNewsletter");
  const buttonTextNewsletter = document.getElementById("buttonTextNewsletter");
  const emailInput = document.getElementById("newsletterEmail");
  const errorEmail = document.getElementById("errorEmail");

  // Hide the spinner and show the button text on initial load
  // Hide spinner and overlay on initial page load
  loadingOverlay.style.display = "none";
  newsletterSpinner.style.display = "none";
  buttonTextNewsletter.style.display = "inline";

  // Event listener for the "Send" button
  newsletterButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default button action

    // Validate the email input
    const email = emailInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      // Show error message if email is invalid
      errorEmail.style.display = "block";
    } else {
      // Hide the error message and proceed with the loading animation
      errorEmail.style.display = "none";

      // Show the spinner and hide the button text
      //Show the loading overlay
      loadingOverlay.style.display = "flex";
      newsletterSpinner.style.display = "inline-block";
      buttonTextNewsletter.style.display = "none";

      // Simulate sending the newsletter
      setTimeout(() => {
        loadingOverlay.style.display = "none";
        newsletterSpinner.style.display = "none";
        buttonTextNewsletter.style.display = "inline";

        alert(
          "Thank you For Subscribing, Our Customer Service Will Contact You Soon, Thank you 🙏"
        );
      }, 3000); // 3-second delay
    }
  });
});
