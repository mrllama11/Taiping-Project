// =-=-=-=--=--=-=-=--=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=

const insuranceTypeMap = {
  flexRadioDefault1: "Comprehensive",
  flexRadioDefault2: "TLO / Total Loss Only",
};

// SO WE EXECUTE THE FUNCTION CALCULATOR WHEN WE PRESS THE BUTTON
document.getElementById("nextBtn1").addEventListener("click", calculatePremium);

// Function to get the precise base rate from the database (check the rate from databse)
async function getBaseRate(insuranceType, regionId, vehiclePrice, vehicleYear) {
  const age = new Date().getFullYear() - vehicleYear;

  // Define the formatter for Indonesian currency format (if needed for logging or display)
  const formatter = new Intl.NumberFormat("id-ID");

  const vehicleCategoryId = await getVehicleCategoryId(vehiclePrice);
  if (vehicleCategoryId === null) {
    console.error("Vehicle category not found.");
    return null;
  }

  // check if the user selects what type of insurance type
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

  // stores into baseRate(what type of insurance , reghionID, vehicle price, vehicle year) for then checking into the databse
  return baseRate;
}

// Function to parse currency input
function parseCurrency(value) {
  // Remove thousands separator and convert to float
  return parseFloat(value.replace(/\./g, "").replace(",", "."));
}

// Mark the main function as async

// Utility function to format currency
function formatCurrency(amount) {
  return amount.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
}

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
  if (!vehiclePrice || isNaN(vehiclePrice) || vehiclePrice <= 0) {
    console.error("Please input a valid vehicle price!");
    return;
  }

  const regionElement = document.getElementById("vehicleAreaDropdown");
  if (!regionElement) {
    console.error("Region dropdown not found");
    return;
  }

  const selectedArea = getSelectedArea();
  const regionId = await getRegionId(selectedArea);
  if (!regionId) {
    console.error("Region ID not found.");
    return;
  }

  const thirdPartyLiability =
    parseCurrency(document.getElementById("hargaTiga").value) || 0;
  const driverAccidentInsurance =
    parseCurrency(document.getElementById("hargaDiri").value) || 0;
  const passengerAccidentInsurance =
    parseCurrency(document.getElementById("hargaPenumpang").value) || 0;
  const numberOfPassengersElement = document.getElementById("jumlahPenumpang");
  const numberOfPassengers = parseInt(numberOfPassengersElement.value) || 0;

  const additionalCovers = {
    flood: document.getElementById("banjirTopan")?.checked || false,
    earthquake: document.getElementById("gempaTsunami")?.checked || false,
    civilCommotion: document.getElementById("huruHara")?.checked || false,
    terrorism: document.getElementById("terorismeSabotase")?.checked || false,
  };

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

  // Calculate extra premium based on the insurance type
  let extraPremium = 0;
  if (insuranceType === "flexRadioDefault1") {
    // For Comprehensive
    extraPremium = calculateAdditionalCoversComprehensive(
      additionalCovers,
      regionId,
      vehiclePrice
    );
  } else {
    // For TLO
    extraPremium = calculateAdditionalCoversTLO(
      additionalCovers,
      regionId,
      vehiclePrice
    );
  }

  // Calculate total additional costs
  const totalThirdPartyLiability = thirdPartyLiability;
  const totalDriverAccidentInsurance = driverAccidentInsurance;
  const totalPassengerAccidentInsurance =
    passengerAccidentInsurance * numberOfPassengers;

  // Calculate total premium
  let premiumOnly = baseRate * vehiclePrice;
  let totalPremium = premiumOnly + extraPremium;
  totalPremium +=
    totalThirdPartyLiability +
    totalDriverAccidentInsurance +
    totalPassengerAccidentInsurance;

  // Display the premiums in a structured format
  console.log("+-=-=-=--=-=-=-=-=-=-=-=--=-=-=+");
  console.log(`Base Premium: ${baseRate.toFixed(4)}`);
  console.log(
    `Base Premium (Rate: ${(baseRate * 100).toFixed(2)}%): ${formatCurrency(
      premiumOnly
    )}`
  );

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

  // Display additional covers and their calculated premiums
  console.log("Selected Additional Covers:");
  for (let coverage in additionalCovers) {
    if (additionalCovers[coverage]) {
      let coveragePremium;
      if (insuranceType === "flexRadioDefault1") {
        coveragePremium = calculateAdditionalCoversComprehensive(
          { [coverage]: true },
          regionId,
          vehiclePrice
        );
      } else {
        coveragePremium = calculateAdditionalCoversTLO(
          { [coverage]: true },
          regionId,
          vehiclePrice
        );
      }
      console.log(
        `${
          coverage.charAt(0).toUpperCase() + coverage.slice(1)
        }: ${formatCurrency(coveragePremium)}`
      );
    }
  }

  console.log(`Extra Premium: ${formatCurrency(extraPremium)}`);
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
    // Make an HTTP request to your backend endpoint
    const response = await fetch(
      `http://localhost:3000/vehicles-rate-tlo?vehicleCategoryId=${vehicleCategoryId}&regionId=${regionId}`
    );

    // Check if the response is successful
    if (!response.ok) {
      console.error("Error fetching TLO rate:", response.statusText);
      return null;
    }

    // Parse the JSON response
    const data = await response.json();

    // If data contains rate, return it; otherwise, return null
    return data.rate || null;
  } catch (error) {
    console.error("Error fetching TLO rate from the backend:", error);
    return null;
  }
}

// Function to parse and clean input values
function parseInputValue(inputId) {
  const value = document
    .getElementById(inputId)
    .value.replace(/[^0-9.-]+/g, "");
  return parseFloat(value) || 0; // Returns 0 if the value is NaN
}

function calculateAdditionalCoversComprehensive(
  additionalCovers,
  regionId,
  vehiclePrice
) {
  const additionalRates = {
    flood: { 1: 0.00075, 2: 0.001, 3: 0.00075 },
    earthquake: { 1: 0.0012, 2: 0.001, 3: 0.00075 },
    civilCommotion: 0.0005, // Rate is fixed
    terrorism: 0.0005, // Rate is fixed
  };

  let extraPremium = 0;

  for (let coverage in additionalCovers) {
    if (additionalCovers[coverage]) {
      // Determine if the rate is an object or a fixed number
      const rate = additionalRates[coverage];
      extraPremium +=
        (typeof rate === "object" ? rate[regionId] || 0 : rate) * vehiclePrice;
    }
  }
  console.log(extraPremium);
  return extraPremium;
}

function calculateAdditionalCoversTLO(
  additionalCovers,
  regionId,
  vehiclePrice
) {
  const additionalRates = {
    flood: { 1: 0.0005, 2: 0.00075, 3: 0.0005 },
    earthquake: { 1: 0.00085, 2: 0.00075, 3: 0.0005 },
    civilCommotion: 0.00035, // Fixed rate
    terrorism: 0.00035, // Fixed rate
  };

  let extraPremium = 0;

  for (let coverage in additionalCovers) {
    if (additionalCovers[coverage]) {
      const rate = additionalRates[coverage];
      // Check if the rate is an object or a fixed number
      if (typeof rate === "object") {
        // Use the region ID to get the appropriate rate
        extraPremium += (rate[regionId] || 0) * vehiclePrice; // Default to 0 if region ID not found
      } else {
        // Fixed rate
        extraPremium += rate * vehiclePrice;
      }
    }
  }
  console.log(extraPremium);
  return extraPremium;
}
