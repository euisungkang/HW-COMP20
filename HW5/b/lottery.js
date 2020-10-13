var numbers = [];
var luckyBall;

/* Prompts the user for their random 5 numbers and their lucky ball. Function
   will assume the correct inputs are within expected parameters */
prompt_user = () => {
  numbers = prompt("Enter winning numbers separated by a space").split(' ');
  luckyBall = prompt("Enter Lucky Ball number");
  process_winning_numbers(numbers, luckyBall);
}

/* Creates the winning numbers, and compares them to the user's numbers */
process_winning_numbers = (numbers, luckyBall) => {
  var winning_numbers = [];
  var winning_luckyBall;

  // Create the winning numbers
  for (var i = 0; i < 5; i++) {
    winning_numbers[i] = get_random_from_range(1, 48);
  }
  numbers.sort((a, b) => {return a - b});
  winning_luckyBall = get_random_from_range(1, 18);

  // Eventhough we use a nested for loop, the runtime is always O(25) = O(1).
  var win_counter = 0;
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      if (numbers[i] == winning_numbers[j])
        win_counter++;
    }
  }
  winning_numbers.sort((a, b) => {return a - b});

  /* The winnings map determins luckyBall wins by +0.5. Look at
     create_winnings_map() */
  var luckyBallWin = 0;
  if (luckyBall == winning_luckyBall)
    luckyBallWin = 0.5;

  document.getElementById("numbers").innerHTML = numbers;
  document.getElementById("luckyBall").innerHTML = luckyBall;
  document.getElementById("winning_numbers").innerHTML = winning_numbers;
  document.getElementById("winning_luckyBall").innerHTML = winning_luckyBall;
  calculate_winnings(win_counter, luckyBallWin);
}

/* Calculates how much the user won */
calculate_winnings = (wins, luckyBall) => {

  // 0 or 1 match without luckyBall means the user lost
  if ((wins + luckyBall != 0) && (wins + luckyBall != 1)) {
    var results = create_winnings_map();
    document.getElementById("results").innerHTML = "You won! Payout: $" + 
                                                results.get(wins + luckyBall);
  } else {
    document.getElementById("results").innerHTML = "Sorry, you didn't win.";
  }
}

/* Random number generator given a min and max */
get_random_from_range = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Map containing all result parameters in homework assignment */
create_winnings_map = () => {
  var results = new Map();
  results.set(0, "0");
  results.set(0.5, "4");
  results.set(1, "0");  
  results.set(1.5, "6");
  results.set(2, "3");
  results.set(2.5, "25");
  results.set(3, "20");
  results.set(3.5, "150");
  results.set(4, "200");
  results.set(4.5, "5000");
  results.set(5, "25000 a YEAR for LIFE");
  results.set(5.5, "7000 a WEEK for LIFE");
  return results;
}