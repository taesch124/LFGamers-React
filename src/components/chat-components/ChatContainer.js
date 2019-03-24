import React, { Component } from 'react'
import MessageForm from './../forms/MessageForm';
import MessageList from './MessageList'
import TwilioChat from 'twilio-chat'
import {Button, Icon} from 'react-materialize';
import $ from 'jquery'
import './../../App.css';
import './styles/ChatContainer.css'
import CircleLoader from '../loaders/CircleLoader';

class ChatContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      twilioId: null,
      channel: null,
      client: null,
    }
  }

  componentDidMount = () => {
    this.getToken()
      .then(this.createChatClient)
      .then(this.joinChatChannel)
      .then(this.configureChannelEvents)
      .catch((error) => {
        this.addMessage({ body: `Error: ${error.message}` })
      })
  }

  getToken = () => {
    return new Promise((resolve, reject) => {
      this.addMessage({ body: 'Connecting...' })

      $.getJSON(`/api/chat/token/${typeof this.props.selectedPosting.platform === 'object' ? this.props.selectedPosting.platform._id : this.props.selectedPosting.platform}`, (token) => {
        this.setState({ twilioId: token.identity }, 
        () => {
            resolve(token);
        });
        
      }).fail(() => {
        reject(Error('Failed to connect.'))
      })
    })
  }

  createChatClient = (token) => {
    return new Promise((resolve, reject) => {
        TwilioChat.create(token.jwt)
        .then(client => {
            this.setState({
                client: client
            }, () => {
                this.state.client.on('tokenExpired', this.getToken);
                resolve(client);
            });
        })
        .catch(error => {
            reject(new Error(error));
        });
        
        
    })
  }

  joinChatChannel = (client) => {
    return new Promise((resolve, reject) => {
            client.getChannelByUniqueName(this.props.chatChannel.id)
            .then((channel) => {
                this.addMessage({ body: `Joining ${this.props.chatChannel.id} channel...` })
                this.setState({ 
                    channel: channel
                });

                if(channel.state.status !== "joined") {  
                    channel.join().then(() => {
                        this.addMessage({ body: `Joined ${this.state.channel.state.friendlyName} channel as ${this.state.twilioId}` })
                        window.addEventListener('beforeunload', () => {
                            channel.leave();
                        });
                    }).catch((error) => {
                        reject(Error('Could not join channel.'))
                    });
                } else {
                    this.addMessage({ body: `Joined ${channel.state.friendlyName} channel as ${this.state.twilioId}` });
                    
                }

                resolve(channel);
            }).catch((error) => {
                this.createChatChannel(client);
            });
    });
  }

  createChatChannel = (client) => {
    return new Promise((resolve, reject) => {
        this.addMessage({ body: `Creating ${this.props.chatChannel.id} channel...` })
        client
        .createChannel({ uniqueName: this.props.chatChannel.id, friendlyName: this.props.chatChannel.name })
        .then((channel) => {
            this.joinChatChannel(client)
            .then(this.configureChannelEvents);
        })
        .catch((error) => {
            reject(new Error(`Could not create ${this.props.chatChannelId} channel.`))
        });
    })
  }

  deleteChatChannel = (prompt) => {
    let deletePosting = true;
    if(prompt) {
        deletePosting = window.confirm('As leader, do you want to delete chat channel and posting?');
    }

    if(!deletePosting) return;
    this.state.channel.leave();
    this.state.channel.delete()
    .then(channel => {
        this.setState({channel: null}, () => {
            
            this.props.leavePostingChat(true);
        });
    })
    .catch((error) => {
        return Error('Could not delete channel')
    });
  }

  leaveChatChannel = () => {
    if(this.state.twilioId === this.state.channel.state.createdBy) {
        this.deleteChatChannel(true);
    } else {
        this.state.channel.leave();
        this.props.leavePostingChat(false);
    }
  }

  addMessage = (message) => {
    const messageData = { ...message, me: message.author === this.state.twilioId }
    this.setState({
      messages: [...this.state.messages, messageData],
    });
  }

  handleNewMessage = (text) => {
    if (this.state.channel) {
        this.state.channel.sendMessage(text);
    }
  }

  configureChannelEvents = (channel) => {
    channel.on('messageAdded', ({ author, body }) => {
      console.log(author);
        this.addMessage({ author, body })
    })

    channel.on('memberJoined', (member) => {
      this.addMessage({ body: `${member.identity} has joined the channel.` })
    })

    channel.on('memberLeft', (member) => {
        this.addMessage({ body: `${member.identity} has left the channel.` })
        if(channel.members.size === 0) {
            this.deleteChatChannel(false);
        }
    })
  }

  render() {
    return (
        this.state.channel ?
            <div  className="chat-container">
                <div className="flex-row justify-left" onClick={this.leaveChatChannel}>
                    <Button className="btn-flat leave-posting-chat" waves='light'><Icon>arrow_left</Icon>Back</Button>
                </div>
                
                <div className="chat-title">
                    <h5>{this.state.channel.friendlyName}</h5>
                </div>
                <MessageList messages={this.state.messages} />
                <MessageForm onMessageSend={this.handleNewMessage} />
            </div> :
        <CircleLoader />
    )
  }
}

export default ChatContainer;