const button = document.getElementById("nextBtn1");
const spinner = document.getElementById("spinner");
const buttonText = document.getElementById("buttonText");
const errorMessage = document.getElementById("errorMessage");

// Add event listener for the "count" button
button.addEventListener("click", () => {
  // Show the spinner and hide the "count" text initially
  spinner.style.display = "inline-block";
  buttonText.style.display = "none";
  errorMessage.style.display = "none"; // Hide any previous error message

  // Retrieve values from the required fields
  const vehicleYear = document.getElementById("vehicleDropdown").value;
  const vehiclePrice = document.getElementById("hargaKendaraan").value;
  const vehicleArea = document.getElementById("vehicleAreaDropdown").value;

  // Validate if required fields are filled
  if (!vehicleYear || !vehiclePrice || !vehicleArea) {
    // Show error message and reset button if any required field is missing
    errorMessage.style.display = "block";
    spinner.style.display = "none";
    buttonText.style.display = "inline";
  } else {
    // Simulate processing if fields are filled
    setTimeout(() => {
      // Stop the spinner after processing
      spinner.style.display = "none";
      buttonText.style.display = "inline";
    }, 3000); // Delay to simulate processing time
  }
});
