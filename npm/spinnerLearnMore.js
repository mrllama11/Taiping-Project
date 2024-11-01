const button = document.getElementById("buttonLearnMore");
const spinner = document.getElementById("spinnerLearnMore");
const buttonText = document.getElementById("buttonTextLearnMore");

button.addEventListener("click", (event) => {
  // Prevent the default behavior of the button (immediately opening the modal)
  event.preventDefault();

  // Show the spinner and hide the text
  spinner.style.display = "inline-block";
  buttonText.style.display = "none";

  setTimeout(() => {
    const modal = new bootstrap.Modal(
      document.getElementById("agentFormGeneral")
    );
    modal.show();
  }, 3000);
});
