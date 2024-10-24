document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM activated. Working 200 OK");

  let selectedInsuranceType = "TLO"; // Default selected TLO

  const tloRadio = document.getElementById("flexRadioDefault2");
  const comprehensiveRadio = document.getElementById("flexRadioDefault1");

  tloRadio.addEventListener("change", function () {
    if (this.checked) {
      selectedInsuranceType = "TLO";
      console.log("Selected Insurance type: TLO");
    }
  });

  comprehensiveRadio.addEventListener("change", function () {
    if (this.checked) {
      selectedInsuranceType = "Comprehensive";
      console.log("Selected Insurance type: Comprehensive");
    }
  });

  // Button when clicked
  document.getElementById("nextBtn1").addEventListener("click", function () {
    console.log("Count button clicked.");

    // Capture the category_id and region_id values
    const category_id = document.getElementById(
      "vehicleCategoryDropdown"
    ).value; // Assuming you have a dropdown for category
    const region_id = document.getElementById("vehicleAreaDropdown").value; // Assuming you have a dropdown for region

    // Validate region_id to ensure a selection has been made
    if (region_id === "" || region_id === "Select Vehicle Area") {
      alert("Please select a valid vehicle area.");
      return; // Stop further execution
    }

    // Check which insurance type is selected
    console.log("Current selected insurance type:", selectedInsuranceType);

    // Fetch vehicle rates and proceed with calculations
    fetchVehicleRatesAndCalculate(
      selectedInsuranceType,
      category_id, // If you're still using this, else remove
      region_id
    );
  });

  // Fetch vehicle rates and perform calculations
  function fetchVehicleRatesAndCalculate(
    insuranceType,
    vehicleYear,
    region_id
  ) {
    const apiEndpoint =
      insuranceType === "Comprehensive"
        ? `/vehicles-rate-comprehensive?vehicle_year=${vehicleYear}&region_id=${region_id}`
        : `/vehicles-rate-tlo?vehicle_year=${vehicleYear}&region_id=${region_id}`;

    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((vehicleRates) => {
        console.log("Parsed data:", vehicleRates);

        const hargaKendaraanInput = document.getElementById("hargaKendaraan");
        const hargaKendaraanValue = hargaKendaraanInput
          ? hargaKendaraanInput.value
          : null;

        if (!hargaKendaraanValue) {
          console.error("Vehicle price input is missing.");
          alert("Please enter the vehicle price.");
          return;
        }

        const hargaKendaraanCleaned = hargaKendaraanValue.replace(/\./g, "");
        const hargaKendaraan = parseFloat(hargaKendaraanCleaned);

        // Filter rates based on region and vehicle price
        const matchedRate = vehicleRates.find(
          (rate) =>
            rate.region_id === region_id &&
            hargaKendaraan >= rate.vehicle_cover_min &&
            hargaKendaraan <= rate.vehicle_cover_max
        );

        if (matchedRate && !isNaN(hargaKendaraan)) {
          const rate = matchedRate.Rate;

          const premium = calculatePremium({
            vehiclePrice: hargaKendaraan,
            rate: rate,
            insuranceType: insuranceType,
          });

          const formattedPremium = premium.toLocaleString("id-ID");
          console.log(
            `Calculated premium (${insuranceType}) is: ${formattedPremium}`
          );

          const calculatedPremiumInput =
            document.getElementById("calculatedPremium");
          if (calculatedPremiumInput) {
            calculatedPremiumInput.value = formattedPremium;
          } else {
            console.error("Premium input field is missing.");
          }
        } else {
          console.error("No rate data found for the selected area.");
        }
      })
      .catch((error) => {
        console.error("Error fetching vehicle rates:", error);
      });
  }

  function calculatePremium(data) {
    return data.vehiclePrice * data.rate;
  }
});
