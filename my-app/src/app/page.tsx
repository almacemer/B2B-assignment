"use client";
import { useState, useEffect, useRef } from 'react';
import 'devextreme/dist/css/dx.light.css';
import { Typography, CssBaseline, Box } from '@mui/material';
import AppBarComponent from './components/AppBar';
import DrawerComponent from './components/Drawer';
import DataGridComponent from './components/DataGrid';
import FooterComponent from './components/Footer';
import { fetchColumns, fetchData } from './utils/api';
import { ColumnType, FilteredDataRow } from './types/types';

export default function Home() {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [data, setData] = useState<FilteredDataRow[]>([]);
  const [gridKey, setGridKey] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<FilteredDataRow[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const columnsData = await fetchColumns();
        const formattedColumns = columnsData.map((col: string, index: number) => ({
          dataField: col,
          caption: col,
          visible: index < 5,
        }));
        setColumns(formattedColumns);

        const fetchedData = await fetchData();
        setData(fetchedData);
        setFilteredData(fetchedData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setGridKey((key) => key + 1); 
      }
    };
    
    loadData();   
  }, []);

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "";
    setSearchValue(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      if (value.length >= 3) {
        const visibleColumns = columns.filter((col) => col.visible).map((col) => col.dataField);
        const filtered = data.filter((row) =>
          visibleColumns.some((col) =>
            String(row[col]).toLowerCase().includes(value.toLowerCase())
          )
        );
        setFilteredData(filtered);
        setGridKey((key) => key + 1);
      } else {
        setFilteredData(data); 
      }
    }, 1000);
  };

  const highlightText = (text: string, search: string) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(regex, "<span style='background-color: yellow;'>$1</span>");
  }

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleDoubleClick = (columnField: string, visible: boolean) => {
    console.log(columns);
    setColumns((columns) =>
      columns.map((col) =>
        col.dataField == columnField ? { ...col, visible: !visible} : col
      )
    );
    setGridKey((key) => key + 1);
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBarComponent
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        toggleDrawer={toggleDrawer}
        drawerOpen={drawerOpen}
      />

      <DrawerComponent
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        columns={columns}
        handleDoubleClick={handleDoubleClick}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: (theme) => theme.palette.background.default,
          padding: 3,
          transition: 'margin 0.3s ease',
          marginRight: drawerOpen ? '240px' : 0, 
          marginLeft: 0, 
          marginTop: drawerOpen ? 0 : '45px',
          transform: drawerOpen ? 'scale(0.9)' : 'scale(1)',
          zIndex: drawerOpen ? 'auto' : 0,
        }}
      >
        <Typography variant="h5">Prikaz podataka</Typography>
        <DataGridComponent
          gridKey={gridKey}
          filteredData={filteredData}
          columns={columns}
          searchValue={searchValue}
          highlightText={highlightText}
        />
      </Box>
      <FooterComponent/>
    </Box>
  );
}
