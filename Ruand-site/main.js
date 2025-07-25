// --- Country Info Section ---
async function getCountryInfo() {
  const country = document.getElementById('countryInput').value.trim().toLowerCase();
  const resultDiv = document.getElementById('countryResult');

  if (!country) {
    resultDiv.innerHTML = "<p>Please enter a country name.</p>";
    return;
  }

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await res.json();

    if (data.status === 404) {
      resultDiv.innerHTML = "<p>Country not found.</p>";
      return;
    }

    const info = data[0];
    const languages = Object.values(info.languages || {}).join(", ");

    resultDiv.innerHTML = `
      <img src="${info.flags?.png}" alt="Flag" width="100">
      <p><strong>Capital:</strong> ${info.capital ? info.capital[0] : 'N/A'}</p>
      <p><strong>Population:</strong> ${info.population?.toLocaleString()}</p>
      <p><strong>Region:</strong> ${info.region}</p>
      <p><strong>Languages:</strong> ${languages || 'N/A'}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = "<p>Error fetching country data.</p>";
    console.error(error);
  }
}

// --- Currency Converter Section ---
const apiKey = "44c7b4155c3e72dbc8f44e41";
const apiBase = "https://v6.exchangerate-api.com/v6";

async function populateCurrencies() {
  const fromSelect = document.getElementById("fromCurrency");
  const toSelect = document.getElementById("toCurrency");

  try {
    const res = await fetch(`${apiBase}/${apiKey}/codes`);
    const data = await res.json();

    if (data.result !== "success") {
      throw new Error("Failed to fetch currency codes.");
    }

    data.supported_codes.forEach(([code, name]) => {
      const option1 = new Option(`${code} - ${name}`, code);
      const option2 = new Option(`${code} - ${name}`, code);
      fromSelect.add(option1);
      toSelect.add(option2);
    });

    fromSelect.value = "USD";
    toSelect.value = "EUR";
  } catch (error) {
    console.error("Failed to fetch currencies", error);
  }
}

async function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;
  const resultDiv = document.getElementById("currencyResult");

  if (isNaN(amount)) {
    resultDiv.innerText = "Please enter a valid amount.";
    return;
  }

  try {
    const res = await fetch(`${apiBase}/${apiKey}/pair/${from}/${to}/${amount}`);
    const data = await res.json();

    if (data.result !== "success") {
      resultDiv.innerHTML = "<p>Conversion failed.</p>";
      return;
    }

    resultDiv.innerHTML = `<p>${amount} ${from} = <strong>${data.conversion_result}</strong> ${to}</p>`;
  } catch (error) {
    resultDiv.innerHTML = "<p>Error converting currency.</p>";
    console.error(error);
  }
}

// --- Init ---
window.onload = populateCurrencies;
