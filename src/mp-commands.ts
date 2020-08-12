import * as vscode from 'vscode';

export default class MpSdkCommands {
  run() {
    vscode.commands.registerCommand('mp-sdk.view', () => {
      vscode.env.openExternal(vscode.Uri.parse('https://doc.youzanyun.com/#/content/35700/36726'));
    });
  }
}
