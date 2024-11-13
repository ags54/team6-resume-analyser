"use client";

import { useBackend } from "util/fetching";

export function BackendExample() {
	const { data, error } = useBackend("api/hello");
	return (
		<>
			<h2>Data from backend</h2>
			<p data-testid="backend-example">
				{data
					? JSON.stringify(data)
					: error
						? error + ""
						: "Loading..."}
			</p>
		</>
	);
}
