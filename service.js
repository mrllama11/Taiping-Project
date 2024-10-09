//fetch when modal is open and when we select the dropdown

// show.bs.modal allows me to run a js code even before the modal has been shown , bootstrap feature

document
  .getElementById("agentFormGeneral")
  .addEventListener("show.bs.modal", function () {
    console.log("Modal being shown");

    // Fetch vehicle years from the server ,we Fetch from databse so GET
    fetch("http://localhost:3000/vehicles-years", {
      method: "GET",
    })
      .then((response) => {
        console.log("Response Received:", response);
        if (!response.ok) {
          throw new Error("Failed to fetch vehicle years");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        const dropdown = document.getElementById("vehicleDropdown");
        dropdown.innerHTML = "";

        // Create default option
        const defaultOption = document.createElement("option");
        defaultOption.text = "Select Vehicle Year";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        dropdown.add(defaultOption);

        // Add fetched vehicle years as options
        data.forEach((item) => {
          console.log("Adding option for year:", item.years);
          const option = document.createElement("option");
          option.value = item.years;
          option.text = item.years;
          dropdown.add(option);
        });
      })
      .catch((error) => {
        console.error("Error fetching vehicle years:", error);
      });
  });
