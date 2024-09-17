"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Link from "next/link";

export interface Instance {
  id: string;
  name: string;
  status: string;
  image: string;
  ip: string;
  create_at: string;
  create_by: string;
}
const columns: GridColDef<Instance>[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    renderCell: (params) => (
      <Link
      href={`/instance/${params.value}`}

      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <span
        className="bg-green-200 p-2 border-green-500 border rounded"
        style={{
          color: params.value === "Active" ? "green" : "red",
          fontWeight: "bold",
        }}
      >
        {params.value}
      </span>
    ),
  },
  { field: "image", headerName: "Image", flex: 1 },
  {
    field: "ip",
    headerName: "Extenal IP",
    flex: 1,
  },
  {
    field: "create_at",
    headerName: "Create At",
    flex: 1,
  },
  {
    field: "create_by",
    headerName: "Create By",
    flex: 1,
  },
];

const rows: Instance[] = [
  {
    id: " 1",
    name: "test",
    create_at: "1/1/1",
    create_by: "test",
    image: "555",
    ip: "255.255.255.255",
    status: "Active",
  },
  {
    id: " 2",
    name: "test",
    create_at: "1/1/1",
    create_by: "test",
    image: "555",
    ip: "255.255.255.255",
    status: "Active",
  },
  {
    id: " 3",
    name: "test",
    create_at: "1/1/1",
    create_by: "test",
    image: "555",
    ip: "255.255.255.255",
    status: "Active",
  },
  {
    id: " 4",
    name: "test",
    create_at: "1/1/1",
    create_by: "test",
    image: "555",
    ip: "255.255.255.255",
    status: "Active",
  },
  {
    id: " 5",
    name: "test2",
    create_at: "1/1/1",
    create_by: "test",
    image: "555",
    ip: "255.255.255.255",
    status: "Active",
  },
  {
    id: " 6",
    name: "test1",
    create_at: "1/1/1",
    create_by: "test",
    image: "555",
    ip: "255.255.255.255",
    status: "Active",
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
