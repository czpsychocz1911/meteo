import { Button, Stack, TextField } from "@mui/material";
import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

export const UserProfileModalPassword: React.FC<{ user: Meteor.User, handleClose : () => void }> = ({
	user,
    handleClose
}) => {
	const [passwd1, setPasswd1] = useState("");
	const [isEmpty1, setIsEmpty1] = useState(true);
	const [passwd2, setPasswd2] = useState("");
	const [isEmpty2, setIsEmpty2] = useState(true);
	const [oldPasswd, setOldPasswd] = useState("");
	const [isEmpty3, setIsEmpty3] = useState(true);
	const [isMatching1, setIsMatching1] = useState(true);
    const [isError, setIsError] = useState(false)
    const [errMsg, setErrMsg] = useState("")

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

        if(passwd1 !== passwd2){
            setErrMsg("Your password doesnt match")
        }else{
            await Meteor.callAsync("update.password", oldPasswd, passwd1, user).then((val) => {
                if(!val) return null
                handleClose
            }).catch((err: Meteor.Error) => {
                setErrMsg(err.reason ?? "")
                setIsError(true)
            })
        }
	};

	return (
		<form onSubmit={handleSubmit}>
			<Stack direction="column" marginTop="8px" marginBottom="8px">
				<Stack
					direction="row"
					width={"100%"}
					justifyContent="flex-start"
					marginTop="8px"
					marginBottom="8px"
				>
					<p style={{ marginRight: "248px", marginLeft: "60px" }}>
						New password
					</p>
					<TextField
						variant="outlined"
						required
						name="passwd1"
						placeholder="New password"
						type="password"
						value={passwd1}
						onChange={(e) => {
							setPasswd1(e.target.value);
							setIsEmpty1(e.target.value.trim() === "");
							setIsMatching1(e.target.value === passwd2 || passwd2 === "");
						}}
						error={isEmpty1 || !isMatching1}
						autoComplete="off"
					/>
					{isEmpty1 && <p style={{ color: "red", marginLeft: "10px" }}>Cannot be empty</p>}
				</Stack>
				<Stack
					direction="row"
					width={"100%"}
					justifyContent="flex-start"
					marginTop="8px"
					marginBottom="8px"
				>
					<p style={{ marginRight: "203px", marginLeft: "60px" }}>
						New password again
					</p>
					<TextField
						variant="outlined"
						required
						name="passwd2"
						placeholder="New password again"
						type="password"
						value={passwd2}
						onChange={(e) => {
							setPasswd2(e.target.value);
							setIsEmpty2(e.target.value.trim() === "");
							setIsMatching1(e.target.value === passwd1 || passwd1 === "");
						}}
						error={isEmpty2 || !isMatching1}
					/>
					{isEmpty2 && <p style={{ color: "red", marginLeft: "10px" }}>Cannot be empty</p>}
					{!isMatching1 && !isEmpty2 && !isEmpty1 && (
						<p style={{ color: "red", marginLeft: "10px" }}>Passwords do not match</p>
					)}
				</Stack>
				<Stack
					direction="row"
					width={"100%"}
					justifyContent="flex-start"
					marginTop="8px"
					marginBottom="8px"
				>
					<p style={{ marginRight: "254px", marginLeft: "60px" }}>
						Old password
					</p>
					<TextField
						variant="outlined"
						required
						name="passwd3"
						placeholder="Old password"
						type="password"
						value={oldPasswd}
						onChange={(e) => {
							setOldPasswd(e.target.value);
							setIsEmpty3(e.target.value.trim() === "");
						}}
						error={isEmpty3}
					/>
					{isEmpty3 && <p style={{ color: "red", marginLeft: "10px" }}>Cannot be empty</p>}
				</Stack>
                <p style={{color: isError ? "red" : "inherit"}}>{errMsg}</p>
				<Button type="submit" variant="contained" disabled={isEmpty1 || isEmpty2 || isEmpty3 || !isMatching1}>
					Change password
				</Button>
			</Stack>
		</form>
	);
};
