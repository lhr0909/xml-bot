export type UnknownEvent = { type: 'unknown' };

export type GreetEvent = {
  type: 'greet';
  welcome_code?: string;
  scene: string;
  scene_param?: string;
  external_userid?: string;
  openid?: string;
  sender?: string;
};

export type ByeEvent = {
  type: 'bye';
  msg_code: string;
};

export type BotEvent = UnknownEvent | GreetEvent | ByeEvent;

export interface BotContext {
  sender_id: string;
}
