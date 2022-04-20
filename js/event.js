export { eventListener, domSelection };
import { display } from "./display.js";
import { sort, remove, Done, percentage } from "./controller.js";
let domSelection = {
  listTab: document.querySelector(".list"),
  complainTab: document.querySelector(".complain"),
  complaint_area: document.querySelector(".complaint_area"),
  list_complaint_area: document.querySelector(".list_complaint_area"),
  submit: document.querySelector(".submit"),
  category: document.querySelectorAll(".comp"),
  type: document.querySelector(".type"),
  modal: document.querySelector(".modal"),
  text: document.querySelector(".text"),
  image: document.querySelector(".image"),
  img: document.querySelector(".img"),
  preview: document.querySelector(".preview"),
  completed: document.querySelector(".after"),
  circle: document.querySelector(".circle"),
};

let details = {
  category: "",
  complaint: "",
  image: null,
};

function eventListener() {
  // ====================TABS=========================
  [domSelection.listTab, domSelection.complainTab].forEach((element) => {
    element.addEventListener("click", () => {
      if (element.classList.contains("active")) return;
      element.classList.add("active");
      if (element.classList.contains("list")) {
        display();
        domSelection.list_complaint_area.classList.add("active");
        domSelection.complainTab.classList.remove("active");
        domSelection.complaint_area.classList.remove("active");
      } else {
        domSelection.complaint_area.classList.add("active");
        domSelection.listTab.classList.remove("active");
        domSelection.list_complaint_area.classList.remove("active");
      }
      if (document.querySelector("aside").classList.contains("active")) {
        document.querySelector("aside").classList.remove("active");
      }
    });
  });
  domSelection.category.forEach((el) => {
    el.addEventListener("change", () => {
      domSelection.type.setAttribute("disabled", "");
      domSelection.type.value = "";
      domSelection.type.classList.remove("active");
      details.category = el.value;
    });
  });

  function modal(text) {
    domSelection.modal.innerHTML = text;
    domSelection.modal.classList.add("active");
    setTimeout(() => {
      domSelection.modal.classList.remove("active");
    }, 4000);
  }
  // ================================SUBMIT BUTTON=================================
  domSelection.submit.addEventListener("click", () => {
    if (!details.category && domSelection.type.value.length == 0) {
      domSelection.type.removeAttribute("disabled");
      domSelection.type.classList.add("active");
      modal("Please specify the category !!!");
    } else if (!details.category && domSelection.type.value.length != 0) {
      details.category = domSelection.type.value;
      domSelection.type.classList.remove("active");
    }
    if (domSelection.text.value.length == 0) {
      domSelection.text.classList.add("active");
      modal("Please type complaint");
    } else {
      details.complaint = domSelection.text.value;
      domSelection.text.classList.remove("active");
    }
    if (details.category && details.complaint) {
      // store in array for display
      sort(details);
      percentage();
      domSelection.category.forEach((el) => {
        el.checked = false;
      });
      details.category = "";
      details.complaint = "";
      domSelection.text.value = "";
      domSelection.type.value = "";
      domSelection.image.value = "";
      domSelection.type.removeAttribute("disabled");
      domSelection.img.classList.remove("active");
      domSelection.preview.src = " ";
      domSelection.preview.style.display = "none";
    }
    display();
  });

  domSelection.image.addEventListener("change", () => {
    if (domSelection.image.files.length == 0) {
      domSelection.img.classList.remove("active");
      domSelection.preview.style.display = "none";
    } else {
      const file = domSelection.image.files[0];
      const source = URL.createObjectURL(file);
      domSelection.preview.src = source;
      domSelection.preview.style.display = "flex";
      domSelection.img.classList.add("active");
      details.image = source;
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest("li")) {
      e.target.closest("li").classList.add("del");
    }
    if (e.target.classList.contains("bi-check")) {
      const deta = e.target.closest("li").id.split("-");
      Done(deta[0], parseInt(deta[1]));
      percentage();
      display();
    }

    if (
      e.target.classList.contains("bi-trash") &&
      e.target.closest("li").classList.contains("del")
    ) {
      const deta = e.target.closest("li").id.split("-");
      remove(deta[0], parseInt(deta[1]));
      percentage();
      display();
    }
    if (e.target.classList.contains("button")) {
      document.querySelector("aside").classList.toggle("active");
    }
  });
}
