//  ██   ██  █████   ██████ ██   ██ ███████ ██████  ███████ ██    ██    ██████  ██      
//  ██   ██ ██   ██ ██      ██  ██  ██      ██   ██    ███   ██  ██     ██   ██ ██      
//  ███████ ███████ ██      █████   █████   ██████    ███     ████      ██████  ██      
//  ██   ██ ██   ██ ██      ██  ██  ██      ██   ██  ███       ██       ██      ██      
//  ██   ██ ██   ██  ██████ ██   ██ ███████ ██   ██ ███████    ██    ██ ██      ███████ 







// Dark Mode Functions

function setDarkMode(isDark) {
  if (isDark) {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeToggle').checked = true;
  } else {
    document.body.classList.remove('dark-mode');
    document.getElementById('darkModeToggle').checked = false;
  }
}

function toggleDarkMode() {
  const isDark = document.getElementById('darkModeToggle').checked;
  setDarkMode(isDark);
  localStorage.setItem('dark-mode', isDark);
}

function initDarkMode() {
  const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedDarkMode = localStorage.getItem('dark-mode') === 'true';
  const isDarkMode = storedDarkMode || (!localStorage.getItem('dark-mode') && userPrefersDark);
  setDarkMode(isDarkMode);
}

// Scroll Effect Functions
function checkPosition(images) {
  const windowHeight = window.innerHeight;
  images.forEach(function(image) {
    const positionFromTop = image.getBoundingClientRect().top;
    const positionFromBottom = image.getBoundingClientRect().bottom;

    if (positionFromTop - windowHeight <= 0 && positionFromBottom >= 0) {
      image.classList.add('appear');
    } else {
      image.classList.remove('appear');
    }
  });
}

function handleScrollEffect() {
  const images = document.querySelectorAll('.resource-image');
  checkPosition(images);

  window.addEventListener('scroll', () => checkPosition(images));
  window.addEventListener('resize', () => checkPosition(images));
}

// Popup Functions
function setupPopup() {
  const protectedContentLinks = document.querySelectorAll('.protectedContentLink');
  const popup = document.getElementById('popup');
  const closeButton = document.querySelector('.popup .close');
  
  protectedContentLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default navigation
      popup.style.display = "block";
    });
  });
  
  closeButton.addEventListener('click', function() {
    popup.style.display = "none";
  });
  
  window.addEventListener('click', function(event) {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });
}

// Array to hold image URLs from the folder
const imageUrls = [
  'media/opinie/hackerzy_opinie-tomek.jpg',
  'media/opinie/hackerzy_opinie-daniel.jpg',
  'media/opinie/hackerzy_opinie-kasia.jpg',
  // Add more image URLs as needed
];
let currentIndex = 0;
const popupContainer = document.getElementById('popupContainer');
const popupImage = document.getElementById('popupImage');
let timeoutId; // To hold the timeout ID for pausing carousel on hover

function showPopup() {
  // Update image source
  popupImage.src = imageUrls[currentIndex];
  
  // Slide in animation
  popupContainer.style.transform = 'translateX(0)';
  
  // Set timeout to hide popup after 4 seconds
  timeoutId = setTimeout(hidePopup, 4000);
  
  // Move to the next image in the array
  currentIndex = (currentIndex + 1) % imageUrls.length;
}

function hidePopup() {
  // Slide out animation completely out of screen
  popupContainer.style.transform = 'translateX(-100%)';
}

function resumeCarousel() {
  // Clear previous timeout and resume carousel
  clearTimeout(timeoutId);
  showPopup();
}

function pauseCarousel() {
  // Pause carousel on hover
  clearTimeout(timeoutId);
}

// Event listeners for hover pause/resume
popupContainer.addEventListener('mouseenter', pauseCarousel);
popupContainer.addEventListener('mouseleave', resumeCarousel);

// Initial call to start the popup cycle
showPopup();



// INFOBOX - hide and toggle 
function toggleContent() {
  var box = document.getElementById('black-scenario');
  box.classList.toggle('expanded');
}

var box = document.getElementById('black-scenario');
box.addEventListener('mouseleave', function() {
  box.classList.remove('expanded');
});



// Initialize Functions on DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  initDarkMode();
  document.getElementById('darkModeToggle').addEventListener('change', toggleDarkMode);
  handleScrollEffect();
  setupPopup();
});
