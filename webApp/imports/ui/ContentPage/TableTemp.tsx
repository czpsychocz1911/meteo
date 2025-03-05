import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import React from "react";
import { TempModelCollection } from "/imports/api/links";
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Loader } from "../AppBar/Loader";

export const TableTemp: React.FC = () => {
	const isLoading = useSubscribe("tempAll");
	const temps = useTracker(() => TempModelCollection.find({}).fetch());

	if (isLoading()) {
		return <Loader/>
	}

	return (
        <Paper elevation={3}>
            <TableContainer component={Paper}>
                <TableHead>
                    <TableRow>
                        <TableCell>Order</TableCell>
                        <TableCell>Created at</TableCell>
                        <TableCell>Updated at</TableCell>
                        <TableCell>Temperature</TableCell>
                        <TableCell>Temperature unit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {temps.map((val,index) => (
                        <TableRow key={val._id}>
                            <TableCell>{index}</TableCell>
                            <TableCell>{val.createdAt.toLocaleDateString()}</TableCell>
                            <TableCell>{val.updatedAt.toLocaleDateString()}</TableCell>
                            <TableCell>{val.temp}</TableCell>
                            <TableCell>{val.temp_unit}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableContainer>
        </Paper>
    )
};
