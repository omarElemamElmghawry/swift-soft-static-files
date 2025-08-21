$(document).ready(function () {
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 80) { // تغيير القيمة حسب الحاجة
      $('.ep-header-top').addClass('ep-header-top-scrolled');
      $('.ep-header-menu').addClass('ep-header-menu-scrolled');
    } else {
      $('.ep-header-top').removeClass('ep-header-top-scrolled');
      $('.ep-header-menu').removeClass('ep-header-menu-scrolled');
    }
  });

  $('.ep-first-word-heading').html(function (_, html) {
    return html.replace(/^(\S+)(\s|$)/, '<span class="ep-first-word">$1</span>$2');
  });

  $("#toggle-responsive-menu").click(function () {
    $("#ep-side-user-menu").toggleClass("d-none");
  });
});
// for toggle colors

let currentModeIndex = 0; // Store the index inside the function to avoid redeclaration
function toggleColors() {
  const body = document.body;
  const modes = ['mode-luminosity', 'mode-difference', 'mode-default'];
  body.className = modes[currentModeIndex]; // Apply the current mode
  currentModeIndex = (currentModeIndex + 1) % modes.length; // Update the index for the next call
}
// for toggle direction
function toggleRTL() {
  const htmlTag = document.documentElement;
  if (htmlTag.dir === "rtl") {
    htmlTag.dir = "ltr";
    htmlTag.classList.remove("rtl");

  } else {
    htmlTag.dir = "rtl";
    htmlTag.classList.add("rtl");
  }
  document.querySelectorAll('#toggleDirection span').forEach(span => { span.classList.toggle('d-none'); });
}
function toggleBootstrapRTL() {
  const rtlLinkTag = document.querySelector('link[href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.rtl.min.css"]');
  const ltrLinkTag = document.querySelector('link[href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css"]');

  if (rtlLinkTag) {
    rtlLinkTag.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css";
  } else if (ltrLinkTag) {
    ltrLinkTag.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.rtl.min.css";
  } else {
    const newLinkTag = document.createElement('link');
    newLinkTag.rel = 'stylesheet';
    newLinkTag.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.rtl.min.css';
    document.head.appendChild(newLinkTag);
  }
}
try {
  const toggleDirectionButton = document.getElementById('toggleDirection');
  if (toggleDirectionButton) {
    toggleDirectionButton.addEventListener('click', toggleBootstrapRTL);
  }
} catch (error) {
  console.error('An error occurred while adding the event listener:', error);
}

/* password hide & show */
if (!window.passwordInput) {
  const passwordInput = document.getElementById('password');
  const toggleSpan = document.getElementById('togglePassword');

  if (passwordInput && toggleSpan) {
    toggleSpan.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      toggleSpan.classList.toggle('show', !isPassword);
      toggleSpan.classList.toggle('hide', isPassword);
    });
  }
}

// timer count down //
let countdownTimeLeft = 30;
let timerElement = document.getElementById('verifyTimer');
if (timerElement) {
  const countdown = setInterval(() => {
    countdownTimeLeft--;
    const minutes = Math.floor(countdownTimeLeft / 60);
    const seconds = countdownTimeLeft % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    if (countdownTimeLeft <= 0) {
      clearInterval(countdown);
      timerElement.textContent = '0:00';
    }
  }, 1000);
}

// for change dropdown on hovering
$(document).ready(function () {
  $('.ep-header-menu .dropdown').hover(
    function () {
      $(this).addClass('show'); // Add the 'show' class to the dropdown
      $(this).find('.dropdown-menu').addClass('show'); // Show the dropdown menu
      $(this).find('.dropdown-toggle').attr('aria-expanded', 'true'); // Update aria attribute
    },
    function () {
      $(this).removeClass('show'); // Remove the 'show' class
      $(this).find('.dropdown-menu').removeClass('show'); // Hide the dropdown menu
      $(this).find('.dropdown-toggle').attr('aria-expanded', 'false'); // Update aria attribute
    }
  );
  $('.ep-header-menu .dropdown > a').click(function () {
    location.href = this.href;
  });
});

$(window).on('load', function () {
  $('#ep-loader').fadeOut(500, function () {
  });
});

$(document).ready(function () {

  $(window).scroll(function () {
    let scroll = $(this).scrollTop();

    if (scroll > 150) {
      // $('#back-to-top').fadeIn();
      $('body').addClass('ep-body-scrolled');
    } else {

      // $('#back-to-top').stop(true, true).hide();
      $('body').removeClass('ep-body-scrolled');
    }
  });


  $('#back-to-top').click(function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Smooth scrolling for links with class 'scroll-link'
  // This will apply to all links with the class 'scroll-link'
  $('.scroll-link').on('click', function (e) {
    e.preventDefault(); // Prevent the default link behavior
    const targetId = $(this).data('scroll-target'); // Get the target ID from data-scroll-target attribute
    if (targetId) {
      $('html, body').animate({
        scrollTop: $(targetId).offset().top - 80// Smoothly scroll to the target
      }, 0); // Duration of the scroll in milliseconds
    }
  });

});


// for counter
$(document).ready(function () {
  const counters = document.querySelectorAll('.counter');

  if (counters.length > 0) {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 200;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  }
});

$(document).ready(function () {
  //toast
  document.querySelectorAll('[data-toast-target]').forEach(element => {
    element.addEventListener('click', () => {
      const toastId = element.getAttribute('data-toast-target');
      const toastElement = document.getElementById(toastId);
      if (toastElement) {
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
      }
    });
  });


  // tooltip
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))


});



// slick 
$(document).ready(function () {
  if ($('.responsiveSlider').length) {
    $('.responsiveSlider').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      rtl: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }
});



// + - reset font size with cookies
const originalFontSizes = new Map();
window.addEventListener("DOMContentLoaded", () => {
  // Increase font size by 1px
document.getElementById("increaseFont").addEventListener("click", () => {
  let adjustment = parseFloat(getCookie("fontSizeAdjustment")) || 0;
  adjustment += 1;
  setCookie("fontSizeAdjustment", adjustment, 28); // Store adjustment in cookies for 28 days
  originalFontSizes.forEach((originalSize, el) => {
    el.style.setProperty('font-size', `${originalSize + adjustment}px`, 'important');
  });
});

// Decrease font size by 1px
document.getElementById("decreaseFont").addEventListener("click", () => {
  let adjustment = parseFloat(getCookie("fontSizeAdjustment")) || 0;
  adjustment -= 1;
  setCookie("fontSizeAdjustment", adjustment, 28); // Store adjustment in cookies for 28 days
  originalFontSizes.forEach((originalSize, el) => {
    el.style.setProperty('font-size', `${originalSize + adjustment}px`, 'important');
    // originalSize + adjustment
  });
});

// Reset font sizes to original
document.getElementById("resetFont").addEventListener("click", () => {
  setCookie("fontSizeAdjustment", 0, 28); // Reset adjustment in cookies
  originalFontSizes.forEach((originalSize, el) => {
    el.style.fontSize = `${originalSize}px`;
  });
});
  const allElements = document.querySelectorAll("body *");
  allElements.forEach(el => {
    const computedSize = window.getComputedStyle(el).fontSize;
    const fontSize = parseFloat(computedSize);
    if (fontSize) {
      originalFontSizes.set(el, fontSize);
    }
  });

  // Apply font size from cookies if available
  const fontSizeCookie = getCookie("fontSizeAdjustment");
  if (fontSizeCookie) {
    const adjustment = parseFloat(fontSizeCookie);
    originalFontSizes.forEach((originalSize, el) => {
      el.style.setProperty('font-size', `${originalSize + adjustment}px`, 'important');
    });
  }
});

// Helper function to set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

// Helper function to get a cookie
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return value;
    }
  }
  return null;
}


