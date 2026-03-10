// STEP 1 - slugify

// Convert a human-readable title into a URL-safe slug
// The output is lowercased, stripped of non-alphanumeric characters,
// and normalized to single hyphens between words
export default function slugify(value: string): string {
	return (
		value
			.toLowerCase()
			.trim()
			// Remove characters that are not letters, numbers, spaces, or hyphens
			.replace(/[^a-z0-9\s-]/g, "")
			// Replace one or more whitespace characters with a single hyphen
			.replace(/\s+/g, "-")
			// Collapse multiple hyphens into a single hyphen
			.replace(/-+/g, "-")
	);
}
