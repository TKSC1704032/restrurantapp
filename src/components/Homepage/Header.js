import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { LogOut, User } from "../../App";
import Avatar from '@material-ui/core/Avatar';
import { deepPurple } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Cart } from '../../App';

const useStyles = makeStyles((theme) => ({

    logo: {
        display:"block",
        width:"150px",
        height:"auto",
        marginRight:"auto"
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        margin: "auto"
    },
    carticon: {
        color: "white"
    }


}));
const Header = () => {
    const classes = useStyles();
    const user = useContext(User);
    const { totalItems } = useContext(Cart);
    const handleLogOut = useContext(LogOut);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const LogInformation = () => {
        return (
            <>
                {user ? (<>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleClick}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}>

                        <Box p={2}>
                            {user.providerData[0].displayName && <Avatar className={classes.purple}>{user.providerData[0].displayName.charAt(0)}</Avatar>}
                            <br />
                            <Divider />
                            {user.providerData[0].displayName && <Typography variant="h6" className={classes.typography}>{user.providerData[0].displayName}</Typography>}
                            <Divider />
                            <br />
                            <Button variant="contained" size="small" color="secondary" endIcon={<ExitToAppIcon />}
                                onClick={handleLogOut}>Log Out</Button>
                            <br />
                            <br />
                        </Box>
                    </Popover>
                </>) : (<Button variant="contained"><Link to="/login/">Log In</Link></Button>
                )}
            </>
        );
    }
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <img src={process.env.PUBLIC_URL +"/Image/logo.png"} alt="logo" className={classes.logo}/>
                    <Link to="/placeorder/">
                        <IconButton>
                            <Badge badgeContent={totalItems} color="error" showZero>
                                <ShoppingCartIcon className={classes.carticon} />
                            </Badge>
                        </IconButton>
                    </Link>

                    {LogInformation()}

                </Toolbar>
            </AppBar>
        </>
    );

};

export default Header;