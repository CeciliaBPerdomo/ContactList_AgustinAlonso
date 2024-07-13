import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<form className="container-fluid justify-content-center">
				<Link to="/">
					<button className="btn btn-outline-success me-2" type="button">Contactos</button>
				</Link>
				<Link to="/addContact">
					<button className="btn btn-outline-success me-2" type="button">Agregar Contactos</button>
				</Link>
			</form>
		</nav>
	);
};
