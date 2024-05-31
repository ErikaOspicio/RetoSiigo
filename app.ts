class RickAndMortyTs {
    constructor() { }

    public async GetAndSaveDataFromApi(): Promise<void> {
        try {
            const apiResponse: Response = await fetch(`https://rickandmortyapi.com/api/character`);
            const result = await apiResponse.json();
            localStorage.setItem('RickAndMortyApi', JSON.stringify(result.results));
            console.log('Personajes descargados correctamente');
        } catch (error) {
            console.error('Error al descargar los personajes:', error);
        }
    }

    public printAllCharacters(): void {
        try {
            const savedCharacters: (string | null) = localStorage.getItem('RickAndMortyApi');
            const divCharacters = document.querySelector('#characters-container') as HTMLDivElement;
            const divCharactersCount = document.querySelector('#characters-count') as HTMLDivElement;
           
            if (savedCharacters) {
                const characters: ICharacter[] = JSON.parse(savedCharacters);
                divCharactersCount.innerHTML = `Personajes existentes: ${characters.length}`;
                console.table(characters);
               
                let html = '<table border="1" style="width:100%">' +
                    '<tr>' +
                    '<th>Id</th>' +
                    '<th>Name</th>' +
                    '<th>Status</th>' +
                    '<th>Species</th>' +
                    '<th>Gender</th>' +
                    '<th>Type</th>' +
                    '</tr>';

                characters.forEach((character: ICharacter) => {
                   
                    const fila = '<tr>' +
                        `<td>${character.id}</td>` +
                        `<td>${character.name}</td>` +
                        `<td>${character.status}</td>` +
                        `<td>${character.species}</td>` +
                        `<td>${character.gender}</td>` +
                        `<td>${character.type}</td>` +
                        '</tr>';
                   
                    html += fila;

                });
                html+= '</table>';
                divCharacters.innerHTML = html;

            } else {
                divCharactersCount.innerHTML = 'No se encuentran personajes';
            }
        } catch (error) {
            console.error('Error al recuperar los registros guardados:', error);
        }
    }

    public SaveNewCharacter(newCharacter: ICharacter): void {
        try {
            const savedCharacters: (string | null) = localStorage.getItem('RickAndMortyApi');
            let characters: ICharacter[] = [];
            if (savedCharacters) {
                characters = JSON.parse(savedCharacters);
            }
            characters.push(newCharacter);
            localStorage.setItem('RickAndMortyApi', JSON.stringify(characters));
            console.log('Se agregó un nuevo personaje');
        } catch (error) {
            console.error('Error al agregar nuevo personaje:', error);
        }
    }

    public InitForm(): void {

        const btnShowAllCharacters = document.querySelector('#show-characters') as HTMLButtonElement;
        btnShowAllCharacters.addEventListener('click', (event) => { this.printAllCharacters(); });

        const btnFetchData = document.querySelector('#fetch-data') as HTMLButtonElement;
        btnFetchData.addEventListener('click', (event) => { this.GetAndSaveDataFromApi(); });

        const formCharacter = document.querySelector('#add-character-form') as HTMLFormElement;
        formCharacter.addEventListener('submit', (event) => {
            event.preventDefault();

            const newCharacter: ICharacter = {
                id: this.getId(),
                name: (<HTMLInputElement>document.querySelector('#name')).value,
                status: (<HTMLInputElement>document.querySelector('#status')).value,
                species: (<HTMLInputElement>document.querySelector('#species')).value,
                type: (<HTMLInputElement>document.querySelector('#type')).value,
                gender: (<HTMLInputElement>document.querySelector('#gender')).value,
                origin: undefined,
                location: undefined,
                image: "",
                episode: [],
                url: "",
                created: new Date().toISOString()
            }
            this.SaveNewCharacter(newCharacter);
            this.printAllCharacters();

        });

    }

    private getId(): number {
        const savedCharacters: (string | null) = localStorage.getItem('RickAndMortyApi');
        let characters: ICharacter[] = [];
        if (savedCharacters) {
            characters = JSON.parse(savedCharacters);
        }
        return characters.length + 1;
    }

}

/*
/***Consumimos los servicios */
const objRickAndMorty = new RickAndMortyTs();
objRickAndMorty.InitForm();

//obtiene data de la api
objRickAndMorty.GetAndSaveDataFromApi();

// muestra los registros existentes
objRickAndMorty.printAllCharacters();
