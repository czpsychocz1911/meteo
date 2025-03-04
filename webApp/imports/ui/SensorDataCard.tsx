import { CardContent } from "@mui/material";
import { Gauge } from "@mui/x-charts";
import React from "react";

export const SensorDataCard: React.FC = () => {
	return (
		<React.Fragment>
			<CardContent>
				<Gauge width={100} height={100} value={50} />
			</CardContent>
		</React.Fragment>
	);
};
