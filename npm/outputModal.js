document.addEventListener("premiumCalculated", (event) => {
  console.log("Premium calculated, attempting to show modal..."); // For debugging
  const results = event.detail;
  document.getElementById("outInsuranceType").textContent =
    results.insuranceType;
  document.getElementById("outVehicleRegion").textContent = results.region;
  document.getElementById("outVehiclePrice").textContent = results.vehiclePrice;
  document.getElementById("outVehicleYear").textContent = results.vehicleYear;
  document.getElementById("outBasePremium").textContent = results.basePremium;
  document.getElementById("outVehicleCategory").textContent = results.category;
  document.getElementById("outTPL").textContent = results.thirdPartyLiability;
  document.getElementById("outDriverAccident").textContent =
    results.driverAccidentInsurance;
  document.getElementById("outPassengerAccident").textContent =
    results.passengerAccidentInsurance;
  document.getElementById("outNumPassenger").textContent = results.numPassenger;
  document.getElementById("outputFlood").textContent = results.flood;
  document.getElementById("outputEarthquake").textContent = results.earthquake;
  document.getElementById("outputCivilCommotion").textContent =
    results.civilCommotion;
  document.getElementById("outputTerrorism").textContent = results.terrorism;
  document.getElementById("outputExtraPremium").textContent =
    results.extraPremium;
  document.getElementById("outputTotalPremium").textContent =
    results.totalPremium;

  // Show the modal
  const modal = new bootstrap.Modal(document.getElementById("resultModal"));
  modal.show();
});

document.getElementById("downloadPdf").addEventListener("click", () => {
  const resultContent = document
    .getElementById("resultModal")
    .querySelector(".modal-content");
  html2pdf().from(resultContent).save("Premium_Calculation_Result.pdf");
});
