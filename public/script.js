document.addEventListener('DOMContentLoaded', function() {
  const gridContainer = document.getElementById('grid');
  const resetButton = document.getElementById('reset');
  const resizeButton = document.getElementById('resize');
  const saveButton = document.getElementById('save');
  const undoButton = document.getElementById('undo');
  const redoButton = document.getElementById('redo');
  const exportButton = document.getElementById('export');
  const importButton = document.getElementById('import');
  const tools = document.querySelectorAll('.tool');

  let isMouseDown = false;
  let rows = 10;
  let cols = 10;
  let selected = document.getElementById('pencil');

  // export/import
  exportButton?.addEventListener('mousedown', () => {
    saveJSON(readState())
  })

  importButton?.addEventListener('mousedown', () => {
    console.log("import")
  })

  // undo/redo
  undoButton?.addEventListener('mousedown', () => {
    console.log("undo")
  })

  redoButton?.addEventListener('mousedown', () => {
    console.log("redo")
  })

  // handle key presses
  document.addEventListener('keydown', function(event) {
    // eraser
    if (event.key === 'e' || event.key === 'E') {
      selected = document.getElementById('eraser')
      selectTool(selected)
    }
    // pencil
    if (event.key === 'b' || event.key === 'B') {
      selected = document.getElementById('pencil')
      selectTool(selected)
    }
    if (event.key === 'p' || event.key === 'P') {
      selected = document.getElementById('pencil')
      selectTool(selected)
    }
    // save
    if (event.key === 's' || event.key === 'S') {
      saveGrid()
      showNotification("Saved successfully!")
      event.preventDefault()
    }
    // undo
    if (event.key === 'z') {
      console.log("undo")
      event.preventDefault()
    }
    // redo
    if (event.key === 'y' || event.key === 'Y' || event.key === 'Z') {
      console.log("redo")
      event.preventDefault()
    }
    if (event.key === 'x' || event.key === 'X') {
      if (selected.id === "pencil") {
        selected = document.getElementById('eraser')
        selectTool(selected)
      } else {
        selected = document.getElementById('pencil')
        selectTool(selected)
      }
    }
  });

  
  // load save
  // const savedData = localStorage.getItem('editor-state');
  const savedData = JSON.parse(localStorage.getItem('editor-state'));
  console.log(savedData)

  // setup tool buttons
  tools.forEach(tool => tool.addEventListener('mousedown', () => selectTool(tool)));

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

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {

        const cell = document.createElement('div');
        cell.className = 'grid-cell';

        // Disable context menu
        cell.addEventListener('contextmenu', function(e) {
          e.preventDefault();
        })

        // Add event listeners for mouse interactions
        cell.addEventListener('mousedown', function(e) {
          isMouseDown = true;
          useTool(cell, e.button === 2);

          e.preventDefault(); // Prevent text selection
        });

        cell.addEventListener('mouseenter', function(e) {
          if (isMouseDown) {
            useTool(cell, e.buttons === 2);
          }
        });

        if (savedData) {
          if (savedData.grid[i][j]) {
            cell.classList.add('black');
          }
        }

        gridContainer.appendChild(cell);
      }
    }
  }

  function readState() {
    const state = {
      rows: rows,
      cols: cols,
      grid: Array(rows).fill().map(() => (Array(cols).fill(0))),
    };

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        state.grid[i][j] = gridContainer.children[i * rows + j].classList.contains("black") ? 1 : 0
      }
    }

    return state
  }

  function saveGrid() {
    localStorage.setItem("editor-state", JSON.stringify(readState()))
  }

  // Function to toggle cell color
  function useTool(cell, isRightClick) {
    if (selected.id === "pencil" ) {
      if (isRightClick) {
        cell.classList.remove('black');
      } else {
        cell.classList.add('black');
      }
    } else {
      if (isRightClick) {
        cell.classList.add('black');
      } else {
        cell.classList.remove('black');
      }
    }
    saveGrid()
  }

  // Listen for mouse up event on the entire document
  document.addEventListener('mouseup', function() {
    isMouseDown = false;
  });

  // Reset button functionality
  resetButton.addEventListener('click', function() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => cell.classList.remove('black'));
    saveGrid()
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

  saveButton?.addEventListener('mousedown', () => {
      exportJSON()
    }
  )

  function exportJSON() {
    showNotification("Export successful!")
    saveJSON(readState())
  }

  // Initialize the grid
  createGrid(rows, cols);

  // handle notifications
  function showNotification(message, type = '') {
    const container = document.getElementById('notificationContainer');

    // Clear notifications
    container.innerHTML = '';

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add to container
    container.appendChild(notification);

    // Remove after animation completes (1.2 seconds)
    setTimeout(() => {
      notification.remove();
    }, 1200);
  }
});

// save JSON file
function saveJSON(data) {
  // Convert JSON object to a string with formatting
  const jsonString = JSON.stringify(data, null, 2);

  // Create a Blob with the JSON data
  const blob = new Blob([jsonString], { type: 'application/json' });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a temporary anchor element
  const a = document.createElement('a');
  a.href = url;
  a.download = 'maze.json'; // Set the file name

  // Append the anchor to the document
  document.body.appendChild(a);

  // Trigger a click on the anchor
  a.click();

  // Clean up
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
