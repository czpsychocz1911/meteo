import { Card, CardContent, Stack } from "@mui/material";
import { Gauge } from "@mui/x-charts";
import React from "react";

export const SensorDataCard: React.FC<{
	value: number;
	valMin: number;
	valMax: number;
	name: string;
}> = ({ value, valMin, valMax, name }) => {
	return (
		<Card variant="elevation">
			<CardContent>
				<Stack direction="column" justifyContent="center">
					<p>{name}</p>
					<Gauge
						width={200}
						height={400}
						value={value}
						valueMin={valMin}
						valueMax={valMax}
					/>
				</Stack>
			</CardContent>
		</Card>
	);
};
