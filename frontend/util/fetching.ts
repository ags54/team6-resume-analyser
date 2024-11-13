import useSWR from "swr";

export const jsonFetcher: (
	...args: Parameters<typeof fetch>
) => Promise<any> = (...args) => fetch(...args).then((res) => res.json());

export function useBackend(endpoint: string) {
	// ensure trailing slash in server
	const server = process.env.NEXT_PUBLIC_BACKEND?.endsWith("/")
		? process.env.NEXT_PUBLIC_BACKEND
		: process.env.NEXT_PUBLIC_BACKEND + "/";
	// remove trailing slash from endpoint
	if (endpoint.endsWith("/")) {
		endpoint = endpoint.slice(0, endpoint.length - 1);
	}
	// remove leading slash from endpoint
	if (endpoint.startsWith("/")) {
		endpoint = endpoint.slice(1, endpoint.length);
	}
	return useSWR(server + endpoint, jsonFetcher);
}
