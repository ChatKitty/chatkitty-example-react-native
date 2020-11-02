import React, { useContext, useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { kitty } from '../chatkitty';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';

export default function ChannelScreen({ route }) {
  const { user } = useContext(AuthContext);

  const chatUser = mapUser(user);

  const { channel } = route.params;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  function mapUser(user) {
    return {
      _id: user.name,
      name: user.displayName,
      avatar: user.displayPictureUrl,
    };
  }

  function mapMessage(message) {
    return {
      _id: message.id,
      text: message.body,
      createdAt: new Date(message.createdTime),
      user: mapUser(message.user),
    };
  }

  useEffect(() => {
    let result = kitty.startChatSession({
      channel: channel,
      onReceivedMessage: (message) => {
        setMessages((currentMessages) =>
            GiftedChat.append(currentMessages, [mapMessage(message)])
        );
      },
    });

    kitty
    .getMessages({
      channel: channel,
    })
    .then((result) => {
      setMessages(result.paginator.items.map(mapMessage));

      setLoading(false);
    });

    return result.session.end;
  }, []);

  if (loading) {
    return <Loading />;
  }

  async function handleSend(messages) {
    await kitty.sendMessage({
      channel: channel,
      body: messages[0].text,
    });
  }

  return (
      <GiftedChat
          messages={messages}
          onSend={handleSend}
          user={chatUser}
      />
  );
}
