document
  .getElementById("uploadImage")
  .addEventListener("change", handleImageUpload);

async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = async () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // Load the YOLO model (replace with your model)
    const model = await cocoSsd.load(); // Use YOLO library if available

    // Perform object detection with YOLO
    const predictions = await model.detect(canvas);

    // Display YOLO results
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = `<h2>Detected Objects:</h2>`;
    predictions.forEach((prediction) => {
      outputDiv.innerHTML += `<p>${prediction.class} - ${(
        prediction.score * 100
      ).toFixed(2)}%</p>`;
    });

    // Process detected object regions for OCR (License Plate Detection)
    outputDiv.innerHTML += `<h2>License Plate Detection:</h2>`;
    if (predictions.length) {
      // Loop through detected objects and crop likely license plate regions
      for (let i = 0; i < predictions.length; i++) {
        const bbox = predictions[i].bbox; // Bounding box
        // Crop the detected area and prepare for OCR
        const croppedCanvas = cropCanvasArea(canvas, bbox);
        await runOCR(croppedCanvas); // Run OCR on cropped region
      }
    } else {
      outputDiv.innerHTML += `<p>No objects detected.</p>`;
    }
  };
}

// Function to crop the canvas to the bounding box
function cropCanvasArea(canvas, bbox) {
  const [x, y, width, height] = bbox;
  const croppedCanvas = document.createElement("canvas");
  const ctx = croppedCanvas.getContext("2d");
  croppedCanvas.width = width;
  croppedCanvas.height = height;
  ctx.drawImage(canvas, x, y, width, height, 0, 0, width, height);
  return croppedCanvas;
}

// Run OCR using Tesseract.js on the cropped canvas
async function runOCR(croppedCanvas) {
  Tesseract.recognize(
    croppedCanvas.toDataURL(), // Use the cropped area
    "eng", // Change to 'ind' for Indonesian plates
    { logger: (info) => console.log(info) }
  )
    .then(({ data: { text } }) => {
      document.getElementById(
        "output"
      ).innerHTML += `<p>Detected Text: ${text}</p>`;
    })
    .catch((error) => {
      console.error(error);
      document.getElementById(
        "output"
      ).innerHTML += `<p>Error processing OCR.</p>`;
    });
}
