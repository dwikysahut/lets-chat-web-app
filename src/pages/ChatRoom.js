import React, { Component } from 'react'
import { Button } from 'reactstrap'
import firebase from '../config/firebase'

class ChatRoom extends Component {
    constructor(props){
        super(props)
        this.state = {
        receiver:'',
        text: '',
        dataChat: [],
        email:''

    }
        this.chat = React.createRef();
    }
    componentDidMount=()=>{
        console.log(this.props)
        this.setState({receiver:this.props.user})
        this.getUser();
        this.loadMessage();
        // console.log(this.props.user)
       
//  console.log(this.state.dataChat)
    }

    shouldComponentUpdate(){
        return true;
    }
    getUser=()=>{
        firebase.database().ref(`users/${this.props.user}`).on('value',value=>{
            this.setState({email:value.val().email})
        })
    }
    loadMessage=()=>{
        firebase.database().ref(`/messages/${this.props.currentUser.uid}/${this.props.user}`).on('value',value=>{
            const data = value.val()
            const chat = []
            for(let keys in data){
              const a = {
                from: data[keys].from,
                message: data[keys].message,
                to: data[keys].to,
                id: keys
              }
              chat.push(a)
            }
            this.setState({dataChat: chat.reverse()},()=>{
              this.chat.current.scrollTop = this.chat.current.scrollHeight
              console.log('logged?')
            })
            
        })
    }
    componentDidUpdate=(prevProps)=>{
        // console.log('sss')
        if(prevProps.user!==this.props.user){
            this.setState({receiver:this.props.user})
            this.loadMessage()
            this.getUser()
        }
    }
    onChangeInput = (e) => {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value })
        if (e.keyCode === 13&&e.target.value) {
            console.log(e.keyCode)
            this.setState({
                dataChat: [...[
                {
                    // id: '123',
                    from: this.props.currentUser.uid,
                    message: this.state.text,
                    createdAt: new Date().getTime(),
                    to:this.props.user

                }],...this.state.dataChat
                ],
           message:'' },()=>{
                firebase.database().ref(`/messages/${this.props.currentUser.uid}/${this.props.user}/${new Date().getTime()}`).set({
                    from:this.props.currentUser.uid,
                    message:this.state.text,
                    to:this.props.user
                })
                firebase.database().ref(`/messages/${this.props.user}/${this.props.currentUser.uid}/${new Date().getTime()}`).set({
                    from:this.props.currentUser.uid,
                    message:this.state.text,
                    to:this.props.user
                })
            })
            e.target.value = '';

        }


    }
    sendMessage = (e) => {
        const { dataChat, text } = this.state
        e.preventDefault()

        this.setState({
            dataChat: [...dataChat,
            {
                id: '123',
                sender: 'Lisa',
                message: text,
                createdAt: new Date().getTime()

            }
            ]
        })


    }
    render() {
        const { text, dataChat } = this.state;
        return (
            <>
                <div className='info-chat'>
                    <div className='avatar' />
                    <div className='name'>{this.state.email}
                    </div>
                </div>
                <div className='chat-content'ref={this.chat}>
                <div>
                    <div className='h-100 d-flex flex-column-reverse'>
                   
                        {dataChat.map((dataMessage) => (
                            
                            dataMessage?
                           
                            <div className={`${dataMessage.from === this.props.currentUser.uid ? 'chat-balloon sender text-right' : 'chat-balloon'}`}>
                                <div className={`${dataMessage.from === this.props.currentUser.uid ? 'chat-message sender' : 'chat-message'}`}> {dataMessage.message}</div>
                            </div>:
                            <></>
                            
                        )

                        )}
                    </div>
                </div>
                </div>
                <div className='chat-input'>
                    <input type='text' name='text' defaultValue={text} onKeyUp={this.onChangeInput} />
                    <Button onClick={this.sendMessage}>Send</Button>
                </div>
        </>
        )
    }
}
export default ChatRoom;