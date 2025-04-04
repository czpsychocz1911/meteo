import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import React from "react";
import { TempModelCollection } from "/imports/api/links";
import { Paper } from "@mui/material";
import { Loader } from "../AppBar/Loader";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

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
            valueFormatter: (value? : Date) =>{
                if(value == null){
                    return ""
                }

                return new Date(value).toLocaleString()
            }
        },
        {
            field: "updatedAt",
            headerName: "Updated at",
            width: 200,
            valueFormatter: (value? : Date) =>{
                if(value == null){
                    return ""
                }

                return new Date(value).toLocaleString()
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
                sx={{height: "400px", width: "100%"}}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[10]}
            />
        </Paper>
    );
};