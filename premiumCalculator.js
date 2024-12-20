// =-=-=-=--=--=-=-=--=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=

const insuranceTypeMap = {
  flexRadioDefault1: "Comprehensive",
  flexRadioDefault2: "TLO / Total Loss Only",
};

// SO WE EXECUTE THE FUNCTION CALCULATOR WHEN WE PRESS THE BUTTON
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("nextBtn1")
    .addEventListener("click", calculatePremium);
});

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
  console.log(`Vehicle Price:  ${formatCurrency(vehiclePrice)}`);
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

// // Utility function to format currency
// function formatCurrency(amount) {
//   if (isNaN(amount)) {
//     return "Rp 0,00"; // Return a default value if the amount is invalid
//   }
//   // Formatting the amount to currency format and removing unnecessary parts
//   return amount
//     .toLocaleString("id-ID", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     })
//     .replace("Rp"); // Ensures that the Rp symbol is properly spaced
// }
function formatCurrency(amount) {
  if (isNaN(amount)) {
    return "Rp 0,00";
  }
  // Formatting the amount to currency format without manually replacing "IDR"
  return amount
    .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
    .replace("IDR", "")
    .trim();
}

// Initialize additionalCoverPremiums before any calculations
// Define updateElementText at the top
function updateElementText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.innerText = value;
  } else {
    console.warn(`Element with ID ${id} not found.`);
  }
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
  let rateDetails = {}; // store the rate details that we hardcode above

  for (let coverage in additionalCovers) {
    if (additionalCovers[coverage]) {
      const rate = additionalRates[coverage];
      const applicableRate =
        typeof rate === "object" ? rate[regionId] || 0 : rate;
      rateDetails[coverage] = applicableRate; // Store the rate for display
      const premium = applicableRate * vehiclePrice;
      extraPremium += premium;
      console.log(
        `Coverage: ${coverage}, Rate: ${applicableRate}, Calculated Premium: ${
          applicableRate * vehiclePrice
        }`
      );
    }
  }
  console.log("Total Extra Premium (raw number):", extraPremium); // Log raw extraPremium value
  return { extraPremium, rateDetails };
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
  const rateDetails = {}; // Object to store rates for each selected coverage

  for (let coverage in additionalCovers) {
    if (additionalCovers[coverage]) {
      const rate = additionalRates[coverage];
      const applicableRate =
        typeof rate === "object" ? rate[regionId] || 0 : rate;
      rateDetails[coverage] = applicableRate; // Store the rate for display
      const premium = applicableRate * vehiclePrice;
      extraPremium += premium;
      console.log(
        `Coverage: ${coverage}, Rate: ${applicableRate}, Calculated Premium: ${
          applicableRate * vehiclePrice
        }`
      );
    }
  }
  console.log("Total Extra Premium (raw number):", extraPremium); // Log raw extraPremium value
  return { extraPremium, rateDetails };
}

async function calculatePremium() {
  try {
    // Initialize variables at the beginning
    let extraPremium = 0;
    let additionalCoverPremiums = {}; // Initialize at the beginning
    let additionalCoverRates = {}; // Initialize at the beginning

    const formModal = bootstrap.Modal.getInstance(
      document.getElementById("formModal")
    );
    if (formModal) {
      formModal.hide(); // Close the form modal (input)
    }

    // Show the result modal
    const resultModal = new bootstrap.Modal(
      document.getElementById("resultModal")
    );
    resultModal.show();

    document.getElementById("loadingOverlay").style.display = "flex"; // Show loading spinner

    // Validate selected insurance type
    const selectedInsuranceType = document.querySelector(
      'input[name="flexRadioDefault"]:checked'
    );
    if (!selectedInsuranceType) {
      console.error("Insurance type not selected.");
      return;
    }
    const insuranceType = selectedInsuranceType.id;

    // Validate vehicle year selection
    const vehicleYearElement = document.getElementById("vehicleDropdown");
    if (!vehicleYearElement) {
      console.error("Vehicle dropdown not found");
      return;
    }
    const vehicleYear = parseInt(vehicleYearElement.value) || 0;

    // Parse and validate vehicle price
    const vehiclePrice = parseCurrency(
      document.getElementById("hargaKendaraan").value
    );
    if (!vehiclePrice || isNaN(vehiclePrice) || vehiclePrice <= 0) {
      console.error("Please input a valid vehicle price!");
      return;
    }

    // Validate and get region ID
    const selectedArea = getSelectedArea();
    const regionId = await getRegionId(selectedArea);
    if (!regionId) {
      console.error("Region ID not found.");
      return;
    }

    // Parse other inputs
    const thirdPartyLiability =
      parseCurrency(document.getElementById("hargaTiga").value) || 0;
    const driverAccidentInsurance =
      parseCurrency(document.getElementById("hargaDiri").value) || 0;
    const passengerAccidentInsurance =
      parseCurrency(document.getElementById("hargaPenumpang").value) || 0;
    const numberOfPassengers =
      parseInt(document.getElementById("jumlahPenumpang").value) || 0;

    // Check for additional cover selections
    const additionalCovers = {
      flood: document.getElementById("banjirTopan")?.checked || false,
      earthquake: document.getElementById("gempaTsunami")?.checked || false,
      civilCommotion: document.getElementById("huruHara")?.checked || false,
      terrorism: document.getElementById("terorismeSabotase")?.checked || false,
    };

    // Calculate base rate
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

    // Calculate extra premium based on the insurance type (Comprehensive or TLO)
    console.log("TESTING:", extraPremium);
    extraPremium =
      insuranceType === "flexRadioDefault1"
        ? calculateAdditionalCoversComprehensive(
            additionalCovers,
            regionId,
            vehiclePrice
          )
        : calculateAdditionalCoversTLO(
            additionalCovers,
            regionId,
            vehiclePrice
          );

    // Calculate individual additional cover premiums and rates
    for (let coverage in additionalCovers) {
      if (additionalCovers[coverage]) {
        let result =
          insuranceType === "flexRadioDefault1"
            ? calculateAdditionalCoversComprehensive(
                { [coverage]: true },
                regionId,
                vehiclePrice
              )
            : calculateAdditionalCoversTLO(
                { [coverage]: true },
                regionId,
                vehiclePrice
              );

        additionalCoverPremiums[coverage] = result.extraPremium;
        additionalCoverRates[coverage] = result.rateDetails[coverage];
      }
    }

    // Calculate total additional costs
    const totalThirdPartyLiability = thirdPartyLiability;
    const totalDriverAccidentInsurance = driverAccidentInsurance;
    const totalPassengerAccidentInsurance =
      passengerAccidentInsurance * numberOfPassengers;

    // Calculate Extra Premium Based on Insurance Type (Comprehensive or TLO)
    const additionalCoverResult =
      insuranceType === "flexRadioDefault1"
        ? calculateAdditionalCoversComprehensive(
            additionalCovers,
            regionId,
            vehiclePrice
          )
        : calculateAdditionalCoversTLO(
            additionalCovers,
            regionId,
            vehiclePrice
          );

    extraPremium = additionalCoverResult.extraPremium; // Get the calculated extra premium

    // Log accumulated extra premium
    console.log("Accumulated Extra Premium:", extraPremium);
    // Calculate base premium only
    let premiumOnly = baseRate * vehiclePrice;

    // Calculate Total Premium
    let totalPremium =
      premiumOnly +
      extraPremium + // Include extra premium in the total
      totalThirdPartyLiability +
      totalDriverAccidentInsurance +
      totalPassengerAccidentInsurance;

    // Logging for Debugging
    console.log("Base Premium Only:", premiumOnly);
    console.log("Total Premium (with all additions):", totalPremium);

    extraPremium = isNaN(extraPremium) ? 0 : extraPremium;
    totalPremium = isNaN(totalPremium) ? 0 : totalPremium;

    console.log(`Base Premium: ${baseRate.toFixed(4)}`);
    console.log(
      `Base Premium (Rate: ${(baseRate * 100).toFixed(2)}%): ${formatCurrency(
        premiumOnly
      )}`
    );
    console.log(`Extra Premium: ${formatCurrency(extraPremium)}`);
    console.log(`Total Premium: ${formatCurrency(totalPremium)}`);

    // Format additional cover premiums for display
    let formattedAdditionalCoverPremiums = {};
    for (let coverage in additionalCoverPremiums) {
      formattedAdditionalCoverPremiums[coverage] = formatCurrency(
        additionalCoverPremiums[coverage]
      );
    }

    // Set up results object
    const basePremiumRate = baseRate * 100;
    const calculationResults = {
      insuranceType: insuranceTypeMap[insuranceType],
      region: regionId,
      vehiclePrice: vehiclePrice,
      vehicleYear: vehicleYear,
      basePremiumRate: basePremiumRate.toFixed(2),
      basePremium: formatCurrency(premiumOnly),
      thirdPartyLiability: formatCurrency(totalThirdPartyLiability),
      driverAccidentInsurance: formatCurrency(totalDriverAccidentInsurance),
      passengerAccidentInsurance: formatCurrency(
        totalPassengerAccidentInsurance
      ),
      numPassenger: parseInt(
        document.getElementById("jumlahPenumpang").value || 1
      ),
      flood: additionalCovers.flood ? "Yes" : "No",
      floodPremium: formattedAdditionalCoverPremiums.flood || "Rp 0,00",
      floodRate: additionalCoverRates.flood || 0,
      earthquake: additionalCovers.earthquake ? "Yes" : "No",
      earthquakePremium:
        formattedAdditionalCoverPremiums.earthquake || "Rp 0,00",
      earthquakeRate: additionalCoverRates.earthquake || 0,
      civilCommotion: additionalCovers.civilCommotion ? "Yes" : "No",
      civilCommotionPremium:
        formattedAdditionalCoverPremiums.civilCommotion || "Rp 0,00",
      civilCommotionRate: additionalCoverRates.civilCommotion || 0,
      terrorism: additionalCovers.terrorism ? "Yes" : "No",
      terrorismPremium: formattedAdditionalCoverPremiums.terrorism || "Rp 0,00",
      terrorismRate: additionalCoverRates.terrorism || 0,
      extraPremium: formatCurrency(extraPremium),
      totalPremium: formatCurrency(totalPremium),
    };

    // Insert the results into the modal
    updateElementText("outInsuranceType", calculationResults.insuranceType);
    updateElementText("outVehicleRegion", calculationResults.region);
    updateElementText(
      "outVehiclePrice",
      formatCurrency(calculationResults.vehiclePrice)
    );
    updateElementText("outVehicleYear", calculationResults.vehicleYear);
    updateElementText(
      "outputBaseRate",
      `${calculationResults.basePremiumRate}%`
    );
    updateElementText("outBasePremium", calculationResults.basePremium);
    updateElementText("outTPL", calculationResults.thirdPartyLiability);
    updateElementText(
      "outDriverAccident",
      calculationResults.driverAccidentInsurance
    );
    updateElementText(
      "outPassengerAccident",
      calculationResults.passengerAccidentInsurance
    );
    updateElementText("outNumPassenger", calculationResults.numPassenger);

    // Update additional covers and their rates
    updateElementText("outputFlood", calculationResults.floodPremium);
    updateElementText(
      "outputFloodRate",
      `${(calculationResults.floodRate * 100).toFixed(3)}%`
    );
    updateElementText("outputEarthquake", calculationResults.earthquakePremium);
    updateElementText(
      "outputEarthquakeRate",
      `${(calculationResults.earthquakeRate * 100).toFixed(3)}%`
    );
    updateElementText(
      "outputCivilCommotion",
      calculationResults.civilCommotionPremium
    );
    updateElementText(
      "outputCivilCommotionRate",
      `${(calculationResults.civilCommotionRate * 100).toFixed(3)}%`
    );
    updateElementText("outputTerrorism", calculationResults.terrorismPremium);
    updateElementText(
      "outputTerrorismRate",
      `${(calculationResults.terrorismRate * 100).toFixed(3)}%`
    );

    updateElementText("outputExtraPremium", calculationResults.extraPremium);
    updateElementText("outputTotalPremium", calculationResults.totalPremium);

    document.getElementById("downloadPdf").addEventListener("click", () => {
      const downloadButton = document.getElementById("downloadPdf");

      // Prevent multiple downloads by disabling the button
      downloadButton.disabled = true;

      // Clone the modal content to work with
      const modalContent = document
        .getElementById("resultModal")
        .querySelector(".modal-content")
        .cloneNode(true);

      // Remove the "Download PDF" button from the cloned content
      const clonedButton = modalContent.querySelector("#downloadPdf");
      if (clonedButton) clonedButton.remove();

      // Use html2pdf to generate and save the PDF from the cloned content
      html2pdf()
        .from(modalContent)
        .set({
          dpi: 1440, // Higher dpi for better resolution
          scale: 2, // Optional: Increase scale
          margin: 10,
          filename:
            "China_Taiping_Insurance_Indonesia_Premium_Calculation_Result_Demo.pdf",
        })
        .save()
        .then(() => {
          // Re-enable the button after download
          downloadButton.disabled = false;
        });
    });

    // Dispatch event with results (Simulate Loading)
    setTimeout(() => {
      const event = new CustomEvent("premiumCalculated", {
        detail: calculationResults,
      });
      document.dispatchEvent(event);
      document.getElementById("loadingOverlay").style.display = "none";
    }, 3000); // Loading animation duration
  } catch (error) {
    console.error("error in calculatePremium", error);
  }
}
