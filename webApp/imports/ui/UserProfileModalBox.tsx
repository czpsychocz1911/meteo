import { Button, Container, TextField, useTheme } from "@mui/material";
import { Meteor } from "meteor/meteor";
import React from "react";
import { UserProfileModalUsername } from "./UserProfileModalUsername";
import { UserProfileModalPassword } from "./UserProfileModalPassword";

export const UserProfileModalBox: React.FC<{ user: Meteor.User, handleClose: () => void  }> = ({
	user,
	handleClose
}) => {
	const theme = useTheme();

    if(!user.username) return null

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
            <UserProfileModalUsername user={user} handleClose={handleClose}/>
			<UserProfileModalPassword user={user} handleClose={handleClose}/>
		</Container>
	);
};
