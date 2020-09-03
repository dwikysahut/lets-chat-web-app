import React, { Component } from 'react'
import { Row, Col, Container, Button ,Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
import ChatRoom from './ChatRoom'
import { FaUser, FaPowerOff } from 'react-icons/fa'
import UserList from '../components/UserList'

import firebase from '../config/firebase'
class ChatList extends Component {
    state={
        isShowModal:false,
        email:'',
        friendData:[],
        focus: null,
    }
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(data => {
            if (!data) {
                this.props.history.push('/login')
            }else{
                const email=firebase.auth().currentUser.email
                const currentUid=firebase.auth().currentUser.uid
               this.setState({email:email})
               this.setState({uid:currentUid})
              
               firebase.database().ref('/users').on('value',dataUser=>{
                const user = Object.values(dataUser.val());
                let arrayFriend=user.filter(friend=>
                    friend.uid !== currentUid
                );
                console.log(user)
                console.log(dataUser.val())
                   this.setState({friendData:arrayFriend})
               })
            }
        })
    }
    logout = () => {
        this.setState({isShowModal:true});
       
    }
    render() {
        return (
            <>
            <div className='h-100 parent-chat'>

                <div className='accent-chat' />
                <Container className='container-chat h-100'>
                    <Row className='component-chat no-gutters'>
                        <Col md={4} className='chat-scroll'>
                            <div className='title'>
                                <div className='avatar'>
                                    <FaUser /> 
                                </div>
                                <span className='user'>{this.state.email}</span>
                                <Button className='logout'>
                                    <FaPowerOff  onClick={this.logout} />
                                </Button>


                            </div>
                            <div className='chat-list'>
                                {this.state.friendData.map((data) =>
                                // console.log(data)
                                    // <div className='chat-item'>
                                    //     <div className='chat-avatar' />
                                    //     <div className='chat-name'>
                                    //         <span>{data.name}</span>
                                    //     </div>
                                    // </div>
                    <UserList key={data.uid} focus={data.uid===this.state.focus} onClick={()=>this.setState({focus: data.uid})} email={data.email} />

                                )}
                            </div>
                        </Col>
                        <Col md={8} className='chat-room'>                          
                            {this.state.focus!==null?(
                  <ChatRoom user={this.state.focus} currentUser={{email: this.state.email, uid: this.state.uid}}/>
                ): 
                <div className="not-selected">
                  Select a user
                </div>

                }
                        </Col>
                    </Row>

                </Container>


            </div>
            <Modal isOpen={this.state.isShowModal}>
        <ModalHeader>Confirmation</ModalHeader>
        <ModalBody>
       Are You Sure to logout?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>{ firebase.auth().signOut().then(() => {
            // console.log('logout succesfully')
            this.props.history.push('/login')
        })}}>Okay</Button>{' '}
        <Button color="dark" onClick={()=>{ 
            // console.log('logout succesfully')
           this.setState({isShowModal:false})
        }}>cancel</Button>{' '}
        </ModalFooter>
      </Modal>
            </>
        )
    }
}
export default ChatList;