import db from '../db/firebase'

//  Create contract

export const createContract = (id,projectName,serviceName,client,contract,start,end,price,req,debt) => {
    return db.collection('contracts').doc(id).set({
        id,
        projectName,
        serviceName,
        client,
        contract,
        start,
        end,
        price,
        req,
        debt
    }).then(() => {
        return{msg: 'Added contract ' + id}
    })
    .catch(err => {
        return err.message
    }) 
}

//  read contract

export const getContract = (id) => {
    return db.collection('contracts').doc(id).get()
    .then(contract => {
        return contract.data()
    })
    .catch(err => {
        return err.message
    }) 
}

//  update contract

export const updateContract = (id,projectName,serviceName,client,contract,start,end,price,req,debt) => {
    return db.collection('contracts').doc(id).update({
        projectName,
        serviceName,
        client,
        contract,
        start,
        end,
        price,
        req,
        debt
    }).then(() => {
        return{msg: 'Updated contract ' + id}
    })
    .catch(err => {
        return err.message
    }) 
}

//  delete contract

export const deleteContract = (id) => {
    return db.collection('contracts').doc(id).delete()
    .then(() => {
        return {msg: 'Deleted contract ' + id}
    })
    .catch(err => {
        return err.message
    }) 
}

//  Get all contracts

export const getAllContract = (id) => {
    return db.collection('contracts').get()
    .then(contract => {
        return contract.docs
    })
    .catch(err => {
        return err.message
    }) 
}