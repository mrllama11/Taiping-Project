document.addEventListener("DOMContentLoaded", () => {
  const firstForm = document.getElementById("firstForm");
  const secondForm = document.getElementById("secondForm");
  const finalForm = document.getElementById("finalForm");

  let formData = new FormData(); //create a FormData object Object to store all form data
  formData.append("Title", Title);

  // Function to collect data from a form
  function collectFormData(currentForm) {
    const inputs = currentForm.querySelectorAll("input, select");
    inputs.forEach((input) => {
      if (input.type === "file") {
        // Handle file input separately
        for (let i = 0; i < input.files.length; i++) {
          formData.append(input.name, input.files[i]); // Append each file
        }
      } else {
        formData.append(input.name, input.value); // Append text inputs
      }
    });
  }

  // Next Button 1
  document.getElementById("nextBtn1").addEventListener("click", () => {
    collectFormData(firstForm);
    firstForm.style.display = "none";
    secondForm.style.display = "block";
  });

  // Next Button 2
  document.getElementById("nextBtn2").addEventListener("click", () => {
    collectFormData(secondForm);
    secondForm.style.display = "none";
    finalForm.style.display = "block";
  });

  // Previous Buttons
  document.getElementById("nextBtnPrev1").addEventListener("click", () => {
    secondForm.style.display = "none";
    firstForm.style.display = "block";
  });

  document.getElementById("nextBtnPrev2").addEventListener("click", () => {
    finalForm.style.display = "none";
    secondForm.style.display = "block";
  });

  // Submit Button
  document.getElementById("submitBtn").addEventListener("click", async () => {
    const formData = new FormData();

    // Collect all forms' data
    document.querySelectorAll("input, select").forEach((input) => {
      if (input.type === "file") {
        for (let i = 0; i < input.files.length; i++) {
          formData.append("file_paths", input.files[i]); // Append each file correctly
        }
      } else {
        formData.append(input.name, input.value); // Append other fields
      }
    });

    try {
      const response = await fetch("http://localhost:3000/submit-form", {
        method: "POST",
        body: formData, // No 'Content-Type' header needed
      });

      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        const errorText = await response.text();
        console.error("Error from server:", errorText);
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    }
  });
});
