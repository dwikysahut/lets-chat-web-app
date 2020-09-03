import React, {useEffect,useState} from 'react'
import firebase from '../config/firebase'
const Home = ({history})=> {
    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                history.push('/chatlist')
            }
            else{
                history.push('/login')
            }
        })

    },[])
        return(
            <div>
                
            </div>
        )
    }

export default Home;