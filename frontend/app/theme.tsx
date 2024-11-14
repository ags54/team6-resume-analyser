"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

export const theme = createTheme({
	components: {
		// Name of the component
		MuiButtonBase: {
			styleOverrides: {
				root: {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					textTransform: "unset !important" as any,
				},
			},
		},
	},
});

export function Theme(props: { children: ReactNode }) {
	return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
