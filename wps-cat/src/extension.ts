import { clear } from 'console';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
  	item.command = 'wpsCat.enableExtension';
  	item.tooltip = 'Click to enable/disable WPS Cat';
  	item.show();
  	context.subscriptions.push(item);

	// locals
	let calcWpsIntervalMs = 500;
	let calcWpsTimer: ReturnType<typeof setInterval> | undefined;
	let animTimer: ReturnType<typeof setInterval> | undefined;
	let wordCnt = 0;
	let extensionEnabled = false;
	const frames = [
    '🐈         ', 
    ' 🐈        ', 
    '  🐈       ', 
    '   🐈      ', 
    '    🐈     ', 
    '     🐈    ',
    '      🐈   ',
    '       🐈  ',
    '        🐈 ',
    '         🐈',
    '        🐈 ',
    '       🐈  ',
    '      🐈   ',
    '     🐈    ',
    '    🐈     ',
    '   🐈      ',
    '  🐈       ',
    ' 🐈        '];

	const stopTimer = () => {
		if (animTimer){
			clearInterval(animTimer);
			animTimer = undefined;
		}
		if (calcWpsTimer){
			clearInterval(calcWpsTimer);
			calcWpsTimer = undefined;
		}
	}
	const stopExtension = () => {
		stopTimer();
		item.text = `😴 🐈`;
	}
	const restartExtension = () => {
		let frameIndex = 0;
		wordCnt = 0;
		stopTimer();
		calcWpsTimer = setInterval(() => {
			const animIntervalMs = wpsToAnimIntervalMs(wordCnt / (calcWpsIntervalMs / 1000));
			if (animTimer) clearInterval(animTimer);
			if (animIntervalMs === undefined){
				item.text = frames[frameIndex];
			}else {
				animTimer = setInterval(() => {
					item.text = frames[frameIndex];
					frameIndex = (frameIndex + 1) % frames.length;
				}, animIntervalMs);
			}
			wordCnt = 0;
		}, calcWpsIntervalMs);
	}
	stopExtension();

	// enable/disable command
	let enableCommand = vscode.commands.registerCommand('wpsCat.enableExtension', () => {
		if (extensionEnabled){
			extensionEnabled = false;
			stopExtension();
		}else{
			extensionEnabled = true;
			restartExtension();
		}
	});
	const docChangeHandler = vscode.workspace.onDidChangeTextDocument((e) => {
    	const len = e.contentChanges.reduce((acc, cur) => acc + cur.text.replace(/\s/g, '').length, 0);
		wordCnt += len;
  	});

	context.subscriptions.push(enableCommand, docChangeHandler);
}

function wpsToAnimIntervalMs(
  wps: number
): number | undefined {
  if (wps <= 0) return undefined;
  if (wps <= 7) return 80; // slow
  return 20; // fast
}

export function deactivate() {}
