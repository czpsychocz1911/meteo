import { Card, CardContent } from "@mui/material";
import { Gauge } from "@mui/x-charts";
import React from "react";

export const SensorDataCard: React.FC<{ value: number, valMin: number , valMax: number, name: string }> = ({ value, valMin, valMax, name }) => {
	return (
		<Card variant="elevation">
			<CardContent>
                <p>{name}</p>
				<Gauge width={200} height={400} value={value} valueMin={valMin} valueMax={valMax}/>
			</CardContent>
		</Card>
	);
};
