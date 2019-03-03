import React, { Component } from 'react'
import MessageForm from './../forms/MessageForm';
import MessageList from './MessageList'
import TwilioChat from 'twilio-chat'
import {Button, Icon} from 'react-materialize';
import $ from 'jquery'
import './../../App.css'

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

      $.getJSON('/api/chat/token', (token) => {
        this.setState({ twilioId: token.identity })
        resolve(token)
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
                resolve(client);
            });
        })
        .catch(error => {
            console.error(error);
            reject(new Error(error));
        });
        
        
    })
  }

  joinChatChannel = () => {
    return new Promise((resolve, reject) => {
        this.state.client.getSubscribedChannels().then(() => {
            this.state.client.getChannelByUniqueName(this.props.channel.id)
            .then((channel) => {
                console.log(channel);
                this.addMessage({ body: `Joining ${this.props.channel.id} channel...` })
                let newClient = this.state.client;
                newClient.currentChannel = channel;
                this.setState({ 
                    channel: channel,
                    client: newClient
                })

                if(channel.state.status !== "joined") {  
                    channel.join().then(() => {
                        this.addMessage({ body: `Joined ${this.state.channel.state.friendlyName} channel as ${this.state.twilioId}` })
                        window.addEventListener('beforeunload', () => {
                            channel.leave();
                            this.deleteChatChannel(false)
                        });
                    }).catch((error) => {
                        console.error(error);
                        reject(Error('Could not join channel.'))
                    });
                } else {
                    this.addMessage({ body: `Joined ${channel.state.friendlyName} channel as ${this.state.twilioId}` });
                    
                }

                resolve(channel);
            }).catch((error) => {
                console.error('cannot find unique name');
                this.createChatChannel();
            });
        })
        .catch(error => {
            console.error('error getting subscribed channels');
            reject(new Error(error));
        })
        
    })
  }

  createChatChannel = () => {
      console.log(`Creating ${this.props.channel.id} channel...`);
    return new Promise((resolve, reject) => {
      this.addMessage({ body: `Creating ${this.props.channel.id} channel...` })
      this.state.client
        .createChannel({ uniqueName: this.props.channel.id, friendlyName: this.props.channel.name })
        .then((channel) => {
            this.joinChatChannel(this.state.client);
        })
        .catch((error) => {
            console.error(error);
            reject(new Error(`Could not create ${this.props.channelId} channel.`))
        });
    })
  }

  deleteChatChannel = (prompt) => {
    let deletePosting = true;
    if(prompt) {
        deletePosting = window.confirm('Delete chat channel and posting?');
    }

    if(!deletePosting) return;
    this.state.channel.leave();
    this.state.client.currentChannel.delete()
    .then(channel => {
        this.setState({channel: null}, () => {
            
            this.props.leavePostingChat();
        });
    })
    .catch((error) => {
        console.error(error);
        return Error('Could not delete channel')
    });
  }

  leaveChatChannel = () => {
    if(this.state.twilioId === this.state.channel.state.createdBy) {
        this.deleteChatChannel(true);
    } else {
        this.state.channel.leave();
        this.props.leavePostingChat();
    }
  }

  addMessage = (message) => {
    const messageData = { ...message, me: message.author === this.state.twilioId }
    this.setState({
      messages: [...this.state.messages, messageData],
    })
  }

  handleNewMessage = (text) => {
    if (this.state.channel) {
      this.state.channel.sendMessage(text)
    }
  }

  configureChannelEvents = (channel) => {
    channel.on('messageAdded', ({ author, body }) => {
      this.addMessage({ author, body })
    })

    channel.on('memberJoined', (member) => {
      this.addMessage({ body: `${member.identity} has joined the channel.` })
    })

    channel.on('memberLeft', (member) => {
      this.addMessage({ body: `${member.identity} has left the channel.` })
    })
  }

  render() {
    return (
      <div  className="chat-container">
        <div className="flex-row" onClick={this.leaveChatChannel}>
            <Button className="left"><Icon>arrow_left</Icon>Back</Button>
        </div>
        <MessageList messages={this.state.messages} />
        <MessageForm onMessageSend={this.handleNewMessage} />
      </div>
    )
  }
}

export default ChatContainer;