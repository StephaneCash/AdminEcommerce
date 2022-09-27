
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Dashboard.css";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography, makeStyles } from "@material-ui/core";
import NavBar from "../includes/NavBar";
import LeftBar from "../includes/LeftBar";
import { Announcement, Group, MonetizationOn, PeopleRounded, PostAddTwoTone } from "@material-ui/icons";
import { ApartmentTwoTone } from "@mui/icons-material";
import axios from "axios"
Chart.register(...registerables);

const useStyles = makeStyles((theme) => ({
    griddash: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            display: "block"
        },
    },
    stat: {
        [theme.breakpoints.down("sm")]: {
            maxWidth: "100%",
            marginTop: "10px"
        }
    },
    courb: {
        [theme.breakpoints.down("sm")]: {
            maxWidth: "100%",
            marginTop: "10px"
        }
    },
    courbStatist: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            display: "block"
        },
    },
}));


function Dashboard() {

    const classes = useStyles();

    const [data, setData] = useState([]);

    const getProducts = () => {
        axios.get('http://localhost:5000/api/products')
            .then(res => {
                setData(res.data.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    useEffect(() => {
        getProducts();
    }, []);

    const [cat, setCat] = useState([])

    const getAllCategories = () => {
        axios.get('http://localhost:5000/api/categories')
            .then(res => {
                setCat(res.data.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    useEffect(() => {
        getAllCategories()
    }, [])


    const data4 = {
        labels: ['Nov 01', 'Nov 02', 'Nov 03', 'Nov 04', 'Nov 05', 'Nov 06', 'Nov 07'],
        datasets: [
            {
                label: 'Users',
                data: [2, 9, 3, 5, 2, 3, 6],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options2 = {
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    };

    const data5 = {
        labels: ['Nov 01', 'Nov 02', 'Nov 03', 'Nov 04', 'Nov 05', 'Nov 06', 'Nov 07', 'Nov 08', 'Nov 09', 'Nov 10', 'Nov 11', 'Nov 12', 'Nov 13', 'Nov 14', 'Nov 15', 'Nov 16', 'Nov 17', 'Nov 18', 'Nov 19', 'Nov 20', 'Nov 21'],
        datasets: [
            {
                label: 'Statistics ',
                data: [10, 16, 4, 6, 17, 11, 18, 11, 12, 9, 5, 26, 13, 7, 8, 12, 3, 12, 14, 14, 14, 11, 9, 7, 5],
                fill: false,
                backgroundColor: '#3a68ad',
                borderColor: 'black',
                width: "23px"
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    };

    return (
        <div className="dashboard">
            <NavBar />
            <Grid container item={true}>
                <Grid sm={2} xs={2} item={true}>
                    <LeftBar />
                </Grid>
                <Grid sm={10} xs={10} item={true} style={{ marginTop: "80px", padding: "10px", backgroundColor: "#efefef" }}>
                    <Grid sm={12} xs={12} item={true}>
                        <Card>
                            <CardContent>
                                <Typography>
                                    <div className={classes.griddash}>
                                        <Grid sm={4} xs={4} className={classes.stat} item={true} id="stat">
                                            <Card>
                                                <CardHeader
                                                    title="Commandes"
                                                    avatar={
                                                        <Group />
                                                    }
                                                    subheader="Nombre total des utilisateurs"
                                                />
                                                <div className="d-flex">
                                                    <CardContent>
                                                        <Typography variant="h5" style={{ color: "#555" }}></Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Link to="/commandes">
                                                            <Button
                                                                className='btn-voir-tout'
                                                                variant="contained"
                                                                size="small"
                                                                style={{
                                                                    backgroundColor: "#0c50a2",
                                                                    color: "#fff",
                                                                }}>V<span className="span" >oir tout</span></Button>
                                                        </Link>
                                                    </CardActions>
                                                </div>
                                            </Card>
                                        </Grid>
                                        <Grid sm={4} xs={4} item={true} className={classes.stat} id="stat">
                                            <Card>
                                                <CardHeader
                                                    title="Produits"
                                                    avatar={
                                                        <Announcement />
                                                    }
                                                    subheader="Nombre total des produits"
                                                />
                                                <div className="d-flex">
                                                    <CardContent>
                                                        <Typography variant="h5" style={{ color: "#555" }}>
                                                            {data ? data.length : 'Serveur down'}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Link to="/produits">
                                                            <Button
                                                                className='btn-voir-tout'
                                                                variant="contained"
                                                                size="small" style={{ backgroundColor: "#0c50a2", color: "#fff" }}>
                                                                V<span className="span">oir tout</span>
                                                            </Button>
                                                        </Link>
                                                    </CardActions>
                                                </div>
                                            </Card>
                                        </Grid>

                                        <Grid sm={4} xs={4} item={true} className={classes.stat} id="stat">
                                            <Card>
                                                <CardHeader
                                                    title="Catégories"
                                                    avatar={
                                                        <ApartmentTwoTone />
                                                    }
                                                    subheader="Nombre total de Catégories"
                                                />
                                                <div className="d-flex">
                                                    <CardContent>
                                                        <Typography variant="h5" style={{ color: "#555" }}>
                                                            {cat ? cat.length : 'Serveur down'}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Link to="/categories">
                                                            <Button
                                                                className='btn-voir-tout'
                                                                variant="contained"
                                                                size="small"
                                                                style={{ backgroundColor: "#0c50a2", color: "#fff" }}>
                                                                V<span className="span">oir tout</span>
                                                            </Button>
                                                        </Link>
                                                    </CardActions>
                                                </div>
                                            </Card>
                                        </Grid>

                                        <Grid sm={4} xs={4} item={true} className={classes.stat}>
                                            <Card>
                                                <CardHeader
                                                    title="Revenus"
                                                    avatar={
                                                        <MonetizationOn />
                                                    }
                                                    subheader="Le total des Revenus"
                                                />
                                                <div className="d-flex">
                                                    <CardActions>
                                                        <div
                                                            style={{
                                                                border: '1px solid silver', width: '200px', marginLeft: '10px', borderRadius: '5px',
                                                                margin: '0 auto', textAlign: 'center', height: '', fontSize: '25px'
                                                            }}
                                                        >

                                                            9
                                                        </div>
                                                    </CardActions>
                                                </div>
                                            </Card>
                                        </Grid>

                                    </div>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid sm={12} xs={12} item={true}>
                        <Card className={classes.courbStatist} style={{ padding: "10px", marginTop: "10px" }}>
                            <Grid sm={6} xs={6} item={true} className={classes.courb} id="courb">
                                <Card>
                                    <CardHeader
                                        title="Statistics postes"
                                        avatar={
                                            <PostAddTwoTone />
                                        }
                                        subheader="Représentation graphique de postes"
                                    />
                                    <CardContent>
                                        <Bar data={data4} options={options2} />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid sm={6} xs={6} item={true} className={classes.courb} id="statics">
                                <Card>
                                    <CardHeader
                                        title="Statistics achats"
                                        avatar={
                                            <PeopleRounded />
                                        }
                                        subheader="Représentation graphique d'achats"
                                    />
                                    <CardContent>
                                        <Line
                                            data={data5}
                                            options={options}
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Grid >
        </div >
    )
}

export default Dashboard;