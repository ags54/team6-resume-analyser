import React, { useState } from "react";

import {
	Card,
	CardContent,
	CardHeader,
	List,
	ListItem,
	ListItemText,
	Checkbox,
	FormControlLabel,
	Box,
} from "@mui/material";
import styles from "./dashboard.module.css";
interface ImprovementSuggestionsProps {
	suggestions: { category: string; feedback: string }[];
}

export default function ImprovementSuggestions({
	suggestions = [],
}: ImprovementSuggestionsProps) {
	const isEmpty = suggestions.length == 0;
	const allCategories = new Set(suggestions.map((s) => s.category));
	const [selectedCategories, setSelectedCategories] =
		useState<Set<string>>(allCategories);

	const handleCategoryChange = (category: string, checked: boolean) => {
		if (checked) {
			selectedCategories.add(category);
		} else {
			selectedCategories.delete(category);
		}
		setSelectedCategories(new Set(selectedCategories));
	};

	const suggestionsFiltered = suggestions.filter((item) =>
		selectedCategories.has(item.category),
	);
	const hasAnySelected = selectedCategories.size > 0;
	const hasAnyDeselected =
		Array.from(allCategories.values()).find(
			(category) => !selectedCategories.has(category),
		) != undefined;
	const hasSomeSelected = hasAnySelected && hasAnyDeselected;

	return (
		<Card className={styles.cardContainerImprovement}>
			<CardHeader
				component="h2"
				title="Improvement Suggestions"
				titleTypographyProps={{
					className: styles.cardHeaderTitleImprovement,
				}}
			/>
			{isEmpty && <p>No suggestions available</p>}

			<CardContent>
				<Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
					<FormControlLabel
						control={
							<Checkbox
								checked={hasAnySelected}
								indeterminate={hasSomeSelected}
								onChange={(event) => {
									const checked = event.target.checked;
									if (checked) {
										setSelectedCategories(
											new Set(allCategories),
										);
									} else {
										setSelectedCategories(new Set());
									}
								}}
							/>
						}
						label="All"
					/>
					<Box
						sx={{ display: "flex", flexDirection: "column", ml: 3 }}
					>
						{Array.from(allCategories.values()).map((category) => (
							<FormControlLabel
								key={category}
								control={
									<Checkbox
										checked={selectedCategories.has(
											category,
										)}
										onChange={(event) =>
											handleCategoryChange(
												category,
												event.target.checked,
											)
										}
									/>
								}
								label={category}
							/>
						))}
					</Box>
				</Box>
				<List className={styles.listContainerImprovement}>
					{suggestionsFiltered.map((suggestion, index) => (
						<ListItem key={index} className={styles.listItem}>
							<ListItemText primary={suggestion.feedback} />
						</ListItem>
					))}
				</List>
			</CardContent>
		</Card>
	);
}
