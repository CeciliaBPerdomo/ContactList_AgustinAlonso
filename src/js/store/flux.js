const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: 'Agustin',
			contacts: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			deleteContacts: async (idContact) => {
				const store = getStore(); // Accedemos al almacén
				console.log(`El fetch deleteContact inició`);
				const urlToDelete = `https://playground.4geeks.com/contact/agendas/${store.user}/contacts/${idContact}`
				const options = {
					method: 'DELETE',
					headers: {
						"Content-Type": "application/json"
					}
				}
				const response = await fetch(urlToDelete, options)

				console.log(`Status del fetch deleteContact: ${response.status} - ok: ${response.ok}`)

				if (response.ok) {
					console.log('dentro del if')
					const data = await response // Convertimos a json la response
					console.log(data)

					setStore({contacts: store.contacts.filter(element=> element.id !== idContact)})
				}else{
					console.log(`El fetch deleteContact falló, status: ${response.status}`)
				}
			},
			getContacts: async () => {
				const store = getStore(); // Accedemos al almacén
				console.log(`El fetch getContacts inició`);
				const urlToGet = `https://playground.4geeks.com/contact/agendas/${store.user}`
				const response = await fetch(urlToGet);
				console.log(`Status del fetch getContacts: ${response.status} - ${response.ok}`)

				if (response.ok) {
					const data = await response.json(); // Convertimos a json la response
					console.log(data.contacts)
					setStore({ contacts: data.contacts });
					console.log(`El fetch getContacts finalizó`);

				} else {
					console.log(`El fetch: getContacts falló, status: ${response.status}`);
				}
			},
			createContacts: async (name, email, phone, address) => {
				//console.log(name, email, phone, address)
				const store = getStore()
				const urlToCreate = `https://playground.4geeks.com/contact/agendas/${store.user}/contacts`
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						name: name,
						phone: phone,
						email: email,
						address: address
					})
				}
				console.log(`El fetch createContact inició`);
				const response = await fetch(urlToCreate, options)
				const data = await response.json()
				console.log(`Status del fetch createContact: ${response.status} - ${response.ok}`)
				if (response.ok) {
					setStore({ contacts: [...store.contacts, data] })
					console.log(`Se agregó el contacto:`, data)
					return true
				} else {
					console.log(response.status, data)
					console.log(`El fetch createContact falló, status: ${response.status}`);
				}
				console.log(`El fetch createContact finalizó`);
			},
			getDataToEdit: (idContact) => {
				const store = getStore()
				const dataContact = store.contacts.filter(elmt=> elmt.id == idContact)
				return dataContact[0]
			},
			editContacts: async () =>{

			}
		}
	};
};

export default getState;
