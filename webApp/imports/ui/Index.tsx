import { Button, Input, Stack, TextField } from "@mui/material";
import React from "react";

export const Index: React.FC = () => {
    return (
            <Stack spacing={2} 
            justifyContent="center" 
            alignItems="center" 
            alignContent="center" 
            height="100%" 
            sx={{display: "flex", justifyContent: "center" , alignItems: "center" , height: "100vh" , with: "100vw"}}>
                <Stack spacing={2} direction="row" alignItems="center" justifyItems="center">
                    <p>Username</p>
                    <TextField variant="outlined"/>
                </Stack>
                <Stack spacing={2} direction="row" alignItems="center" justifyItems="center">
                    <p>Password</p>
                    <TextField variant="outlined"/>
                </Stack>
            </Stack>
    )
}