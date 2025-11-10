

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');
  const card_front = document.getElementById('content-front');
  const card_back = document.getElementById('content-back');
  const flipButton = document.getElementById('flip-button');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });

  // Flip card functionality
  flipButton.addEventListener('click', () => {
    card_front.classList.toggle('flipped');
    card_back.classList.toggle('flipped');
  });
});