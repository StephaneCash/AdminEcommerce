import { Modal } from "react-bootstrap";
import "../css/addUserModal.css";
import { makeStyles } from "@material-ui/core/styles"
import { Button, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    modal: {

    },
}))

const AddPoste = (props) => {

    const classes = useStyles();

    const data = props.data;

    const onChange = props.onChange;

    let ListError = [];
    ListError = props.ListErr;

    const handleSubmitUser = props.handleSubmitUser;

   // const { id, username, email, name, phoneNumber, province, city, balance } = data;

    return (
        <>
            <Modal show={props.show} className={classes.modal} id="add-poste">
                <Modal.Header>
                   Ajout poste
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <TextField
                                            label="Username"
                                            variant="outlined"
                                            type="text"
                                            required
                                            className="form-control 
                                            mt-2" id="username"
                                            placeholder="Un username"
                                        />

                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            className="form-control mt-3"
                                            id="email"
                                            required
                                            label="Email"
                                            placeholder="Adresse email"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            type="text"
                                            label="Nom"
                                            variant="outlined"
                                            className="form-control mt-3"
                                            id="name"
                                            required
                                            placeholder="Un nom"
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <TextField
                                            type="text"
                                            label="Téléphone"
                                            required
                                            className="form-control mt-2"
                                            id="phoneNumber"
                                            placeholder="Un numéro de téléphone"
                                            variant="outlined"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            required
                                            type="text"
                                            className="form-control mt-3"
                                            placeholder="Province"
                                            id="province"
                                            label="Province"
                                            variant="outlined"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            type="text"
                                            className="form-control mt-3"
                                            required
                                            id="city"
                                            label="City"
                                            variant="outlined"
                                            placeholder="Une ville"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            className="form-control mt-3"
                                            required
                                            id="balance"
                                            label="Balance"
                                            placeholder="Une balance"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button
                            className='btn btn-voir-tout'
                            type="submit"
                            variant="outlined"
                            style={{ marginLeft: "10px", float: "right", marginTop: "20px" }}
                        >
                            Ajouter
                        </Button>

                        <Button
                            style={{ float: "right", marginTop: "20px" }}
                            variant="outlined"
                            onClick={props.close}>
                            Annuler</Button>

                    </form>
                </Modal.Body>
                <Modal.Footer style={{ paddingRight: "30px" }}>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddPoste;