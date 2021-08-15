fetch("http://cross1:3000/login", {
  headers: {
    "content-type": "application/json",
  },
  credentials:'include',
  body: JSON.stringify({}), // must match 'Content-Type' header
  method: "POST", // *GET, POST, PUT, DELETE, etc.
})
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    console.log(myJson);
  });

const clickTitle = () => {
  // localStorage.setItem("name", "yrobot");
};