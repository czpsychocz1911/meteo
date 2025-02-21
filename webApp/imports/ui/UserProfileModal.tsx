import {
	Box,
	Button,
	CircularProgress,
	MenuItem,
	Modal,
	Typography,
} from "@mui/material";
import { Meteor } from "meteor/meteor";
import { useFind } from "meteor/react-meteor-data";
import React from "react";
import { UserProfileModalBox } from "./UserProfileModalBox";

export const UserProfileModal: React.FC = () => {
	const [open, setOpen] = React.useState(false);
	const [user, setUser] = React.useState<Meteor.User>();
	const [loading, setLoading] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
		setLoading(true);

		Meteor.userAsync()
			.then((user) => {
				if (!user) return null;
				setUser(user);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const handleClose = () => setOpen(false);

	return (
		<MenuItem>
			<Button onClick={handleOpen}>Profile</Button>
			<Modal open={open} onClose={handleClose}>
				{loading ? (
					<CircularProgress />
				) : user ? (
                    <UserProfileModalBox user={user} handleClose={handleClose}/>
				) : (
					<p>nenasel jsem</p>
				)}
			</Modal>
		</MenuItem>
	);
};
