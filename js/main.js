const inputs = document.querySelectorAll(".form-group input");
const selects = document.querySelectorAll(".select-group select");
const cardNumber = document.getElementById("cardNumber");
const cardName = document.getElementById("cardName");
const cardMonth = document.getElementById("cardMonth");
const cardYear = document.getElementById("cardYear");
const cvv = document.getElementById("cvv");
const submitBtn = document.getElementById("submitBtn");
const cardNumberError = document.getElementById("cardNumberError");
const cardNameError = document.getElementById("cardNameError");
const cardMonthError = document.getElementById("cardMonthError");
const cardYearError = document.getElementById("cardYearError");
const cardCvvError = document.getElementById("cardCvvError");
const errorMsg = document.querySelectorAll(".errorMsg");

// for each function to get all input and select element
const forEach = (ele, action, funName) => {
  ele.forEach((vl) => {
    vl.addEventListener(action, funName);
  });
};

//input focus function
const focus = (e) => {
  let parent = e.target.parentNode;
  let grPar = e.target.parentNode.parentNode;
  if (grPar.classList[0] === "select-wrap") {
    grPar.classList.add("smallLabel");
  }
  parent.classList.add("focus");
};

// input blur funtion
const blur = (e) => {
  let parent = e.target.parentNode;
  let grPar = e.target.parentNode.parentNode;
  let tarVal = e.target.value;
  if (tarVal === "" || tarVal === "Year" || tarVal === "Month") {
    parent.classList.remove("focus");
    grPar.classList.remove("smallLabel");
  }
};

//log function
const trace = (ev) => {
  console.log(ev);
};

forEach(inputs, "focus", focus);
forEach(inputs, "blur", blur);
forEach(selects, "focus", focus);
forEach(selects, "blur", blur);

// hide error message function
const hideError = () =>
  errorMsg.forEach((val) => {
    val.style.display = "none";
  });

// display error message function
const errorMsgFunc = (ele, visibilty, msg) => {
  ele.style.display = visibilty;
  ele.innerText = msg;
};

// submit function of form
const submitFunc = (e) => {
  e.preventDefault();
  let cardRegex = new RegExp("^[0-9]+$");
  let nameRegex = new RegExp("^[a-zA-Z ]+$");
  if (!cardNumber.value || cardNumber.value === "") {
    errorMsgFunc(cardNumberError, "block", "Please Enter Input");
    return false;
  }
  if (!cardRegex.test(cardNumber.value)) {
    errorMsgFunc(cardNumberError, "block", "Enter Only Number");
    return false;
  }
  if (cardNumber.value.length < 16) {
    errorMsgFunc(cardNumberError, "block", "Min Value is 16");
    return false;
  }
  if (cardName.value === "") {
    hideError();
    errorMsgFunc(cardNameError, "block", "Please Enter Input");
    return false;
  }
  if (!nameRegex.test(cardName.value)) {
    hideError();
    errorMsgFunc(cardNameError, "block", "Enter Only Alphabet");
    return false;
  }
  if (cardMonth.value === "Month") {
    hideError();
    errorMsgFunc(cardMonthError, "block", "Please select a value");
    return false;
  }
  if (cardYear.value === "Year") {
    hideError();
    errorMsgFunc(cardYearError, "block", "Please select a value");
    return false;
  }
  if (cvv.value === "" || cvv.value < 3) {
    hideError();
    errorMsgFunc(cardCvvError, "block", "Please Enter Value");
    return false;
  }
  hideError();
  let dataObject = {
    number: cardNumber.value,
    name: cardName.value,
    month: cardMonth.value,
    year: cardYear.value,
    cvv: cvv.value,
  };
  inputs.forEach((vl) => (vl.value = ""));
  trace(dataObject);
  document.getElementById("formWrap").style.display = "none";
  document.getElementById("thankYouMsg").style.display = "block";
  document.querySelector(".form").classList.add("paddingTop");
  const pre = document.createElement("p");
  pre.setAttribute("class", "jsonData");
  document
    .getElementById("thankYouMsg")
    .appendChild(pre).innerText = JSON.stringify(dataObject);
};

// eventlistner on submit button
submitBtn.addEventListener("click", submitFunc);


// allow to input only number function
const checkDigit = (event) => {
  let code = event.which ? event.which : event.keyCode
  if ((code < 48 || code > 57) && code > 31) {
    return false;
  }
  return true;
};
