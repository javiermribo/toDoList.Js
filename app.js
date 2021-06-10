const FORM_SELECTOR = document.querySelector("#newTaskFormId");
const ACTIVITIES_LIST_SELECTOR = document.querySelector("#activitiesList");
const SUBMIT_BTN_SELECTOR = document.querySelector("#taskToListBtnId");
const INPUT_FIELD_SELECTOR = document.querySelector("#taskInputFieldId");

eventsListeners();

function eventsListeners () {
  FORM_SELECTOR.addEventListener('submit', itemToArray);
}

let activitiesArrayList = [];


const newActivityInput = (activity) => {
  const activityItem = {
    activity,
    status: false,
    id: Date.now(),
  }
  activitiesArrayList.push(activityItem);
  return activityItem;
}

function itemToArray (event) {
  event.preventDefault();
  //const FORM_SELECTOR = document.querySelector("#newTaskFormId");
  const activity = INPUT_FIELD_SELECTOR.value;
  newActivityInput(activity);
}