import React, { Component } from 'react'
import { Form, FormGroup, Input, Label, Button , Modal, ModalHeader, ModalBody, ModalFooter ,Spinner} from 'reactstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import firebase from '../config/firebase'
class Register extends Component {
    state={
        email:'',
        password:'',
        confirmation_password:'',
        isFalse:false,
        isShowModal:false,
        disableButton:true,
        isLoading:false,
        successModal:false,

    }
    register=async(e)=>{
        e.preventDefault();

        const {email,password,confirmation_password}= this.state

        if(confirmation_password===''){
            this.setState({isFalse:true});
            console.log('sssss')
            return false;
        }


        try {
            this.setState({isLoading:true,disableButton:true})
        const result = await firebase.auth().createUserWithEmailAndPassword(email,password)
        firebase.database().ref(`users/${result.user.uid}`).set({
            uid:result.user.uid,
            email:result.user.email
        })
        this.setState({isLoading:false,disableButton:false,successModal:true,email:'',password:'',confirmation_password:''})

            console.log(result)
        } catch (error) {
            if(error.code==='auth/email-already-in-use'){
                this.setState({isShowModal:true})
            }
        }
        this.setState({isLoading:false,disableButton:false})

    }
    onHandleChange=(e)=>{
                this.setState({[e.target.name]:e.target.value},()=>{
                    console.log(this.state.confirmation_password)
                })
      
       
    }
    formHandle=()=>{
        const {email,password,confirmation_password} = this.state
        if(email!=='' && password!=='' && confirmation_password!==''){
            if(password===confirmation_password){
                this.setState({disableButton:false},()=>{
                    console.log(this.state.confirmation_password)
                })
            }
            else{
                this.setState({disableButton:true})
            }
        }
    }
    render() {
        return (
            <>
            <div className="d-flex justify-content-center align-items-center h-100">  
                <Form onSubmit={this.register} className='form-login'>
                <h2 className='text-center'>Register</h2>
                    <FormGroup>
                        <Label for='email'>Email</Label>
                        <Input id='email' type='email' name='email' onChange={this.onHandleChange} onKeyUp={this.formHandle}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input id='password' type='password' name='password' onChange={this.onHandleChange} onKeyUp={this.formHandle}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Confirmation Password</Label>
                        <Input id='confirmation_password' type='password' name='confirmation_password' onChange={this.onHandleChange} onKeyUp={this.formHandle} />
                        {this.state.isFalse===true ?
                         <span className='span-confirmation'>fill this field</span>:<></>}
                        
                    </FormGroup>
                    {this.state.isLoading ?
                    <Spinner className='spinner' style={{ width: '3rem', height: '3rem' }} />: 
                    <Button disabled={this.state.disableButton} color='success' block>Register</Button>

                    }
                    <div className='mt-3'>
                        <span>Already Have Account ? Login <Link to='Login'> Here</Link></span>
                    </div>
                </Form>
                {/* Login */}
            </div>
            <Modal isOpen={this.state.isShowModal}>
        <ModalHeader>Register Failed</ModalHeader>
        <ModalBody>
        Email Already in use
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>{this.setState({isShowModal:false})}}>Okay</Button>{' '}
        </ModalFooter>
      </Modal>
      <Modal isOpen={this.state.successModal}>
        <ModalHeader>Register Succesfully</ModalHeader>
        <ModalBody>
        You can Login Now
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>{this.setState({successModal:false},()=>{this.props.history.push('/Login')})}}>Okay</Button>{' '}
        </ModalFooter>
      </Modal>
            </>
        )
    }
}
export default Register;