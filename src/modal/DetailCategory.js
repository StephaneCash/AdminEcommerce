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

const DetailCategory = (props) => {

    const [data, setData] = useState([]);
    const usersCollection = collection(db, "categories");

    const getCaterory = async () => {
        const dataCategory = await getDocs(usersCollection);
        setData(dataCategory.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        getCaterory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const idRecu = props.data;
    const closeM = props.close;

    let dataS = {};
    let etatBtn = false;
    let docData = '';

    const classes = useStyles();

    return (
        <>
            <Modal show={props.show} className={classes.modal} id="detailUser">
                <Modal.Header>Détail Catégorie</Modal.Header>
                <Modal.Body>
                    <table className="table table-hover table-striped ">
                        <tbody>
                            {
                                data.map((val, i) => {
                                    if (val.id === idRecu) {
                                        return (
                                            <>
                                                <tr key={i}>
                                                    <td>Nom</td>
                                                    <td>{val.catName}</td>
                                                </tr>
                                                <tr>
                                                    <td>Description</td>
                                                    <td>{val.description}</td>
                                                </tr>
                                                <tr>
                                                    <td>Sous-catégories</td>
                                                    <td>
                                                        {val.subCategory.forEach((val, i) => {
                                                             return (
                                                                 <>
                                                                    {val}
                                                                 </>
                                                             )
                                                        }) }
                                                    </td>
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

export default DetailCategory;