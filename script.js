// Js
// alert("Welcome to my portfolio!");

// 3. Use DOM to change heading text content via JS.

function myFunction() {
  document.getElementById("heading").innerHTML = "Welcome to my Portfolio!";  // Change the heading text content
}

// 4. Use DOM to change style of nav links dynamically.
function changeNavStyle() {
  // document.querySelector('navbar').style.backgroundColor = '#980707ff'; // Change the background color of the nav
  var navLinks = document.querySelectorAll("nav a"); // Select all nav links
  navLinks.forEach(function (link) {  // Selecting all nav links
    link.style.color = "#14328eff"; // Change the text color of nav links
    link.style.fontSize = "18px"; // Change the font size of nav links
    link.style.backgroundColor = "#dcc4baff";
  });
}

// 4. Validate the form on submit by checking for empty fields and correct email format.
function formValidation() {
  var name = document.forms["myForm"]["name"].value;
  var email = document.forms["myForm"]["email"].value;
  var message = document.forms["myForm"]["message"].value;
  //var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+/.[a-zA-Z]{2,4}$/;
  // var emailPattern = /^[^/s@]+@[^/s@]+/.[^/s@]+$/;

  if (name == "" || email == "" || message == "") {
    alert("All fields must be filled out");
    return false;
  }
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address");
    return false;
  }
  return true;
}

function thankYou() {
  alert("Thank you for your message! I will get back to you soon.");
  window.location.href = "thankyou.html";
  return true;
}

// 5. Add a button that on click changes background color of About section.
function changeStyle() {
  document.getElementById("about").style.backgroundColor = "#111111";
  document.getElementById("about").style.color = "#ffffff";
// jQuery initialization
  $(document).ready(function () {
    $("#aboutBtnShow").hide(); // Initially hide the "ToShow" button
    $("#aboutBtnHide").click(function () {
      $("#about").hide(1000);// Hide the about section
      $(this).hide(1000);// Hide the "ToHide" button
      $("#aboutBtnShow").show(900);// Show the "ToShow" button
    });
  
    $("#aboutBtnShow").click(function () {
      $("#about").show(1000); // Show the about section
      $(this).hide(1000);// Hide the "ToShow" button
      $("#aboutBtnHide").show();// Show the "ToHide" button
    });

  $(".skill-item").hover(
    function () {
      $(this).animate({ paddingLeft: "30px" }, 150);
      $(this).css("color", "#d37272");
      $(this).css("background-color", "#08929e");
    },
    function () {
      $(this).animate({ paddingLeft: "0" }, 150);
      $(this).css("color", "#000");
      $(this).css("background-color", "transparent");
    }
  );

  $("#navbar a").click(function () {
    var target = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(target).offset().top
    }, 1000);
    return false;
  });

  $(".social-links").hover(
    function () {
      $(this).fadeTo(100, 1);
    },
    function () {
      $(this).fadeTO(300, 0.5);
    }
  );
  
});
}

// 2. Use jQuery's `$.ajax` method to fetch JSON data and display it dynamically on the page.
function loadSkills() {
  $.ajax({
    url: 'data.json', // Path to your JSON file
    dataType: 'json', 
    success: function(data) {
      var skillsList = $('#skills-list');
      skillsList.empty(); // Clear existing content
      data.skills.forEach(function(skill) {
        skillsList.append('<li class="skill-item">' + skill + '</li>');
      });
    },
    error: function() {
      console.error('Error loading skills data.');
    }
  });
}
// Call the function to load skills when the document is ready
$(document).ready(function() {
  loadSkills(); // Load skills from JSON file or triggered by a button click
});

//4. Replace the education table content dynamically using the fetched JSON data.
function loadEducation() {
  $.ajax({
    url: 'data.json', // Path to your JSON file
    dataType: 'json',
    success: function(data) {
      var educationBody = $('#education-body');
      educationBody.empty(); // Clear existing content
      if (Array.isArray(data.education)) {
        data.education.forEach(function(education) {
          educationBody.append('<tr><td>' + education.year + '</td><td>' + education.degree + '</td><td>' + education.institution + '</td></tr>');
        });
      } else {
        educationBody.append('<tr><td colspan="3">No education data available.</td></tr>');
      }
    },
    error: function() {
      console.error('Error loading education data.');
    }
  });
}
// Call the function to load education when the document is ready
$(document).ready(function() {
  loadEducation(); // Load education from JSON file or triggered by a button click
});
// 5. Simplly Show a loading message while the AJAX request is in progress.
$(document).ready(function() {
  var loadingMessage = $("#loadingMessage");
  var errorMessage = $("#errorMessage");
  var skillsList = $("#skills-list");
  var educationBody = $("#education-body");

  // Show loading message when AJAX request starts
  $(document).ajaxStart(function() {
    loadingMessage.show();
  });

  // Hide loading message when AJAX request completes
  $(document).ajaxStop(function() {
    loadingMessage.hide();
  });

  // Handle AJAX errors gracefully
  $(document).ajaxError(function() {
    errorMessage.show();
  });
});

// 6. Handle AJAX errors gracefully by displaying user-friendly error messages.
$(document).ready(function() {
  var errorMessage = $("#errorMessage");
  errorMessage.hide(); // Initially hide the error message
});
// 7. Add a button that refreshes the JSON data on demand when clicked.
$(document).ready(function() {
  $("#refreshButton").on("click", function() {
    loadSkills(); // Call the function to reload skills
    loadEducation(); // Call the function to reload education
  });
});
// 8. Use proper callbacks and promise handling to manage asynchronous AJAX calls. And in the last also expalin in comment.
$(document).ready(function() {
  function fetchData() {
    return $.ajax({
      url: "data.json",
      dataType: "json"
    });
  }

  // Use promises to handle AJAX requests
  fetchData()
    .done(function(data) {
      // Handle successful response
      console.log("Data fetched successfully:", data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      // Handle error
      console.error("Error fetching data:", errorThrown);
    });
});
// Content:

    // Show error message when AJAX request fails
    $(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {
        errorMessage.text(`Error: ${thrownError}. Please try again later.`).show();
    });
    // 9. Use jQuery's `$.getJSON` method to fetch JSON data and display it dynamically on the page.
    $(document).ready(function() {
        $.getJSON("data.json", function(data) {
            var skillsList = $("#skills-list");
            skillsList.empty(); // Clear existing content
            $.each(data.skills, function(index, skill) {
                skillsList.append('<li class="skill-item">' + skill + '</li>');
            });
        });
    });
// Dark/Light Theme Toggle Function
function toggleTheme() {
    const body = document.body;
    const button = document.getElementById('themeToggle');
    
    body.classList.toggle('dark-theme');
    
    // Change button icon based on theme
    if (body.classList.contains('dark-theme')) {
        button.innerHTML = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        button.innerHTML = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const button = document.getElementById('themeToggle');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        button.innerHTML = '☀️';
    } else {
        button.innerHTML = '🌙';
    }
});