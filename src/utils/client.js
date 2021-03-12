import db from '../db/firebase'

//  Create client

export const createClient = (id, name, company, phone, email, postCode) => {
    console.log(id, name, company, phone, email, postCode);
    return db.collection('clients').doc(id).set({
        id,
        name,
        company,
        phone,
        email,
        postCode,
    }).then(() => {
        console.log('added');
        return{status: true}
    })
    .catch(err => {
        return err.message
    }) 
}

//  read client

export const getClient = (id) => {
    return db.collection('clients').doc(id).get()
    .then(client => {
        return client.data()
    })
    .catch(err => {
        return err.message
    }) 
}

//  update client

export const updateClient = (id, name, company, phone, email, postCode) => {
    return db.collection('clients').doc(id).update({
        name,
        company,
        phone,
        email,
        postCode,
    }).then(() => {
        return{status: true}
    })
    .catch(err => {
        return err.message
    }) 
}

//  delete client

export const deleteClient = (id) => {
    return db.collection('clients').doc(id).delete()
    .then(() => {
        return{status: true}
    })
    .catch(err => {
        return err.message
    }) 
}

//  Get all clients

export const getAllClients = () => {
    return db.collection('clients').get()
    .then(client => {
        return client.docs.map(item => {
            return item.data()
        })
    })
    .catch(err => {
        return err.message
    }) 
}