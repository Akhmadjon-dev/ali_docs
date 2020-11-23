import db from '../../db/firebase'

//  Create client

export const createclient = (id,projectName,serviceName,client,start,end,price,req,debt) => {
    db.collection('clients').doc(id).set({
        id,
        projectName,
        serviceName,
        client,
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
    db.collection('clients').doc(id).get()
    .then(client => {
        return client.data()
    })
    .catch(err => {
        return err.message
    }) 
}

//  update client

export const updateclient = (id,projectName,serviceName,client,start,end,price,req,debt) => {
    db.collection('clients').doc(id).update({
        projectName,
        serviceName,
        client,
        start,
        end,
        price,
        req,
        debt
    }).then(() => {
        return{msg: 'Updated client ' + id}
    })
    .catch(err => {
        return err.message
    }) 
}

//  delete client

export const deleteclient = (id) => {
    db.collection('clients').doc(id).delete()
    .then(() => {
        return {msg: 'Deleted client ' + id}
    })
    .catch(err => {
        return err.message
    }) 
}

//  Get all clients

export const getAllclient = (id) => {
    db.collection('clients').get()
    .then(client => {
        return client.docs
    })
    .catch(err => {
        return err.message
    }) 
}