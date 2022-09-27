import { Modal } from "react-bootstrap";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import { db } from "../config/FirebaseConfig";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import swal from "sweetalert";
import "../css/ModalDetailAnnonce.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const DetailUser = (props) => {

    const [data, setData] = useState([]);
    const usersCollection = collection(db, "ads");

    const getAnnonces = async () => {
        const dataUsers = await getDocs(usersCollection);
        setData(dataUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        getAnnonces();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const closeModalAnnonceDetail = props.close;

    const annonceClose = props.close;

    const deleteAnnonce = async (id) => {
        const annonce = doc(db, 'ads', id);
        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir supprimer cette annonce ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                deleteDoc(annonce)
                getAnnonces();
                closeModalAnnonceDetail();
                annonceClose();
                swal('Annonce supprimée avec succès', {
                    icon: "success",
                });

            }
        }).catch((error) => {
            console.log(error);
        })
    };

    const idRecu = props.id;

    let dataS = {};
    let etatBtn = false;
    let tabPhotos = [];

    let msgStatus = "";
    let msgStatusConfirm = "";

    data.forEach((val, i) => {
        if (val.id === idRecu) {
            dataS.productName = val.productName;
            tabPhotos = [...val.photos];
            if (val.status === 'Approved') {
                dataS.status = "Non Approuvé";
                msgStatus = "Etes-vous sûr de vouloir désapprouver cette annonce ?";
                msgStatusConfirm = "Annonce désapprouvée avec succès";
                etatBtn = true;
            } else if (val.status === 'Non Approuvé') {
                dataS.status = "Approved";
                msgStatus = "Etes-vous sûr de vouloir approuver cette annonce ?";
                msgStatusConfirm = "Annonce approuvée avec succès";
            }
            dataS.amount = val.amount;
        }
    });

    const handleDesaprove = (id) => {
        const annonces = doc(db, 'ads', id);

        swal({
            title: "Avertissement.",
            text: msgStatus,
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                updateDoc(annonces, dataS);
                getAnnonces();
                swal(msgStatusConfirm, {
                    icon: "success",
                });
            }
        })
    };

    let dataDite = {};

    const addDate = (date, id) => {
        let dataSplit = date.split('-');
        for (let i = 0; i < dataSplit.length; i++) {
            if (i === 1) {
                dataSplit[i] = parseInt(dataSplit[i]) + 1;
                if (dataSplit[i] > 12) {
                    dataSplit[i] = 1;
                    dataSplit[0] = parseInt(dataSplit[0]) + 1;
                }
            }
        }

        data.forEach((val, i) => {
            if (val.id === idRecu) {
                dataDite.productName = val.productName;
                dataDite.status = val.status;
                dataDite.expireDate = dataSplit.join().replace(/[,]/g, "-");
            }
        });

        const annonces = doc(db, 'ads', id);

        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir ajouter du temps à cette annonce ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                updateDoc(annonces, dataDite);
                getAnnonces();
                swal('Temps ajouté avec succès', {
                    icon: "success",
                });
            }
        })
    };

    return (
        <div className="modalAnnonce">
            <Modal show={props.show} className="" id="detailAnnonce">
                <Modal.Header>
                    <CardHeader
                        style={{ width: "100%" }}
                        title="Détail annonce"
                        action={
                            <i className="fa fa-close" onClick={props.close} style={{ borderRadius: "5px", cursor: 'pointer', border: '1px solid silver', padding: '10px' }}></i>
                        }
                        avatar={
                            <Avatar style={{ backgroundColor: 'black' }}>
                                {data.map((va) => {
                                    if (va.id === idRecu) {
                                        return va.productName.charAt(0).toUpperCase();
                                    }
                                })}
                            </Avatar>
                        }
                    />
                </Modal.Header>
                <Modal.Body>
                    {
                        data.map((val, index) => {
                            if (val.id === idRecu) {
                                return (
                                    <>
                                        <Card key={index}>
                                            <CardHeader title={val.productName} style={{marginBottom:"20px"}} />

                                            {
                                                tabPhotos ?
                                                    <>
                                                        <Carousel>
                                                            {
                                                                tabPhotos.map((el, index) => {
                                                                    return (
                                                                        <div key={index} style={{ height: '400px' }}>
                                                                            <img src={el} style={{ width: '100%', height: '300px' }} />
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </Carousel>
                                                    </>
                                                    : "Image absente"
                                            }

                                            <CardContent>
                                                <Grid xs={12} sm={12} className="mb-2">
                                                    CHF : {val.amount}
                                                </Grid>
                                                <Grid>
                                                    <table className="table table-bordered table-striped">
                                                        <tbody>
                                                            <tr>
                                                                <td>Category</td>
                                                                <td>{val.category}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Sub Category</td>
                                                                <td>{val.subCategory}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Model</td>
                                                                <td>{val.model}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Manufacture Year</td>
                                                                <td>{val.manufactureYear}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Color</td>
                                                                <td>{val.color}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Status</td>
                                                                <td>{val.status}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Expiry Date</td>
                                                                <td>{val.expireDate}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Last Bill Date</td>
                                                                <td>{val.lastBillDate}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </Grid>
                                                <Grid>
                                                    <Card>
                                                        <CardContent>
                                                            <h5>Description</h5>
                                                            {val.description}
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                                <Grid>
                                                    <CardActions>
                                                        <Button
                                                            variant='outlined'
                                                            className='btn btn-voir-tout'
                                                            onClick={() => handleDesaprove(val.id)}
                                                        >
                                                            {etatBtn ? (
                                                                "Désapprouver"
                                                            ) : "Approuver"}
                                                        </Button>
                                                        <Button
                                                            variant='outlined'
                                                            className='btn btn-voir-tout'
                                                            onClick={() => deleteAnnonce(val.id)}
                                                        >
                                                            Supprimer
                                                        </Button>
                                                        <Button variant='outlined'
                                                            className='btn btn-voir-tout'
                                                            onClick={() => addDate(val.expireDate, val.id)}
                                                        >
                                                            Augmenter la date</Button>
                                                    </CardActions>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </>
                                )
                            }
                        })
                    }
                </Modal.Body>
                <Modal.Footer>
                    <CardActions>
                        <Button variant="outlined" onClick={props.close}>Fermer</Button>
                    </CardActions>
                </Modal.Footer>
            </Modal>
        </div >
    );
}

export default DetailUser;