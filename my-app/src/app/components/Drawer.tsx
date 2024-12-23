import { Drawer, Box, IconButton, Button } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ColumnType } from "../types/types";

interface DrawerProps {
  columns: ColumnType[];
  drawerOpen: boolean;
  toggleDrawer: () => void;
  handleDoubleClick: (columnField: string, visible: boolean) => void;
}

const DrawerComponent = ({ columns, drawerOpen, toggleDrawer, handleDoubleClick }: DrawerProps) => {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      ModalProps={{
        BackdropProps: {
          style: {
            backgroundColor: "transparent",
            pointerEvents: 'none',
          },
        },
      }}
      variant="temporary"
      anchor="right"
      open={drawerOpen}
      onClose={toggleDrawer}
    >
      <Box sx={{ width: "100%", paddingX: 2 }}>
        <IconButton color="inherit" edge="end" onClick={toggleDrawer}>
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <Box sx={{ width: "100%", paddingX: 2 }}>
        <h3>Sakrivene kolone</h3>
        <hr />
        {columns.filter((col) => !col.visible).length > 0 ? (
          columns
            .filter((col) => !col.visible)
            .map((col) => (
              <Button
                key={col.dataField}
                variant="outlined"
                color="error"
                sx={{
                  width: "100%",
                  padding: "6px",
                  margin: "6px 0",
                  textTransform: "none",
                }}
                onDoubleClick={() => handleDoubleClick(col.dataField, col.visible)}
              >
                {col.dataField}
              </Button>
            ))
        ) : (
          <div>Sve kolone su prikazane.</div>
        )}
      </Box>

      <Box sx={{ width: "100%", paddingX: 2 }}>
        <h3>Prikazane kolone</h3>
        <hr />
        {columns.filter((col) => col.visible).length > 0 ? (
          columns
            .filter((col) => col.visible)
            .map((col) => (
              <Button
                key={col.dataField}
                variant="outlined"
                color="success"
                sx={{
                  width: "100%",
                  padding: "6px",
                  margin: "6px 0",
                  textTransform: "none",
                }}
                onDoubleClick={() => handleDoubleClick(col.dataField, col.visible)}
              >
                {col.dataField}
              </Button>
            ))
        ) : (
          <div>Sve kolone su sakrivene.</div>
        )}
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
