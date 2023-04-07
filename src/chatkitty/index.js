import ChatKitty from '@chatkitty/core';

export const chatkitty = ChatKitty.getInstance('eb8472e5-db71-48fa-a92a-633bbbd3fcf8');

export function channelDisplayName(channel) {
  if (channel.type === 'DIRECT') {
    return channel.members.map((member) => member.displayName).join(', ');
  } else {
    return channel.name;
  }
}
