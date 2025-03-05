import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import React from "react";
import { TempModelCollection } from "/imports/api/links";
import { TempData } from "/imports/api/links";
import { Paper } from "@mui/material";
import { Loader } from "../AppBar/Loader";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

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
    
    const cols: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 250,
        },
        {
            field: "createdAt",
            headerName: "Created at",
            width: 200,
            valueGetter: (params) => {
                if (params.row.createdAt instanceof Date) {
                    return params.row.createdAt.toLocaleString();
                }
                if (params.row.createdAt) {
                    return new Date(params.row.createdAt).toLocaleString();
                }
                return '';
            }
        },
        {
            field: "updatedAt",
            headerName: "Updated at",
            width: 200,
            valueGetter: (params) => {
                if (params.row.updatedAt instanceof Date) {
                    return params.row.updatedAt.toLocaleString();
                }
                if (params.row.updatedAt) {
                    return new Date(params.row.updatedAt).toLocaleString();
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
    
    return (
        <Paper elevation={3}>
            <DataGrid
                rows={rows}
                columns={cols}
                autoHeight
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