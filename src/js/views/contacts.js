
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext.js";
//import "../../styles/home.css";
import { ContactCard } from "../component/contactCard.jsx";



export const Contacts = () => {
	const {store} = useContext(Context);
	
	return (
		<div className="container d-flex mx-auto justify-content-center mt-3 row">
			{store.contacts.map((contact, index) => {
				return(
					<ContactCard contactId={contact.id} name={contact.name} email={contact.email} phone={contact.phone} address={contact.address} key={index} />
				)
			})}
		</div>
	)
};
