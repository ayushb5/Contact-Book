let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function toggleButton() {
  const btn = document.getElementById("addContactBtn");
  const contactCard = document.getElementById("contactCard");

  if (contacts.length >= 1) {
    btn.classList.add("d-none");
    contactCard.classList.remove("d-none");
  } else {
    btn.classList.remove("d-none");
    contactCard.classList.add("d-none");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  toggleButton();
  renderCarousel();
});

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
  return (
    validateImgUrl() &&
    validateName() &&
    validatePhnNo() &&
    validateAddress() &&
    validateProfession()
  );
}

// saveContact
function saveContact() {
  if (!validate()) {
    return;
  }

  const contact = {
    imgUrl: fields.imgUrl.value.trim(),
    name: fields.contactName.value.trim(),
    phone: fields.phn_no.value.trim(),
    address: fields.address.value.trim(),
    profession: fields.profession.value.trim(),
  };
  contacts.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contacts));

  currentIndex = contacts.length - 1;
  renderCarousel();
  carousel.to(currentIndex);
  toggleButton();
  handleReset();

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("addContact"),
  );

  modal.hide();
}

// handleReset
function handleReset() {
  fields.imgUrl.value = "";
  fields.contactName.value = "";
  fields.phn_no.value = "";
  fields.address.value = "";
  fields.profession.value = "";

  errors.imgError.innerText = "";
  errors.nameError.innerText = "";
  errors.numberError.innerText = "";
  errors.addressError.innerText = "";
  errors.professionError.innerText = "";
}

// show Contact(render)
let currentIndex = 0;
function renderCarousel() {
  const carousel = document.getElementById("carouselInner");
  carousel.innerHTML = "";

  contacts.forEach((contact, index) => {
    const item = document.createElement("div");
    item.className = "carousel-item " + (index === 0 ? "active" : "");

    item.innerHTML = `
      <div class="card shadow main-card">
        <div class="card-body">

          <div class="d-flex align-items-center mb-3 gap-3">
            <img src="${contact.imgUrl}" class="img-fluid" id="profileImg"/>

            <div>
              <h5 class="mb-0">${contact.name}</h5>
              <small class="text-muted">${contact.profession}</small>
            </div>
          </div>

          <p class="mb-1">
            <i class="bi bi-telephone"></i> ${contact.phone}
          </p>

          <p class="text-muted">
            <i class="bi bi-geo-alt"></i> ${contact.address}
          </p>

          <div class="d-flex gap-2">
            <a href="tel:${contact.phone}" class="btn btn-success w-100">
              <i class="bi bi-telephone"></i> Call
            </a>

            <a href="https://wa.me/91${contact.phone}" target="_blank" class="btn btn-dark w-100">
              <i class="bi bi-chat-dots"></i> WhatsApp
            </a>
          </div>

        </div>
      </div>
    `;

    carousel.appendChild(item);
  });
}

// carousel prev,next
const carousel = new bootstrap.Carousel(
  document.querySelector("#contactCarousel"),
  {
    wrap: true,
  },
);
document.getElementById("prev").onclick = () => carousel.prev();
document.getElementById("next").onclick = () => carousel.next();

// Event listeners for validation
fields.imgUrl.addEventListener("input", validateImgUrl);
fields.contactName.addEventListener("input", validateName);
fields.phn_no.addEventListener("input", validatePhnNo);
fields.address.addEventListener("input", validateAddress);
fields.profession.addEventListener("input", validateProfession);

// Validation Functions
function validateImgUrl() {
  const value = fields.imgUrl.value.trim();
  if (value === "") {
    errors.imgError.innerText = "Image URL is required.";
    return false;
  } else if (!value.match(/^(https?:\/\/[^\s]+)$/i)) {
    errors.imgError.innerText = "Enter a valid URL.";
    return false;
  } else {
    errors.imgError.innerText = "";
    return true;
  }
}

function validateName() {
  const value = fields.contactName.value.trim();
  if (value === "") {
    errors.nameError.innerText = "Name is required.";
    return false;
  } else if (!value.match(/^[A-Za-z ]{3,}$/)) {
    errors.nameError.innerText = "Enter a valid Name (e.g. John Doe).";
    return false;
  } else {
    errors.nameError.innerText = "";
    return true;
  }
}

function validatePhnNo() {
  const value = fields.phn_no.value.trim();
  if (value === "") {
    errors.numberError.innerText = "Phone Number is required.";
    return false;
  } else if (!value.match(/^[6-9]\d{9}$/)) {
    errors.numberError.innerText =
      "Enter a valid Indian Phone Number (e.g. 9878765678).";
    return false;
  } else {
    errors.numberError.innerText = "";
    return true;
  }
}

function validateAddress() {
  const value = fields.address.value.trim();
  if (value === "") {
    errors.addressError.innerText = "Address is required.";
    return false;
  } else if (value.length < 3) {
    errors.addressError.innerText = "Enter a valid address (min 3 characters).";
    return false;
  } else {
    errors.addressError.innerText = "";
    return true;
  }
}

function validateProfession() {
  const value = fields.profession.value.trim();
  if (value === "") {
    errors.professionError.innerText = "Profession is required.";
    return false;
  } else if (value.length < 3) {
    errors.professionError.innerText =
      "Enter a valid Profession (More than 3 Characters).";
    return false;
  } else {
    errors.professionError.innerText = "";
    return true;
  }
}
