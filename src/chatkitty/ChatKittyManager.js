import ChatKitty from 'chatkitty';
import {default as configuration} from './configuration.json';

class ChatKittyService {
  static _instance;

  static get Instance() {
    return this._instance || (this._instance = new ChatKitty(configuration));
  }
}

export const kitty = ChatKittyService.Instance;
