import React from "react";
import { MainAppBar } from "./AppBar/MainAppBar";
import { SensorDataProvider } from "./SensorDataContext";
import { MainContentPaper } from "./ContentPage/MainContentPaper";

export const MainPage: React.FC = () => {
	return (
		<div>
			<MainAppBar />
			<SensorDataProvider>
				<MainContentPaper/>
			</SensorDataProvider>
		</div>
	);
};
