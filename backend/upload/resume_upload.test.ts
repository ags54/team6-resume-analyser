import { assertEquals, assert } from "@std/assert";
import { resumeUpload } from "./resume_upload.ts";
import { createMockContext } from "@oak/oak/testing";

function createBody(body: string) {
	const req = new Request("http://0.0.0.0", {
		method: "POST",
		body: (body + "\n").replaceAll("\n", "\r\n"),
	});
	assert(req.body);
	return req.body;
}

Deno.test("Valid PDF", async () => {
	const body = `--boundary
Content-Disposition: form-data; name="file"; filename="resume.pdf"
Content-Type: application/pdf

Valid PDF content
--boundary--`;

	const ctx = createMockContext({
		body: createBody(body),
		method: "POST",
		headers: [["Content-Type", "multipart/form-data; boundary=boundary"]],
	});
	console.log(ctx);

	await resumeUpload(ctx);
	const responseBody = JSON.parse(ctx.response.body as string);

	assertEquals(ctx.response.status, 200);
	assertEquals(responseBody.message, "Resume uploaded successfully.");
});

Deno.test("Resume Upload - Invalid File Type", async () => {
	const body = `--boundary
Content-Disposition: form-data; name="file"; filename="resume.txt"
Content-Type: text/plain

Invalid file content
--boundary--`;

	const ctx = createMockContext({
		body: createBody(body),
		method: "POST",
		headers: [["Content-Type", "multipart/form-data; boundary=boundary"]],
	});

	await resumeUpload(ctx);
	const responseBody = JSON.parse(ctx.response.body as string);

	assertEquals(ctx.response.status, 400);
	assertEquals(
		responseBody.error,
		"Invalid file type. Only PDF and DOCX files are allowed.",
	);
});

Deno.test("Oversized File", async () => {
	const largeFileContent = "A".repeat(2 * 1024 * 1024 + 1); // 2MB + 1 byte

	const body = `--boundary
Content-Disposition: form-data; name="file"; filename="resume.pdf"
Content-Type: application/pdf

${largeFileContent}
--boundary--`;

	const ctx = createMockContext({
		body: createBody(body),
		method: "POST",
		headers: [["Content-Type", "multipart/form-data; boundary=boundary"]],
	});

	await resumeUpload(ctx);
	const responseBody = JSON.parse(ctx.response.body as string);

	assertEquals(ctx.response.status, 400);
	assertEquals(responseBody.error, "File size exceeds 2MB.");
});
