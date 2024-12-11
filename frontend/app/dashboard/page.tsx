"use client";

import FitScoreChart from "./fit_score_chart";
import SkillsMatched from "./skills_matched";
import ImprovementSuggestions from "./improvement_suggestions";
import styles from "./dashboard.module.css";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "util/fetching";
import { useEffect, useState } from "react"; // as from here to line 16
import React from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { generatePDF, generateWord } from "./reportGenerator";
export interface MockData {
	fitScore: number;
	matchedSkills: string[];
	improvementSuggestions: string[];
} 

const mockData: MockData = {
	fitScore: 85,
	matchedSkills: [
		"JavaScript",
		"React",
		"Node.js",
		"Next.js",
		"Team Collaboration",
		"C",
		"C#",
	],
	improvementSuggestions: [
		"Add personal characteristics.",
		"Include measurable achievements.",
		"Add personal project(s)",
	],
};

export default function Dashboard() {
	const router = useRouter();
	useEffect(() => {
		if (!isLoggedIn()) {
			router.push("/");
		}
	});

	const [fileFormat, setFileFormat] = useState("PDF"); // Default format is PDF

	const handleDownload = () => {
		if (fileFormat === "PDF") {
			generatePDF(mockData.fitScore, mockData.matchedSkills, mockData.improvementSuggestions);
		} else if (fileFormat === "Word") {
			generateWord(mockData.fitScore, mockData.matchedSkills, mockData.improvementSuggestions);
		}
	  };

	  return (
		<>
			<div className={styles.dashboardContainer}>
				<h1 className={styles.dashboardTitle}>Resume Analysis Dashboard</h1>
				<br></br>
				<FitScoreChart score={mockData.fitScore} />
				<SkillsMatched skills={mockData.matchedSkills} />
				<ImprovementSuggestions
					suggestions={mockData.improvementSuggestions}
				/>
			</div>

			{/* as */}
			{/* Button Container for Download Report */}
			<div className={styles.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownload}
		  sx={{
			height: 65,       // Adjust the height
			fontSize: "1.3rem" // Adjust the font size
		  }}
        >
          Download Report
        </Button>

        {/* Select Button for File Format */}
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="file-format-select-label">File Format</InputLabel>
          <Select
            labelId="file-format-select-label"
            id="file-format-select"
            value={fileFormat}
            label="File Format"
            onChange={(event) => setFileFormat(event.target.value)}
          >
            <MenuItem value="PDF">PDF</MenuItem>
            <MenuItem value="Word">Word</MenuItem>
          </Select>
        </FormControl>
      </div>
		</>
	);
}