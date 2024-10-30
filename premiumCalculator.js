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

async function getBaseRate(insuranceType, regionId, vehiclePrice, vehicleYear) {
  const age = new Date().getFullYear() - vehicleYear;

  // Define the formatter for Indonesian currency format (if needed for logging or display)
  const formatter = new Intl.NumberFormat("id-ID");

  const vehicleCategoryId = await getVehicleCategoryId(vehiclePrice);
  if (vehicleCategoryId === null) {
    console.error("Vehicle category not found.");
    return null;
  }

  let baseRate;
  if (insuranceType === "flexRadioDefault1") {
    baseRate = await getComprehensiveRate(vehicleCategoryId, regionId, age);
  } else {
    baseRate = await getTLORate(vehicleCategoryId, regionId);
  }

  console.log("Insurance Type:", insuranceTypeMap[insuranceType]);
  console.log("Region:", regionId);
  console.log("Vehicle Price:", formatter.format(vehiclePrice));
  console.log("Vehicle Year:", vehicleYear);

  return baseRate;
}

// Function to parse currency input
function parseCurrency(value) {
  // Remove thousands separator and convert to float
  return parseFloat(value.replace(/\./g, "").replace(",", "."));
}

// Mark the main function as async

// Mark the main function as async

// Utility function to format currency
function formatCurrency(amount) {
  return amount.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
}

// Mark the main function as async
async function calculatePremium() {
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

  const vehiclePrice = parseCurrency(
    document.getElementById("hargaKendaraan").value
  );
  if (isNaN(vehiclePrice) || vehiclePrice <= 0) {
    console.error("Invalid vehicle price input.");
    return;
  }

  const regionElement = document.getElementById("vehicleAreaDropdown");
  if (!regionElement) {
    console.error("Region dropdown not found");
    return;
  }

  // Use async/await to get regionId
  const selectedArea = getSelectedArea();
  const regionId = await getRegionId(selectedArea);
  if (!regionId) {
    console.error("Region ID not found.");
    return;
  }

  const thirdPartyLiability = parseCurrency(
    document.getElementById("hargaTiga").value
  );
  if (isNaN(thirdPartyLiability) || thirdPartyLiability < 0) {
    console.error("Invalid Third Party Liability input.");
    return;
  }

  const driverAccidentInsurance = parseCurrency(
    document.getElementById("hargaDiri").value
  );
  if (isNaN(driverAccidentInsurance) || driverAccidentInsurance < 0) {
    console.error("Invalid Driver Accident Insurance input.");
    return;
  }

  const passengerAccidentInsurance = parseCurrency(
    document.getElementById("hargaPenumpang").value
  );
  if (isNaN(passengerAccidentInsurance) || passengerAccidentInsurance < 0) {
    console.error("Invalid Passenger Accident Insurance input.");
    return;
  }

  const numberOfPassengersElement = document.getElementById("jumlahPenumpang");
  const numberOfPassengers = parseInt(numberOfPassengersElement.value) || 0;

  const additionalCovers = {
    flood: document.getElementById("extraOption1")?.checked || false,
    earthquake: document.getElementById("extraOption2")?.checked || false,
    civilCommotion: document.getElementById("extraOption3")?.checked || false,
    terrorism: document.getElementById("extraOption4")?.checked || false,
  };

  // Base rate calculation with async/await
  const baseRate = await getBaseRate(
    insuranceType,
    regionId,
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
    regionId,
    vehiclePrice
  );
  if (isNaN(additionalPremium)) {
    console.error("Additional premium calculation failed.");
    return;
  }

  // Calculate total additional costs
  const totalThirdPartyLiability = thirdPartyLiability;
  const totalDriverAccidentInsurance = driverAccidentInsurance;
  const totalPassengerAccidentInsurance =
    passengerAccidentInsurance * numberOfPassengers;

  // Calculate total premium
  let totalPremium = (baseRate + additionalPremium) * vehiclePrice;
  totalPremium +=
    totalThirdPartyLiability +
    totalDriverAccidentInsurance +
    totalPassengerAccidentInsurance;

  if (isNaN(totalPremium)) {
    console.error("Total premium calculation resulted in NaN.");
    return;
  }

  // Display the premiums in a structured format
  console.log(`Base Premium: ${formatCurrency(baseRate)}`);
  console.log(
    `Third Party Liability: ${formatCurrency(totalThirdPartyLiability)}`
  );
  console.log(
    `Driver Accident Insurance: ${formatCurrency(totalDriverAccidentInsurance)}`
  );
  console.log(
    `Passenger Accident Insurance: ${formatCurrency(
      totalPassengerAccidentInsurance
    )}`
  );

  if (additionalPremium > 0) {
    console.log(
      `Additional Premium (Flood, Earthquake, etc.): ${formatCurrency(
        additionalPremium
      )}`
    );
  }

  console.log(`Total Premium: ${formatCurrency(totalPremium)}`);
}

// Function to fetch the vehicle categhory ID based on user selection
async function getVehicleCategoryId(vehiclePrice) {
  try {
    // Fetch vehicle categories from your database
    const response = await fetch("http://localhost:3000/vehicle-categories");
    if (!response.ok) {
      throw new Error("Failed to fetch vehicle categories");
    }

    const categories = await response.json();
    console.log("Fetched categories:", categories); // For debugging

    // Iterate through categories to find the appropriate one based on the vehicle price
    for (const category of categories) {
      if (
        vehiclePrice >= category.vehicle_cover_min &&
        vehiclePrice <= category.vehicle_cover_max
      ) {
        console.log("Vehicle Category ID:", category.id); // Log the found category ID
        return category.id; // Assuming your category table has an 'id' field
      }
    }

    console.error("No category found for the given vehicle price.");
    return null; // Or handle as needed
  } catch (error) {
    console.error("Error fetching vehicle categories:", error);
    return null;
  }
}

// Function to fetch the region ID based on user selection

// Function to get selected area from the dropdown
function getSelectedArea() {
  const regionElement = document.getElementById("vehicleAreaDropdown");

  // Check if the dropdown element exists
  if (!regionElement) {
    console.error("Region dropdown not found");
    return null;
  }

  // Check if a valid option is selected
  const selectedArea = regionElement.value;
  if (!selectedArea) {
    console.warn("No area selected in the dropdown");
    return null;
  }

  console.log("Selected area:", selectedArea);
  return selectedArea;
}

// Function to fetch the region ID based on selected area
// Function to fetch the region ID based on selected area
async function getRegionId(selectedArea) {
  if (!selectedArea) {
    console.warn("Selected area is empty or undefined.");
    return null;
  }

  try {
    const response = await fetch("http://localhost:3000/wilayah");

    // Check if response is OK, if not, throw a custom error
    if (!response.ok) {
      throw new Error(
        `Failed to fetch regions: ${response.status} ${response.statusText}`
      );
    }

    const regions = await response.json();

    // Normalize selectedArea for better matching
    const normalizedArea = selectedArea.trim().toLowerCase();

    // Find the region that matches the selected area
    const region = regions.find(
      (region) =>
        region.area && region.area.trim().toLowerCase() === normalizedArea
    );

    if (region) {
      console.log("Matched region ID:", region.region_id);
      return region.region_id; // Return the found region_id
    } else {
      console.warn(
        `No matching region found for the selected area: ${selectedArea}`
      );
      return null; // Return null if no matching region is found
    }
  } catch (error) {
    console.error("Error fetching regions:", error.message);
    return null;
  }
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
  console.log(
    `Fetching comprehensive rate for VehicleCategoryId: ${vehicleCategoryId}, RegionId: ${regionId}, AgeColumn: ${ageColumn}`
  );

  try {
    const response = await fetch(
      `http://localhost:3000/vehicles-rates-comprehensive?vehicleCategoryId=${vehicleCategoryId}&regionId=${regionId}&ageColumn=${ageColumn}`
    );

    if (!response.ok) {
      console.error("server respond an error:", await response.text());
      return null;
    }

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

function calculateAdditionalCovers(additionalCovers, regionId, vehiclePrice) {
  const additionalRates = {
    flood: { 1: 0.0075, 2: 0.01, 3: 0.0075 },
    earthquake: { 1: 0.012, 2: 0.01, 3: 0.0075 },
    civilCommotion: { 1: 0.005, 2: 0.0035, 3: 0.0035 },
    terrorism: { 1: 0.005, 2: 0.0035, 3: 0.0035 },
  };

  let extraPremium = 0;

  for (let coverage in additionalCovers) {
    if (additionalCovers[coverage]) {
      extraPremium += additionalRates[coverage][regionId] * vehiclePrice;
    }
  }

  return extraPremium;
}
