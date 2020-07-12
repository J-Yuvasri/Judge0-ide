import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DescriptionIcon from '@material-ui/icons/Description';
import SaveIcon from '@material-ui/icons/Save';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import PostAddIcon from '@material-ui/icons/PostAdd';

export default function Topbar() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const inputProps = {
        backgroundColor: "#ffffff"
    }

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                File <ArrowDropDownIcon />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClick={handleClose}
                className="menu transition hidden"
                inputProps={inputProps}
                tabindex="-1"
            >
                <MenuItem onClick={handleClose}><div className="item" ><DescriptionIcon style={{ margin: "-0.3rem" }} /><i className="save icon"></i> &nbsp;&nbsp; New File</div>
                </MenuItem>
                <MenuItem onClick={handleClose}><div className="item" ><SaveIcon style={{ margin: "-0.3rem" }} /><i className="save icon"></i> &nbsp;&nbsp; Save (Ctrl + S)</div>
                </MenuItem>
                <MenuItem onClick={handleClose}><div className="item" ><SaveAltIcon style={{ margin: "-0.3rem" }} /><i className="download icon"></i> &nbsp;&nbsp; Download</div></MenuItem>
                <MenuItem onClick={handleClose}><div id="insert-template-btn" className="item"><PostAddIcon style={{ margin: "-0.3rem" }} /><i className="file code outline icon"></i>&nbsp;&nbsp;Insert template
for current language</div></MenuItem>
            </Menu>


        </div>

    )
}