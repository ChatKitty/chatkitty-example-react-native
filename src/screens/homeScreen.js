import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Dialog, Divider, List, Portal } from 'react-native-paper';

import { chatkitty, channelDisplayName } from '../chatkitty';
import Loading from '../components/loading';

export default function HomeScreen({ navigation }) {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leaveChannel, setLeaveChannel] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    let isCancelled = false;

    chatkitty.listChannels({ filter: { joined: true } }).then((result) => {
      if (!isCancelled) {
        setChannels(result.paginator.items);

        if (loading) {
          setLoading(false);
        }
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [isFocused, loading]);

  if (loading) {
    return <Loading />;
  }

  function handleLeaveChannel() {
    chatkitty.leaveChannel({ channel: leaveChannel }).then(() => {
      setLeaveChannel(null);

      chatkitty.listChannels({ filter: { joined: true } }).then((result) => {
        setChannels(result.paginator.items);
      });
    });
  }

  function handleDismissLeaveChannel() {
    setLeaveChannel(null);
  }

  return (
      <View style={styles.container}>
        <FlatList
            data={channels}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => (
                <List.Item
                    title={channelDisplayName(item)}
                    description={item.type}
                    titleNumberOfLines={1}
                    titleStyle={styles.listTitle}
                    descriptionStyle={styles.listDescription}
                    descriptionNumberOfLines={1}
                    onPress={() => navigation.navigate('Chat', { channel: item })}
                    onLongPress={() => {
                      setLeaveChannel(item);
                    }}
                />
            )}
        />
        <Portal>
          <Dialog visible={leaveChannel} onDismiss={handleDismissLeaveChannel}>
            <Dialog.Title>Leave channel?</Dialog.Title>
            <Dialog.Actions>
              <Button onPress={handleDismissLeaveChannel}>Cancel</Button>
              <Button onPress={handleLeaveChannel}>Confirm</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1
  },
  listTitle: {
    fontSize: 22
  },
  listDescription: {
    fontSize: 16
  }
});
