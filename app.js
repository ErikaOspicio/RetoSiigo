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
    printAllCharacters() {
        try {
            const savedCharacters = localStorage.getItem('RickAndMortyApi');
            const divCharacters = document.querySelector('#characters-container');
            const divCharactersCount = document.querySelector('#characters-count');
            if (savedCharacters) {
                const characters = JSON.parse(savedCharacters);
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
                characters.forEach((character) => {
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
                html += '</table>';
                divCharacters.innerHTML = html;
            }
            else {
                divCharactersCount.innerHTML = 'No se encuentran personajes';
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
    InitForm() {
        const btnShowAllCharacters = document.querySelector('#show-characters');
        btnShowAllCharacters.addEventListener('click', (event) => { this.printAllCharacters(); });
        const btnFetchData = document.querySelector('#fetch-data');
        btnFetchData.addEventListener('click', (event) => { this.GetAndSaveDataFromApi(); });
        const formCharacter = document.querySelector('#add-character-form');
        formCharacter.addEventListener('submit', (event) => {
            event.preventDefault();
            const newCharacter = {
                id: this.getId(),
                name: document.querySelector('#name').value,
                status: document.querySelector('#status').value,
                species: document.querySelector('#species').value,
                type: document.querySelector('#type').value,
                gender: document.querySelector('#gender').value,
                origin: undefined,
                location: undefined,
                image: "",
                episode: [],
                url: "",
                created: new Date().toISOString()
            };
            this.SaveNewCharacter(newCharacter);
            this.printAllCharacters();
        });
    }
    getId() {
        const savedCharacters = localStorage.getItem('RickAndMortyApi');
        let characters = [];
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
