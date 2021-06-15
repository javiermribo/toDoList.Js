const FORM_SELECTOR = document.querySelector("#newTaskFormId");
const ACTIVITIES_LIST_SELECTOR = document.querySelector("#activitiesListId");
const SUBMIT_BTN_SELECTOR = document.querySelector("#taskToListBtnId");
const INPUT_FIELD_SELECTOR = document.querySelector("#taskInputFieldId");

eventsListeners();

function eventsListeners () {
  FORM_SELECTOR.addEventListener('submit', itemToArray);
}

let idToEdit;
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

const lsDataSaver = () => {
  localStorage.setItem('task', JSON.stringify(activitiesArrayList));
  arrayItemsToDOM();
}

const removingDuplicatedCards = () => {
  while (ACTIVITIES_LIST_SELECTOR.lastChild) {
    ACTIVITIES_LIST_SELECTOR.removeChild(ACTIVITIES_LIST_SELECTOR.lastChild);
  }
};

const arrayItemsToDOM = () => {
  removingDuplicatedCards();
  activitiesArrayList = JSON.parse(localStorage.getItem('task'));
  if (activitiesArrayList === null) {
    activitiesArrayList = [];
  } else {
    if (activitiesArrayList.length > 0) {
      activitiesArrayList.forEach((element) => {
        if (element.status) {
          ACTIVITIES_LIST_SELECTOR.innerHTML += `
          <div id="${element.id}" class="activitiesList mt-3 container" id="activitiesListId">
            <div class="activityCardTaskDone d-flex align-items-center justify-content-between">
              <div class="cardTextInfo" id="cardTextInfoId"><b>${element.activity}</b> 
                <span class="activityStatus" id="activityStatusId"> - ${element.status} </span>
              </div>
              <span class="float-right d-flex cardIcons">
                <i class="material-icons">edit</i>
                <i class="material-icons">done</i>
                <i class="material-icons">delete</i>
              </span>
            </div>
          </div>
        `;
        } else {
          ACTIVITIES_LIST_SELECTOR.innerHTML += `
          <div id="${element.id}" class="activitiesList mt-3 container" id="activitiesListId">
            <div class="activityCard d-flex align-items-center justify-content-between">
              <div class="cardTextInfo" id="cardTextInfoId"><b>${element.activity}</b> 
                <span class="activityStatus" id="activityStatusId"> - ${element.status} </span>
              </div>
              <span class="float-right d-flex cardIcons">
                <i class="material-icons">edit</i>
                <i class="material-icons">done</i>
                <i class="material-icons">delete</i>
              </span>
            </div>
          </div>
        `;
        }
      });
    }
  }
}

const itemRemoverFromLS = id => {
  activitiesArrayList = activitiesArrayList.filter(activity => activity.id != id);
  lsDataSaver();
}

const updatingLS = (id) => {
  let index = activitiesArrayList.findIndex(element => element.id == id);
  activitiesArrayList[index].status = true;
  lsDataSaver();
}

const editActivityTextOnInput = id => {
  const idCard = activitiesArrayList.find(activity => activity.id == id);
  INPUT_FIELD_SELECTOR.value = idCard.activity;
  SUBMIT_BTN_SELECTOR.textContent = 'Editar';
}

const editTextOnLs = (value) => {
  activitiesArrayList = activitiesArrayList.map(activity => {
    if(activity.id == idToEdit) {
      return {
        ...activitiesArrayList,
        activity: value
      }
    } else {
      return activity;
    }
  })
}

function itemToArray (event) {
  event.preventDefault();
  const activity = INPUT_FIELD_SELECTOR.value;
  if(SUBMIT_BTN_SELECTOR.textContent === 'Agregar tarea') {
    newActivityInput(activity);
  } else {
    editTextOnLs(activity);
  }
  lsDataSaver();
}

document.addEventListener('DOMContentLoaded', arrayItemsToDOM);

ACTIVITIES_LIST_SELECTOR.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.innerHTML === 'edit' || e.target.innerHTML === 'done' || e.target.innerHTML === 'delete') {
    if(e.target.innerHTML === 'done') {
      const elementId = e.target.parentElement.parentElement.parentElement.id;
      updatingLS(elementId);
    }
    if(e.target.innerHTML === 'delete') {
      const elementId = e.target.parentElement.parentElement.parentElement.id;
      itemRemoverFromLS(elementId);
    }
    if(e.target.innerHTML === 'edit') {
      const idToEdit = e.target.parentElement.parentElement.parentElement.id;
      editActivityTextOnInput(idToEdit);
    }
  }
})