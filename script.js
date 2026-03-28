const fields = {
  imgUrl: document.getElementById("imgUrl"),
  contactName: document.getElementById("contactName"),
  phn_no: document.getElementById("phn_no"),
  address: document.getElementById("address"),
  profession: document.getElementById("profession"),
};

const errors = {
  imgError: document.getElementById("imgError"),
  nameError: document.getElementById("nameError"),
  numberError: document.getElementById("numberError"),
  addressError: document.getElementById("addressError"),
  professionError: document.getElementById("professionError"),
};

function validate() {
  let isValid = true;
  // Image URL error
  if (fields.imgUrl.value.trim() === "") {
    errors.imgError.innerText = "Image URL is required.";
    isValid = false;
  } else {
    errors.imgError.innerText = "";
  }

  //   Contact Name error
  if (fields.contactName.value.trim() === "") {
    errors.nameError.innerText = "Name is required.";
    isValid = false;
  } else {
    errors.nameError.innerText = "";
  }

  //   Number error
  if (fields.phn_no.value.trim() === "") {
    errors.numberError.innerText = "Phone Number is required.";
    isValid = false;
  } else {
    errors.numberError.innerText = "";
  }

  //   Address error
  if (fields.address.value.trim() === "") {
    errors.addressError.innerText = "Address is required.";
    isValid = false;
  } else {
    errors.addressError.innerText = "";
  }

  //   Profession error
  if (fields.profession.value.trim() === "") {
    errors.professionError.innerText = "Profession is required.";
    isValid = false;
  } else {
    errors.professionError.innerText = "";
  }

  return isValid;
}

// saveContact
function saveContact() {}

// handleReset
function handleReset() {
  fields.imgUrl.value = "";
  fields.contactName.value = "";
  fields.phn_no.value = "";
  fields.address.value = "";
  fields.profession.value = "";
}

// Event listeners for validation
fields.imgUrl.addEventListener("input", () => {
  if (fields.imgUrl.value.trim() === "") {
    errors.imgError.innerText = "Image URL is required.";
  } else if (!fields.imgUrl.value.match(/^(https?:\/\/[^\s]+)$/i)) {
    errors.imgError.innerText = "Enter a valid URL.";
  } else {
    errors.imgError.innerText = "";
  }
});

fields.contactName.addEventListener("input", () => {
  if (fields.contactName.value.trim() === "") {
    errors.nameError.innerText = "Name is required.";
  } else if (!fields.contactName.value.match(/^[A-Za-z]+ [A-Za-z]+$/)) {
    errors.nameError.innerText = "Enter a valid Name (e.g. John Doe).";
  } else {
    errors.nameError.innerText = "";
  }
});

fields.phn_no.addEventListener("input", () => {
  if (fields.phn_no.value.trim() === "") {
    errors.numberError.innerText = "Phone Number is required.";
  } else if (!fields.phn_no.value.match(/^[6-9]\d{9}$/)) {
    errors.numberError.innerText =
      "Enter a valid Indian Phone Number (e.g. 9878765678).";
  } else {
    errors.numberError.innerText = "";
  }
});

fields.address.addEventListener("input", () => {
  if (fields.address.value.trim() === "") {
    errors.addressError.innerText = "Address is required.";
  } else if (fields.address.value.length < 10) {
    errors.addressError.innerText =
      "Enter a valid Address (More than 10 characters).";
  } else {
    errors.addressError.innerText = "";
  }
});

fields.profession.addEventListener("input", () => {
  if (fields.profession.value.trim() === "") {
    errors.professionError.innerText = "Profession is required.";
  } else if (fields.profession.value.length < 3) {
    errors.professionError.innerText =
      "Enter a valid Profession (More than 3 Characters).";
  } else {
    errors.professionError.innerText = "";
  }
});
