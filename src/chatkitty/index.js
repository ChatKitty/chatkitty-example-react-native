import ChatKitty from 'chatkitty';

export const kitty = ChatKitty.getInstance(
  '19b458d0-2b50-491c-8f13-65ec12f3978e'
);

export function getChannelDisplayName(channel) {
  if (channel.type === 'DIRECT') {
    return channel.members.map((member) => member.displayName).join(', ');
  } else {
    return channel.name;
  }
}
