import {RickAndMortyCharacter} from "./Interfaces/interface";
 
class RickAndMortyTs {
    constructor() {}
   
    public async GetAndSaveDataFromApi(): Promise<void> {
        try {
            const apiResponse : Response = await fetch(`https://rickandmortyapi.com/api/character`);
            const result = await apiResponse.json();          
            localStorage.setItem('RickAndMortyApi', JSON.stringify(result.results));
            console.log('Personajes descargados correctamente');
        } catch (error) {
            console.error('Error al descargar los personajes:', error);
        }
    }
 
    public printAllCharacter(): void {
        try {
            const savedCharacters : (string | null) = localStorage.getItem('RickAndMortyApi');
            if (savedCharacters) {
                const characters : RickAndMortyCharacter[] = JSON.parse(savedCharacters);
                console.log('Personajes Existentes:');
                console.table(characters);
            } else {
                console.log('Sin personajes.');
            }
        } catch (error) {
            console.error('Error al recuperar los registros guardados:', error);
        }
    }
 
    public SaveNewCharacter(newCharacter: RickAndMortyCharacter): void {
        try {
            const savedCharacters : (string | null) = localStorage.getItem('RickAndMortyApi');
            let characters: RickAndMortyCharacter[] = [];
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
}
 
/*
/***Consumimos los servicios */
const objRickAndMorty = new RickAndMortyTs();
//obtiene data de la api
    objRickAndMorty.GetAndSaveDataFromApi();
 
//agrega un nuevo registro
const newCharacter : RickAndMortyCharacter = {
    id : 100,
    name: 'Luisillo1',
    status:   'Dead',
    species:  'Human',
    type:     'Super human',
    gender:   'Male',
    origin:   {
        "name": "Earth (C-137)",
        "url": "https://rickandmortyapi.com/api/location/1"
    },
    location: {
        "name": "Citadel of Ricks",
        "url": "https://rickandmortyapi.com/api/location/3"
    },
    image:    'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode:  [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2",
        "https://rickandmortyapi.com/api/episode/3"
    ],
    url:      'https://rickandmortyapi.com/api/character/1',
    created:  '2017-11-04'
};
objRickAndMorty.SaveNewCharacter(newCharacter);
 
// muestra los registros existentes
objRickAndMorty.printAllCharacter();