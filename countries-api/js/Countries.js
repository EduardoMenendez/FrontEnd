class Countries{
    divOfCountries = document.getElementById("countries")
    list = [];

    constructor(){
        this.getCountries();
        console.log("Hola")
    }

    async getCountries(){
        var countriesList = await fetch("https://restcountries.eu/rest/v2/all");
        let list = (await countriesList.json());
        this.printCountries(list);
    }
    
    formatter = new Intl.NumberFormat('en-US')
    printCountries(list){
        list.map(element=>{
            this.list.push(element);
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
            this.divOfCountries.insertAdjacentHTML('beforeend', card);
        })
    }
}

