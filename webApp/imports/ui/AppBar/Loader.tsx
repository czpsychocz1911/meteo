import { Box, CircularProgress } from "@mui/material";
import React from "react";

export const Loader: React.FC = () => {
	return (
		<Box sx={{ display: "flex" , width: "100%" , height: "100%" }}>
			<CircularProgress />
		</Box>
	);
};
