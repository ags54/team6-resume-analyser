import { BackendExample } from "./backend_example";
import Counter from "./counter";

export const metadata = {
	title: "resume analyser",
};

export default function Page() {
	return (
		<>
			<h1>resume analyser!</h1>
			<Counter />
			<BackendExample />
		</>
	);
}
