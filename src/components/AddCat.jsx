import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useLocation, useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { Card, Grid, } from '@material-ui/core';
import LeftBar from '../includes/LeftBar';
import NavBar from '../includes/NavBar';

function AddCat() {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const initialiseValues = { id: "", nom: "", desc: "" };
    const [formData, setFormData] = useState(initialiseValues);

    const { id, nom, desc } = formData;

    const changeValue = (e) => {
        const { value, id } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    useEffect(() => {
        if (state) {
            setFormData(state.state)
            console.log(state)
        }
    }, [state]);

    const submitData = () => {
        if (state) {
            axios.put(`http://localhost:5000/api/categories/${id}`, { nom, desc })
                .then(resp => {
                    swal({ title: "Succès", icon: "success", text: "Catégorie éditée avec succès" });
                    navigate('/categories');
                })
                .catch(err => {
                    console.log(err.response)
                })
        } else {
            axios.post("http://localhost:5000/api/categories", { nom, desc })
                .then(resp => {
                    swal({ title: "Succès", icon: "success", text: "Catégorie ajoutée avec succès" });
                    navigate("/categories")
                })
                .catch(err => {
                    console.log(err.response)
                })
        }
    }
    return (
        <div className="provinces">
            <NavBar />
            <div className="d-flex">
                <Grid xs={2} item>
                    <LeftBar />
                </Grid>
                <Grid xs={10} item style={{ marginTop: "80px", padding: "10px", backgroundColor: "#efefef" }}>
                    <Card style={{ padding: "10px" }}>
                        <div className="col-12" style={{ marginTop: "5px", textAlign: "center" }}>
                            <h4 className="align-center"> Catégories  </h4>
                            <h5 style={{ borderBottom: "1px solid #efefef" }}></h5>
                        </div>
                        <div className="col-12">
                            <>
                                <div className="col-12">
                                    <div className='container mt-2'>
                                        <div className='container mt-2'>
                                            <h5>{state ? "Editer cette catégorie " : "Ajouter une catégorie"} </h5>
                                            <div className="col-sm-6">
                                                <label>Nom de la catégorie</label>
                                                <input type="text" className="form-control" value={nom} id="nom" onChange={changeValue} />
                                                <label className='mt-2'>Description</label>
                                                <textarea className="form-control" value={desc} placeholder='Description...' id="desc" onChange={changeValue}></textarea>
                                                <br />
                                                <Button variant="contained" className='mt-3' style={{ backgroundColor: '#0c50a2', color: "#fff" }} onClick={submitData}>
                                                    {state ? "Editer " : "Ajouter"}
                                                </Button>
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
    )
}

export default AddCat