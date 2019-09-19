console.log('Promises Starting Here !!');

var firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Hey it worked !!');
  },3000)
});

firstPromise.then((message) => {
  console.log("Success" );
}, (err) =>{
  console.log("Failed" );
});

// Function Method for Promise
var addAsync = (a, b) => {
  return new Promise((resolve, reject) => {
    if(typeof a === 'number' && typeof b === 'number'){
      resolve(a+b);
    }
    else{
      reject('Unable to find numbers');
    }
  });
}

// Promises Chaining Method
addAsync(10, '20').then((result) => {
  console.log(result);
   return addAsync(result,30);
}).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});
