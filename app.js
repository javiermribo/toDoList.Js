const FORM_SELECTOR = document.querySelector("#newTaskFormId");
const ACTIVITIES_LIST_SELECTOR = document.querySelector("#activitiesListId");
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

const arrayItemsToDOM = () => {
  if(activitiesArrayList.length > 0) {
    activitiesArrayList.forEach(element => {
      if(element.status) {
        ACTIVITIES_LIST_SELECTOR.innerHTML += `
          <div class="activitiesList mt-5 container" id="activitiesListId">
            <div class="activityCard d-flex align-items-center justify-content-between" id="activityCardId">
              <div class="cardTextInfo" id="cardTextInfoId"><b>${element.activity}</b> 
                <span class="activityStatus" id="activityStatusId"> - ${element.status} </span>
              </div>
              <span class="float-right d-flex cardIcons">
                <i class="material-icons">
                  done
                </i>
                <i class="material-icons">
                  delete
                </i>
              </span>
            </div>
          </div>
        `;
      } else {
        ACTIVITIES_LIST_SELECTOR.innerHTML += `
          <div class="activitiesList mt-5 container" id="activitiesListId">
            <div class="activityCard d-flex align-items-center justify-content-between" id="activityCardId">
              <div class="cardTextInfo" id="cardTextInfoId"><b>${element.activity}</b> 
                <span class="activityStatus" id="activityStatusId"> - ${element.status} </span>
              </div>
              <span class="float-right d-flex cardIcons">
                <i class="material-icons">
                  done
                </i>
                <i class="material-icons">
                  delete
                </i>
              </span>
            </div>
          </div>
        `;
      }
    }) 
  }
}

function itemToArray (event) {
  event.preventDefault();
  const activity = INPUT_FIELD_SELECTOR.value;
  newActivityInput(activity);
  arrayItemsToDOM();
}