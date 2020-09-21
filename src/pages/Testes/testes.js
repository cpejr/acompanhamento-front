import React from 'react';
import { Button, Menu as MenuProfile, MenuItem } from '@material-ui/core';

function Testes() {
  // MenuProfile
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <Button
        onClick={handleMenu}
      >
        Você
      </Button>
      <MenuProfile
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
      </MenuProfile>
    </div>
  );
}

export default Testes;
