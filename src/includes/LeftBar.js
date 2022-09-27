import { Container, makeStyles, Typography } from "@material-ui/core";
import {
    Category, Dashboard, People, Announcement
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import "../css/Menu.css";


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        backgroundColor: "#fff",
        height: "100vh",
        color: '#333',
        border: "1px solid silver",
        position: "fixed",
        width: "15%",
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(4),
        [theme.breakpoints.up("sm")]: {
            marginBottom: theme.spacing(1.5),
            fontSize: "18px",
            cursor: 'pointer',
        },
    },
    text: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    icon: {
        marginRight: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            fontSize: "18px"
        }
    }
}));

const LeftBar = () => {

    const classes = useStyles();

    return (
        <>
            <Container className={classes.container} id="conatiner">
                <div className={classes.item}>
                    <NavLink to="/dashboard" className="d-flex">
                        <Dashboard className={classes.icon} id="icon" />
                        <Typography className={classes.text} >
                            Dashboard
                        </Typography>
                    </NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to="/commandes" className="d-flex">
                        <People className={classes.icon} id="icon" />
                        <Typography className={classes.text}>
                            Commandes
                        </Typography>
                    </NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to="/produits" className="d-flex">
                        <Announcement className={classes.icon} id="icon" />
                        <Typography className={classes.text}>
                            Produits
                        </Typography>
                    </NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to="/categories" className="d-flex">
                        <Category className={classes.icon} />
                        <Typography className={classes.text}>
                            Catégories
                        </Typography>
                    </NavLink>
                </div>
            </Container>
        </>
    );
}

export default LeftBar;