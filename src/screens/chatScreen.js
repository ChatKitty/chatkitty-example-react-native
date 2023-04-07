import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Bubble, GiftedChat } from 'react-native-gifted-chat';
import { Text } from 'react-native-paper';

import { chatkitty } from '../chatkitty';
import Loading from '../components/loading';
import { AuthContext } from '../context/authProvider';
import { NotificationContext } from '../context/notificationProvider';

export default function ChatScreen({ route, navigation }) {
  const { user } = useContext(AuthContext);
  const { sendNotification } = useContext(NotificationContext);
  const { channel } = route.params;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadEarlier, setLoadEarlier] = useState(false);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const [messagePaginator, setMessagePaginator] = useState(null);
  const [typing, setTyping] = useState(null);

  useEffect(() => {
    const startChatSessionResult = chatkitty.startChatSession({
      channel: channel,
      onMessageReceived: (message) => {
        setMessages((currentMessages) =>
            GiftedChat.append(currentMessages, [mapMessage(message)])
        );
      },
      onTypingStarted: (typingUser) => {
        if (typingUser.id !== user.id) {
          setTyping(typingUser);
        }
      },
      onTypingStopped: (typingUser) => {
        if (typingUser.id !== user.id) {
          setTyping(null);
        }
      },
      onParticipantEnteredChat: (participant) => {
        sendNotification({
          title: `${participant.displayName} entered the chat`
        });
      },
      onParticipantLeftChat: (participant) => {
        sendNotification({
          title: `${participant.displayName} left the chat`
        });
      }
    });

    chatkitty
        .listMessages({
          channel: channel
        })
        .then((result) => {
          setMessages(result.paginator.items.map(mapMessage));

          setMessagePaginator(result.paginator);
          setLoadEarlier(result.paginator.hasNextPage);

          setLoading(false);
        });

    return startChatSessionResult.session.end;
  }, [user, channel]);

  async function handleSend(pendingMessages) {
    await chatkitty.sendMessage({
      channel: channel,
      body: pendingMessages[0].text
    });
  }

  async function handleLoadEarlier() {
    if (!messagePaginator.hasNextPage) {
      setLoadEarlier(false);

      return;
    }

    setIsLoadingEarlier(true);

    const nextPaginator = await messagePaginator.nextPage();

    setMessagePaginator(nextPaginator);

    setMessages((currentMessages) =>
        GiftedChat.prepend(currentMessages, nextPaginator.items.map(mapMessage))
    );

    setIsLoadingEarlier(false);
  }

  function handleInputTextChanged(text) {
    chatkitty.sendKeystrokes({
      channel: channel,
      keys: text
    });
  }

  function renderBubble(props) {
    return (
        <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: '#d3d3d3'
              }
            }}
        />
    );
  }

  function renderAvatar(props) {
    return (
        <Avatar
            {...props}
            onPressAvatar={(avatarUser) => {
              chatkitty
                  .createChannel({
                    type: 'DIRECT',
                    members: [{ id: avatarUser._id }]
                  })
                  .then((result) => {
                    navigation.navigate('Chat', { channel: result.channel });
                  });
            }}
        />
    );
  }

  function renderFooter() {
    if (typing) {
      return (
          <View style={styles.footer}>
            <Text>{typing.displayName} is typing</Text>
          </View>
      );
    }

    return null;
  }

  if (loading) {
    return <Loading />;
  }

  return (
      <GiftedChat
          messages={messages}
          onSend={handleSend}
          user={mapUser(user)}
          loadEarlier={loadEarlier}
          isLoadingEarlier={isLoadingEarlier}
          onLoadEarlier={handleLoadEarlier}
          onInputTextChanged={handleInputTextChanged}
          renderBubble={renderBubble}
          renderAvatar={renderAvatar}
          renderFooter={renderFooter}
      />
  );
}

function mapMessage(message) {
  return {
    _id: message.id,
    text: message.body,
    createdAt: new Date(message.createdTime),
    user: mapUser(message.user)
  };
}

function mapUser(user) {
  return {
    _id: user.id,
    name: user.displayName,
    avatar: user.displayPictureUrl
  };
}

const styles = StyleSheet.create({
  footer: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5
  }
});
