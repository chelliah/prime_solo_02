// ! ! !
// Three Bugs


// First bug found on line 19: 
// array[i] = calculateSTI(array) should be: 
// array[i] = calculateSTI(array[i])

// calculate STI array puts the array [arrayAtticus, arrayJem, arrayBoo, arrayScout] as its input, where we actually want to index through each of the arrays inside the variable array, this is corrected by adding [i] to access the arrays inside the multi-dimensional array. 

// Second bug found on line 67:
// return basePercent - 1; should be:
// return basePercent;

// getBaseSTI returns basePercent-1 on line 67, this causes the value of the STI to be negative which causes miscalculations when determining total bonus and adjusted salary.  Eliminating the (- 1) from the return value fixes the error in STI percent calculation. 

// Third bug found on lines 41-42:
//   newArray[2] = baseSalary * (1.0 + bonus); 
//   newArray[3] = baseSalary * bonus;

// should be: 
//   newArray[2] = Math.round(baseSalary * (1.0 + bonus)); 
//   newArray[3] = Math.round(baseSalary * bonus);


// Third bug found, bonus percentage is used to calculate total Bonus and adjusted Salary, but these values are not rounded to the nearest whole number, causing the resulting total bonus and adjusted salary values to remain floating point numbers. Using Math.round() adjusts these values to the nearest whole number.  

var arrayAtticus = ["Atticus", "2405", "47000", 3];
var arrayJem = ["Jem", "62347", "63500", 4];
var arrayBoo = ["Boo", "11435", "54000", 3];
var arrayScout = ["Scout", "6243", "74750", 5];

var array = [arrayAtticus, arrayJem, arrayBoo, arrayScout];

//Create variables used to write to the DOM
var newEl, newText, position;
//Capture the position of insertion into the DOM
position = document.getElementById('content');

//Loop the array, extracting each array and writing information to the DOM
//Note that the information is not 'clean'
for(var i = 0; i < array.length; i++){
	array[i] = calculateSTI(array[i]); //FIRST BUG FOUND : calculate STI array puts the array [arrayAtticus, arrayJem, arrayBoo, arrayScout] as its input, where we actually want to index through each of the arrays inside the variable array
 	newEl = document.createElement('li');
	newText = document.createTextNode(array[i]);
	newEl.appendChild(newText);
	position.appendChild(newEl);
}

function calculateSTI(array){
  var newArray = [];

  newArray[0] = array[0];

  var employeeNumber = array[1];
  var baseSalary = array[2];
  var reviewScore = array[3];

  var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);
  if(bonus > 0.13){
    bonus = 0.13;
  }

  newArray[1] = bonus;
  newArray[2] = Math.round(baseSalary * (1.0 + bonus)); //Third bug found, bonus percentage is used to calculate total Bonus and adjusted Salary, but these values are not rounded to the nearest whole number. 
  newArray[3] = Math.round(baseSalary * bonus);
  console.log(newArray[0] + " " + newArray[1] + " " + newArray[2] + " " + newArray[3]);
  return newArray;
}

function getBaseSTI(reviewScore){
  var basePercent;
  switch(reviewScore){
    case 1:
      basePercent = 0;
      break;
    case 2:
      basePercent = 0;
      break;
    case 3:
      basePercent = 0.04;
      break;
    case 4:
      basePercent = 0.06;
      break;
    case 5:
      basePercent = 0.10;
      break;
  }
  // return basePercent - 1;
  return basePercent; //Second bug found, getBaseSTI returns basePercent-1 on line 67, this causese the value of the STI to be negative which causes miscalculations when determining total bonus and adjusted salary
}

function getYearAdjustment(employeeNumber){
  var yearAdjustment = 0;
  if(employeeNumber.length == 4){
    yearAdjustment = 0.05;
  }
  return yearAdjustment;
}

function getIncomeAdjustment(salary){
  var incomeAdjustment = 0;
  salary = parseInt(salary);
  if(salary > 65000){
    incomeAdjustment = 0.01;
  }
  return incomeAdjustment;
}