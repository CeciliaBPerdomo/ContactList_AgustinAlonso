import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import FormContact from "../component/formContact.jsx";


import "../../styles/demo.css";

export const AddContact = () => {
	return (
		<div className="container d-flex justify-content-center">
			<FormContact />
		</div>
	);
};
