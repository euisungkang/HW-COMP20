/* 
Hotdogs: $3.25 each
Fries: $2.00 each
Drinks: $1.50 each
Discount: Total >= $20, 10% discount
Tax: 6.25%
*/

prompt_user = () => {
  var hotdogs = prompt("How many hotdogs?");
  var fries = prompt("How many fries?");
  var sodas = prompt("How many sodas?");
  if (hotdogs < 0 || fries < 0 || sodas < 0) {
    alert("Please enter a valid quantity");
    window.location.reload(false); 
  } 
  update_order(hotdogs, fries, sodas);
}

update_order = (hotdogs, fries, sodas) => {
  document.getElementById("hotdogs").innerHTML = hotdogs + " at $3.25 is $" +
                                    (hotdogs * 3.25).toFixed(2);
  document.getElementById("fries").innerHTML = fries + " at $2.00 is $" +
                                    (fries * 2.00).toFixed(2);
  document.getElementById("sodas").innerHTML = sodas + " at $1.50 is $" +
                                    (sodas * 1.50).toFixed(2);

  var discount = false;
  var subtotal = hotdogs * 3.25 + fries * 2.00 + sodas * 1.50;
  if (subtotal >= 20) {
    discount = true;
    subtotal = subtotal * 0.9;
    document.getElementById("discount").innerHTML =
                                      "You've qualified for our 10% discount";
  }
  var tax = subtotal * 0.0625;
  var total = subtotal + tax;

  document.getElementById("subtotal").innerHTML = subtotal.toFixed(2);
  document.getElementById("tax").innerHTML = tax.toFixed(2);
  document.getElementById("total").innerHTML = total.toFixed(2);
}