// import * as vscode from 'vscode';
// import * as fs from 'fs';
// import * as path from 'path';
// import MarkdownIt from 'markdown-it';
// import puppeteer from 'puppeteer-core';

// const md = new MarkdownIt();

// export function registerExporter(ctx: vscode.ExtensionContext) {
//     const cmd = vscode.commands.registerCommand('markdown-mate.exportNovel', exportNovel);
//     ctx.subscriptions.push(cmd);
// }

// async function exportNovel() {
//     const root = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
//     if (!root) { return vscode.window.showErrorMessage('No workspace opened'); }

//     const metaPath = path.join(root, 'meta.yml');
//     const meta: any = fs.existsSync(metaPath)
//         ? require('js-yaml').load(fs.readFileSync(metaPath, 'utf8'))
//         : { title: 'Untitled', author: 'Anonymous' };

//     const mdFiles = fs.readdirSync(root)
//         .filter(f => f.endsWith('.md'))
//         .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

//     let html = `<html><head><meta charset="utf-8"><link rel="stylesheet" href="${__dirname}/templates/pdf.css"></head><body>`;
//     html += `<h1>${meta.title}</h1><h3>${meta.author}</h3><div class="page-break"></div>`;

//     for (const file of mdFiles) {
//         const content = fs.readFileSync(path.join(root, file), 'utf8');
//         html += md.render(content) + '<div class="page-break"></div>';
//     }
//     html += '</body></html>';

//     // PDF
//     const browser = await puppeteer.launch({ executablePath: getChromiumPath(), headless: true });
//     const page = await browser.newPage();
//     await page.setContent(html, { waitUntil: 'networkidle0' });
//     const pdfPath = path.join(root, `${meta.title}.pdf`);
//     await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });
//     await browser.close();

//     // TXT
//     const txtPath = path.join(root, `${meta.title}.txt`);
//     const txt = mdFiles.map(f => fs.readFileSync(path.join(root, f), 'utf8')).join('\n\n');
//     fs.writeFileSync(txtPath, txt);

//     vscode.window.showInformationMessage(`导出完成：${pdfPath}  ${txtPath}`);
// }

// function getChromiumPath() {
//     // VS Code 自带 Chromium 的简易探测
//     const ext = process.platform === 'win32' ? '.exe' : '';
//     return path.join(vscode.env.appRoot, '..', '..', 'chrome_100_percent.pak')
//         .replace('chrome_100_percent.pak', `chrome${ext}`);
// }
