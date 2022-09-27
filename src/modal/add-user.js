import { Modal } from "react-bootstrap";
import "../css/addUserModal.css";
import { makeStyles } from "@material-ui/core/styles"
import { Button, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    modal: {

    },
}))

const AddUser = (props) => {

    const classes = useStyles();

    const data = props.data;

    const onChange = props.onChange;

    let ListError = [];
    ListError = props.ListErr;

    const handleSubmitUser = props.handleSubmitUser;

    const { id, username, email, name, phoneNumber, province, city, balance } = data;

    if (id) {
        data.status = data.status;
    } else {
        data.status = "Actif";
    }

    return (
        <>
            <Modal show={props.show} className={classes.modal} id="add-user">
                <Modal.Header>
                    {id ? `Editer ${name}` : `Ajout d'un utilisateur`}
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmitUser}>
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
                                            onChange={e => onChange(e)}
                                            placeholder="Un username"
                                            value={username}
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
                                            onChange={e => onChange(e)}
                                            placeholder="Adresse email"
                                            value={email}
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
                                            onChange={e => onChange(e)}
                                            placeholder="Un nom"
                                            value={name}
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
                                            onChange={e => onChange(e)}
                                            variant="outlined"
                                            value={phoneNumber}
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
                                            onChange={e => onChange(e)}
                                            value={province}
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
                                            onChange={e => onChange(e)}
                                            placeholder="Une ville"
                                            value={city}
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
                                            onChange={e => onChange(e)}
                                            placeholder="Une balance"
                                            value={balance}
                                        />
                                        <span style={{ color: "red" }}> {ListError.balance} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button
                            className='btn btn-voir-tout'
                            type="submit"
                            variant="outlined"
                            style={{ marginLeft: "10px", float: "right", }}
                        >
                            {id ? "Editer" : "Ajouter"}
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

export default AddUser;