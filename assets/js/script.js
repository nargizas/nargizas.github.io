
// Function to change the background color of a button on hover
function changeButtonColorOnHover() {
    const buttons = document.querySelectorAll('.hover-color-change');
  
    buttons.forEach((button) => {
      button.addEventListener('mouseover', () => {
        button.style.backgroundColor = '#FFA500'; // Change to your desired color
      });
  
      button.addEventListener('mouseout', () => {
        button.style.backgroundColor = ''; // Reset the background color
      });
    });
  }
  
  // Call the function when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    changeButtonColorOnHover();
  });