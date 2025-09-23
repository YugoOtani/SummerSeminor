import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
  	item.show();

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

	let fi = 0;
	let energy = 400;
	let timer: ReturnType<typeof setTimeout> | undefined = undefined;

	const restart = () => {
		if (timer) {
			clearTimeout(timer);
			timer = undefined;
		}

		const updInterval = energyToUpdInterval(energy);
		if (updInterval === undefined) {
			item.text = '😴 🐈';
			return;
		}
		
		timer = setTimeout(() => {
			item.text = frames[fi];
			fi = (fi + 1) % frames.length;

			energy = Math.max(0, energy - 1);
			restart();
		}, updInterval);
	};


	restart();

	const feedCmd = vscode.commands.registerCommand('feedCat.feed', () => {
		energy = 400;
		restart();
	});
	context.subscriptions.push(feedCmd);


  	context.subscriptions.push(item, {dispose: () => { clearTimeout(timer); timer = undefined; }});
}

function energyToUpdInterval(energy: number): number | undefined {
	if (energy >= 150) return 20;
	if (energy >= 40) return 80;
	if (energy >= 1) return 120;
	return undefined;
}

export function deactivate() {}


