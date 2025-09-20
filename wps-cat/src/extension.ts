import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
  	item.command = 'wps-cat.meow';
  	item.tooltip = 'Click to say meow';
	item.text = "🐈"
  	item.show();
  	context.subscriptions.push(item);

	const meowCommand = vscode.commands.registerCommand('wps-cat.meow', () => {
		vscode.window.showInformationMessage('Meow!');
	});
	context.subscriptions.push(meowCommand);

}

export function deactivate() {}
