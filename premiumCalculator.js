// document.addEventListener("DOMContentLoaded", function () {
//   console.log("DOM activated. Working 200 OK");

//   let selectedInsuranceType = "TLO"; // Default selected TLO

//   const tloRadio = document.getElementById("flexRadioDefault2");
//   const comprehensiveRadio = document.getElementById("flexRadioDefault1");

//   tloRadio.addEventListener("change", function () {
//     if (this.checked) {
//       selectedInsuranceType = "TLO";
//       console.log("Selected Insurance type: TLO");
//     }
//   });

//   comprehensiveRadio.addEventListener("change", function () {
//     if (this.checked) {
//       selectedInsuranceType = "Comprehensive";
//       console.log("Selected Insurance type: Comprehensive");
//     }
//   });

//   // Button when clicked
//   document.getElementById("nextBtn1").addEventListener("click", function () {
//     console.log("Count button clicked.");

//     // Capture the category_id and region_id values
//     const category_id = document.getElementById(
//       "vehicleCategoryDropdown"
//     ).value; // Assuming you have a dropdown for category
//     const region_id = document.getElementById("vehicleAreaDropdown").value; // Assuming you have a dropdown for region

//     // Validate region_id to ensure a selection has been made
//     if (region_id === "" || region_id === "Select Vehicle Area") {
//       alert("Please select a valid vehicle area.");
//       return; // Stop further execution
//     }

//     // Check which insurance type is selected
//     console.log("Current selected insurance type:", selectedInsuranceType);

//     // Fetch vehicle rates and proceed with calculations
//     fetchVehicleRatesAndCalculate(
//       selectedInsuranceType,
//       category_id, // If you're still using this, else remove
//       region_id
//     );
//   });

//   // Fetch vehicle rates and perform calculations
//   function fetchVehicleRatesAndCalculate(
//     insuranceType,
//     vehicleYear,
//     region_id
//   ) {
//     const apiEndpoint =
//       insuranceType === "Comprehensive"
//         ? `/vehicles-rate-comprehensive?vehicle_year=${vehicleYear}&region_id=${region_id}`
//         : `/vehicles-rate-tlo?vehicle_year=${vehicleYear}&region_id=${region_id}`;

//     fetch(apiEndpoint)
//       .then((response) => response.json())
//       .then((vehicleRates) => {
//         console.log("Parsed data:", vehicleRates);

//         const hargaKendaraanInput = document.getElementById("hargaKendaraan");
//         if (!hargaKendaraanInput) {
//           console.error("HARGA KENDARAAN NOTFOUND 404");
//           return; //stop
//         } else {
//           console.log(`Found harga Kendaraan ${hargaKendaraanInput}`);
//         }

//         const hargaKendaraanValue = hargaKendaraanInput.value;
//         if (!hargaKendaraanValue) {
//           alert("Please enter the vehicle price.");
//           return;
//         }

//         const hargaKendaraanCleaned = hargaKendaraanValue.replace(/\./g, "");
//         const hargaKendaraan = parseFloat(hargaKendaraanCleaned);

//         // Filter rates based on region and vehicle price
//         const matchedRate = vehicleRates.find(
//           (rate) =>
//             rate.region_id === region_id &&
//             hargaKendaraan >= rate.vehicle_cover_min &&
//             hargaKendaraan <= rate.vehicle_cover_max
//         );

//         if (matchedRate && !isNaN(hargaKendaraan)) {
//           const rate = matchedRate.Rate;

//           const premium = calculatePremium({
//             vehiclePrice: hargaKendaraan,
//             rate: rate,
//             insuranceType: insuranceType,
//           });

//           const formattedPremium = premium.toLocaleString("id-ID");
//           console.log(
//             `Calculated premium (${insuranceType}) is: ${formattedPremium}`
//           );

//           const calculatedPremiumInput =
//             document.getElementById("calculatedPremium");
//           if (calculatedPremiumInput) {
//             calculatedPremiumInput.value = formattedPremium;
//           } else {
//             console.error("Premium input field is missing.");
//           }
//         } else {
//           console.error("No rate data found for the selected area.");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching vehicle rates:", error);
//       });
//   }

//   function calculatePremium(data) {
//     return data.vehiclePrice * data.rate;
//   }
// });

// =-=-=-=--=--=-=-=--=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=

const insuranceTypeMap = {
  flexRadioDefault1: "Comprehensive",
  flexRadioDefault2: "TLO / Total Loss Only",
};

// SO WE EXECUTE THE FUNCTION CALCULATOR WHEN WE PRESS THE BUTTON
document.getElementById("nextBtn1").addEventListener("click", calculatePremium);

function getBaseRate(insuranceType, region, vehiclePrice, vehicleYear) {
  const age = new Date().getFullYear() - vehicleYear;
  let baseRate = 0;

  // Define formatter for thousands separator
  const formatter = new Intl.NumberFormat("id-ID"); // 'id-ID' for Indonesian format

  if (insuranceType === "flexRadioDefault1") {
    // Comprehensive
    baseRate = getComprehensiveRate(region, vehiclePrice, age);
  } else {
    // TLO
    baseRate = getTLORate(region, vehiclePrice);
  }
  console.log("Insurance Type:", insuranceTypeMap[insuranceType]);
  console.log("Region:", region);
  console.log("Vehicle Price:", formatter.format(vehiclePrice));
  console.log("Vehicle Year:", vehicleYear);

  return baseRate;
}

function calculatePremium() {
  const selectedInsuranceType = document.querySelector(
    'input[name="flexRadioDefault"]:checked'
  );
  if (!selectedInsuranceType) {
    console.error("Insurance type not selected.");
    return;
  }
  const insuranceType = selectedInsuranceType.id;

  const vehicleYearElement = document.getElementById("vehicleDropdown");
  if (!vehicleYearElement) {
    console.error("Vehicle dropdown not found");
    return;
  }
  const vehicleYear = parseInt(vehicleYearElement.value) || 0;

  const vehiclePriceElement = document.getElementById("hargaKendaraan");
  if (!vehiclePriceElement) {
    console.error("Vehicle price input not found");
    return;
  }
  const vehiclePrice =
    parseFloat(vehiclePriceElement.value.replace(/\./g, "")) || 0;

  const regionElement = document.getElementById("vehicleAreaDropdown");
  if (!regionElement) {
    console.error("Region dropdown not found");
    return;
  }
  const region = regionElement.value;

  const thirdPartyLiabilityElement = document.getElementById("hargaTiga");
  console.log(
    "Third Party Liability Element Value:",
    thirdPartyLiabilityElement.value
  );

  const driverAccidentInsuranceElement = document.getElementById("hargaDiri");
  console.log(
    "Driver Accident Insurance Element Value:",
    driverAccidentInsuranceElement.value
  );

  const passengerAccidentInsuranceElement =
    document.getElementById("hargaPenumpang");
  console.log(
    "Passenger Accident Insurance Element Value:",
    passengerAccidentInsuranceElement.value
  );

  const numberOfPassengersElement = document.getElementById("jumlahPenumpang");
  console.log(
    "Number of Passengers Element Value:",
    numberOfPassengersElement.value
  );

  const additionalCovers = {
    flood: document.getElementById("extraOption1")?.checked || false,
    earthquake: document.getElementById("extraOption2")?.checked || false,
    civilCommotion: document.getElementById("extraOption3")?.checked || false,
    terrorism: document.getElementById("extraOption4")?.checked || false,
  };

  // Base rate calculation
  const baseRate = getBaseRate(
    insuranceType,
    region,
    vehiclePrice,
    vehicleYear
  );
  if (isNaN(baseRate)) {
    console.error("Base rate calculation failed.");
    return;
  }

  // Additional premium calculation
  const additionalPremium = calculateAdditionalCovers(
    additionalCovers,
    region,
    vehiclePrice
  );
  if (isNaN(additionalPremium)) {
    console.error("Additional premium calculation failed.");
    return;
  }

  let totalPremium = (baseRate + additionalPremium) * vehiclePrice;

  totalPremium +=
    thirdPartyLiability +
    driverAccidentInsurance +
    passengerAccidentInsurance * numberOfPassengers;

  if (isNaN(totalPremium)) {
    console.error("Total premium calculation resulted in NaN.");
    return;
  }

  console.log(`Total Premium: IDR ${totalPremium.toFixed(2)}`);
}

async function getComprehensiveRate(vehicleCategoryId, regionId, age) {
  let ageColumn;

  // Determine which column to use based on vehicle age
  if (age >= 0 && age <= 5) {
    ageColumn = "year_0_5";
  } else if (age === 6) {
    ageColumn = "year_6";
  } else if (age === 7) {
    ageColumn = "year_7";
  } else if (age === 8) {
    ageColumn = "year_8";
  } else if (age === 9) {
    ageColumn = "year_9";
  } else {
    ageColumn = "year_10"; // For age 10 and above
  }

  try {
    const response = await fetch(
      `http://localhost:3000/getRate?vehicleCategoryId=${vehicleCategoryId}&regionId=${regionId}&ageColumn=${ageColumn}`
    );

    const data = await response.json();

    if (data.length > 0) {
      return data[0][ageColumn];
    } else {
      console.error("No rate found for the given vehicle category and region.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching rate from database:", error);
    return null;
  }
}

async function getTLORate(vehicleCategoryId, regionId) {
  try {
    const query = `SELECT rate FROM premium_rate_TLO WHERE vehicle_category_id = ? AND region_id = ?`;
    const result = await database.query(query[(vehicleCategoryId, regionId)]);

    if (result.length > 0) {
      return result[0].rate;
    } else {
      console.error("No TLO Rate found for the category");
      return null;
    }
  } catch (error) {
    console.error("Error Fetching rate from database", error);
    return null;
  }
}

function calculateAdditionalCovers(additionalCovers, region, vehiclePrice) {
  const additionalRates = {
    flood: { region1: 0.0075, region2: 0.01, region3: 0.0075 },
    earthquake: { region1: 0.012, region2: 0.01, region3: 0.0075 },
    civilCommotion: { region1: 0.005, region2: 0.0035, region3: 0.0035 },
    terrorism: { region1: 0.005, region2: 0.0035, region3: 0.0035 },
  };

  let extraPremium = 0;

  // Apply each selected additional coverage rate
  for (let coverage in additionalCovers) {
    if (additionalCovers[coverage]) {
      extraPremium +=
        additionalRates[coverage][`region${region}`] * vehiclePrice;
    }
  }

  return extraPremium;
}
