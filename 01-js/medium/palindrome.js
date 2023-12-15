/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.toLowerCase();
  let str1="";
  
  for(let i=0; i<=str.length ; i++){
    if(str[i]>='a' && str[i]<='z'){
      str1+=str[i];
    }
  }
  let e = str1.length-1;
  for(let i=0; i<=str1.length ; i++){

    if(str1[i] != str1[e]){
      return false;
    }

    e--;
  }
  return true;
}

module.exports = isPalindrome;
