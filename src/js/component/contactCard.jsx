import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

//const delete =

export const ContactCard = ({ name, email, phone, address, contactId }) => {
    const navigate = useNavigate();
   

    const { store, actions } = useContext(Context)

    const deleteContact = () => actions.deleteContacts(contactId)

    const toEdit = () =>{
        navigate(`/editContact/${contactId}`)
        console.log(idContact)
    }

    return (
        <div className="card mb-3 col-sm-10 col-md-6 mx-1 p-0">
            <div className="row g-0">
                <div className="col-2 col-md-4">
                    <img src="https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280-768x768.jpg" className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-9 col-md-8">
                    <div className="card-body">
                        <div className="d-flex justify-content-between"><h4 className="card-title">{name}</h4> <div>
                            <span className="mx-2" onClick={toEdit}>✏️</span>
                            <span className="mx-2" data-bs-toggle="modal" data-bs-target="#modal" >❌</span></div>
                        </div>
                        <h6 className="card-title"><span className="me-2">📧</span>{email}</h6>
                        <h6 className="card-title"><span className="me-2">📞</span>{phone}</h6>
                        <h6 className="card-title"><span className="me-2">📌</span>{address}</h6>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content text-center">
                        <div className="modal-header row border-bottom-0">
                            <h1 className="col-12 modal-title fs-5" id="exampleModalLabel">¿Seguro quieres eliminar este contacto?</h1>
                            <p className="col-12 my-2">Esta acción no se puede revertir.</p>
                        </div>
                        <div className="modal-footer justify-content-center border-top-0">
                            <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={deleteContact}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}