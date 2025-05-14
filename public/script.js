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
    exportJSON(readState())
    showNotification("Export successful!")
  })

  importButton?.addEventListener('mousedown', () => {
    importJSON()
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
      showNotification("Saved successfully!")
    }
  )

  // Initialize the grid
  createGrid(rows, cols);
});

function exportJSON(data) {
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

function importJSON() {
  // Create a hidden file input
  const input = document.createElement('input');
  input.type = 'file';

  // Optional: configure the input
  input.multiple = false;
  input.accept = '.json';

  // Set up the change handler
  input.onchange = (event) => {
    const file = event.target.files[0];

    // Create a FileReader object
    const reader = new FileReader();

    // Define what happens once the file is loaded
    reader.onload = function(event) {
      console.log('File contents:');
      console.log(event.target.result);
      showNotification("Import successful!")
    };

    // Define error handling
    reader.onerror = function() {
      console.error('Error reading file');
    };

    // Read the file as text
    reader.readAsText(file);
  };

  // Trigger the file picker dialog
  input.click();
}
