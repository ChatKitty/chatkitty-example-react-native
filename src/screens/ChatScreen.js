import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Bubble, GiftedChat } from 'react-native-gifted-chat';

import { kitty } from '../chatkitty';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';

export default function ChatScreen({ route, navigation }) {
  const { user } = useContext(AuthContext);
  const { channel } = route.params;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadEarlier, setLoadEarlier] = useState(false);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const [messagePaginator, setMessagePaginator] = useState(null);
  const [typing, setTyping] = useState(null);

  useEffect(() => {
    let startChatSessionResult = kitty.startChatSession({
      channel: channel,
      onReceivedMessage: (message) => {
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
    });

    kitty
      .getMessages({
        channel: channel,
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
    await kitty.sendMessage({
      channel: channel,
      body: pendingMessages[0].text,
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

  async function handleInputTextChanged(text) {
    await kitty.sendKeystrokes({
      channel: channel,
      keys: text,
    });
  }

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#d3d3d3',
          },
        }}
      />
    );
  }

  function renderAvatar(props) {
    return (
      <Avatar
        {...props}
        onPressAvatar={(clickedUser) => {
          kitty
            .createChannel({
              type: 'DIRECT',
              members: [{ id: clickedUser._id }],
            })
            .then((result) => {
              navigation.navigate('Chat', { channel: result.channel });
            });
        }}
      />
    );
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
      isTyping={typing != null}
      renderBubble={renderBubble}
      renderAvatar={renderAvatar}
    />
  );
}

function mapMessage(message) {
  return {
    _id: message.id,
    text: message.body,
    createdAt: new Date(message.createdTime),
    user: mapUser(message.user),
  };
}

function mapUser(user) {
  return {
    _id: user.id,
    name: user.displayName,
    avatar: user.displayPictureUrl,
  };
}
