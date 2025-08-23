import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const previewCmd = vscode.commands.registerCommand(
		'markdown-mate.showPreviewToSide',
		() => {
			vscode.commands.executeCommand(
				'markdown.showPreviewToSide',
				vscode.window.activeTextEditor?.document.uri
			);
		}
	);

	const provider = new (class implements vscode.WebviewViewProvider {
		resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken): Thenable<void> | void {
			webviewView.webview.options = { enableScripts: true};
			webviewView.webview.html = /*html*/`
			<!DOCTYPE html>
			<html>
				<head><meta charset="utf-8" /></head>
				<body>
					<h3>Markdown 语法速查</h3>
					<ul>
						<li><b>粗体</b>: <code>**text**</code></li>
						<li><b>斜体</b>: <code>*text*</code></li>
						<li><b>标题</b>: <code>### Title</code></li>
						<li><b>表格</b>: 
							<pre>| A | B |<br>|--|--|<br>| 1 | 2 |</pre>
						</li>
						<li><b>任务列表</b>: <code>- [ ] todo</code></li>
					</ul>
				</body>
			</html>			
			`;
		}
	})();
	vscode.window.registerWebviewViewProvider(
		'markdown-mate.cheatSheet',
		provider
	);

	context.subscriptions.push(previewCmd);
}

export function deactivate() {}
