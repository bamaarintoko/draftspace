export function getErrorMessage(error: unknown): string {
	if (
		typeof error === "object" &&
		error !== null &&
		"response" in error &&
		typeof (error as any).response === "object"
	) {
		const res = (error as any).response;
		return res?.data?.error || res?.data?.message || "Terjadi kesalahan server.";
	}

	if (typeof error === "string") return error;

	return "Terjadi kesalahan. Silakan coba lagi.";
}

export function getPageTitle(pathname: string): string {
	const segments = pathname.split('/').filter(Boolean)

	if (segments.length === 1) {
		return capitalizePlural(segments[0]) // e.g., "Articles"
	}

	const base = segments[1] // e.g., "articles", "categories"
	const action = segments[2] // could be "create" or [id]
	const subAction = segments[3] // could be "edit"

	if (action === 'create') {
		return `Create ${capitalize(base)}`
	}

	if (subAction === 'edit') {
		return `Edit ${capitalize(base)}`
	}

	return capitalize(base)
}

function capitalizePlural(str: string) {
	// Kalau mau bikin mapping: articles → Article, categories → Category
	const singularMap: Record<string, string> = {
		articles: 'Articles',
		categories: 'Categories',
		products: 'Products',
	}

	return singularMap[str] || capitalize(str)
}

function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}