////////Global Variables to use in all functions///////////////////
let arr = [];
let _parm = [];
let currentUser = "";
let file = "";
let fileUrl = "";
let filterArray = [];
let pay="";
///////////////////////Start of Adding Products in DB thorugh API//////////////
function addProducts() {
  // const form = document.querySelector("form");
  // form.addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(form);
  //   axios
  //     .post("https://25e4-2400-adc5-477-c400-f9da-8a1f-17b3-2753.ap.ngrok.io/products", formData, {

  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });
  // console.log(FileUrl)

  var bodyFormData = new FormData();
  bodyFormData.append(
    "product_name",
    document.getElementById("product_name").value
  );
  bodyFormData.append(
    "product_price",
    document.getElementById("product_price").value
  );
  bodyFormData.append(
    "product_desc",
    document.getElementById("product_desc").value
  );
  // bodyFormData.append('image', file);
  axios
    .post(
      "https://f1f8-2400-adc5-477-c400-6811-c174-ca39-29f8.ap.ngrok.io/products",
      bodyFormData,
      {
        "Content-Type": "multipart/form-data",
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
///////////////////////End of Adding Products in DB thorugh API//////////////

///////////////////////Start of getting Products from DB after fecting data through APi//////////////
function getPoducts() {
  axios
    .get(
      "https://f1f8-2400-adc5-477-c400-6811-c174-ca39-29f8.ap.ngrok.io/getProduct"
    )
    .then((response) => {
      arr = response.data;
      console.log(response.data);
      showPrducts(arr);
    })
    .catch((error) => {
      console.log(error);
    });
}
///////////////////////End of getting Products from DB after fecting data through APi//////////////

////////////////////Start of Showing Products atfer the api response/////////////////////////

function showPrducts(parm) {
  _parm = parm;
  document.getElementById("cards").innerHTML = "";
  if (parm === arr) {
    for (let index = 0; index < arr.length; index++) {

      // fileUrl = window.URL.createObjectURL(arr[index].image);
      // console.log(typeof(arr[index].image));
      document.getElementById("cards").innerHTML += `
    <div class="col-4" >
  <div class="card ineerCard" >
    <div><img src="${fileUrl}" width="380px" height="300px"
    alt="img"></div>
    <div>${arr[index].product_name}</div>
    <div>${arr[index].product_desc}</div>
    <div>${arr[index].product_price}</div>
<div class="row">
<div class="col-6">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  onclick="previousvalue(${index})">edit</button>
</div>
<div class="col-6">
  <button type="button" onclick="del(${index})" class="btn btn-danger">delete</button>
</div>
<div class="col-6">
    <button type="button" style="margin-top:20px;" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  onclick="payment()">Make Payment</button>
</div>
</div>
</div>
</div>`;
    }
  } else if (parm === filterArray) {
    for (let index = 0; index < filterArray.length; index++) {
      // fileUrl = window.URL.createObjectURL(arr[index].image);
      // console.log(typeof(arr[index].image));
      document.getElementById("cards").innerHTML += `
    <div class="col-4" >
  <div class="card" >
    <div><img src="${fileUrl}" width="380px" height="300px"
    alt="img"></div>
    <div>${filterArray[index].product_name}</div>
    <div>${filterArray[index].product_desc}</div>
    <div>${filterArray[index].product_price}</div>
<div class="row">
<div class="col-6">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  onclick="previousvalue(${index})">edit</button>
</div>
<div class="col-6">
  <button type="button" onclick="del(${index})" class="btn btn-danger">delete</button>
</div>
</div>
</div>
</div>`;
    }
  } else if (filterArray.length) {
    for (let index = 0; index < arr.length; index++) {
      // fileUrl = window.URL.createObjectURL(arr[index].image);
      // console.log(typeof(arr[index].image));
      document.getElementById("cards").innerHTML += `
    <div class="col-4" >
  <div class="card" >
    <div><img src="${fileUrl}" width="380px" height="300px"
    alt="img"></div>
    <div>${arr[index].product_name}</div>
    <div>${arr[index].product_desc}</div>
    <div>${arr[index].product_price}</div>
<div class="row">
<div class="col-6">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  onclick="previousvalue(${index})">edit</button>
</div>
<div class="col-6">
  <button type="button" onclick="del(${index})" class="btn btn-danger">delete</button>
</div>
</div>
</div>
</div>`;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////

function payment(){
  console.log("hii")
}

/////////////////////////////////////////////////////////////////////////////////////



////////////////////End of Showing Products atfer the api response/////////////////////////










/////////////////////////////Start of Editing Products  and showing the updated products//////////////////////
function editProducts() {
  if (_parm === arr) {
    axios
      .put(
        `https://f1f8-2400-adc5-477-c400-6811-c174-ca39-29f8.ap.ngrok.io/products/update/${arr[currentUser]._id}`,
        {
          product_name: document.getElementById("product_name").value,
          product_desc: document.getElementById("product_desc").value,
          product_price: document.getElementById("product_price").value,
        }
      )
      .then((response) => {
        getPoducts();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (_parm === filterArray) {
    axios
      .put(
        `https://f1f8-2400-adc5-477-c400-6811-c174-ca39-29f8.ap.ngrok.io/products/update/${filterArray[currentUser]._id}`,
        {
          product_name: document.getElementById("product_name").value,
          product_desc: document.getElementById("product_desc").value,
          product_price: document.getElementById("product_price").value,
        }
      )
      .then((response) => {
        getPoducts();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
/////////////////////////////End of Editing Products  and showing the updated products//////////////////////

/////////////////////////////Start of DEleting Products  and showing the Remaining products//////////////////////
function del(i) {
  if (_parm === arr) {
    axios
      .delete(
        `https://f1f8-2400-adc5-477-c400-6811-c174-ca39-29f8.ap.ngrok.io/products/delete/${arr[i]._id}`
      )
      .then((response) => {
        getPoducts();
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (_parm === filterArray) {
    axios
      .delete(
        `https://f1f8-2400-adc5-477-c400-6811-c174-ca39-29f8.ap.ngrok.io/products/delete/${filterArray[i]._id}`
      )
      .then((response) => {
        getPoducts();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
/////////////////////////////End of Deleting Products  and showing the Remaining products//////////////////////

function check(e) {
  file = e.target.files[0];
  console.log("file", file);
  fileUrl = URL.createObjectURL(e.target.files[0]);
  // console.log(e.target.files[0]);
  console.log(fileUrl);
  // document.getElementById("check").innerHTML += `
  // <img src="${fileUrl}" width="380px" height="300px"
  //   alt="img">`;
}

///////////////////////////Start of setting Previous Values in modal for edit /////////////////
function previousvalue(index) {
  currentUser = index;
  if (_parm === arr) {
    document.getElementById("product_name").value = arr[index].product_name;
    document.getElementById("product_desc").value = arr[index].product_desc;
    document.getElementById("product_price").value = arr[index].product_price;
  } else if (_parm === filterArray) {
    document.getElementById("product_name").value =
      filterArray[index].product_name;
    document.getElementById("product_desc").value =
      filterArray[index].product_desc;
    document.getElementById("product_price").value =
      filterArray[index].product_price;
  }
}
///////////////////////////End  of setting Previous Values in modal for edit /////////////////

/////////////start of search Query////////////////////
function search() {
  const value = document.getElementById("search").value;
  filterArray = arr.filter((obj) => {
    let isIncl = obj.product_name.includes(value);
    if (isIncl) return obj;
  });
  showPrducts(filterArray);
}
/////////////End of search Query////////////////////
