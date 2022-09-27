import { Modal } from "react-bootstrap";
import { useState } from 'react';
import "../css/addUserModal.css";
import { makeStyles } from "@material-ui/core/styles";
import { Button, IconButton, InputAdornment, OutlinedInput, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    modal: {
    },
}))

const AddSousAdmin = (props) => {

    const classes = useStyles();

    const msgError = props.msgError;

    const data = props.data;
    const onChange = props.onChange;
    const handleSubmitSubAdmin = props.handleSubmitSubAdmin;

    const { id, email, password, confirmPassword, } = data;
    if (id) {
        data.status = data.status;
    } else {
        data.status = "Actif";
    }
    let tempsNow = new Date();
    data.time = tempsNow.toString().substring(0, 25);

    const [showPass, setShowPass] = useState(false);

    function handlePass() {
        setShowPass(!showPass);
    };

    return (
        <>
            <Modal show={props.show} className={classes.modal} id="add-user">
                <Modal.Header>
                    {id ? `Editer ${email}` : `Ajout sous-administrateur`}
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmitSubAdmin}>
                        <div className="col-12">
                            <TextField
                                label="Email"
                                variant="outlined"
                                placeholder='Email'
                                id="email"
                                style={{ width: '100%' }}
                                required
                                onChange={(e) => onChange(e)}
                                value={email}
                            />
                            <br /><br />

                            <OutlinedInput
                                type={showPass ? 'text' : 'password'}
                                style={{ width: '100%' }}
                                className='mb-4'
                                required
                                value={password}
                                id='password'
                                placeholder="Entrer le mot de passe"
                                onChange={(e) => onChange(e)}
                                endAdornment={
                                    <InputAdornment position="end" >
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                            onClick={handlePass}
                                        >
                                            {
                                                showPass ? <VisibilityOff style={{ fontSize: "20px" }} /> :
                                                    <Visibility style={{ fontSize: "20px" }} />
                                            }

                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                name="password"
                            />

                            <TextField
                                type="password"
                                variant="outlined"
                                label="Confirmer le mot de passe"
                                placeholder="Confirmer le mot de passe"
                                style={{ width: '100%' }}
                                required
                                onChange={(e) => onChange(e)}
                                value={confirmPassword}
                                id='confirmPassword'
                            />
                            {msgError ? <div className="alert alert-danger mt-2" style={{ fontSize: '14px' }}>{msgError}</div> : ""}
                        </div>
                        <div className="mt-3">
                            <Button
                                className='btn btn-voir-tout'
                                type="submit"
                                variant="outlined"
                                style={{ marginLeft: '10px', float: "right" }}
                            >
                                {id ? "Editer" : "Ajouter"}
                            </Button>
                            <Button variant="outlined"
                                style={{ float: "right", marginLeft: "15px", marginTop: "20px" }}
                                onClick={props.close}>Annuler</Button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer style={{ paddingRight: "30px" }}>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddSousAdmin;