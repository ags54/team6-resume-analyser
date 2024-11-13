import { render, screen } from "@testing-library/react";
import Page from "./page";

// https://jestjs.io/docs/mock-functions
jest.mock("../util/fetching", () => {
	const originalModule = jest.requireActual("../util/fetching");
	return {
		__esModule: true,
		...originalModule,
		useBackend: (endpoint: string) => {
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

it("displays the correct information from the backend", () => {
	render(<Page />);
	expect(screen.getByTestId("backend-example").textContent).toEqual(
		'{"text":"Hello from the backend!","otherText":"Hello again!"}',
	);
});
