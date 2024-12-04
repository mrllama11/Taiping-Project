document.addEventListener("DOMContentLoaded", () => {
  const formData = new FormData(); // Object to store all form data

  // Collect form data from a form element
  function collectFormData(form) {
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      if (input.type === "file") {
        for (let i = 0; i < input.files.length; i++) {
          formData.append(input.name, input.files[i]); // Append each file
        }
      } else {
        formData.append(input.name, input.value); // Append text inputs
      }
    });
  }

  // Show/hide forms based on button clicks
  document.getElementById("nextBtn1").addEventListener("click", () => {
    document.getElementById("firstForm").style.display = "none";
    document.getElementById("secondForm").style.display = "block";
  });

  document.getElementById("nextBtn2").addEventListener("click", () => {
    document.getElementById("secondForm").style.display = "none";
    document.getElementById("finalForm").style.display = "block";
  });

  document.getElementById("prevBtn1").addEventListener("click", () => {
    document.getElementById("secondForm").style.display = "none";
    document.getElementById("firstForm").style.display = "block";
  });

  document.getElementById("prevBtn2").addEventListener("click", () => {
    document.getElementById("finalForm").style.display = "none";
    document.getElementById("secondForm").style.display = "block";
  });

  // Handle form submission
  document.getElementById("submitBtn").addEventListener("click", async () => {
    // Collect data from all forms
    collectFormData(document.getElementById("firstForm"));
    collectFormData(document.getElementById("secondForm"));
    collectFormData(document.getElementById("finalForm"));

    try {
      const response = await fetch("http://localhost:3000/submit-form", {
        method: "POST",
        body: formData,
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
