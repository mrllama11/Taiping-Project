document
  .getElementById("newsletterSubmit")
  .addEventListener("click", function () {
    const email = document.getElementById("newsletterEmail").value.trim(); // Trim whitespace / remove whitespaces

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
    // A fetch request is made to the server's /subscribe endpoint using the HTTP POST method.
    //The content type is set to application/x-www-form-urlencoded (standard for form submissions).
    //The body of the request contains the email (formData), which will be sent to the backend server.
    fetch("http://localhost:3000/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })
      // UNTIL FETCH WE SEND DATA TO BACK END (formData) app.js
      //+++++++++++++++++++++++++++++++++++++++++

      // we go back here to ge the response from backend
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
        // alert(data); // Display success message or any response from the server
        document.getElementById("newsletterEmail").value = ""; // Clear input field
        // alert(data);
      })
      .catch((error) => {
        console.error("Error:", error); // Log error to console
        alert(`An error occurred: ${error.message}`); // Show specific error message
      });
  });
