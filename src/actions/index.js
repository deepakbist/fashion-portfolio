import {db,storage} from '../firebase';

export const UPDATE_PORTFOLIO = 'UPDATE_PORTFOLIO';
export const ADD_PORTFOLIO = 'ADD_PORTFOLIO';
export const ADD_IMAGE = 'ADD_IMAGE';
export const UPDATE_IMAGES = 'UPDATE_IMAGES';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const UPDATE_CURRENT = 'UPDATE_CURRENT';
export const EMPTY_LIST = 'EMPTY_LIST';

export function updatePortfolio(payload){
    return{
        type: UPDATE_PORTFOLIO,
        payload
    }
}

export function addPortfolio(payload){
    return{
        type: ADD_PORTFOLIO,
        payload
    }
}



export function uploadImage(file,ref){
    return (dispatch)=>{
        let storageRef = storage.ref().child(ref);
        storageRef.put(file).then(function(snapshot) {
            storageRef.getDownloadURL().then(function(url){
                dispatch(addImage({url,ref}))
            }).catch(function(err){
                console.error("error in downloading url",err);
            })
        });
    }
}

export function deleteImage(file){
    return (dispatch)=>{
        let storageRef = storage.ref().child(file.ref);
        storageRef.delete().then(function() {
            dispatch(removeImage(file))
          }).catch(function(error) {
              console.error("error in deleting file",error);
          });
    }
    
}

export function removeImage(payload){
    return {
        type: REMOVE_IMAGE,
        payload
    }
}

export function addImage(payload){
    return{
        type: ADD_IMAGE,
        payload: payload
    }
}

export function updateCurrent(payload){
    return{
        type: UPDATE_CURRENT,
        payload
    }
}

export function addPortfolioToDB(payload){
    return (dispatch,getState)=>{
        db.collection('Users').add(payload).then(function(docRef) {
            dispatch(addPortfolio({id:docRef.id,data:payload}));
            payload.id = docRef.id;
            dispatch(updateCurrent(payload));
        }).catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
}

export function updatePortfolioDB(payload){
    return (dispatch)=>{
        db.collection('Users').doc(payload.id).update(payload).then(function(){
            dispatch(addPortfolio({id:payload.id,data:payload}));
            dispatch(updateCurrent(payload));
        }).catch(function(err){
            console.log("error");
        })
    }
}

export function emptyList(){
    return{
        type: EMPTY_LIST
    }
}

export function loadPortfolios(){
    return (dispatch,getState)=>{
        dispatch(emptyList())
        db.collection('Users').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                let payload = {};
                payload.id = doc.id;
                payload.data = doc.data();
                payload.data.dob = payload.data.dob ? payload.data.dob.toDate() : '';
                payload.data.id = doc.id;
                dispatch(addPortfolio(payload));
            });
        });
          
    }
}