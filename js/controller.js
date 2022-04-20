export { categories, alterCate };
var done = [];
var total = 0;
export let percent = 0;
let categories = {
  deadline: [],
  assignment: [],
  aca_slides: [],
};
export function sort(object) {
  const { category, image, complaint } = object;
  var id;
  if (!categories[category]) {
    categories[category] = [];
  }
  if (categories[category].length == 0) {
    id = 0;
  } else {
    id = categories[category][categories[category].length - 1].id + 1;
  }
  if (categories.hasOwnProperty(category)) {
    categories[category].push({ image: image, complaint: complaint, id: id });
  } else {
    categories[category] = [{ complaint: complaint, image: image, id: id }];
  }
  localStorage.setItem("categories", JSON.stringify(categories));
}

function findIndex(id, index) {
  var idInd;
  categories[id].forEach((el, ind) => {
    if (el.id == index) {
      idInd = ind;
    }
  });
  return idInd;
}

export function remove(id, index) {
  var ind = findIndex(id, index);
  categories[id].splice(ind, 1);
  localStorage.setItem("categories", JSON.stringify(categories));
}

export function Done(id, index) {
  var ind = findIndex(id, index);
  categories[id][ind].done = true;
  localStorage.setItem("categories", JSON.stringify(categories));
}

export function percentage() {
  done = [];
  total = 0;
  for (const item in categories) {
    categories[item].forEach((el) => {
      total++;
      if (el.done) {
        done.push(el.complaint);
      }
    });
  }
  if (total == 0) {
    total = 1;
  }
  percent = (done.length / total) * 100;
  percent = Math.round(percent);
}

function alterCate(ob){
  if(!ob)return
  categories = ob;
}
