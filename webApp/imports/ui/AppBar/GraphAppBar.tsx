import { AppBar, Button, Menu, MenuItem, Stack } from "@mui/material";
import React from "react";
import { UserProfileModal } from "./UserProfileModal";
import { SensorCompLiveFeed } from "./SensorCompLiveFeed";
import { SensorDataProvider } from "../SensorDataContext";
import { useNavigate } from "react-router-dom";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

export const GraphAppBar: React.FC<{header: string}> = ({header}) => {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [graphAnchor, setGraphAnchor] = React.useState<null | HTMLElement>(
		null,
	);
	const [tableAnchor, setTableAnchor] = React.useState<null | HTMLElement>(
		null,
	);
	const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
	};

	const handleGraph = (e: React.MouseEvent<HTMLButtonElement>) => {
		setGraphAnchor(e.currentTarget);
	};

	const handleTable = (e: React.MouseEvent<HTMLButtonElement>) => {
		setTableAnchor(e.currentTarget)
	}

	const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		navigate(-1);
	};

	return (
		<div>
			<AppBar position="static">
				<Stack
					direction="row"
					alignItems="center"
					spacing={4}
					paddingLeft={2}
					paddingRight={2}
					paddingTop={1}
					paddingBottom={1}
				>
					<h1>{header}</h1>
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
						Open main page
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
						color="secondary"
						variant="contained"
						onClick={handleGraph}
						fullWidth={false}
					>
						<KeyboardDoubleArrowDownIcon />
					</Button>
					<Menu
						anchorEl={graphAnchor}
						open={Boolean(graphAnchor)}
						onClose={() => setGraphAnchor(null)}
					>
						<Button onClick={() => navigate("/main/graphs")}>
							Temperature graph
						</Button>
						<Button onClick={() => navigate("/main/graphs/soil")}>
							Soil humidity graph
						</Button>
						<Button onClick={() => navigate("/main/graphs/humidity")}>
							Humidity graph
						</Button>
					</Menu>
					<Button color="secondary" variant="contained" fullWidth={false} onClick={handleTable}>
						<KeyboardDoubleArrowDownIcon />
					</Button>
					<Menu
						anchorEl={tableAnchor}
						open={Boolean(tableAnchor)}
						onClose={() => setTableAnchor}
					>
						<Button onClick={() => navigate("/main/table")}>
							Temperature table
						</Button>
						<Button onClick={() => navigate("/main/table/soil")}>
							Soil table
						</Button>
						<Button onClick={() => navigate("/main/table/humidity")}>
							Humidity table
						</Button>
					</Menu>
				</Stack>
			</AppBar>
		</div>
	);
};
