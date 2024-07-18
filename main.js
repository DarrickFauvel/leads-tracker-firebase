import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js"
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js"

import "./style.css"

const firebaseConfig = {
  databaseURL: import.meta.env.VITE_DATABASE_URL,
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

document.querySelector("#app").innerHTML = `
  <label>Enter URL:</label>
  <input type="text" id="input-el" placeholder="https://scrimba.com">
  <button id="input-btn">SAVE INPUT</button>
  <button id="delete-btn">DELETE ALL</button>
  <ul id="ul-el">
  </ul>
`

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
  let listItems = ""
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
  }
  ulEl.innerHTML = listItems
}

onValue(referenceInDB, (snapshot) => {
  const snapshotDoesExist = snapshot.exists()
  if (snapshotDoesExist) {
    const snapshotValues = snapshot.val()
    const leads = Object.values(snapshotValues)
    render(leads)
  }
})

deleteBtn.addEventListener("dblclick", function () {
  remove(referenceInDB)
  ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function () {
  push(referenceInDB, inputEl.value)

  inputEl.value = ""
})
