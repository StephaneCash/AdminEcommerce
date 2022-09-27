import { Card, Grid, TextField, Button } from '@material-ui/core';
import { MonetizationOn } from '@material-ui/icons';
import React from 'react';
import LeftBar from '../includes/LeftBar';
import NavBar from '../includes/NavBar';
import { db } from "../config/FirebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import Load from '../includes/Load';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function GestionMonetaire() {
    const [data, setData] = useState([]);
    const appSettings = collection(db, 'app-settings');

    const [id, setId] = useState('');

    const getAppSettings = async () => {
        const dataApp = await getDocs(appSettings);
        setData(dataApp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const [donnees, setDonnes] = useState([]);

    useEffect(() => {
        getAppSettings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submitData = async () => {
        if (id) {
            const monetaireDoc = doc(db, 'app-settings', id);
            await updateDoc(monetaireDoc, donnees);
            getAppSettings();
            toast.success("Modification effectuée avec succès");
        };
    };

    const [val, setVal] = useState(false);

    const editer = (id) => {
        for (let i = 0; i < data.length; i++) {
            setId(data[i].id)
            setDonnes(data[i])
        }
        setVal(true);
    };

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
                                <h4 className="align-center"> <MonetizationOn /> Gestion monétaire  </h4>
                                <h5 style={{ borderBottom: "1px solid #efefef" }}></h5>
                            </div>
                            <div className="col-12 p-5">
                                <>
                                    <div className="col-12">
                                        <table className="table table-bordered table-borderless table-hover" style={{marginTop: "-30px"}}>
                                            <thead style={{ backgroundColor: "#efefef" }}>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Prix de l"annonce</th>
                                                    <th>Prix de la publicité</th>
                                                    <th>MPSA</th>
                                                    <th>Airtel Money</th>
                                                    <th>Orange</th>
                                                    <th>adPriceinUSD</th>
                                                    <td>Taux</td>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data.length > 0 ? (
                                                        <>
                                                            {
                                                                data.map((val, index) => (
                                                                    <tr key={val.id}>
                                                                        <td>
                                                                            {
                                                                                index + 1
                                                                            }
                                                                        </td>

                                                                        <td>{val.adPrice}</td>
                                                                        <td>{val.adPriceForPublicity}</td>
                                                                        <td>{val.mPaisaID}</td>
                                                                        <td>{val.airtelMoney}</td>
                                                                        <td>{val.orangeMoney}</td>
                                                                        <td>{val.adPriceinUSD}</td>
                                                                        <td>{val.tauxEchange}</td>
                                                                        <td style={{ textAlign: 'center', width: "70px", border: "1px solid silver !important" }}>
                                                                            <button type="button"
                                                                                onClick={() => editer(val.id)}
                                                                                className="btn btnChange">
                                                                                <i className="fa fa-edit"></i>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </>
                                                    ) : (
                                                        <>
                                                            <tr>
                                                                <td colSpan="8px" style={{ textAlign: 'center' }}>
                                                                    <Load />
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    {val === true ? (<>
                                        <form>
                                            <div className="row">
                                                <div className="col-5">
                                                    <label style={{ marginBottom: "10px" }}>Prix du poste :</label> <br />
                                                    <TextField
                                                        id="adPrice"
                                                        type="text"
                                                        required
                                                        variant="outlined"
                                                        value={donnees.adPrice}
                                                        style={{ width: '80%' }}
                                                        onChange={(e) => setDonnes({ ...donnees, 'adPrice': e.target.value })}
                                                    />
                                                    <br />
                                                    <br />
                                                    <label style={{ marginBottom: "10px" }}>Prix de la publicité :</label> <br />
                                                    <TextField
                                                        required
                                                        variant="outlined"
                                                        style={{ width: '80%' }}
                                                        id="adPriceForPublicity"
                                                        value={donnees.adPriceForPublicity}
                                                        onChange={(e) => setDonnes({ ...donnees, 'adPriceForPublicity': e.target.value })}
                                                    />
                                                    <br />
                                                    <br />
                                                    <label style={{ marginBottom: "10px" }}>Compte M-PSA :</label> <br />
                                                    <TextField
                                                        type="text"
                                                        required
                                                        variant="outlined"
                                                        value={donnees.mPaisaID}
                                                        id="mPaisaID"
                                                        style={{ width: '80%' }}
                                                        onChange={(e) => setDonnes({ ...donnees, 'mPaisaID': e.target.value })}
                                                    />
                                                    <br />
                                                    <br />
                                                    <label style={{ marginBottom: "10px" }}>Compte Airtel Money :</label> <br />
                                                    <TextField
                                                        required
                                                        variant="outlined"
                                                        id="airtelMoney"
                                                        style={{ width: '80%' }}
                                                        value={donnees.airtelMoney}
                                                        onChange={(e) => setDonnes({ ...donnees, 'airtelMoney': e.target.value })}
                                                    />
                                                </div>
                                                <div className="col-5">
                                                    <label style={{ marginBottom: "10px" }}>Compte Orange Money :</label> <br />
                                                    <TextField
                                                        id="orangeMoney"
                                                        required
                                                        variant="outlined"
                                                        style={{ width: '80%' }}
                                                        value={donnees.orangeMoney}
                                                        onChange={(e) => setDonnes({ ...donnees, 'orangeMoney': e.target.value })}
                                                    />
                                                    <br />
                                                    <br />
                                                    <label style={{ marginBottom: "10px" }}>CDF ou USD:</label> <br />
                                                    <TextField
                                                        style={{ width: '80%' }}
                                                        required
                                                        variant="outlined"
                                                        id="adPriceinUSD"
                                                        value={donnees.adPriceinUSD}
                                                        onChange={(e) => setDonnes({ ...donnees, 'adPriceinUSD': e.target.value })}
                                                    />
                                                    <br />
                                                    <br />
                                                    <label style={{ marginBottom: "10px" }}>Taux du jour :</label> <br />
                                                    <TextField
                                                        type="text"
                                                        required
                                                        style={{ width: '80%' }}
                                                        id="tauxEchange"
                                                        variant="outlined"
                                                        value={donnees.tauxEchange}
                                                        onChange={(e) => setDonnes({ ...donnees, 'tauxEchange': e.target.value })}
                                                    />
                                                </div>
                                                <div className="col-2 mt-4">
                                                    <Button
                                                        style={{ color: "green", border: '1px solid green' }}
                                                        variant="outlined"
                                                        onClick={submitData}
                                                    >
                                                        Modifier
                                                        <i className="fa fa-edit" style={{ marginLeft: "5px" }}></i>
                                                    </Button>
                                                </div>
                                            </div>
                                        </form>
                                    </>) : ""}
                                </>
                            </div>
                        </Card>
                    </Grid>
                </div>
            </div>
        </>
    );
}

export default GestionMonetaire;
