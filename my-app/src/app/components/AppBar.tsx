import { AppBar, Toolbar, Typography, IconButton, Box, TextField, InputAdornment } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

interface AppBarProps {
  searchValue: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleDrawer: () => void;
  drawerOpen: boolean;
}

const AppBarComponent = ({ searchValue, handleSearchChange, toggleDrawer, drawerOpen }: AppBarProps) => {
  return (
    <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            B2B Assignment - Alma
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              flexGrow: 1,
              transition: 'margin-right 0.3s ease',
              marginRight: drawerOpen ? '240px' : '0',
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Pretraga..."
              size="small"
              value={searchValue}
              onChange={handleSearchChange}
              sx={{
                backgroundColor: 'white',
                borderRadius: '4px',
                width: 250,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <IconButton color="inherit" edge="end" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
  );
};

export default AppBarComponent;