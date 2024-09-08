const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const esprima = require('esprima');

const SRC_DIR = 'src';

function analyzeFile(filepath) {
    const content = fs.readFileSync(filepath, 'utf-8');
    let functions = [];
    let classes = [];
    let imports = [];

    if (filepath.endsWith('.ts') || filepath.endsWith('.tsx')) {
        const result = ts.createSourceFile(filepath, content, ts.ScriptTarget.ES2015, true);
        ts.forEachChild(result, node => {
            if (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node)) {
                functions.push(node.name ? node.name.getText() : 'anonymous function');
            }
            if (ts.isClassDeclaration(node)) {
                classes.push(node.name ? node.name.getText() : 'anonymous class');
            }
            if (ts.isImportDeclaration(node)) {
                imports.push(node.getText());
            }
        });
    } else {
        const ast = esprima.parseScript(content, { tolerant: true });
        esprima.tokenize(content).forEach(token => {
            if (token.type === 'Identifier' && /^(function|class|import)/.test(token.value)) {
                imports.push(token.value);
            }
        });
        esprima.parseScript(content, { tolerant: true }).body.forEach(node => {
            if (node.type === 'FunctionDeclaration') {
                functions.push(node.id ? node.id.name : 'anonymous function');
            }
            if (node.type === 'ClassDeclaration') {
                classes.push(node.id ? node.id.name : 'anonymous class');
            }
        });
    }

    return {
        filepath,
        functions,
        classes,
        imports
    };
}

function analyzeDirectory(directory) {
    const results = [];
    function walkDir(dir) {
        fs.readdirSync(dir).forEach(file => {
            const filepath = path.join(dir, file);
            if (fs.statSync(filepath).isDirectory()) {
                walkDir(filepath);
            } else if (file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.tsx')) {
                results.push(analyzeFile(filepath));
            }
        });
    }
    walkDir(directory);
    return results;
}

function printAnalysis(results) {
    results.forEach(result => {
        console.log(`File: ${result.filepath}`);
        console.log(`  Functions: ${result.functions.length ? result.functions.join(', ') : 'None'}`);
        console.log(`  Classes: ${result.classes.length ? result.classes.join(', ') : 'None'}`);
        console.log(`  Imports: ${result.imports.length ? result.imports.join(', ') : 'None'}`);
        console.log("");
    });
}

const results = analyzeDirectory(SRC_DIR);
printAnalysis(results);