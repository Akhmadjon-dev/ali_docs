import db from '../db/firebase'

//  Create client

export const createClient = (id,clientName,serviceName,start,end,price,req,debt) => {
    return db.collection('clients').doc(id).set({
        id,
        clientName,
        serviceName,
        start,
        end,
        price,
        req,
        debt
    }).then(() => {
        return{msg: 'Added client ' + id}
    })
    .catch(err => {
        return err.message
    }) 
}

//  read client

export const getclient = (id) => {
    return db.collection('clients').doc(id).get()
    .then(client => {
        return client.data()
    })
    .catch(err => {
        return err.message
    }) 
}

//  update client

export const updateclient = (id,clientName,serviceName,start,end,price,req,debt) => {
    return db.collection('clients').doc(id).update({
        clientName,
        serviceName,
        start,
        end,
        price,
        req,
        debt
    }).then(() => {
        return {msg: 'Updated client ' + id}
    })
    .catch(err => {
        return err.message
    }) 
}

//  delete client

export const deleteclient = (id) => {
    return db.collection('clients').doc(id).delete()
    .then(() => {
        return {msg: 'Deleted client ' + id}
    })
    .catch(err => {
        return err.message
    }) 
}

//  Get all clients

export const getAllclient = (id) => {
    return db.collection('clients').get()
    .then(client => {
        return client.docs
    })
    .catch(err => {
        return err.message
    }) 
}