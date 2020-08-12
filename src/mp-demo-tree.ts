import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

const root = path.join(__filename, '../../mp-demo');

export class FillTreeProvider implements vscode.TreeDataProvider<DemoFile> {
	constructor(private workspaceRoot: string) {
	}

	getTreeItem(element: DemoFile): vscode.TreeItem {
		return element;
	}

	getChildren(element?: DemoFile): Thenable<DemoFile[]> {
		if (!this.workspaceRoot) {
			vscode.window.showInformationMessage('No DemoFile in empty workspace');
			return Promise.resolve([]);
		}

		let dir = this.workspaceRoot;
		if (element) {
			dir = element.path;
		}

		if (fs.lstatSync(dir).isDirectory()) {
			const filenames = fs.readdirSync(dir);
			const results = filenames.map(item => {
				if (fs.lstatSync(path.join(dir, item)).isDirectory()) {
					return new DemoFile(path.join(dir, item), item, vscode.TreeItemCollapsibleState.Collapsed);
				} else {
					return new DemoFile(path.join(dir, item), item, vscode.TreeItemCollapsibleState.None, {
						command: 'fileTree.view',
						title: '',
						arguments: [{ path: path.join(dir, item), file: item }]
					});
				}
			});
			return Promise.resolve(results);
		} else {
			return Promise.resolve([]);
		}
	}
}

export class DemoFile extends vscode.TreeItem {
	constructor(
		public path: string,
		public readonly label: string,
		// private version: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command,
	) {
		super(label, collapsibleState);
	}

	get tooltip(): string {
		return `${this.label}`;
	}

	contextValue = 'DemoFile';
}

export default class MpDemoTree {
	run() {
		const fileTreeProvider = new FillTreeProvider(root);
		vscode.window.registerTreeDataProvider('fileTree', fileTreeProvider);
		vscode.commands.registerCommand('fileTree.view', ({ path: dir, file }) => {
			const uri = vscode.Uri.file(dir);
			vscode.commands.executeCommand('vscode.open', uri);
		})
	}
}
