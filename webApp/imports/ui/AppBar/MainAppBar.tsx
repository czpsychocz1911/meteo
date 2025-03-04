import { AppBar, Button, Menu, MenuItem, Stack } from "@mui/material";
import React from "react";
import { UserProfileModal } from "./UserProfileModal";
import { SensorCompLiveFeed } from "./SensorCompLiveFeed";
import { SensorDataProvider } from "../SensorDataContext";

export const MainAppBar: React.FC = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
	};

	const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null)
	const handleMenu2 = (e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl2(e.currentTarget)
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
					<Menu
						anchorEl={anchorEl2}
						open={Boolean(anchorEl2)}
						onClose={() => setAnchorEl2(null)}
					>
						<MenuItem onClick={() => console.log("Happy")}>Item1</MenuItem>
						<MenuItem>Item2</MenuItem>
					</Menu>
					<Button
						onClick={handleMenu2}
						color="secondary"
						variant="contained"
						sx={{ marginRight: "0px" }}
					>
						Open user settings
					</Button>
				</Stack>
			</AppBar>
		</div>
	);
};
