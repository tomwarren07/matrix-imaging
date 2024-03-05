window.onload = function() {
  fetchMatrix('matrix.json'); // Fetch the default matrix on page load
};

function fetchMatrix(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('Fetched Data:', data);
      displayMatrix(data.matrix);
      generateImage(data.matrix);
    })
    .catch(error => console.error('Error fetching JSON:', error));
}

function displayMatrix(matrix) {
  const matrixDisplay = document.getElementById('matrixDisplay');
  matrixDisplay.textContent = JSON.stringify(matrix);
}

function generateImage(matrix) {
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');

  if (matrix.length === 0 || !Array.isArray(matrix[0])) {
    console.error('Matrix is not in the expected format. It should be a non-empty array of arrays.');
    return;
  }

  const height = matrix.length;
  const width = matrix[0].length;

  canvas.width = width * 50;
  canvas.height = height * 50;

  const minValue = Math.min(...matrix.flat());
  const maxValue = Math.max(...matrix.flat());

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = matrix[y][x];
      const shade = Math.round((cell - minValue) / (maxValue - minValue) * 255); // Linear shading
      ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
      ctx.fillRect(x * 50, y * 50, 50, 50);
    }
  }
}

function generateFromInput() {
  const arrayInput = document.getElementById('arrayInput').value;
  try {
    const array = JSON.parse(arrayInput);
    displayMatrix(array);
    generateImage(array);
  } catch (error) {
    console.error('Invalid array input:', error);
  }
}
