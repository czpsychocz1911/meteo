import { Box, CircularProgress } from "@mui/material";
import React from "react";

export const Loader: React.FC = () => {
	return (
		<Box sx={{ display: "flex" }}>
			<CircularProgress />
		</Box>
	);
};
