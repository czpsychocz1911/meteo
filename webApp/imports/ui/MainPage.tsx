import React from "react";
import { MainAppBar } from "./AppBar/MainAppBar";
import { MainContentPaper } from "./ContentPage.tsx/MainContentPaper";
import { SensorDataProvider } from "./SensorDataContext";

export const MainPage: React.FC = () => {
	return (
		<div>
			<MainAppBar />
			<SensorDataProvider>
				<MainContentPaper />
			</SensorDataProvider>
		</div>
	);
};
