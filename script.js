let cancelledByUser = false; 

const numericRegex = /^[0-9]+$/;

const msgEnterPwdLength  = "How many characters (8 to 128) would you like your password to contain ?"
const msgPwdLengthValid = "It needs to be a numeric value at least 8 characters and up to 128 characters.";
const msgPwdLengthValidError = "Length of Password entered is invalid.";
const msgPwdLengthNonNumericValidError = "Invalid input for Password Length.";

const msgEnterLowercase = "Click OK to confirm including lowercase characters.";
const msgEnterUppercase = "Click OK to confirm including uppercase characters.";


// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];


// Prompt user to enter length of password (8 to 128).
// If user clicks on cancel then aborts prompt
function promptLengthPwd() {

  let pwdLength;
  let invalidNo = true;

  while (invalidNo) { 

    let userInput = prompt(msgEnterPwdLength);

    if (userInput === null) {
      alert("Cancelled by user");
      cancelledByUser=true;
      break;
    }

    if (numericRegex.test(userInput)) {
      
      pwdLength = parseInt(userInput);
      if (pwdLength >=8 && pwdLength <=128)
      {
        invalidNo = false;
      }
      else 
      {
        alert(msgPwdLengthValidError + ' ' + msgPwdLengthValid + " Please try again.");
        continue;
      }
    }
    else {
      alert(msgPwdLengthNonNumericValidError + ' ' + msgPwdLengthValid);
      continue;
    }
  }

  return pwdLength;
}


function promptAllowMsg(msg) {

  let userInput = prompt(msg);

  if (userInput !== null) {
    return true;
  }  

  return false;
}




// Function to prompt user for password options
function getPasswordOptions() {

  // Prompt user for Length of Password
  let pwdLength = promptLengthPwd();

  // If user cancelled then exit function since no point continuing
  if (cancelledByUser) {
    return;
  }

 let allowLowerCase = promptAllowMsg(msgEnterLowercase);
 
 let allowUpperCase = promptAllowMsg(msgEnterUppercase);
}

// Function for getting a random element from an array
function getRandom(arr) {

}

// Function to generate password with user input
function generatePassword() {
  getPasswordOptions();
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);