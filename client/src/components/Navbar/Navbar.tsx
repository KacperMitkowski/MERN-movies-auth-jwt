import React from "react";
import useStyles from './styles';
import { AppBar, Button, Toolbar, Typography, IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { Link, useHistory } from 'react-router-dom';
import navbarText from '../../images/navbar-text.png';

const Navbar = () => {
    const classes = useStyles();
    const history = useHistory();

    const handleLogin = () => {
        history.push('/auth');
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/">
                            <img src={navbarText} alt="icon" height="45px" />
                        </Link>
                    </Typography>
                    <Button color="inherit" onClick={handleLogin}>Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;