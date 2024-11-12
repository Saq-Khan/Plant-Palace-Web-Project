let lastScrollTop = 0;
const navbar = document.querySelector('header');
const scrollThreshold = 500;  // Define how many pixels down to scroll before showing the navbar

window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop < scrollThreshold) {
    // User is scrolling down and has passed the threshold, hide the navbar
    navbar.classList.add('hide');
  } else if (scrollTop >= scrollThreshold || scrollTop < lastScrollTop) {
    // Show the navbar when scrolling up or when at the top of the page
    navbar.classList.remove('hide');
  }

  lastScrollTop = scrollTop;
});

