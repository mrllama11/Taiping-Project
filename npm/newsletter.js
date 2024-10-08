document
  .getElementById("newsletterSubmit")
  .addEventListener("click", function () {
    const email = document.getElementById("newsletterEmail").value.trim(); // Trim whitespace

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    if (!email) {
      alert("Please enter an email address.");
      return;
    }
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Prepare data to send to the backend
    const formData = new URLSearchParams();
    formData.append("email", email);

    // Send POST request to the server
    fetch("http://localhost:3000/subscribe", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // Handle HTTP errors
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text); // Throw an error with the response message
          });
        }
        return response.text(); // Return the response text on success
      })
      .then((data) => {
        alert(data); // Display success message or any response from the server
        document.getElementById("newsletterEmail").value = ""; // Clear input field
      })
      .catch((error) => {
        console.error("Error:", error); // Log error to console
        alert(`An error occurred: ${error.message}`); // Show specific error message
      });
  });
