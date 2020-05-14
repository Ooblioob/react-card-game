import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PaletteIcon from '@material-ui/icons/Palette';
import Fade from '@material-ui/core/Fade';

const cardThemes = ["Red", "Blue", "Green", "Grey", "Purple", "Yellow"];


export default function LongMenu({currentColor, changeTheme}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => () => {
    setAnchorEl(null);
    if (value) {
      changeTheme(value);
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <PaletteIcon color="inherit"/>
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose(null)}
        TransitionComponent={Fade}
        // PaperProps={{
        //   style: {
        //     maxHeight: ITEM_HEIGHT * 4.5,
        //     width: '20ch',
        //   },
        // }}
      >
        {cardThemes.map((option) => (
          <MenuItem key={option} selected={option === currentColor} onClick={handleClose(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}