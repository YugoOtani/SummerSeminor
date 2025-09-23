(function () {
  const vscode = acquireVsCodeApi();
  document.querySelector(".feed-button").addEventListener("click", () => {
    const commandInput = document.querySelector("#input-area").value;
    document.querySelector("#input-area").value = "";
    vscode.postMessage({ type: "feedButtonClicked", value: commandInput });
  });
})();