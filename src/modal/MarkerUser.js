import { Modal } from "react-bootstrap";
import "../css/addUserModal.css";
import { makeStyles } from "@material-ui/core/styles"
import { Button, TextField, TextareaAutosize } from "@material-ui/core";
import { useState } from "react";
import { AddCircle, Close, PostAdd, RemoveCircle } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    modal: {
    },
}))

const MarkerUser = (props) => {

    const classes = useStyles();

    return (
        <>
            <Modal show={props.show} className={classes.modal} id="add-user">
                <Modal.Header>
                    Détail User
                </Modal.Header>
                <Modal.Body>
                   Détail Localisation User
                </Modal.Body>
                <Modal.Footer style={{ paddingRight: "30px" }}>
                    <div className="mt-3">
                        <Button className="btn" variant="outlined"
                            style={{ float: "right", marginLeft: "15px", border: "1px solid red", color: "red" }}
                            onClick={props.close}>Fermer
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MarkerUser;