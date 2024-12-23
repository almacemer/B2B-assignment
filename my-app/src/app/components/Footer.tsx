import { Box, Typography } from "@mui/material";

const FooterComponent = () => {
  return (
    <Box
        component="footer"
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          textAlign: 'center',
          padding: '10px',
          boxShadow: 2,
          marginTop: 'auto',
        }}
      >
        <Typography variant="body2">© 2024 B2B Assignment - Alma</Typography>
    </Box>
  );
};

export default FooterComponent;
