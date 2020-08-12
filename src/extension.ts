import * as vscode from 'vscode';
import MpSdkCompletion from './mp-completion';
import MpDemoTree from './mp-demo-tree';
import MpSdkCommands from './mp-commands';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "yun-diy" is now active!');
	new MpSdkCommands().run();
	new MpSdkCompletion(context).run();
	new MpDemoTree().run();
}

// this method is called when your extension is deactivated
export function deactivate() { }
