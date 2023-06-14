import { getCharacter } from './api_services.js';
import { RANGES } from './ranges.js';

async function* generateCharacter(range) {
	for (let i = range.min; i <= range.max; i++) {
		yield await getCharacter(i);
	}
}

const CharacterGenerators = {
	principal: generateCharacter(RANGES.principal),
	secondary: generateCharacter(RANGES.secondary),
	other: generateCharacter(RANGES.other),
};

async function printCharacter(event) {
	const sectionId = this.parentElement.id;
	const generatedCharacter = await CharacterGenerators[sectionId].next();
	const section = document.getElementById(sectionId);

	if (!generatedCharacter.done) {
		const character = generatedCharacter.value;

		const card = document.createElement('div');
		const circle = document.createElement('div');
		const div = document.createElement('div');
		const h2 = document.createElement('h2');
		const p = document.createElement('p');

		card.classList.add('card');
		circle.classList.add('circle');
		h2.textContent = character.name;
		p.textContent = `Estatura: ${character.height}cm, Peso: ${character.mass}Kg`;

		div.append(h2, p);
		card.append(circle, div);
		section.append(card);
		return;
	}

	if (!section.innerText.includes('No hay más')) {
		const noMore = document.createElement('div');
		noMore.classList.add('noMore');
		noMore.textContent = 'No hay más personajes en esta sección.';
		section.append(noMore);
	}
}
const btnCards = document.querySelectorAll('li .card:first-child');

btnCards.forEach((element) =>
	element.addEventListener('click', printCharacter)
);
