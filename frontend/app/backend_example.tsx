"use client";

import { Card, CardContent, CardHeader } from "@mui/material";
import { useBackend } from "util/fetching";

export function BackendExample() {
	const { data, error } = useBackend("api/hello");
	return (
		<Card>
			<CardHeader title="Data from backend"></CardHeader>
			<CardContent>
				<p data-testid="backend-example">
					{data
						? JSON.stringify(data)
						: error
							? error + ""
							: "Loading..."}
				</p>
			</CardContent>
		</Card>
	);
}
