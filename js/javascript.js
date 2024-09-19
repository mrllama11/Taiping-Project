let slideIndex = 0;
let slideInterval;

function startSlides() {
  slideInterval = setInterval(showSlides, 5000); // Change slide every 5 seconds
}

function stopSlides() {
  clearInterval(slideInterval); // Stop automatic sliding
}

function currentSlide(number) {
  stopSlides(); // Stop automatic sliding
  slideIndex = number - 1; // Adjust index for zero-based array
  showSlides(); // Show the selected slide
  // Restart automatic sliding after 3.5 seconds to allow users to view the selected slide
  setTimeout(startSlides, 5000);
}

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  // Hide all slides and remove "active" class from all dots
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Display the current slide and add "active" class to the corresponding dot
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1; // Reset to the first slide
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Get all FAQ items
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".tipcontent-item");
  // to select all the child elements
  faqItems.forEach((item) => {
    const icon = item.querySelector(".icon");
    const question = item.querySelector(".questions");
    const hiddenBox = item.querySelector(".hidden-box");

    // Function to toggle visibility
    function toggleVisibility() {
      item.classList.toggle("open");
      if (item.classList.contains("open")) {
        hiddenBox.style.display = "block";
      } else {
        hiddenBox.style.display = "none";
      }
    }

    // Add click event listener to each icon and question text
    icon.addEventListener("click", toggleVisibility);
    question.addEventListener("click", toggleVisibility);
  });
});

// Initialize the slideshow]
showSlides();
startSlides();
