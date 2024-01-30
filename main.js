// GET IDS'
const inputAllowance = document.getElementById('total-allowance');
const inputDuration = document.getElementById('duration');
const inputChekboxDay = document.querySelectorAll('.checkboxDay');
const inputChekboxNecessities = document.querySelectorAll('.checkbox');
const range = document.getElementById('range');
const label = document.getElementById('p4-label');
const submit = document.getElementById('compute');
const caption = document.getElementById('duration-status');

// NEW VALUES
let allowance = 0, duration = 0, savings = 0;
let checkedValuesDays = [];
let checkedNecessities = [];

function getValues() {
    checkedValuesDays = [];
    checkedNecessities = ["Days"];

    // DAYS WITH CLASS
    inputChekboxDay.forEach(function (checkbox) {
        if (checkbox.checked) {
            checkedValuesDays.push(checkbox.value);
        }
    });

    // NECESSITIES
    inputChekboxNecessities.forEach(function (checkbox) {
        if (checkbox.checked) {
            checkedNecessities.push(checkbox.value);
        }
    });

    if (inputAllowance.value == '' || checkedValuesDays.length == 0 || checkedNecessities.length == 0) {
        alert("Fill all categories");
        return;
    }
    allowance = parseInt(inputAllowance.value)
    duration = parseInt(inputDuration.value);

    // PRINT VALUES
    console.log(allowance + "\n" + duration);
    console.log("Checked Checkboxes: " + checkedValuesDays.join(", "));
    console.log("Checked Checkboxes: " + checkedNecessities.join(", "));
    console.log(savings);

    // ADD VALUES
    checkedNecessities.push("Savings");

    // CAPTION
    if (duration == 0) caption.innerHTML = "Weekly";
    else caption.innerHTML = "Monthly";

    // SCROLL DOWN
    caption.scrollIntoView({ behavior: 'smooth' });

    // OUTPUT
    calculate();
}
submit.onclick = getValues;

// RANGE
range.addEventListener('input', () => {
    savings = range.value;
    if (savings == 25) {
        label.innerHTML = "Recommended"
    } else {
        label.innerHTML = savings;
    }
});

function calculate() {
    // COMPUTATION
    if (duration == 1) {
        allowance /= 4;
        console.log("Allowance: " + allowance);
    }
    let daily = allowance / checkedValuesDays.length;
    const copyDaily = daily;
    console.log("Daily: " + daily);
    let food = 0;
    let transportation = 0;
    let miscellaneous = 0;
    let mobileData = 0;
    let lowBudget = false;

    // FOOD
    if (checkedNecessities.indexOf("Food") != -1) {
        if (daily >= 140) {
            food = 140;
            daily -= 140;
            // console.log("new value: " + daily)
        } else {
            food = daily;
            daily = 0;
        }
    }
    // TRANSPORTATION
    if (checkedNecessities.indexOf("Transportation") != -1 && lowBudget == false) {
        if (daily >= 60) {
            transportation = 60;
            daily -= 60;
        } else {
            transportation = daily;
            lowBudget = true;
            daily = 0;
        }
    }
    // MOBILE DATA
    if (checkedNecessities.indexOf("Mobile data") != -1 && lowBudget == false) {
        console.log(true);
        if (daily >= 20) {
            mobileData = 20;
            daily -= 20;
        } else {
            mobileData = daily;
            lowBudget = true;
            daily = 0;
        }
    }
    // Miscellaneous
    if (checkedNecessities.indexOf("Miscellaneous") != -1 && lowBudget == false) {
        if (daily >= 30) {
            if (savings == 0) {
                miscellaneous = daily;
                daily = 0;
            } else {
                miscellaneous = 30;
                daily -= 30;
            }
        } else {
            miscellaneous = daily;
            lowBudget = true;
            daily = 0;
        }
    }
    // SAVINGS
    if (savings > 0 && lowBudget == false) {
        console.log("have savings");
        if (savings == 25) {
            savings = daily;
            daily = 0;
        } else if (daily > savings) {
            console.log(true);
            // savings = daily;
            daily -= savings;
        } else {
            savings = daily;
            daily = 0;
            lowBudget = true;
        }
    }
    // REMAINING
    if (daily != 0) {
        if (checkedNecessities.indexOf("Miscellaneous") != -1) {
            miscellaneous += daily;
            daily = 0;
        } else if (checkedNecessities.indexOf("Food") != -1) {
            food += daily;
            daily = 0;
        } else if (checkedNecessities.indexOf("Transportation") != -1) {
            transportation += daily;
            daily = 0;
        } else if (checkedNecessities.indexOf("Mobile Data") != -1) {
            mobileData += daily;
            daily = 0;
        }
    }
    // TEST PRINT
    console.log("Food: " + food);
    console.log("Transportation: " + transportation);
    console.log("Miscellaneous: " + miscellaneous);
    console.log("Mobile data: " + mobileData);
    console.log("Savings: " + savings);
    console.log("Remaining: " + daily);

    // LOW BUDGET MESSAGE
    const indicator = document.getElementById('budget');
    if (lowBudget) {
        indicator.style.visibility = "visible";
    } else {
        indicator.style.visibility = "hidden";
    }

    // SHOW DAILY
    const showDaily = document.getElementById('daily');
    showDaily.style.visibility = "visible";
    showDaily.innerHTML = "Daily: " + copyDaily;

    const table = document.getElementById('table');
    table.innerHTML = "";
    // console.log(checkedNecessities.length);

    const rowHeader = document.createElement("tr");
    table.appendChild(rowHeader);
    for (let i = 0; i < checkedNecessities.length; i++) {
        const headerData = document.createElement("td");
        headerData.textContent = checkedNecessities[i];
        rowHeader.appendChild(headerData);
    }

    for (let ctr1 = 0; ctr1 < checkedValuesDays.length; ctr1++) {
        const row = document.createElement("tr");
        table.appendChild(row);
        const rowDay = document.createElement("td");
        rowDay.textContent = checkedValuesDays[ctr1];
        row.appendChild(rowDay);
        for (let ctr2 = 1; ctr2 < checkedNecessities.length; ctr2++) {
            const rowData = document.createElement("td");
            // rowData.textContent = ctr2;
            if (checkedNecessities[ctr2] == "Food") {
                rowData.textContent = food;
            } else if (checkedNecessities[ctr2] == "Transportation") {
                rowData.textContent = transportation;
            } else if (checkedNecessities[ctr2] == "Miscellaneous") {
                rowData.textContent = miscellaneous;
            } else if (checkedNecessities[ctr2] == "Mobile data") {
                rowData.textContent = mobileData;
            } else if (checkedNecessities[ctr2] == "Savings") {
                rowData.textContent = savings;
            }
            row.appendChild(rowData);
        }
    }
}