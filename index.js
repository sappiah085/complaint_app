import { eventListener} from "./js/event.js";
import{display} from "./js/display.js";
import { alterCate,percentage } from "./js/controller.js";

eventListener();
alterCate(JSON.parse(localStorage.getItem("categories")));
percentage();
display();


