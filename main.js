import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js"
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js"

import "./style.css"

const firebaseConfig = {
  databaseURL: import.meta.env.VITE_DATABASE_URL,
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

console.log(database)

document.querySelector("#app").innerHTML = `
  <input type="text" id="input-el">
  <button id="input-btn">SAVE INPUT</button>
  <button id="tab-btn">SAVE TAB</button>
  <button id="delete-btn">DELETE ALL</button>
  <ul id="ul-el">
  </ul>
`

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  })
})

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

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value)
  inputEl.value = ""
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)
})
