document.addEventListener("DOMContentLoaded", () => {
  const formData = new FormData();

  function collectFormData(currentForm) {
    const inputs = currentForm.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      if (input.type === "file" && input.files.length > 0) {
        formData.append(input.name, input.files[0]);
      } else if (input.type === "radio" || input.type === "checkbox") {
        if (input.checked) formData.append(input.name, input.value);
      } else {
        formData.append(input.name, input.value);
      }
    });
  }

  document.getElementById("submitBtn").addEventListener("click", async (event) => {
    event.preventDefault();
    const submitButton = document.getElementById("submitBtn");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const modal = document.getElementById("agentFormGeneral");

    submitButton.disabled = true;  // Disable submit button
    submitButton.innerHTML = '<div class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div> Submitting...';  // Change button text to "Submitting..." and add spinner
    loadingSpinner.classList.remove("d-none"); // Show the spinner (remove the hidden class)

    try {
      // Collect data from all form fields
      collectFormData(document.getElementById("firstForm"));
      collectFormData(document.getElementById("secondForm"));
      collectFormData(document.getElementById("finalForm"));

      const response = await fetch("http://localhost:3000/submit-form", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error from server:", errorText);
        alert("Error submitting form. Please try again.");
      } else {
        const result = await response.json();
        console.log('Success:', result);
        alert("Form submitted successfully!");
        // Close the modal
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.hide(); // This hides the modal
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred.');
    } finally {
      loadingSpinner.classList.add("d-none"); // Hide spinner (add the hidden class back)
      submitButton.innerHTML = 'Submit';  // Reset button text
      submitButton.disabled = false;  // Re-enable the submit button
    } 
  });
});
