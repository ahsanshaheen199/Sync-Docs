export const apiFetch = async (url: string, options: RequestInit) => {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}${url}`,
		options
	);
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}
	return response.json();
};
