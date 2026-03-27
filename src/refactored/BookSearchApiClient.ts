export type QueryParamValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryParamValue>;

export class BookSearchApiClient {
	async get<T>(url: string, params: QueryParams = {}): Promise<T> {
		const searchParams = new URLSearchParams();

		for (const [key, value] of Object.entries(params)) {
			if (value === null || value === undefined) {
				continue;
			}

			searchParams.append(key, String(value));
		}

		const queryString = searchParams.toString();
		const requestUrl = queryString ? `${url}?${queryString}` : url;

		const response = await fetch(requestUrl);

		if (!response.ok) {
			throw new Error(`Request failed with status ${response.status}`);
		}

		return response.json() as Promise<T>;
	}
}
