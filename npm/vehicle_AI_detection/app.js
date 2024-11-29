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

    document.getElementById("loading").style.display = "block";

    // Load YOLO model
    const model = await tf.loadGraphModel(
      "https://example.com/yolo-model.json"
    ); // Replace with your YOLO model path
    const tensor = tf.browser
      .fromPixels(canvas)
      .resizeBilinear([640, 640])
      .expandDims(0)
      .div(255.0);

    // Detect objects
    const predictions = await model.executeAsync(tensor);

    // Process and filter license plates
    const boxes = predictions[1].arraySync()[0]; // YOLO outputs bounding boxes
    boxes.forEach(async (box) => {
      // Extract bounding box details
      const [x, y, width, height] = [box[0], box[1], box[2], box[3]];

      // Optional: Additional filtering logic based on aspect ratio
      if (width / height > 2 && width / height < 5) {
        const croppedCanvas = cropCanvasArea(canvas, [x, y, width, height]);
        await runOCR(croppedCanvas);
      }
    });

    document.getElementById("loading").style.display = "none";
  };
}

// Function to crop detected license plate
function cropCanvasArea(canvas, bbox) {
  const [x, y, width, height] = bbox;
  const croppedCanvas = document.createElement("canvas");
  const ctx = croppedCanvas.getContext("2d");
  croppedCanvas.width = width;
  croppedCanvas.height = height;
  ctx.drawImage(canvas, x, y, width, height, 0, 0, width, height);
  return croppedCanvas;
}

// OCR Processing
async function runOCR(croppedCanvas) {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(croppedCanvas.toDataURL(), "ind", {
      logger: (info) => console.log(info),
    });

    const detectedText = text.trim();
    document.getElementById(
      "output"
    ).innerHTML += `<p>Detected Text: ${detectedText}</p>`;

    const detectedRegion = extractRegionFromText(detectedText);
    document.getElementById("regionInput").value =
      detectedRegion || "Region not found";
  } catch (error) {
    console.error("OCR Error:", error);
    document.getElementById(
      "output"
    ).innerHTML += `<p>Error processing OCR.</p>`;
  }
}

// Example function to extract region from detected text (customize based on Indonesian plates)
function extractRegionFromText(text) {
  const regionMap = {
    A: "Banten",
    AA: "Kedu, Purworejo, Temanggung, Magelang, Wonosobo, Kebumen",
    AB: "Yogyakarta",
    AD: "Surakarta, Boyolali, Klaten, Wonogiri, Sukoharjo, Karanganyar, Sragen",
    AE: "Madiun, Ngawi, Pacitan, Ponorogo, Magetan",
    AG: "Kediri, Tulungagung, Blitar, Trenggalek, Nganjuk",
    B: "Jakarta",
    BA: "Pantai Barat Sumatra",
    BB: "Tapanuli",
    BD: "Bengkulu",
    BE: "Lampung",
    BG: "Palembang",
    BH: "Jambi",
    BK: "Sumatra Timur",
    BL: "Aceh",
    BM: "Riau",
    BN: "Bangka Belitung",
    BP: "Kepulauan Riau",
    D: "Bandung",
    DA: "Kalimantan Selatan",
    DB: "Manado",
    DC: "Sulawesi Barat",
    DD: "Sulawesi",
    DE: "Maluku",
    DG: "Ternate",
    DH: "Timor",
    DK: "Bali",
    DL: "Sitaro, Talaud, Sangihe",
    DM: "Gorontalo",
    DN: "Sulawesi Tengah",
    DR: "Lombok",
    DT: "Sulawesi Tenggara",
    E: "Cirebon, Majalengka, Indramayu, Kuningan",
    EA: "Sumbawa, Bima, Dompu, Sumbawa Barat",
    EB: "Alor, Lembata, Sikka, Ende, Ngada, Flores Timur, Flores, Manggarai, Manggarai Barat",
    ED: "Sumba Timur, Sumba Barat",
    G: "Pekalongan, Brebes, Pemalang, Batang, Tegal",
    H: "Semarang, Salatiga, Kendal, Demak",
    K: "Rembang, Cepu, Pati, Kudus, Jepara, Grobogan, Blora",
    KB: "Kalimantan Barat",
    KH: "Kalimantan Tengah",
    KT: "Kalimantan Timur",
    KU: "Kalimantan Utara",
    L: "Surabaya",
    M: "Madura",
    N: "Pasuruan, Malang, Batu, Probolinggo, Lumajang",
    P: "Besuki, Banyuwangi, Bondowoso, Jember, Situbondo",
    PA: "Papua",
    PB: "Papua Barat",
    R: "Banyumas, Cilacap, Purbalingga",
    S: "Jombang, Bojonegoro, Lamongan, Mojokerto",
    T: "Karawang, Subang, Purwakarta",
    W: "Gresik, Sidoarjo",
    Z: "Banjar, Garut, Ciamis, Tasikmalaya",
  };

  // Extract the first 1-2 uppercase letters (common in Indonesian plates)
  const regionCode = text.match(/^[A-Z]{1,2}/)?.[0];
  return regionMap[regionCode] || "Region not found";
}
