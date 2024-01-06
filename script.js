let cancelledByUser = false;

const numericRegex = /^[0-9]+$/;

const charTypeLowerCase = "LOWERCASE";
const charTypeUpperCase = "UPPERCASE";
const charTypeNumeric = "NUMERIC";
const charTypeSpecialChar = "SPECIALCHAR";



const msgEnterPwdLength = "How many characters (8 to 128) would you like your password to contain ?"
const msgPwdLengthValid = "It needs to be a numeric value at least 8 characters and up to 128 characters.";
const msgPwdLengthValidError = "Length of Password entered is invalid.";
const msgPwdLengthNonNumericValidError = "Invalid input for Password Length.";

const msgEnterLowercase = "Click OK to confirm including lowercase characters.";
const msgEnterUppercase = "Click OK to confirm including uppercase characters.";
const msgEnterNumeric = "Click OK to confirm including numeric characters.";
const msgEnterSpecialChar = "Click OK to confirm including special char characters.";

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

  while (invalidNo) {

    let userInput = prompt(msgEnterPwdLength);

    if (userInput === null) {
      alert("Cancelled by user");
      cancelledByUser = true;
      break;
    }

    if (numericRegex.test(userInput)) {

      pwdLength = parseInt(userInput);
      if (pwdLength >= 8 && pwdLength <= 128) {
        invalidNo = false;
      }
      else {
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

  let allowNumeric = promptAllowMsg(msgEnterNumeric);

  let allowSpecialChar = promptAllowMsg(msgEnterSpecialChar);

  return {
    pwdLength: pwdLength,
    allowLowerCase: allowLowerCase,
    allowUpperCase: allowUpperCase,
    allowNumeric: allowNumeric,
    allowSpecialChar: allowSpecialChar
  }
}


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

