import { Modal } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../css/DetailUser.css";
import { useState, useEffect } from "react";
import { db } from "../config/FirebaseConfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import swal from "sweetalert"

const useStyles = makeStyles((theme) => ({
    modal: {
    },
}))

const DetailUser = (props) => {

    const [data, setData] = useState([]);
    const usersCollection = collection(db, "users");

    const getUsers = async () => {
        const dataUsers = await getDocs(usersCollection);
        setData(dataUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const idRecu = props.data;
    const closeM = props.close;

    let dataS = {};
    let etatBtn = false;
    let docData = '';

    data.forEach(val => {
        if (val.id === idRecu) {
            dataS.name = val.name;
            docData = val.status;
            if (val.status === 'Actif') {
                dataS.status = "Bloqué";
                etatBtn = true;
            } else if (val.status === 'Bloqué') {
                dataS.status = "Actif";
            }
            dataS.username = val.username;
        }
    });

    const getU = props.getU;

    const handleBloquerUser = (id) => {
        const userCol = doc(db, 'users', id);
        let msg = "";
        let msgConf = "";
        if (docData === 'Actif') {
            msg = 'Etes-vous sûr de vouloir bloquer cet utilisateur';
            msgConf = 'Utilisateur bloqué avec succès';
            getU();
        } else if (docData === 'Bloqué') {
            msg = 'Etes-vous sûr de vouloir débloquer cet utilisateur';
            msgConf = 'Utilisateur débloqué avec succès';
            getU();
        }

        swal({
            title: "Avertissement.",
            text: msg,
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                updateDoc(userCol, dataS);
                getU();
                swal(msgConf, {
                    icon: "success",
                });
                getUsers();
                closeM();
            }
        })
    };

    const classes = useStyles();

    return (
        <>
            <Modal show={props.show} className={classes.modal} id="detailUser">
                <Modal.Header>Détail User</Modal.Header>
                <Modal.Body>
                    <table className="table table-hover table-striped ">
                        <tbody>
                            {
                                data.map((val, i) => {
                                    if (val.id === idRecu) {
                                        return (
                                            <>
                                                <tr key={i}>
                                                    <td>Name</td>
                                                    <td>{val.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Username</td>
                                                    <td>{val.username}</td>
                                                </tr>
                                                <tr>
                                                    <td>Email</td>
                                                    <td>{val.email}</td>
                                                </tr>
                                                <tr>
                                                    <td>Phone</td>
                                                    <td>{val.phoneNumber}</td>
                                                </tr>
                                                <tr>
                                                    <td>City</td>
                                                    <td>{val.city}</td>
                                                </tr>
                                                <tr>
                                                    <td>Province</td>
                                                    <td>{val.province}</td>
                                                </tr>
                                                <tr>
                                                    <td>Balence</td>
                                                    <td>{val.balance}</td>
                                                </tr>
                                                <tr>
                                                    <td>Status</td>
                                                    <td>{val.status}</td>
                                                </tr>
                                                <tr>
                                                    <Button
                                                        variant="outlined"
                                                        style={{ color: "#c72f3c", marginTop: "10px" }}
                                                        onClick={() => handleBloquerUser(val.id)}>
                                                        {etatBtn ? 'Bloquer' : "Débloquer"}
                                                    </Button>
                                                </tr>
                                            </>
                                        )
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outlined" onClick={props.close}>Fermer</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DetailUser;