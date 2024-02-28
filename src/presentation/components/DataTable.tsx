import { useMemo } from "react";
import { iProvider } from "../../interfaces";

interface Props {
  providers: iProvider[];
  columns: iColumns[];
  deleteProvider?: (param: string) => void;
}
interface iColumns {
  field: string;
  headerName: string;
  width?: number;
  sortable: boolean;
}
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { locateES } from "../../core/locate/locate";

export const DataTableProvider = ({
  providers,
  columns,
  deleteProvider,
}: Props) => {
  const _columns = useMemo<GridColDef<iProvider>[]>(
    () => [
      ...columns,
      {
        field: "actions",
        type: "actions",
        width: 80,
        getActions: (params: iProvider) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            className="text-danger"
            onClick={() =>
              params?.id && deleteProvider && deleteProvider(`${params?.id}`)
            }
          />,
        ],
      },
    ],
    [columns, deleteProvider]
  );
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        localeText={locateES}
        columns={_columns}
        rows={providers}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};
