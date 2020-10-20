/*
Easton Euisung Kang
COMP-20
Professor Diorio

Last Modified: 10/19/2020
*/

var number1, number2, factor1, factor2

// Event Handler Function: Initializes and Displays all appropriate variables
display_info = () => {
    // Initialize all numbers and their factor arrays.
    number1 = document.getElementById("number1").value;
    number2 = document.getElementById("number2").value;
    factor1 = getFactors(number1);
    factor2 = getFactors(number2);

    // Display all variables in HTML page
    document.getElementById("n1").innerHTML = "Number 1: " + number1;
    document.getElementById("n2").innerHTML = "Number 2: " + number2;
    document.getElementById("f1").innerHTML = "Factor 1: " + factor1;
    document.getElementById("f2").innerHTML = "Factor 2: " + factor2;

    if (amicable(number1, number2, factor1, factor2)) {
        document.getElementById("amicable").innerHTML =
                                        "Your numbers are amicable!";
    } else {
        document.getElementById("amicable").innerHTML =
                                        "Sorry your numbers are not amicable"
    }
}

// Checks if two numbers are amicable given their factors
amicable = (n1, n2, f1, f2) => {
    return (showArray(f1) == n2 && showArray(f2) == n1);
}

// Checks if a number is a factor
isFactor = (n, factor) => {
    return (n % factor === 0)
}

// Takes in an array and returns the sum of all its elements
showArray = (xs) => {
    var sum = 0;
    for (var i = 0; i < xs.length; i++) {
        sum += xs[i];
    }
    return sum;
}

// Takes in a number and returns an array of all its factors
getFactors = (n) => {
    var factors = [];
    for (var i = 1; i < n; i++) {
        if (isFactor(n, i))
            factors.push(i)
    }
    return factors;
}