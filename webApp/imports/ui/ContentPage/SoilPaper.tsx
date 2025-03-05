import React, { useEffect, useState } from "react";
import { useSensorDataLong } from "../SensorDataProviderLong";
import { Paper } from "@mui/material";
import { LineChart } from "@mui/x-charts";

export const SoilPaper: React.FC = () => {
	const [x, setX] = useState<number[]>([]);
	const [y, setY] = useState<number[]>([]);

	const data = useSensorDataLong();

	const handleData = () => {
		const temp: number[] = [];
		const time: number[] = [];

		data.soilData.forEach((val, index) => {
			if (val.data?.updatedAt) {
				time.push(new Date(val.data.updatedAt).getTime());
				temp.push(Number(val.data.soilHumidity));
			}
		});

		setX(time);
		setY(temp);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		handleData();
	}, [data]);

	return (
		<Paper elevation={3}>
			<LineChart
				series={[{ data: y, label: "Temperature", color: "#ff6384" }]}
				xAxis={[{ data: x, scaleType: "time" }]}
				height={500}
				sx={{ width: "100%" }}
			/>
		</Paper>
	);
};
