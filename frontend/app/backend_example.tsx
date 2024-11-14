"use client";

import { Button, Card, CardContent, CardHeader, Input } from "@mui/material";
import { useState } from "react";
import { backendPost, useBackendGet } from "util/fetching";

export function BackendExample() {
	const { data, error } = useBackendGet("api/hello");
	const [postData, setPostData] = useState<string | undefined>();
	return (
		<>
			<Card>
				<CardHeader component="h2" title="GET" />
				<CardContent>
					<p data-testid="backend-example-get">
						{data
							? JSON.stringify(data)
							: error
								? error.toString()
								: "Loading..."}
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader component="h2" title="POST" />
				<CardContent>
					<p data-testid="backend-example-post">{postData}</p>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							const data = new FormData(
								event.target as HTMLFormElement,
							);
							backendPost("api/greeting", {
								name: data.get("name")?.toString() ?? "",
							})
								.then((data) => {
									setPostData(data.message);
								})
								.catch((reason) => {
									setPostData("" + reason);
								});
						}}
					>
						<Input name="name" placeholder="name" />
						<Button variant="contained" type="submit">
							send post request
						</Button>
					</form>
				</CardContent>
			</Card>
		</>
	);
}
