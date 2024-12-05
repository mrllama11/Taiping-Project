document.addEventListener("DOMContentLoaded", () => {
  const firstForm = document.getElementById("firstForm");
  const secondForm = document.getElementById("secondForm");
  const finalForm = document.getElementById("finalForm");

  let formData = new FormData(); //create a FormData object Object to store all form data

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

  // show second form when the next "Next" button is clicked
  document.getElementById("nextBtn1").addEventListener("click", function () {
    document.getElementById("firstForm").style.display = "none";
    document.getElementById("secondForm").style.display = "block";
  });
  
  // Show final form when the next "Next" button is clicked
  document.getElementById("nextBtn2").addEventListener("click", function () {
    document.getElementById("secondForm").style.display = "none";
    document.getElementById("finalForm").style.display = "block";
  });

  // Back to second form when the previous "Prev" button is clicked
  document.getElementById("nextBtnPrev1").addEventListener("click", function () {
    document.getElementById("secondForm").style.display = "none";
    document.getElementById("firstForm").style.display = "block";
  });

  // Back to second form when the previous "Prev" button is clicked
  document.getElementById("nextBtnPrev2").addEventListener("click", function () {
    document.getElementById("finalForm").style.display = "none";
    document.getElementById("secondForm").style.display = "block";
  });

  // Submit Button
  document.getElementById("submitBtn").addEventListener("click", async () => {
    // Collect data from all forms
    collectFormData(firstForm);
    collectFormData(secondForm);
    collectFormData(finalForm);

    try {
      const response = await fetch("http://localhost:3000/submit-form", {
        method: "POST",
        body: formData, // Send the FormData object
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
