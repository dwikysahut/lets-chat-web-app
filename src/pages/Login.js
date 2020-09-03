 import React, {useState, useEffect} from 'react';

import { Form, FormGroup, Input, Label, Button ,ModalBody,Modal,ModalFooter,ModalHeader,Spinner} from 'reactstrap'
import { Link } from 'react-router-dom'
import firebase from '../config/firebase'

const  Login =({history})=> {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [disableButton,setDisableButton] = useState(true);
    const [showModal,setShowModal] = useState(false);
    const [isLoading,setLoading] = useState(false);




    // state={
    //     email:'',
    //     password:'',
    // }
   const login= async(e)=>{
       setLoading(true)
       setTimeout(
        function() {
          setLoading(false)
        }
        .bind(this),
        1000
    );
       e.preventDefault();
       try {
           const res=await firebase.auth().signInWithEmailAndPassword(email,password)
           console.log(res)
       } catch (error) {
           setShowModal(true)

           
       }
    //    history.push('/chatlist')
    }
   const onHandleChangeEmail=(e)=>{
       setEmail(e.target.value)


}
const onHandleChangePassword=(e)=>{
    setPassword(e.target.value)


}
// useEffect(()=>{
//     if(email==='' && password===''){
   
//         setDisableButton(true);
    
//     }
// },[email,password])
useEffect(()=>{
    firebase.auth().onAuthStateChanged(e=>{
        console.log(e)
        if(e)
        history.push('/Chatlist')
        else
        history.push('/login')

    })
},[])
const formHandle=()=>{
// const {email,password} = this.state
if(email!=='' && password!==''){
   
       setDisableButton(false);
   
    }
    else{
        setDisableButton(true);

    }
}
        return (
            <>
            <div className="d-flex justify-content-center align-items-center h-100">
              
                <Form onSubmit={login} className='form-login'>
                <h2 className='text-center'>Login</h2>
                    <FormGroup>
                       
                        <Label for='email'>Email</Label>
                        <Input id='email' type='email' name='email'  onChange={onHandleChangeEmail} onKeyUp={formHandle}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input id='password' type='password' name='password'   onChange={onHandleChangePassword} onKeyUp={formHandle}/>
                    </FormGroup>
                    {isLoading?
                     <Spinner className='spinner' animation="border" role="status">
                     <span className="sr-only">Loading...</span>
                   </Spinner>
                   :
                  
                   
                    <Button disabled={disableButton} color='primary' block>Login</Button>
                }
                    <div className='mt-3'>
                        <span>Don't Have Account ? Register <Link to='Register'> Here</Link></span>
                    </div>
                </Form>
                {/* Login */}
            </div>
            <Modal isOpen={showModal}>
        <ModalHeader>Login failed</ModalHeader>
        <ModalBody>
       Incorrect Username or Password
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>setShowModal(false)}>Okay</Button>{' '}
        </ModalFooter>
      </Modal>
            </>
        )
    }

export default Login;