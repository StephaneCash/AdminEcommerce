import { AppBar, Avatar, Badge, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Mail, Notifications, SettingsPower } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { useUserAuth } from "../config/useContextComponent";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    tooBar: {
        display: "flex",
        justifyContent: 'space-between',
        backgroundColor: '#0c50a2'
    },
    logoLg: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block"
        }
    },
    logoSm: {
        display: "block",
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    icons: {
        display: "flex",
        alignItems: "center"
    },
    badge: {
        marginRight: theme.spacing(2),
    },
    logout: {
        marginLeft: theme.spacing(1),
        cursor: "pointer"
    }
}));

const NavBar = () => {

    const classes = useStyles();

    return (
        <>
            <AppBar position="fixed">
                <Toolbar className={classes.tooBar}>
                    <Typography variant="h6" component="h2" className={classes.logoLg}>
                        E-Tableau
                    </Typography>
                    <Typography variant="h6" component="h2" className={classes.logoSm}>
                        E-Tableau
                    </Typography>
                    <div className={classes.icons}>
                        <Badge badgeContent={4} color="secondary" className={classes.badge}>
                            <Mail />
                        </Badge>
                        <Link to='/annonces'>
                            <Badge badgeContent={"6"} style={{ color: "#fff" }} color="secondary" className={classes.badge}>
                                <Notifications />
                            </Badge>
                        </Link>
                        <Avatar style={{ backgroundColor: "#555" }} src="s" />
                        <SettingsPower className={classes.logout} />
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default NavBar;