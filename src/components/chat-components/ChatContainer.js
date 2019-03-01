import React, { Component } from 'react'
import MessageForm from './../forms/MessageForm';
import MessageList from './MessageList'
import TwilioChat from 'twilio-chat'
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
      .then(this.joinGeneralChannel)
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
        .catch(error => console.error(error));
        
        
    })
  }

  joinGeneralChannel = () => {
    return new Promise((resolve, reject) => {
        console.log(`Joining channel ${this.props.channelId}`)
        console.log(this.state.client);
        this.state.client.getChannelByUniqueName(this.props.channelId)
        .then((channel) => {
            console.log(`Joining ${this.props.channelId} channel...`);
          this.addMessage({ body: `Joining ${this.props.channelId} channel...` })
          this.setState({ channel })

          channel.join().then(() => {
            this.addMessage({ body: `Joined general channel as ${this.state.twilioId}` })
            window.addEventListener('beforeunload', () => channel.leave())
          }).catch(() => reject(Error('Could not join general channel.')))

          resolve(channel)
        }).catch((error) => {
            console.error(error);
            this.createGeneralChannel();
        })
    })
  }

  createGeneralChannel = () => {
      console.log(`Creating ${this.props.channelId} channel...`);
    return new Promise((resolve, reject) => {
      this.addMessage({ body: `Creating ${this.props.channelId} channel...` })
      this.state.client
        .createChannel({ uniqueName: this.props.channelId, friendlyName: 'Posting Chat' })
        .then(() => this.joinGeneralChannel(this.state.client))
        .catch((error) => {
            console.error(error);
            reject(Error(`Could not create ${this.props.channelId} channel.`))
        });
    })
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
      <div className="App">
        <MessageList messages={this.state.messages} />
        <MessageForm onMessageSend={this.handleNewMessage} />
      </div>
    )
  }
}

export default ChatContainer;