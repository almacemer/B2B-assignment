import dynamic from "next/dynamic";
import { Column } from "devextreme-react/data-grid";
import { ColumnType, FilteredDataRow } from "../types/types";

const DataGrid = dynamic(() => import("devextreme-react/data-grid"), { ssr: true });

interface DataGridProps {
  filteredData: FilteredDataRow[];
  columns: ColumnType[];
  gridKey: number;
  searchValue: string;
  highlightText: (text: string, search: string) => string;
}

const DataGridComponent = ({ filteredData, columns, gridKey, searchValue, highlightText }: DataGridProps) => {
  return (
    <DataGrid
      key={gridKey}
      dataSource={filteredData.map((row) => {
        const visibleColumns = columns.filter((col) => col.visible).map((col) => col.dataField);
        const filteredRow: { [key: string]: string } = {};
        visibleColumns.forEach((col) => {
          filteredRow[col] = row[col];
        });
        return filteredRow;
      })}
      showColumnLines={true}
      showRowLines={true}
      showBorders={true}
      height="100%"
      width="100%"
    >
      {columns
        .filter((col) => col.visible)
        .map((col) => (
          <Column
            key={col.dataField}
            dataField={col.dataField}
            visible={col.visible}
            cellRender={(cellData: any) => {
              const value = cellData.value || "";
              return (
                <div
                  dangerouslySetInnerHTML={{
                    __html: highlightText(String(value), searchValue),
                  }}
                />
              );
            }}
          />
        ))}
    </DataGrid>
  );
};

export default DataGridComponent;
