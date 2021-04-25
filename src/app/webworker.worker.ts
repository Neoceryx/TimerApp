/// <reference lib="webworker" />

/*
https://blog.bitsrc.io/angular-performance-web-workers-df382c4d3919
https://www.grapecity.com/blogs/speed-up-angular-apps-with-web-workers
*/

function fibonacci(num:any):any {
  
  if (num == 1 || num == 2) {
      return 1
  }

  return fibonacci(num - 1) + fibonacci(num - 2)
}
// end function

function Test(number:any) {

  number = number + 1;

  console.log(number);

  return number;

}
// End function

var number = 0;
function Counter() {

  number += 1;
  console.log(number);
  return number;
  
}
// End Function

addEventListener('message', ({ data }) => {
  
  // postMessage(Test(data));
  postMessage(Counter() );

});
