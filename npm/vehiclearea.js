//fetch when modal is open and when we select the dropdown

// show.bs.modal allows me to run a js code even before the modal has been shown , bootstrap feature

// when the modal gets loaded we need to code so that the data from the database gets transported to the web VIA Express

document
  .getElementById("agentFormGeneral")
  .addEventListener("show.bs.modal", function () {
    console.log("Modal being shown");

    // Fetch vehicle years from the server ,we Fetch from databse so GET
    fetch("http://localhost:3000/vehicles-area", {
      method: "GET",
    })
      .then((response) => {
        console.log("Response Received:", response);
        if (!response.ok) {
          throw new Error("Failed to fetch vehicle areas");
        }
        return response.json();
      })
      .then((dataArea) => {
        console.log("Data received:", dataArea);
        const dropdown = document.getElementById("vehicleAreaDropdown");
        dropdown.innerHTML = "";

        // Create default option
        const defaultOption = document.createElement("option");
        defaultOption.text = "Select Vehicle Area";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        dropdown.add(defaultOption);

        // Add fetched vehicle years as options
        data.forEach((item) => {
          console.log("Adding option for area:", item.area);
          const option = document.createElement("option");
          option.value = item.area;
          option.text = item.area;
          dropdown.add(option);
        });
      })
      .catch((error) => {
        console.error("Error fetching vehicle years:", error);
      });
  });
