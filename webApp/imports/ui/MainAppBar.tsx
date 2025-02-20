import { AppBar, Button, Menu, MenuItem, Stack } from "@mui/material";
import React from "react";
import { UserProfileModal } from "./UserProfileModal";

export const MainAppBar: React.FC = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
	};

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
					<Button onClick={handleMenu} color="secondary">
						Open user settings
					</Button>
					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={() => setAnchorEl(null)}
					>
                        <UserProfileModal/>
						<MenuItem>Settings</MenuItem>
						<MenuItem>Logout</MenuItem>
					</Menu>
				</Stack>
			</AppBar>
		</div>
	);
};
