"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class RickAndMortyTs {
    constructor() { }
    GetAndSaveDataFromApi() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiResponse = yield fetch(`https://rickandmortyapi.com/api/character`);
                const result = yield apiResponse.json();
                localStorage.setItem('RickAndMortyApi', JSON.stringify(result.results));
                console.log('Personajes descargados correctamente');
            }
            catch (error) {
                console.error('Error al descargar los personajes:', error);
            }
        });
    }
    printAllCharacter() {
        try {
            const savedCharacters = localStorage.getItem('RickAndMortyApi');
            if (savedCharacters) {
                const characters = JSON.parse(savedCharacters);
                console.log('Personajes Existentes:');
                console.table(characters);
            }
            else {
                console.log('Sin personajes.');
            }
        }
        catch (error) {
            console.error('Error al recuperar los registros guardados:', error);
        }
    }
    SaveNewCharacter(newCharacter) {
        try {
            const savedCharacters = localStorage.getItem('RickAndMortyApi');
            let characters = [];
            if (savedCharacters) {
                characters = JSON.parse(savedCharacters);
            }
            characters.push(newCharacter);
            localStorage.setItem('RickAndMortyApi', JSON.stringify(characters));
            console.log('Se agregó un nuevo personaje');
        }
        catch (error) {
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
const newCharacter = {
    id: 100,
    name: 'Luisillo1',
    status: 'Dead',
    species: 'Human',
    type: 'Super human',
    gender: 'Male',
    origin: {
        "name": "Earth (C-137)",
        "url": "https://rickandmortyapi.com/api/location/1"
    },
    location: {
        "name": "Citadel of Ricks",
        "url": "https://rickandmortyapi.com/api/location/3"
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2",
        "https://rickandmortyapi.com/api/episode/3"
    ],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04'
};
objRickAndMorty.SaveNewCharacter(newCharacter);
// muestra los registros existentes
objRickAndMorty.printAllCharacter();
