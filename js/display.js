import { categories, percent } from "./controller.js";
import { domSelection } from "./event.js";
export { display };
function display(cate = categories) {
  var number = 0;
  domSelection.list_complaint_area.textContent = "";
  domSelection.list_complaint_area.insertAdjacentHTML(
    "afterbegin",
    "<p>Below are complaints. Fainted ones are completed !!!</p>"
  );
  for (const item in cate) {
    var liElement = "",
      html,
      name;
    if (cate[item].length > 0) {
      cate[item].forEach((element) => {
        if (element.done) {
          name = "disabled";
        } else {
          name = "";
        }
        liElement += ` <li class="${name}" id="${item + "-" + element.id}">
              ${element.complaint}
              <div class="icon">
                <i class="bi bi-check"> <i class="bi bi-trash"></i></i>
              </div>
            </li>`;
        number += 1;
      });
      html = `<div class="cateName">
          <h3>${item.toUpperCase()}</h3>
          <ul>
           ${liElement}
          </ul>
        </div>`;
    } else {
      html = "";
    }
    domSelection.list_complaint_area.insertAdjacentHTML("beforeend", html);
  }
  if (number == 0) {
    domSelection.list_complaint_area.textContent = "";
    domSelection.list_complaint_area.insertAdjacentHTML(
      "afterbegin",
      `<p class="nocomp">No complaints yet!!!</p>`
    );
  }

  var numb = Math.floor((314 * (100 - percent)) / 100);
  domSelection.circle.style.setProperty("--per", numb);
  domSelection.completed.textContent = `${percent}% completed`;
}
