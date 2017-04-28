/*
Description:

Write a function named firstNonRepeatingCharacter that takes a string input, and returns the first character that is not repeated anywhere in the string.

For example, if given the input 'stress', the function should return 't', since the letter t only occurs once in the string, and occurs first in the string.

As an added challenge, upper- and lowercase letters are considered the same character, but the function should return the correct case for the initial letter. For example, the input 'sTreSS' should return 'T'.

If a string contains all repeating characters, it should return the empty string ("").

*/

//voted most clever
function firstNonRepeatingLetter(s) {
  for(var i in s) {
    if(s.match(new RegExp(s[i],"gi")).length === 1) {
      return s[i];
    }
  }
  return '';
}

//my first try
function firstNonRepeatingLetter(s) {
  console.log(s);
  var charMap = {};
  var letters = s.split('');
  
  letters.forEach(function(char) {
    if (!charMap[char.toLowerCase()]) {
      charMap[char.toLowerCase()] = 0;
    }
    charMap[char.toLowerCase()]++;
  });
  
  var firstChar = '';
  
  letters.forEach(function(char) {
    if (charMap[char.toLowerCase()] == 1 && !firstChar) {
      firstChar = char;
    }
  });
  
  return firstChar;
}

