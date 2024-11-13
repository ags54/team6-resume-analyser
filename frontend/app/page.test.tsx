import { render, screen } from "@testing-library/react";
import Page from "./page";

it("App Router: Works with Server Components", () => {
	const { container } = render(<Page />);
	expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
		"resume analyser!",
	);
	expect(container).toMatchSnapshot();
});
