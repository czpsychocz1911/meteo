import { AppBar, Button, Menu, MenuItem, Stack } from "@mui/material";
import React from "react";
import { UserProfileModal } from "./UserProfileModal";
import { SensorCompLiveFeed } from "./SensorCompLiveFeed";
import { SensorDataProvider } from "../SensorDataContext";
import { useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { UserProfileSettingsModal } from "./UserProfileSettingsModal";

export const MainAppBar: React.FC = () => {
	const navigate = useNavigate()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
	};

	const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		navigate("./graphs")
	}
	

	return (
		<div>
			<AppBar position="static">
				<Stack
					direction="row"
					alignItems="center"
					spacing={8}
					paddingLeft={2}
					paddingRight={2}
					paddingTop={1}
					paddingBottom={1}
				>
					<h1>Main Page</h1>
					<Button
						onClick={handleMenu}
						color="secondary"
						variant="contained"
						sx={{ marginRight: "0px" }}
					>
						Open user settings
					</Button>
					<Button
						onClick={(e) => handleNavigate(e)}
						color="secondary"
						variant="contained"
						sx={{ marginRight: "0px" }}
					>
						Open graph page
					</Button>
					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={() => setAnchorEl(null)}
					>
						<UserProfileModal />
						<UserProfileSettingsModal/>
						<Button onClick={() => Meteor.logout()}>Logout</Button>
					</Menu>
					<SensorDataProvider>
						<SensorCompLiveFeed />
					</SensorDataProvider>
				</Stack>
			</AppBar>
		</div>
	);
};
