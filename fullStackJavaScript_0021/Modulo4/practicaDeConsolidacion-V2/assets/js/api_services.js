const API_URL = 'https://swapi.dev/api/people';

export async function getCharacter(id) {
	const response = await fetch(`${API_URL}/${id}`);
	const character = await response.json();
	return character;
}
