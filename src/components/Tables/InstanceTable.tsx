"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { Instance } from "@/interfaces/Instance";
interface PageProps {
  params: {
    subject_id: string;
  };
  data: Instance[] | undefined;
}

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({ data, params }: PageProps) {
  const columns: GridColDef<Instance>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (item) => (
        <Link href={`/subject/${params.subject_id}/${item.row.id}`}>
          {item.value}
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

  return (
    <Paper sx={{ height: 400, width: "100%", zIndex: "-1" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
