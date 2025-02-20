import { Switch } from "@mui/material";
import React from "react";

export const DarkModeToggle : React.FC<{themeMode: string , setThemeMode: (mode: string) => void}> = ({themeMode, setThemeMode}) => {

    const checked = themeMode === "dark";

    const handleChecked = () => {
      setThemeMode(themeMode === "dark" ? "light" : "dark");
    };

    return(
        <Switch
        sx={{
            position:"fixed",
            zIndex: 1000,
            bottom: "10px",
            right: "10px",
        }}
        checked={checked}
        onChange={handleChecked}
        />
    )
}