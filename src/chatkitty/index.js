import ChatKitty from 'chatkitty';

export const kitty = ChatKitty.getInstance(
  '73ddf9ec-d560-4c15-9302-7c2c162fb309'
);

export function getChannelDisplayName(channel) {
  if (channel.type === 'DIRECT') {
    return channel.members.map((member) => member.displayName).join(', ');
  } else {
    return channel.name;
  }
}
