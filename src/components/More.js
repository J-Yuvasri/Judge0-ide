import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RedditIcon from '@material-ui/icons/Reddit';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';
import InfoIcon from '@material-ui/icons/Info';
import EmailIcon from '@material-ui/icons/Email';
import TelegramIcon from '@material-ui/icons/Telegram';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DnsIcon from '@material-ui/icons/Dns';
import PaymentIcon from '@material-ui/icons/Payment';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

export default function More() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                More <ArrowDropDownIcon />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClick={handleClose}
                className="menu transition hidden"
                tabindex="-1"
            >
                <MenuItem onClick={handleClose}><div className="item" ><MenuIcon style={{ margin: "-0.3rem" }} /><i className="save icon"></i> &nbsp;&nbsp;API</div>
                </MenuItem>
                <hr />
                <MenuItem onClick={handleClose}><div className="item" ><MonetizationOnIcon style={{ margin: "-0.3rem" }} /><i className="save icon"></i>&nbsp;&nbsp; Become a Patreon</div>
                </MenuItem>
                <MenuItem onClick={handleClose}><div className="item" ><PaymentIcon style={{ margin: "-0.3rem" }} /><i className="download icon"></i>&nbsp;&nbsp; Donate with paypal</div></MenuItem>
                <hr />
                <MenuItem onClick={handleClose}><div id="insert-template-btn" className="item"><GitHubIcon style={{ margin: "-0.3rem" }} /><i className="file code outline icon"></i>&nbsp;&nbsp; View Source Code on Github
</div></MenuItem>
                <MenuItem onClick={handleClose}><div className="item" ><InfoIcon style={{ margin: "-0.3rem" }} /><i className="download icon"></i> &nbsp;&nbsp;Report an Issue</div></MenuItem>
                <hr />
                <MenuItem onClick={handleClose}><div className="item" ><EmailIcon style={{ margin: "-0.3rem" }} /><i className="download icon"></i> &nbsp;&nbsp;Subscribe to Newsletter</div></MenuItem>
                <MenuItem onClick={handleClose}><div className="item" ><DnsIcon style={{ margin: "-0.3rem" }} /><i className="download icon"></i> &nbsp;&nbsp; Join a Discord Server</div></MenuItem>
                <hr />
                <MenuItem onClick={handleClose}><div className="item" ><TelegramIcon style={{ margin: "-0.3rem" }} /><i className="download icon"></i>&nbsp;&nbsp; Contact the Author</div></MenuItem>
                <MenuItem onClick={handleClose}><div className="item" ><AccountCircleIcon style={{ margin: "-0.3rem" }} /><i className="download icon"></i>&nbsp;&nbsp; About the Author</div></MenuItem>
                <hr />
                <MenuItem style={{ background: "red" }} onClick={handleClose}><div className="item" ><i className="download icon"><RedditIcon style={{ margin: "-0.3rem" }} /> </i>&nbsp;&nbsp; Share on Reddit</div></MenuItem>
                <MenuItem style={{ background: "#1da1f2" }} onClick={handleClose}><div className="item" ><FacebookIcon style={{ margin: "-0.3rem" }} /> <i className="download icon"></i> &nbsp;&nbsp;Share on Facebook</div></MenuItem>
                <MenuItem style={{ background: "#1877f2" }} onClick={handleClose}><div className="item" ><TwitterIcon style={{ margin: "-0.3rem" }} /><i className="download icon"></i> &nbsp;&nbsp;Report an Twitter</div></MenuItem>





            </Menu>


        </div>
    )
}