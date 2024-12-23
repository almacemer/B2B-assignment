export interface ColumnType {
    dataField: string;
    caption: string;
    visible: boolean;
}

export interface FilteredDataRow {
    [key: string]: string;
}