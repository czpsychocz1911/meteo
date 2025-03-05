import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import React from "react";
import { TempModelCollection } from "/imports/api/links";
import { TempData } from "/imports/api/links";
import { Paper } from "@mui/material";
import { Loader } from "../AppBar/Loader";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const cols: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 90,
    },
    {
        field: "createdAt",
        headerName: "Created at",
        width: 200,
        valueGetter: (params: GridValueGetterParams<TempData, Date>) => {
            if (params.value) {
                return params.value.toLocaleString();
            }
            return '';
        }
    },
    {
        field: "updatedAt",
        headerName: "Updated at",
        width: 200,
        valueGetter: (params: GridValueGetterParams<TempData, Date>) => {
            if (params.value) {
                return params.value.toLocaleString();
            }
            return '';
        }
    },
    {
        field: "temp",
        headerName: "Temperature",
        width: 150
    },
    {
        field: "temp_unit",
        headerName: "Temperature unit",
        width: 170
    },
];

export const TableTemp: React.FC = () => {
    const isLoading = useSubscribe("tempAll");
    const temps = useTracker(() => TempModelCollection.find({}).fetch());
    
    if (isLoading()) {
        return <Loader />
    }
    
    const rows = temps.map(temp => ({
        ...temp,
        id: temp._id 
    }));
    
    return (
        <Paper elevation={3}>
            <DataGrid
                sx={{height: "500px", width: "100%"}}
                rows={rows}
                columns={cols}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10, 25, 50]}
            />
        </Paper>
    );
};