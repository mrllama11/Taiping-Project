// Front end JS CANNOT USE require

// Capture data when user submits
// Capture data when user submits
document.addEventListener("DOMContentLoaded", function () {
  console.log("Dom activated Working 200 OK");

  document.getElementById("nextBtn1").addEventListener("click", function () {
    console.log("button clicked");

    // Fetch vehicle rates from the express server and check if the data is there on web console
    fetch("http://localhost:3000/vehicles-rate")
      .then((response) => {
        console.log("Response received:", response);
        return response.json(); // Parse JSON response
      })
      .then((vehicleRates) => {
        console.log("Parsed data:", vehicleRates); // Ensure data is parsed correctly

        // Gather the data and remove periods from the input (Price of vehicles)
        const hargaKendaraanInput =
          document.getElementById("hargaKendaraan").value;
        const hargaKendaraanCleaned = hargaKendaraanInput.replace(/\./g, ""); // Remove periods
        const hargaKendaraan = parseFloat(hargaKendaraanCleaned); // Ensure it's a number

        // Get the City from the selected value
        const wilayahKendaraan = document.getElementById(
          "vehicleAreaDropdown"
        ).value;

        // Filter rates based on the selected city
        const matchedRate = vehicleRates.find(
          (rate) =>
            rate.City === wilayahKendaraan &&
            hargaKendaraan >= rate.Min_Threshold &&
            hargaKendaraan <= rate.Max_Threshold
        );

        if (matchedRate && !isNaN(hargaKendaraan)) {
          // Get the rate information from the matched data
          const rate = matchedRate.Rate;

          // Ensure the vehicle price meets the threshold
          const premium = calculatePremium({
            vehiclePrice: hargaKendaraan,
            rate: rate,
          });
          // Format premium with periods as thousand separators
          const formattedPremium = premium.toLocaleString("id-ID");

          console.log(`Calculated premium is: ${formattedPremium}`);

          // Show the calculated premium in the input field
          const calculatedPremiumInput =
            document.getElementById("calculatedPremium");
          if (calculatedPremiumInput) {
            calculatedPremiumInput.value = formattedPremium;
          }
        } else {
          console.error("No rate data found for the selected area.");
        }
      })
      .catch((error) => {
        console.error("Error fetching vehicle rates:", error);
      });
  });

  function calculatePremium(data) {
    // Calculate premium based on vehicle price and rate
    return data.vehiclePrice * data.rate; // Simple calculation using the rate
  }
});
