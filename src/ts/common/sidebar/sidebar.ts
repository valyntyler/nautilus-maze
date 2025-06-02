namespace SideBar {
  const container = document.getElementById("right")!;

  export function show() {
    container.innerHTML = `
      <form id="command-prompt">
        <input type="text" name="command" maxlength="4" />
        <button type="submit">+</button>
      </form>
      <div class="commands-container" id="commands"></div>
    `.trim();
  }

  export function hide() {
    container.innerHTML = "";
  }
}

export default SideBar;
