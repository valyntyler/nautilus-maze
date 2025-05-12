document.addEventListener('DOMContentLoaded', function() {
  const gridContainer = document.getElementById('grid');
  const resetButton = document.getElementById('reset');
  const resizeButton = document.getElementById('resize');
  const tools = document.querySelectorAll('.tool');

  let isMouseDown = false;
  let rows = 10;
  let cols = 10;
  let selected = document.getElementById('pencil');

  // setup tool buttons
  tools.forEach(tool => {
    tool.addEventListener('click', () => selectTool(tool))
  });

  function selectTool(tool) {
    tools.forEach(t => {
      t.classList.remove("selected")
    })
    tool.classList.add("selected")
    selected = tool
  }
  selectTool(selected)

  // Function to create the grid
  function createGrid(rows, cols) {
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 40px)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 40px)`;

    for (let i = 0; i < rows * cols; i++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';

      // Add event listeners for mouse interactions
      cell.addEventListener('mousedown', function(e) {
        isMouseDown = true;
        useTool(cell);
        e.preventDefault(); // Prevent text selection
      });

      cell.addEventListener('mouseenter', function() {
        if (isMouseDown) {
          useTool(cell);
        }
      });

      gridContainer.appendChild(cell);
    }
  }

  // Function to toggle cell color
  function useTool(cell) {
    if (selected.id === "pencil") {
      cell.classList.add('black');
    } else {
      cell.classList.remove('black');
    }
  }

  // Listen for mouse up event on the entire document
  document.addEventListener('mouseup', function() {
    isMouseDown = false;
  });

  // Reset button functionality
  resetButton.addEventListener('click', function() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => cell.classList.remove('black'));
  });

  // Resize button functionality
  resizeButton.addEventListener('click', function() {
    const newSize = prompt('Enter grid size (e.g., "10" for 10x10 grid):', '10');
    if (newSize && !isNaN(newSize) && newSize > 0 && newSize <= 30) {
      rows = parseInt(newSize);
      cols = parseInt(newSize);
      createGrid(rows, cols);
    } else if (newSize) {
      alert('Please enter a valid number between 1 and 30.');
    }
  });

  // Initialize the grid
  createGrid(rows, cols);
});

