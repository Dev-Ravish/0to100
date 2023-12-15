/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor(res1=0){
    this.res1 = res1;
  }

  add( v1 ) {
    this.res1 += v1;
  }

  subtract(v1){
    this.res1 -= v1;
  }
  multiply( v1 ){
    this.res1 *= v1;
  }
  divide(v1){
    if(v1 == 0){
      throw new Error("Something went wrong");
    }
    this.res1/=v1;
  }
  clear(){
    this.res1 = 0;
  }
  getResult(){
    return this.res1;
  }

  eval(s){
    let str = s;
  let n1 = "";
  let f = false,
    re = 0,
    lr;
  for (let i = 0; i < s.length; i++) {
    if (s[i] == "*" || s[i] == "/") {
      let n2 = "";
      for (let j = i + 1; j < s.length; j++) {
        if ((s[j] >= 0 && s[j] <= 9) || s[j]=='.') {
          n2 += s[j];
        } else {
          break;
        }
      }
      if (f) {
        n1 = lr;
      }
      re = parseFloat(n1);
      if (s[i] == "*") {
        re *= parseFloat(n2);
      } else {
        if(parseFloat(n2) == 0){
          throw new Error("Division with 0");
        }
        re /= parseFloat(n2);
        
      }
      lr = re;
      str = str.replace(n1 + s[i] + n2, String(lr));
      f = true;
    } else if ((s[i] >= 0 && s[i] <= 9) || s[i]=='.') {
      n1 += s[i];
    } else {
      n1 = "";
      f = false;
    }
  }
  let sy="+";
  re = 0.0;
  n1 = "";
  for (let i = 0; i < str.length; i++) {
    if ((str[i] >= '0' && str[i] <= '9') || str[i] == '.') {
      n1 += str[i];
    } else {
      if (sy == "+") {
        re = re + parseFloat(n1);
      } else {
        re = re - parseFloat(n1);
      }
      n1 = "";
      sy = str[i];
    }
  }
  if (sy == "+") {
    re += parseFloat(n1);
  } else {
    re -= parseFloat(n1);
  }
  return String(re);
}
  calculate( s ){
    s= s.split(' ').join('');
    let p=0;
    for(let i=0; i<s.length; i++){
      if(!((s[i]>=0 && s[i]<=9) || s[i]=='+' || s[i]=='-' || s[i]=='*' || s[i] =='/' || s[i]==')' || s[i]=='(' || s[i]=='.')){
        throw new Error("Something went wrong");
      }
      if(s[i] == '('){
        p++;
      }
      if(s[i] == ')'){
        p--;
      }

      if(p<0){
        throw new Error("Something went wrong");
      }
    }
    if(p!=0){
      throw new Error("Something went wrong");

    }
    while (s.lastIndexOf("(") > -1) {
      let l = s.indexOf(")");
      let i = s.substring(0,l).lastIndexOf("(");
      let str = s.substring(i + 1, l);
      let res = this.eval(str);
      s = s.replace(s.substring(i, l + 1), res);
    }
    let ans = parseFloat(this.eval(s));
    this.res1 = ans;
  }
}

module.exports = Calculator;
