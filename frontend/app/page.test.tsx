import { act, fireEvent, render, screen } from "@testing-library/react";
import Page from "./page";
import { getRequests, postRequests } from "util/fetching";
import { SWRResponse } from "swr";

// https://jestjs.io/docs/mock-functions
jest.mock("../util/fetching", () => {
	const originalModule: object = jest.requireActual("../util/fetching");
	return {
		__esModule: true,
		...originalModule,
		useBackendGet: <T extends keyof getRequests>(
			endpoint: T,
		): SWRResponse<getRequests[T]["response"]> => {
			switch (endpoint) {
				case "api/hello":
					return {
						data: {
							message: "Hello from the backend!",
						},
						error: undefined,
						isValidating: false,
						isLoading: false,
						mutate: () => Promise.reject(new Error()),
					};
			}
			return {
				data: undefined,
				error: new Error(),
				isValidating: false,
				isLoading: false,
				mutate: () => Promise.reject(new Error()),
			};
		},
		backendPost: <T extends keyof postRequests>(
			endpoint: string,
			_data: postRequests[T]["request"],
		): Promise<postRequests[T]["response"]> => {
			switch (endpoint) {
				case "api/greeting":
					return Promise.resolve({
						message: "this is a message",
					});
			}
			return Promise.reject(new Error());
		},
	} as unknown;
});

it("has an h1 that says resume analyser", () => {
	render(<Page />);
	expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
		"resume analyser!",
	);
});

it("should match snapshot", () => {
	const { container } = render(<Page />);
	expect(container).toMatchSnapshot();
});

it("displays the correct information from the backend get", () => {
	render(<Page />);
	expect(screen.getByTestId("backend-example-get").textContent).toEqual(
		'{"message":"Hello from the backend!"}',
	);
});

it("displays the correct information from the backend post", async () => {
	render(<Page />);
	// eslint-disable-next-line @typescript-eslint/require-await
	await act(async () => {
		fireEvent.click(
			screen.getByRole("button", { name: "send post request" }),
		);
	});
	expect(screen.getByTestId("backend-example-post").textContent).toEqual(
		"this is a message",
	);
});
