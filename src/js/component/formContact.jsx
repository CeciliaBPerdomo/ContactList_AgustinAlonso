import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

const FormContact = () => {
    const { idContactToEdit } = useParams()
    const { actions } = useContext(Context)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const navigate = useNavigate()

    //Esta función trae los datos del contacto que el usuario quiere editar, para mostrarla en el form.
    const getDataToEdit = async () => {

        try {
            const data = await actions.getDataToEdit(idContactToEdit);
            console.log(data.name)
            setName(data.name)
            setEmail(data.email)
            setPhone(data.phone)
            setAddress(data.address)
        } catch (error) {
            console.error('Error al obtener datos del contacto:', error);
        }
        console.log(name, phone, email, address)

    }

    //Esta funcion se ejecuta cuando el usuario da en 'guardar', cuando quiere crear un contacto nuevo.
    const createContact = (e) => {
        e.preventDefault()
        const res = actions.createContacts(name, email, phone, address)
        if (res) {
            navigate('/')
        }
    }

    //Bandera que se define en función sí el form es para editar contacto o para agregar uno nuevo.
    let editOrCreate;
    if (idContactToEdit) {
        editOrCreate = createContact
        getDataToEdit()
        
    } else {
        editOrCreate = createContact
    }
    
    const readName = (e) => {
        setName(e.target.value)
    }
    const readEmail = (e) => {
        setEmail(e.target.value)
    }
    const readPhone = (e) => {
        setPhone(e.target.value)
    }
    const readAddress = (e) => {
        setAddress(e.target.value)
    }
    
    console.log(name, phone, email, address)
    
    return (
        <form className="col-12 col-md-8 mt-3" onSubmit={editOrCreate}>
            <div className="mb-3">
                <label className="form-label">Nombre Completo</label>
                <input value={name} onChange={readName} type="text" className="form-control" aria-describedby="nombreCompleto" required />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input value={email} onChange={readEmail} type="email" className="form-control" aria-describedby="emailHelp" required />
            </div>
            <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input value={phone} onChange={readPhone} type="number" className="form-control" required />
            </div>
            <div className="mb-3">
                <label className="form-label">Dirección</label>
                <input value={address} onChange={readAddress} type="text" className="form-control" aria-describedby="direccion" required />
            </div>

            <button type="submit" className="btn btn-outline-success">Guardar</button>
        </form>
    )
}
export default FormContact;