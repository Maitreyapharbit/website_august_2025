#!/usr/bin/env node
const { execSync } = require('child_process');
const { existsSync, rmSync } = require('fs');
const { join } = require('path');

function assertFileOrDirExists(path) {
	if (!existsSync(path)) {
		throw new Error(`Required path not found: ${path}`);
	}
}

function removeIfExists(path) {
	if (existsSync(path)) {
		rmSync(path, { force: true });
	}
}

function run(command) {
	try {
		execSync(command, { stdio: 'inherit' });
	} catch (error) {
		process.exit(error.status || 1);
	}
}

(function main() {
	const projectRoot = process.cwd();
	const outputZip = join(projectRoot, 'backend-deployment.zip');

	// Validate required inputs exist
	try {
		assertFileOrDirExists(join(projectRoot, 'package.json'));
		assertFileOrDirExists(join(projectRoot, 'package-lock.json'));
		assertFileOrDirExists(join(projectRoot, 'dist'));
	} catch (e) {
		console.error(e.message);
		console.error('Ensure you have built your backend (e.g., `npm run build` to produce the dist/ folder).');
		process.exit(1);
	}

	// Clean previous artifact
	removeIfExists(outputZip);

	const isWindows = process.platform === 'win32';

	if (isWindows) {
		// Use PowerShell Compress-Archive on Windows
		const psCommand = [
			"powershell -NoProfile -Command",
			"$ErrorActionPreference = 'Stop';",
			"Compress-Archive",
			"-Path 'dist','package.json','package-lock.json'",
			"-DestinationPath 'backend-deployment.zip'",
			"-Force"
		].join(' ');
		console.log('Creating backend-deployment.zip via PowerShell Compress-Archive...');
		run(psCommand);
	} else {
		// Use zip on macOS/Linux
		const zipCommand = [
			"zip -r -q -X",
			"backend-deployment.zip",
			"dist",
			"package.json",
			"package-lock.json"
		].join(' ');
		console.log('Creating backend-deployment.zip via zip...');
		run(zipCommand);
	}

	console.log('Successfully created backend-deployment.zip');
})();

