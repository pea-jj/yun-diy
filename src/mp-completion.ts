import * as vscode from 'vscode';
import sdkLocal from './constants/mock';
import axios from 'axios';

const CHAR_LIMIT = 100000;

const SDK_PREFIX_LIST = [
  'yunSdk',
  'this.getYunSdk()',
  'getApp().getYouZanYunSdk()',
];

export default class MpSdkCompletion {
  public sdkMock: any;
  public context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.sdkMock = sdkLocal;
  }

  public run() {
    const url = 'https://doc.youzanyun.com/api/mp/sdk';
    // const url = 'http://127.0.0.1:8201/api/mp/sdk';
    axios.get(url).then(res => {
      if (res.status === 200 && res.data && res.data.data) {
        const sdkMock = res.data.data;
        this.sdkMock = sdkMock;
      }
    }).catch(e => {
      console.error(e);
    }).finally(() => {
      const provider = vscode.languages.registerCompletionItemProvider('javascript', { provideCompletionItems: this.provideCompletionItems.bind(this) }, '.');
      this.context.subscriptions.push(provider);
    });
  }

  private provideCompletionItems (document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
    const linePrefix = document.lineAt(position).text.substr(0, position.character);
    let SDK_PREFIX_POSITION = 0;
    let SDK_PREFIX = SDK_PREFIX_LIST.find(item => {
      SDK_PREFIX_POSITION = linePrefix.indexOf(item);
      return SDK_PREFIX_POSITION !== -1;
    });
    if (!SDK_PREFIX) {
      return [];
    }

    const fileName = document.fileName;
    const offset = document.offsetAt(position);
    const before_start_offset = Math.max(0, offset - CHAR_LIMIT);
    const after_end_offset = offset + CHAR_LIMIT;
    const before_start = document.positionAt(before_start_offset);
    const after_end = document.positionAt(after_end_offset);
    const before = document.getText(new vscode.Range(before_start, position));
    const after = document.getText(new vscode.Range(position, after_end));

    const str = document.lineAt(position).text.substr(SDK_PREFIX_POSITION + SDK_PREFIX.length, position.character);
    if (!/(\.[^\s]*)*\.$/.test(str)) {
      return [];
    }
    const arr = str.split('.');
    arr[0] = SDK_PREFIX;
    arr.pop();

    const sdkMock = this.sdkMock;
    const pageKey = Object.keys(sdkMock.page).find(v => fileName.includes(v));
    const mockData: any = { ...sdkMock.common };

    if (pageKey) {
      // @ts-ignore：
      mockData.page = sdkMock.page[pageKey];
    }
    let result: any[] = [];
    this.makeCompletionItem(mockData, arr, result);
    return result;
  }

  private makeCompletionItem(mockData: any, keys: any[], result: any[] = []) {
    const items = keys.length === 1 ? mockData : keys.slice(1).reduce((total, item) => total && total[item], mockData);
    if (this.hasCompletion(items)) {
      const completions = Object.keys(items);
      completions.forEach(v => {
        const completionItem = new vscode.CompletionItem(v);
        completionItem.kind = vscode.CompletionItemKind.Field;
        // completionItem.detail = 'youzan';
        // completionItem.documentation = 'you-zan';
        if (items[v]._type === 'snippet') {
          completionItem.kind = vscode.CompletionItemKind.Snippet;
          completionItem.detail = 'view';
          completionItem.documentation = items[v].snippet;
          completionItem.insertText = new vscode.SnippetString(items[v].snippet);
        }
        result.push(completionItem);
      });
    }
  }

  private hasCompletion(data: any) {
    return data && typeof data === 'object' && !data._type;
  }
}

