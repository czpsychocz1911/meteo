import { Button, Stack, TextField } from "@mui/material";
import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
	const navigate = useNavigate();

	const submit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		Meteor.loginWithPassword(username, password, (err) => {
			if (err) {
				setError(true);
			} else {
				navigate("/main");
			}
		});
	};
	return (
		<form onSubmit={submit}>
			<Stack
				spacing={2}
				justifyContent="center"
				alignItems="center"
				alignContent="center"
				height="100%"
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100%",
					width: "100%",
				}}
			>
				<Stack
					spacing={2}
					direction="row"
					alignItems="center"
					justifyItems="center"
				>
					<p>Username</p>
					<TextField
						variant="outlined"
						required={true}
						name="username"
						placeholder="Username"
						type="text"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
                        error={error}
					/>
				</Stack>
				<Stack
					spacing={2}
					direction="row"
					alignItems="center"
					justifyItems="center"
				>
					<p>Password</p>
					<TextField
						variant="outlined"
						required={true}
						name="password"
						placeholder="Password"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
                        error={error}
					/>
				</Stack>
                {error && <p>Invalid username or password</p>}
				<Button type="submit" variant="outlined" sx={{width: "22%"}}>Log in</Button>
			</Stack>
		</form>
	);
};
