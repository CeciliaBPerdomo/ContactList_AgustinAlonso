import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const FormContact = () => {
  const location = useLocation();
  //console.log(location);
  const { idContactToEdit } = useParams();
  const { actions } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    
  const [wishEdit, setWishEdit] = useState(false);

  const navigate = useNavigate();

  //Esta funcion se ejecuta cuando el usuario da en 'guardar', cuando quiere crear un contacto nuevo.
  const createContact = (e) => {
    e.preventDefault();
    const res = actions.createContact(name, email, phone, address);
    if (res) {
      navigate("/");
    }
  };

    const editContact = (e) => {
      e.preventDefault()
      const res = actions.editContact(name, email, phone, address, idContactToEdit)
      if (res) {
        navigate("/");
      }
  };

  useEffect(() => {
    if (idContactToEdit) {
      //Esta función trae los datos del contacto que el usuario quiere editar, para mostrarla en el form.
      const getDataToEdit = async () => {
        try {
          const data = await actions.getDataToEdit(idContactToEdit);
          setName(data.name);
          setEmail(data.email);
          setPhone(data.phone);
          setAddress(data.address);
        } catch (error) {
            console.error("Error al obtener datos del contacto:", error);
        }
    };
    getDataToEdit();
    setWishEdit(true);
    } else {
      //Si no existe idContactToEdit (parámetro en la url), entonces se vacían los los inputs.
        setName('')
        setAddress('')
        setEmail('')
        setPhone('')
      setWishEdit(false)
    }
  }, [idContactToEdit, location.pathname]);

  
  //Cada vez que cambia el valor de los inputs con el onChange(), se sete el valor de dicho input en su correspondiete estado, para luego editar o crear un nuevo contacto.
  const readName = (e) => setName(e.target.value);

  const readEmail = (e) => setEmail(e.target.value);

  const readPhone = (e) => setPhone(e.target.value);

  const readAddress = (e) => setAddress(e.target.value);

  const editOrCreate = wishEdit ? editContact : createContact;

  return (
    <form className="col-12 col-md-8 mt-3" onSubmit={editOrCreate}>
      <div className="mb-3">
        <label className="form-label">Nombre Completo</label>
        <input
          value={name}
          onChange={readName}
          type="text"
          className="form-control"
          aria-describedby="nombreCompleto"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          value={email}
          onChange={readEmail}
          type="email"
          className="form-control"
          aria-describedby="emailHelp"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Teléfono</label>
        <input
          value={phone}
          onChange={readPhone}
          type="number"
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Dirección</label>
        <input
          value={address}
          onChange={readAddress}
          type="text"
          className="form-control"
          aria-describedby="direccion"
          required
        />
      </div>

      <button type="submit" className="btn btn-outline-success">
        Guardar
      </button>
    </form>
  );
};
export default FormContact;
