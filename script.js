const BASE_URL =
  "https://api.currencyapi.com/v3/latest?apikey=cur_live_aGbpGIerIEXg1yfUM9cfysY0FpqQsOotYfKxqxHo";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
const fromcurr = document.querySelector(".From select");
const tocurr = document.querySelector(".To select");

for (let select of dropdowns) {
  for (currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value = currcode;
    if (select.name === "from" && currcode === "USD") {
      newoption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      newoption.selected = "selected";
    }
    select.append(newoption);
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

const updateflag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
  console.log(countrycode);
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amt = document.querySelector(".amount input");
  let amtval = amt.value;
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amt.value = "1";
  }

  const URL = `${BASE_URL}&base_currency=${fromcurr.value}&currencies=${tocurr.value}`;

  try {
    let response = await fetch(URL);
    let data = await response.json();

    let rate = data.data[tocurr.value].value;

    let convertedAmount = (amtval * rate).toFixed(2);

    let result = document.querySelector(".msg");
    result.innerText = `${amtval} ${fromcurr.value} = ${convertedAmount} ${tocurr.value}`;
  } catch (error) {
    console.error("Error fetching conversion rate:", error);
  }
});
