const form = document.querySelector('form');

let color = '';
let mode = '';

form.addEventListener('submit', e => {
	e.preventDefault();
	
	// Get the color and mode from the form, formatted for the API
	const formData = new FormData(form);
	color = formData.get('color').replace('#', '');
	mode = formData.get('mode');
	
	// Fetch the color scheme from the API
	fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=5`)
		.then(response => response.json())
		.then(data => {
			// Reset the grid if previous colors are displayed
			const grid = document.querySelector('.grid-colorscheme');
			grid.innerHTML = "";

			// Display the colors in the grid
			const colors = data.colors.map(color => color.hex.value);
			colors.forEach(color => {
				const column = document.createElement('div');
				const colorDisplay = document.createElement('div')
				const colorHex = document.createElement('p');
				
				column.classList.add('color-column');
				colorDisplay.classList.add('color-display');
				colorHex.classList.add('color-hex');
				
				colorDisplay.style.backgroundColor = color;
				colorHex.textContent = color;
				
				column.append(colorDisplay, colorHex);
				grid.append(column);
			})
		})
		.catch(error => console.error('Error:', error));
});