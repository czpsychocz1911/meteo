import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Container,
	IconButton,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import { Meteor } from "meteor/meteor";
import React from "react";
import { UserProfileModalUsername } from "./UserProfileModalUsername";
import { UserProfileModalPassword } from "./UserProfileModalPassword";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CancelIcon from '@mui/icons-material/Cancel';

export const UserProfileModalBox: React.FC<{
	user: Meteor.User;
	handleClose: () => void;
}> = ({ user, handleClose }) => {
	const theme = useTheme();

	if (!user.username) return null;

	return (
		<Container
			maxWidth="md"
			sx={{
				bgcolor: theme.palette.background.paper,
				p: 2,
				borderRadius: 2,
				boxShadow: 2,
			}}
		>
			<Stack direction="row" justifyItems="center" alignItems="center">
				<Typography component={"h1"} ><b>User profile settings</b></Typography>
				<IconButton children={<CancelIcon/>} sx={{marginLeft: "auto" }}/>
			</Stack>
			<Accordion>
				<AccordionSummary expandIcon={<ArrowDownwardIcon />}>
					<Typography component={"span"}>Username settings</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<UserProfileModalUsername user={user} handleClose={handleClose} />
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<ArrowDownwardIcon/>}>
					<Typography component={"span"}>Password settings</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<UserProfileModalPassword user={user} handleClose={handleClose} />
				</AccordionDetails>
			</Accordion>
			<Button variant="outlined" onClick={handleClose} sx={{marginTop: "16px", width: "100%"}}>Close</Button>
		</Container>
	);
};
