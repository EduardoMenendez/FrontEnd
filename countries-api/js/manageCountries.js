const countries = new Countries();
const searchInput = document.getElementById("search");
const countriesDiv = document.getElementById("countries");
const selectFilter = document.getElementById("filterSelect");
const searchInputs = document.getElementById("searchInputs");
const backButton = document.getElementById("back");
const changeTheme = ()=>{
    document.body.classList.toggle("dark-mode");
    document.getElementsByTagName("button")[0].classList.toggle("dark-theme");
    document.getElementsByClassName("input-with-icon")[0].classList.toggle("dark-theme");
}

formatter = new Intl.NumberFormat('en-US');
    function printCountries(list){
        list.map(element=>{
            const card = `
            <div class="card" onClick="showDetailedCountry('${element.name}')">
                <img src="${element.flag}" alt="Germany Flag">
                <div class="text">
                    <h3>${element.name}</h3>
                    <p><span class="bold">Population: </span>${this.formatter.format(element.population)}</p>
                    <p><span class="bold">Region: </span>${element.region}</p>
                    <p><span class="bold">Capital: </span>${element.capital}</p>
                </div>
            </div>
            `
            countriesDiv.insertAdjacentHTML('beforeend', card);
        })
    }

searchInput.addEventListener("keyup", ()=>{
    selectFilter.options[0].selected = 'selected';
    countriesDiv.innerHTML = "";
    printCountries(countries.list.filter(({name})=>{
        name = name.toUpperCase();
        return name.match(searchInput.value.toUpperCase());
    }));
    console.log(countries.list.filter(({name})=>{
        name = name.toUpperCase();
        return name.match(searchInput.value.toUpperCase());
    }));
});

selectFilter.addEventListener("change", ()=>{
    searchInput.value = "";
    countriesDiv.innerHTML = "";
    printCountries(countries.list.filter(({region})=>{
        region = region.toUpperCase();
        return region.match(selectFilter.value.toUpperCase());
    }));
});

function showDetailedCountry(countryName){
    selectFilter.options[0].selected = 'selected';
    searchInput.value = "";
    country = countries.list.filter( ({name})=>name===countryName )[0];
    console.log(country)
    countriesDiv.innerHTML = "";
    searchInputs.style.display = "none";
    const population = this.formatter.format(country.population)
    let borders = countries.list.filter(({alpha3Code})=>{
        return country.borders.indexOf(alpha3Code)!=-1
    });
    borders = borders.map(country=>`<button onClick="showDetailedCountry('${country.name}')">${country.name}</button>`).join('')
    const detailedCountry = `
    <div class="details">
        <img src="${country.flag}" alt="">
        <div class="details-text">
            <h1>${country.name}</h1>
            <div class="text-detail">
                <p><span class="bold">Native Name:</span> ${country.nativeName}</p>
                <p><span class="bold">Population:</span> ${population}</p>
                <p><span class="bold">Region:</span> ${country.region}</p>
                <p><span class="bold">Sub Region:</span> ${country.subregion}</p>
                <p><span class="bold">Capital:</span> ${country.capital}</p>
                <p><span class="bold">Top Level Domain:</span> ${country.topLevelDomain}</p>
                <p><span class="bold">Currencies:</span> ${country.currencies.map(({name})=>name)}</p>
                <p><span class="bold">Languages:</span> ${country.languages.map(({name})=>name)}</p>
            </div>
            <div class="button-group">
                <p class="bold">Border Countries: </p>
                ${borders || "<h3 style='width: 100%'> It doesn't have border Countries</h3>"}
            </div>
        </div>
    </div>`;
    backButton.style.display = "inline";
    countriesDiv.insertAdjacentHTML('beforeend', detailedCountry);
}

function backToMenu(){
    backButton.style.display = "none";
    searchInputs.style.display = "flex";
    countriesDiv.innerHTML = "";
    printCountries(countries.list);
}

//alpha3code === borders