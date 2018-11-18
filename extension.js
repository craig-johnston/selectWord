const vscode = require('vscode');

function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.selectWord', function () {

    // Get the current text editor
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
      console.log('Editor not active');
      return;
    }

    console.log(editor.selections);

    let tmp = [];
    for (let i in editor.selections) {
      const sel = editor.selections[i];

      //Get the word under the active cursor using built-in rules for what is considered a word
      const range = editor.document.getWordRangeAtPosition(sel.active);
      if (!range) {
        console.log(`No word to select for cursor ${i}, skipping`);
        tmp[i] = sel;
        continue;
      }

      //Update the selection
      tmp[i] = new vscode.Selection(range.start, range.end);
    }

    editor.selections = tmp;
    console.log(editor.selections);
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;