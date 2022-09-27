import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import swal from "sweetalert"
import { Card, Grid, } from '@material-ui/core'
import LeftBar from '../includes/LeftBar';
import NavBar from '../includes/NavBar';

function Commandes() {
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

    const deleteProduct = (id) => {
        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir supprimer ce tableau ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:5000/api/products/${id}`)
                    .then(res => {
                        swal({ title: "Succès", icon: "success", text: res.data.message })
                        getProducts();
                    })
                    .catch(err => {
                        console.log(err.response)
                    })
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <div className="provinces">
                <NavBar />
                <div className="d-flex">
                    <Grid xs={2} item>
                        <LeftBar />
                    </Grid>
                    <Grid xs={10} item style={{ marginTop: "80px", padding: "10px", backgroundColor: "#efefef" }}>
                        <Card style={{ padding: "10px" }}>
                            <div className="col-12" style={{ marginTop: "5px", textAlign: "center" }}>
                                <h4 className="align-center"> Commandes  </h4>
                                <h5 style={{ borderBottom: "1px solid #efefef" }}></h5>
                            </div>
                            <div className="col-12">
                                <>
                                    <div className="col-12">
                                        <div className='container mt-3'>
                                            <div className='card'>
                                                
                                                <div className='card-body'>
                                                    <table className='table table-bordered table-bordeless'>
                                                        <thead>
                                                            <tr>
                                                                <th>N°</th>
                                                                <th>Nom</th>
                                                                <th>Catégorie</th>
                                                                <th>Prix</th>
                                                                <th>Quantité</th>
                                                                <th>Image</th>
                                                                <th>Description</th>
                                                                <th style={{ width: '250px' }}>Options</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data.length > 0 ? data.map((val, i) => {
                                                                return (
                                                                    <tr key={val.id}>
                                                                        <td>{i + 1}</td>
                                                                        <td>{val.title}</td>
                                                                        <td>{val.categories ? val.categories.nom : "Aucune catégorie"}</td>
                                                                        <td>{val.price} $</td>
                                                                        <td>{val.qty}</td>
                                                                        <td><img src={val.image} style={{ borderRadius: "50%" }} alt={val.title} width="60px" height="60px" /></td>
                                                                        <td>{val.description}</td>
                                                                        <td>
                                                                            <NavLink to={{ pathname: "/editProduct" }} state={{ state: val }} >
                                                                                <button className='btn btnEdit btn-outline-dark'>
                                                                                    Editer  <i className="fa fa-edit"></i>
                                                                                </button>
                                                                            </NavLink>
                                                                            <button className='btn btnEdit btn-outline-dark ms-2' onClick={() => deleteProduct(val.id)}>Supprimer <i className='fa fa-trash'></i></button>
                                                                        </td>

                                                                    </tr>
                                                                )
                                                            }) :
                                                                <tr>
                                                                    <td colSpan='8px' className='text-center'>Chargement... <i className='fa fa-spinner fa-spin fa-2x'></i></td>
                                                                </tr>
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            </div>
                        </Card>
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default Commandes