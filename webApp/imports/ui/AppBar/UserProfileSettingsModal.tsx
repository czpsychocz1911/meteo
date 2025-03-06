import { Button, Container, MenuItem, Modal, Stack, Switch, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";

export const UserProfileSettingsModal : React.FC = () => {
    const [open, setOpen] = useState(false)
    const theme = useTheme()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const [dark,setDark] = useState(false)
    const [imperial,setImperial] = useState(false)


    const onChange = () => {
        setDark(!dark)
    }

    const onChange2 = () => {
        setImperial(!imperial)
    }

    return(
        <MenuItem>
        <Button onClick={handleOpen}>Settings</Button>
        <Modal
        open={open}
        onClose={handleClose}
        >
            <Container
            maxWidth="sm"
            sx={{
				bgcolor: theme.palette.background.paper,
				p: 2,
				borderRadius: 2,
				boxShadow: 2,
			}}
            >
                <Stack direction="row" justifyContent="space-between">
                    <Typography component={"span"}>
                        Darkmode prefered
                    </Typography>
                    <Switch
                    checked={dark}
                    onChange={onChange}
                    />
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                <Typography component={"span"}>
                        Fernheit prefered
                    </Typography>
                    <Switch
                    checked={imperial}
                    onChange={onChange}
                    />
                </Stack>
            </Container>
        </Modal>
        </MenuItem>
    )
}