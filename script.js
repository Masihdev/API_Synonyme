async function getSynonyms() {
  let input = document.getElementById("input");
  let query = input.value;

  let url = `https://www.openthesaurus.de/synonyme/search?q=${query}&format=application/json`;
  let response = await fetch(url);

  let responseAsJson = await response.json();
  let synsets = responseAsJson["synsets"];
  console.log(responseAsJson);
  renderSynsets(synsets);
}

function renderSynsets(synsets) {
  let input = document.getElementById("input");

  let searchResult = document.getElementById("search-result");
  searchResult.innerHTML = "";

  let searchContent = document.getElementById("search-content");
  searchContent.innerHTML = "";

  searchResult.innerHTML = `
        <span>Es wurden <b>${synsets.length}</b> Synonym-Sets geladen.</span>
     `;

  for (let i = 0; i < synsets.length; i++) {
    let terms = synsets[i]["terms"]; // ist ein Array

    searchContent.innerHTML += `
            <div class="box bg-design">
                <h2>- Synonym-Set ${i + 1}</h2>
                <p id="syns${i}"></p>
            </div>
           
         `;

    for (let j = 0; j < terms.length; j++) {
      let syns = document.getElementById(`syns${i}`);

      syns.innerHTML += `
                    <ul>
                        <li><b>${terms[j]["term"]}</b></li>
                    </ul>
                `;
    }
  }
  input.value = "";
}

// reload

function reload() {
  window.location.reload();
}

// show menu
function showMenu() {
  document.getElementById("menu").classList.remove("d-none");
}

// close menu

function closeMenu() {
  document.getElementById("menu").classList.add("d-none");
}
