//  ██   ██  █████   ██████ ██   ██ ███████ ██████  ███████ ██    ██    ██████  ██      
//  ██   ██ ██   ██ ██      ██  ██  ██      ██   ██    ███   ██  ██     ██   ██ ██      
//  ███████ ███████ ██      █████   █████   ██████    ███     ████      ██████  ██      
//  ██   ██ ██   ██ ██      ██  ██  ██      ██   ██  ███       ██       ██      ██      
//  ██   ██ ██   ██  ██████ ██   ██ ███████ ██   ██ ███████    ██    ██ ██      ███████ 

// Dark Mode Functions

/**
 * Set the dark mode based on the boolean parameter.
 * @param {boolean} isDark - Determines if dark mode should be enabled or disabled.
 */
function setDarkMode(isDark) {
  if (isDark) {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeToggle').checked = true;
  } else {
    document.body.classList.remove('dark-mode');
    document.getElementById('darkModeToggle').checked = false;
  }
}

/**
 * Toggle dark mode and save preference in localStorage.
 */
function toggleDarkMode() {
  const isDark = document.getElementById('darkModeToggle').checked;
  setDarkMode(isDark);
  localStorage.setItem('dark-mode', isDark);
}

/**
 * Initialize dark mode based on user preference or system settings.
 */
function initDarkMode() {
  const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedDarkMode = localStorage.getItem('dark-mode') === 'true';
  const isDarkMode = storedDarkMode || (!localStorage.getItem('dark-mode') && userPrefersDark);
  setDarkMode(isDarkMode);
}

// Scroll Effect Functions

/**
 * Check the position of images and apply 'appear' class if in viewport.
 * @param {NodeList} images - List of images to check positions.
 */
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

/**
 * Handle scroll effects for images.
 */
function handleScrollEffect() {
  const images = document.querySelectorAll('.resource-image');
  checkPosition(images);

  window.addEventListener('scroll', () => checkPosition(images));
  window.addEventListener('resize', () => checkPosition(images));
}

// Popup Functions

/**
 * Setup popup for protected content links.
 */
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

// Carousel for Popup

const imageUrls = [
  'media/opinie/hackerzy_opinie-tomek.jpg',
  'media/opinie/hackerzy_opinie-daniel.jpg',
  'media/opinie/hackerzy_opinie-kasia.jpg',
  // Add more image URLs as needed
];
let currentIndex = 0;
const popupContainer = document.getElementById('popupContainer');
const popupImage = document.getElementById('popupImage');
let timeoutId;

/**
 * Show popup and start carousel.
 */
function showPopup() {
  popupImage.src = imageUrls[currentIndex];
  popupContainer.style.transform = 'translateX(0)';
  timeoutId = setTimeout(hidePopup, 4000);
  currentIndex = (currentIndex + 1) % imageUrls.length;
}

/**
 * Hide popup with slide out animation.
 */
function hidePopup() {
  popupContainer.style.transform = 'translateX(-100%)';
}

/**
 * Resume carousel after pause.
 */
function resumeCarousel() {
  clearTimeout(timeoutId);
  showPopup();
}

/**
 * Pause carousel on hover.
 */
function pauseCarousel() {
  clearTimeout(timeoutId);
}

// Event listeners for hover pause/resume
popupContainer.addEventListener('mouseenter', pauseCarousel);
popupContainer.addEventListener('mouseleave', resumeCarousel);

// Initial call to start the popup cycle
showPopup();

// INFOBOX - hide and toggle 

/**
 * Toggle the expanded state of the infobox.
 */
function toggleContent() {
  var box = document.getElementById('black-scenario');
  box.classList.toggle('expanded');
}

var box = document.getElementById('black-scenario');
box.addEventListener('mouseleave', function() {
  box.classList.remove('expanded');
});

// Stylesheet Switching Functions

const stylesheets = {
  'default': 'hackerzy_styles.css',
  'neumorphic': 'hackerzy_neumorphic.css',
  'brutalist': 'hackerzy_brutalist.css',
  '90s': 'hackerzy_90s.css',
  'heroic': 'hackerzy_heroic.css',
  'retro': 'hackerzy_rf.css',
  'minimal': 'hackerzy_minimal.css'
};

/**
 * Get URL parameter by name.
 * @param {string} name - Parameter name to retrieve.
 * @returns {string} - Parameter value.
 */
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
 * Switch stylesheet based on URL parameter.
 */
function switchStylesheet() {
  const styleParam = getUrlParameter('style');
  const stylesheetLink = document.getElementById('stylesheet');
  
  if (stylesheets[styleParam]) {
    stylesheetLink.setAttribute('href', stylesheets[styleParam]);
  } else {
    stylesheetLink.setAttribute('href', stylesheets['default']);
  }
}

// Initialize Functions on DOM Content Loaded

document.addEventListener('DOMContentLoaded', function() {
  initDarkMode();
  document.getElementById('darkModeToggle').addEventListener('change', toggleDarkMode);
  handleScrollEffect();
  setupPopup();
  switchStylesheet(); // Ensure stylesheet is switched based on URL parameter
});
