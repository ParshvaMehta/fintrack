class StorageService {
	// Set item in local storage
	setItem(key: string, value: string): void {
		window.localStorage.setItem(key, value);
	}

	// Get item from local storage
	getItem(key: string): string | null {
		return window.localStorage.getItem(key);
	}

	// Remove item from local storage
	removeItem(key: string): void {
		localStorage.removeItem(key);
	}

	// Clear all items from local storage
	clear(): void {
		localStorage.clear();
	}

	// Set JSON object in local storage
	setJSON(key: string, value: any): void {
		localStorage.setItem(key, JSON.stringify(value));
	}

	// Get JSON object from local storage
	getJSON(key: string): any | null {
		const value = localStorage.getItem(key);
		if (value) {
			try {
				return JSON.parse(value);
			} catch (e) {
				console.error("Error parsing JSON from local storage", e);
				return null;
			}
		}
		return null;
	}
}

const storageService = new StorageService();
export default storageService;
