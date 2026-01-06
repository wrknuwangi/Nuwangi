const main=document.getElementById("main");
const AddUserBtn=document.getElementById("add");
const DoubleMoneyBtn=document.getElementById("double");
const ShowMoneyBtn=document.getElementById("show");
const ShowRichestBtn=document.getElementById("richest");
const CalculateWealthBtn=document.getElementById("wealth");


let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
   const res = await fetch("https://randomuser.me/api");
    const result = await res.json();

    const user = result.results[0];
    const AddUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    };

    addData(AddUser);
}

function addData(obj) {
    data.push(obj);
    console.log(obj.name);
    updateDOM();
}

function updateDOM(provideData = data) {
    main.innerHTML = `<div></div>`;

    provideData.forEach((item) => {
        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
            item.money
        )}`;
        main.appendChild(element);
    });
}

function formatMoney(number) {
    return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&");
}

AddUserBtn.addEventListener("click", getRandomUser);

