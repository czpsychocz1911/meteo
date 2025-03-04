import { Paper, Stack } from "@mui/material";
import React from "react";
import { SensorDataCard } from "../SensorDataCard";
import { SensorDataProvider, useSensorData } from "../SensorDataContext";

export const MainContentPaper: React.FC = () => {
	const { sensorData } = useSensorData();

	return (
		<div>
			<Paper elevation={3}>
				<Stack direction="row" spacing={4}>
					<SensorDataCard
						value={sensorData?.humidity.data.relHum ?? 0}
						valMax={100}
						valMin={0}
					/>
					<SensorDataCard
						value={sensorData?.temp.data.temp ?? 0}
						valMax={40}
						valMin={20}
					/>
					<SensorDataCard
						value={sensorData?.soil.data.soilHumidity ?? 0}
						valMin={0}
						valMax={0}
					/>
				</Stack>
			</Paper>
		</div>
	);
};
