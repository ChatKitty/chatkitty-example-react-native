import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {List, Divider} from 'react-native-paper';
import {kitty} from '../chatkitty';
import Loading from '../components/Loading';
import {useIsFocused} from "@react-navigation/native";

export default function BrowseChannelsScreen({navigation}) {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    kitty.getJoinableChannels()
    .then(result => {
      setChannels(result.paginator.items)

      if (loading) {
        setLoading(false)
      }
    })
  }, [isFocused])

  if (loading) {
    return <Loading/>;
  }

  async function handleJoinChannel(channel) {
    const result = await kitty.joinChannel({channel: channel})

    navigation.navigate('Channel', {channel: result.channel})
  }

  return (
      <View style={styles.container}>
        <FlatList
            data={channels}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => <Divider/>}
            renderItem={({item}) => (
                <List.Item
                    title={item.name}
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
    flex: 1
  },
  listTitle: {
    fontSize: 22
  },
  listDescription: {
    fontSize: 16
  }
});
