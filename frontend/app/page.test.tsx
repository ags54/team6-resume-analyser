import { act, fireEvent, render, screen } from "@testing-library/react";
import Page from "./page";
import { processEvents } from "util/testing";

// https://jestjs.io/docs/mock-functions
jest.mock("../util/fetching", () => {
	const originalModule = jest.requireActual("../util/fetching");
	return {
		__esModule: true,
		...originalModule,
		useBackendGet: (endpoint: string) => {
			switch (endpoint) {
				case "api/hello":
					return {
						data: {
							text: "Hello from the backend!",
							otherText: "Hello again!",
						},
						error: undefined,
					};
			}
		},
		backendPost: (endpoint: string, data: any) => {
			switch (endpoint) {
				case "api/greeting":
					return Promise.resolve({
						message: "this is a message",
					});
			}
		},
	};
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
		'{"text":"Hello from the backend!","otherText":"Hello again!"}',
	);
});

it("displays the correct information from the backend post", async () => {
	render(<Page />);
	await act(async () => {
		fireEvent.click(
			screen.getByRole("button", { name: "send post request" }),
		);
	});
	expect(screen.getByTestId("backend-example-post").textContent).toEqual(
		"this is a message",
	);
});
