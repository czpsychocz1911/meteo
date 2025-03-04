import { AppBar, Button, Menu, MenuItem, Stack } from "@mui/material";
import React from "react";
import { UserProfileModal } from "./UserProfileModal";
import { SensorCompLiveFeed } from "./SensorCompLiveFeed";
import { SensorDataProvider } from "../SensorDataContext";
import { useNavigate } from "react-router-dom";

export const GraphAppBar: React.FC = () => {
	const navigate = useNavigate()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
	};

	const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		navigate("./")
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
					<h1>Graph page</h1>
					<Button
						onClick={handleMenu}
						color="secondary"
						variant="contained"
						sx={{ marginRight: "0px" }}
					>
						Open user settings
					</Button>
					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={() => setAnchorEl(null)}
					>
						<UserProfileModal />
						<MenuItem>Settings</MenuItem>
						<MenuItem>Logout</MenuItem>
					</Menu>
					<SensorDataProvider>
						<SensorCompLiveFeed />
					</SensorDataProvider>
					<Button
						onClick={(e) => handleNavigate(e)}
						color="secondary"
						variant="contained"
						sx={{ marginRight: "0px" }}
					>
						Open main page
					</Button>
				</Stack>
			</AppBar>
		</div>
	);
};
