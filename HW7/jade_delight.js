const tax = 0.0625;

// Wait for inline js to load, then perform external js
$(window).on('load', () => {
  let subtotal = 0;
  let num_total = 0;

  //Initialize quantities and item totals
  let quantities = [];
  let total = document.getElementsByName("cost");
  for (let i = 0; i < 5; i++) {
    quantities.push(document.getElementsByName("quan" + i)[0]);
  }

  //Event Listener for individual items, update item total, subtotal, tax, and total
  for (let i = 0; i < 5; i++) {
    quantities[i].addEventListener('input', (event) => {
      let value = event.target.value;
      total[i].value = value * menuItems[i].cost.toFixed(2);
      subtotal = calculateSubtotal(total);
      document.getElementById("subtotal").value = subtotal;
      document.getElementById("tax").value = (subtotal * tax).toFixed(2);
      num_total = (subtotal * (1 + tax)).toFixed(2)
      document.getElementById("total").value = num_total;
    });
  }

  //Jquery listener for pickup or delivery options
  $('input[name="p_or_d"]').on('change', () => {
    if ($('input[name="p_or_d"]:checked').val() == "pickup") {
      $("#street").hide();
      $("#city").hide();
    }
    else {
      $("#street").show();
      $("#city").show();
    }
  })

  //Listener when user submits form. Validates input, and displays order message
  $("#order").on('submit', () => {
    var valid = true;
    var lname = $('input[name="lname"]').val();
    var phone = $('input[name="phone"]').val();
    var street = $('input[name="street"]').val();
    var city = $('input[name="city"]').val();

    // Validate phone and last name
    if (!validatePhoneNumber(phone) || !lname) {
      valid = false;
      alert("Please enter a valid phone and/or last name");
    }
    
    // Validate address, city ONLY when delivery is chosen
    if ($('input[name ="p_or_d"]:checked').val() == "delivery") {
      if (!street || !city) {
        valid = false;
        alert("Please enter a valid delivery address");
      }
    }

    // If inputs are valid, display the order info
    if (valid) {
      var time = calculateTimeNeeded();
      alert(createOrderMessage(quantities, time, num_total));
    }
  })
});

// Calculate subtotal with the current item totals. Empty quantities omitted.
calculateSubtotal = (total) => {
  var subtotal = 0;
  for (let i = 0; i < 5; i++) {
    if (total[i].value.length > 0)
      subtotal += parseFloat(total[i].value);
  }
  return subtotal;
}

// Calculates Estimated Time of Arrival based on delivery or pickup
calculateTimeNeeded = () => {
  time = new Date();
  if ($('input[name ="p_or_d"]:checked').val() == "delivery") {
    time.setMinutes(time.getMinutes() + 30);
  }
  else if ($('input[name ="p_or_d"]:checked').val() == "pickup") {
    time.setMinutes(time.getMinutes() + 15);
  }
  return time;
}

// Creates the order message with all values actualized
createOrderMessage = (quantities, time, num_total) => {
  var display = "Thank you for your order!\n You ordered: \n";
  for (var i = 0; i < 5; i++) {
    if (quantities[i].value > 0)
      display += quantities[i].value + " " + menuItems[i].name + "\n\n"
  }
  display += "Your total was: $" + num_total + "\nETA: " + time.getHours() + ":";
  
  // Handle single digit minute cases.
  if (time.getMinutes() < 10)
    display += "0" + time.getMinutes();
  else
    display += time.getMinutes();
    
  return display;
}

// Validates a phone number in format of USA numbers
function validatePhoneNumber(number){
  var phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return phoneNumberPattern.test(number);
}