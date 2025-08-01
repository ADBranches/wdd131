/**
 * Product Review Form Script
 * Dynamically populates product dropdown and handles form submission
 */

const productSelect = document.getElementById("product-name");
const reviewForm = document.getElementById("review-form");

const products = [
  { id: "fc-1888", name: "Flux Capacitor", avgRating: 4.5 },
  { id: "fc-2050", name: "Power Laces", avgRating: 4.7 },
  { id: "fs-1987", name: "Time Circuits", avgRating: 3.5 },
  { id: "ac-2000", name: "Low Voltage Reactor", avgRating: 3.9 },
  { id: "jj-1969", name: "Warp Equalizer", avgRating: 5.0 }
];

/**
 * Populates the product dropdown menu
 */
function populateProductDropdown() {
  try {
    if (!productSelect) {
      throw new Error("Product select element not found");
    }

    while (productSelect.options.length > 1) {
      productSelect.remove(1);
    }

    products.forEach(product => {
      const option = new Option(product.name, product.id);
      option.dataset.avgRating = product.avgRating;
      productSelect.add(option);
    });

  } catch (error) {
    console.error("Error populating product dropdown:", error);
    const errorOption = new Option("Error loading products", "");
    errorOption.disabled = true;
    productSelect.add(errorOption);
  }
}

/**
 * func handles form submission
 */
function handleFormSubmit(event) {
  try {
    let count = parseInt(localStorage.getItem("reviewCount")) || 0;
    
    count++;
    localStorage.setItem("reviewCount", count.toString());
    
    console.log(`Form submitted. Total reviews: ${count}`);
    
  } catch (error) {
    console.error("Error handling form submission:", error);
    // Prevent form submission if localStorage fails
    event.preventDefault();
    alert("Error submitting review. Please try again.");
  }
}

/**
 * func initializes the form functionality
 */
function initForm() {
  populateProductDropdown();
  
  // form submission handler.
  if (reviewForm) {
    reviewForm.addEventListener("submit", handleFormSubmit);
  } else {
    console.error("Review form element not found");
  }
}

// Initializ when DOM is fully loaded
document.addEventListener("DOMContentLoaded", initForm);