import React, { useState, useEffect, useContext } from "react";
import FormContact from "../component/formContact.jsx";


import "../../styles/demo.css";

export const AddContact = () => {
	return (
		<div className="container d-flex justify-content-center">
			<FormContact />
		</div>
	);
};
