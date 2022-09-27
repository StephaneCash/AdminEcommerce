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

const AddCategory = (props) => {

    const classes = useStyles();

    const [etatInput, setEtatInput] = useState(false);

    const [input, setInput] = useState([{
        id: 1,
        subCategory: '',
    }])

    const data = props.data;
    const onChange = props.onChange;
    const handleSubmitSubAdmin = props.handleSubmitSubAdmin;

    const { id, catName, description, subCategory } = data;
    if (id) {
        data.status = data.status;
    } else {
        data.status = "Actif";
    }
    let tempsNow = new Date();
    data.time = tempsNow.toString().substring(0, 25);

    const addInput = (id) => {
        setInput([...input, { id: id + 2, subCategory: [] }]);
    };

    const removeInput = (id) => {
        const values = [...input];
        values.splice(id, 1);
        setInput([...values]);
    };

    return (
        <>
            <Modal show={props.show} className={classes.modal} id="add-user">
                <Modal.Header>
                    {id ? `Editer ${catName}` : `Ajout catégorie`}
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmitSubAdmin}>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6">
                                    <TextField
                                        label="Nom"
                                        variant="outlined"
                                        placeholder='Nom'
                                        id="catName"
                                        style={{ width: '100%' }}
                                        required
                                        onChange={(e) => onChange(e)}
                                        value={catName}
                                    />
                                    <br /><br />
                                    <TextareaAutosize
                                        style={{ border: "1px solid silver", width: '100%', padding: "10px", borderRadius: '5px' }}
                                        minRows={4}
                                        placeholder="Entrer une description"
                                        id='description'
                                        onChange={(e) => onChange(e)}
                                        value={description}
                                    />
                                </div>
                                <div className="col-6">
                                    {input.map((input, i) => (
                                        <div key={input.id}>

                                            <div className='row'>
                                                <div className='col-10'>
                                                    <TextField
                                                        style={{ width: '100%', marginBottom: '27px' }}
                                                        variant="outlined"
                                                        label='Sous-catégorie'
                                                        id='subCategory'
                                                        value={subCategory[i]}
                                                        onChange={(e) => onChange(e)}

                                                    />
                                                </div>
                                                <div className="col-2">
                                                    <div className='row' style={{ marginTop: "-10px" }}>
                                                        <Button onClick={() => addInput(i)}>
                                                            <AddCircle />
                                                        </Button>
                                                        <Button disabled={input.id === 1} onClick={() => removeInput(i)}>
                                                            <RemoveCircle />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <br /><br />
                        </div>
                        <div className="mt-3">
                            <Button
                                type="submit"
                                variant="outlined"
                                className="btn-voir-tout"
                                style={{ marginLeft: '10px', float: "right", marginTop:'20px' }}
                            >
                                {id ? "Editer" : "Ajouter"}
                            </Button>
                            <Button className="btn" variant="outlined"
                                style={{ float: "right", marginLeft: "15px", marginTop:'20px' }}
                                onClick={props.closeModal}>Annuler</Button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer style={{ paddingRight: "30px" }}>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddCategory;