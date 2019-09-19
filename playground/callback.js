console.log('Starting Callback !');

var getUser = (id , callBackFunction) => {
  var user = {
    id : id,
    name : 'Sagar Singla'
  }
  setTimeout( () => {
    callBackFunction(user);
  },2000 );
};

getUser(31 , (userObject) =>{
  console.log(userObject);
});

var getSystem = (id , callBackFunction) => {
  var system = {
    id,
    name : "Sagar"
  }
  callBackFunction(system);
}

getSystem(100 , (system) => {
  console.log(system);
});
