import React from 'react';
import { Button } from '@material-ui/core';

import MenuPerfil from '../../components/MenuPerfil';

function Testes() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClickMenu}
      >
        Open Menu
      </Button>
      <MenuPerfil handleClose={handleCloseMenu} handleClick={handleClickMenu} anchorEl={anchorEl} />
    </>
  );
}

export default Testes;
