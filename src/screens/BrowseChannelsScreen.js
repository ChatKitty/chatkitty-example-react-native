import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Divider, List } from 'react-native-paper';

import { getChannelDisplayName, kitty } from '../chatkitty';
import Loading from '../components/Loading';

export default function BrowseChannelsScreen({ navigation }) {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    kitty.getChannels({ joinable: true }).then((result) => {
      setChannels(result.paginator.items);

      if (loading) {
        setLoading(false);
      }
    });
  }, [isFocused, loading]);

  async function handleJoinChannel(channel) {
    const result = await kitty.joinChannel({ channel: channel });

    navigation.navigate('Chat', { channel: result.channel });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={channels}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <List.Item
            title={getChannelDisplayName(item)}
            description={item.type}
            titleNumberOfLines={1}
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDescription}
            descriptionNumberOfLines={1}
            onPress={() => handleJoinChannel(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
});
