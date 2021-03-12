import db, {firebase} from '../db/firebase'

//  Create contract

export const createContract = (id, projectName, client,  startedAt, deadLine, contractNumber, serviceName, price, amount ) => {
    return db.collection('contracts').doc(id).set({
        id,
        projectName,
        client,
        startedAt, 
        deadLine,
        contractNumber,
        serviceName,
        status: false,
        price,
        total: [
            {
                amount,
                time: new Date().toDateString()
            }
        ],
        debt: price - amount
    }).then(() => {
        return{status: true}
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

export const updateContract = (
    id, 
    projectName, 
    client,  
    startedAt, 
    deadLine, 
    contractNumber, 
    serviceName, 
    price, 
    amount, 
    status
    ) => {
        console.log();
    return db.collection('contracts').doc(id).update({
        projectName,
        client,
        startedAt, 
        deadLine,
        contractNumber,
        serviceName,
        price,
        status,
        total: firebase.firestore.FieldValue.arrayUnion({
            amount,
            time: new Date().toDateString()
        }),
        debt: firebase.firestore.FieldValue.increment(parseInt(`-${amount}`))
    }).then(() => {
        return{status: true}
    })
    .catch(err => {
        return err.message
    }) 
}

//  delete contract

export const deleteContract = (id) => {
    return db.collection('contracts').doc(id).delete()
    .then(() => {
        return {status: true}
    })
    .catch(err => {
        return err.message
    }) 
}

//  Get all contracts

export const getAllContracts = (id) => {
    return db.collection('contracts').get()
    .then(contract => {
        return contract.docs.map(item => {
            return item.data()
        })
    })
    .catch(err => {
        return err.message
    }) 
}