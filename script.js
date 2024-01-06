let cancelledByUser = false;

// Constant for numeric only regular expression
const numericRegex = /^[0-9]+$/;

// Constant types for character types
const charTypeLowerCase = "LOWERCASE";
const charTypeUpperCase = "UPPERCASE";
const charTypeNumeric = "NUMERIC";
const charTypeSpecialChar = "SPECIALCHAR";


// Constants for Password Length data entry
const msgEnterPwdLength = "How many characters (8 to 128) would you like your password to contain ?"
const msgPwdLengthValid = "It needs to be a numeric value at least 8 characters and up to 128 characters.";
const msgPwdLengthValidError = "Length of Password entered is invalid.";
const msgPwdLengthNonNumericValidError = "Invalid input for Password Length.";

const pwdLengthMin = 8;
const pwdLengthMax = 128;



// Constants for Character types data entry
const msgEnterLowercase = "Click OK to confirm including lowercase characters.";
const msgEnterUppercase = "Click OK to confirm including uppercase characters.";
const msgEnterNumeric = "Click OK to confirm including numeric characters.";
const msgEnterSpecialChar = "Click OK to confirm including special char characters.";

// Constant for error message if no user option selected
const msgNoUserOptionSelectedValidError = "Unable to generate password as no user options selected. Please try again by clicking on 'Generate Password'."


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

  let pwdLength=0;
  let invalidNo = true;

  // Repetition of loop until user enters valid number or clicks cancel
  while (invalidNo) {

    // Prompt user to enter password length
    let userInput = prompt(msgEnterPwdLength);

    // Detect if user has selected cancel
    if (userInput === null) {
      alert("Cancelled by user");
      cancelledByUser = true;
      break;
    }

    // Test input with numeric regular expression
    if (numericRegex.test(userInput)) {

      // Convert input to integer  
      pwdLength = parseInt(userInput);
      
      // Ensure password length is within min and max range
      if (pwdLength >= pwdLengthMin && pwdLength <= pwdLengthMax) {
        // Password length is acceptable
        invalidNo = false;
      }
      else {
        // Display message that password length entered is invalid
        alert(msgPwdLengthValidError + ' ' + msgPwdLengthValid + " Please try again.");
        continue;
      }
    }
    else {
        // Display message that password length entered is non-numeric
        alert(msgPwdLengthNonNumericValidError + ' ' + msgPwdLengthValid);
        continue;
    }
  }

  return pwdLength;
}


// Function that prompts user for password criteria ie. various char types 
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

  let allowNumeric = promptAllowMsg(msgEnterNumeric);

  let allowSpecialChar = promptAllowMsg(msgEnterSpecialChar);

  // return data as object
  return {
    pwdLength: pwdLength,
    allowLowerCase: allowLowerCase,
    allowUpperCase: allowUpperCase,
    allowNumeric: allowNumeric,
    allowSpecialChar: allowSpecialChar
  }
}


// Parse parameter object and add to array char types user selected to include 
function CharTypesToIncludeIntoArray(userSelectOpt) {

  let charTypesToInclude = [];

  if (userSelectOpt.allowLowerCase) {
    charTypesToInclude.push(charTypeLowerCase);
  }

  if (userSelectOpt.allowUpperCase) {
    charTypesToInclude.push(charTypeUpperCase);
  }

  if (userSelectOpt.allowNumeric) {
    charTypesToInclude.push(charTypeNumeric);
  }

  if (userSelectOpt.allowSpecialChar) {
    charTypesToInclude.push(charTypeSpecialChar);
  }

  return charTypesToInclude
}

// Function for getting a random element from an array
function getRandom(arr) {

  if (arr.length === 0) {
    return undefined; // Return undefined for an empty array
  }

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}


// Look up char type and then get random char from that array
function LookupCharTypeToGetRandomChar(charType) {

  let randomChar = "";

  switch (charType) {

    case charTypeLowerCase:
      randomChar = getRandom(lowerCasedCharacters);
      break;

    case charTypeUpperCase:
      randomChar = getRandom(upperCasedCharacters);
      break;

    case charTypeNumeric:
      randomChar = getRandom(numericCharacters);
      break;

    case charTypeSpecialChar:
      randomChar = getRandom(specialCharacters);
      break;
  }

  return randomChar;
}


// Initial password to blank - this works best when user decides to generate password 
// again and then cancels or validation fails so it then resets password to blank
function InitialPassword() {
  var passwordText = document.querySelector('#password');
  passwordText.value = "";
}


// Function to generate password with user input
function generatePassword() {

  // Initialise
  cancelledByUser = false;

  // Initialise Password to blank
  InitialPassword();

  let userSelectOpt = getPasswordOptions();
   
  if (cancelledByUser) {
    return false;
  }

  let charTypesToInclude = CharTypesToIncludeIntoArray(userSelectOpt);
  let pwd = "";

  // If user has not selected any char types to include in password generation
  // then display validation error message
  if (charTypesToInclude.length === 0) {
    alert(msgNoUserOptionSelectedValidError);
  }
  else {

    // Get random char type from 'charTypesToInclude' array 
    // then get random char for that type and build pwd string
    for (let i = 1; i <= (userSelectOpt.pwdLength - charTypesToInclude.length); i++) {
      let charType = getRandom(charTypesToInclude);
      pwd = pwd + LookupCharTypeToGetRandomChar(charType);
    }
  
    // Finally we shall make sure there is one character for each type from the 'charTypestoInclude' array.
    // This is done by parsing through 'charTypesToInclude' array and get random char for that type.
    for (let i = 0; i < charTypesToInclude.length; i++) {
      let charType = charTypesToInclude[i];
      pwd = pwd + LookupCharTypeToGetRandomChar(charType);
    }
  }

  return pwd;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  if (password.length>0)
  {
    var passwordText = document.querySelector('#password');
    passwordText.value = password; 
  }
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);

