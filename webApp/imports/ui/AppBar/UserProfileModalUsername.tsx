import { Button, Stack, TextField } from "@mui/material";
import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

export const UserProfileModalUsername: React.FC<{user: Meteor.User, handleClose : () => void}> = ({user, handleClose}) => {

    const [newUsername, setNewUsername] = useState(user.username)
    const [error,setError] = useState(false)
    const [errMsg,setErrMsg] = useState("You can change your username here")

    const changeUserName = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        await Meteor.callAsync("update.username",user._id,newUsername).then((val) => {
            if(!val) return null
			handleClose
        }).catch((err : Meteor.Error) => {
            setErrMsg(err.reason ?? "")
            setError(true)
        })
    }

	return (
		<Stack direction="row" alignItems="center" justifyContent="space-evenly">
            <p style={{ color: error ? "red" : "inherit" }}>{errMsg}</p>
			<form onSubmit={changeUserName}>
            <Stack direction="row" alignItems="center" justifyContent="space-evenly" width="120%">
				<TextField
					variant="outlined"
					required={true}
					name="username"
					placeholder="Username"
					type="text"
					onChange={(e) => setNewUsername(e.target.value)}
					value={newUsername}
					error={error}
                    sx={{left: "0"}}
				/>
				<Button type="submit" variant="contained" sx={{right: 0, justifyContent: "flex-end"}}>
					Change username
				</Button>
             </Stack>
			</form>
		</Stack>
	);
};
