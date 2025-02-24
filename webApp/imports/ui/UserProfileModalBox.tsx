import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Container,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import { Meteor } from "meteor/meteor";
import React from "react";
import { UserProfileModalUsername } from "./UserProfileModalUsername";
import { UserProfileModalPassword } from "./UserProfileModalPassword";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

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
		</Container>
	);
};
