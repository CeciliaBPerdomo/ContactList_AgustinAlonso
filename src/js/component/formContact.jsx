import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

const FormContact = () => {
    const { idContact } = useParams()
    const { actions } = useContext(Context)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const navigate = useNavigate()

    
    const getDataToEdit = async () => {
        if (idContact) {
            try {
                const data = await actions.getDataToEdit(idContact);
                console.log(data.name)
                setName(data.name)
                setEmail(data.email)
                setPhone(data.phone)
                setAddress(data.address)
            } catch (error) {
                console.error('Error al obtener datos del contacto:', error);
            }
            console.log(name,phone,email,address)
        }
    }

    getDataToEdit()

    


    const createOrEditContact = (e) => {
        e.preventDefault()
        const res = actions.createContacts(name, email, phone, address)
        if (res) {
            navigate('/')
        }
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

    return (
        <form className="col-12 col-md-8 mt-3" onSubmit={createOrEditContact}>
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