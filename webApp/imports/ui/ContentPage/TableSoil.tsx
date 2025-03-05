import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import React from "react";
import { SoilModelCollection } from "/imports/api/links";
import { Loader } from "../AppBar/Loader";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

export const TableSoil: React.FC = () => {
	const isLoading = useSubscribe("soilAll");
	const soil = useTracker(() => SoilModelCollection.find({}).fetch());

	if (isLoading()) {
		return <Loader />;
	}

	const rows = soil.map((val) => ({
		...val,
		id: val._id,
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
			valueFormatter: (value?: Date) => {
				if (value == null) {
					return "";
				}

				return new Date(value).toLocaleString();
			},
		},
		{
			field: "updatedAt",
			headerName: "Updated at",
			width: 200,
			valueFormatter: (value?: Date) => {
				if (value == null) {
					return "";
				}

				return new Date(value).toLocaleString();
			},
		},
		{
			field: "ADraw",
			headerName: "A/D raw",
			width: 100,
		},
		{
			field: "ADvolt",
			headerName: "A/D volt",
			width: 80,
		},
		{
			field: "soilHumidity",
			headerName: "Soil Humidity",
			width: 80,
		},
	];

	return (
		<Paper elevation={3}>
			<DataGrid
				rows={rows}
				columns={cols}
				sx={{ height: "400px", width: "100%" }}
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
