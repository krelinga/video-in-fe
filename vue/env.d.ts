
/// <reference types="vite/client" />

declare global {
	interface Window {
		envVars?: Record<string, string>;
	}
}

export {};
