import {readFileSync} from 'node:fs';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

const conf = JSON.parse(readFileSync('./src-tauri/tauri.conf.json', {encoding: 'utf8'}));

let hosts = '';
if (process.platform === 'win32') {
	hosts = 'C:\\Windows\\System32\\drivers\\etc\\hosts';
} else if (process.platform === 'darwin' || process.platform === 'linux') {
	hosts = '/etc/hosts';
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	clearScreen: false,
	server: {
		port: 3000,
		strictPort: true,
	},
	define: {
		PLATFORM: JSON.stringify(process.platform),
		APP_NAME: JSON.stringify(conf.package.productName),
		APP_VERSION: JSON.stringify(conf.package.version),
		SYSTEM_HOSTS: JSON.stringify(hosts),
	},
	envPrefix: ['VITE_', 'TAURI_'],
	build: {
		// Tauri supports es2021
		target: ['es2021', 'chrome100', 'safari14'],
		// don't minify for debug builds
		minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
		// produce sourcemaps for debug builds
		sourcemap: !!process.env.TAURI_DEBUG,
	},
});
