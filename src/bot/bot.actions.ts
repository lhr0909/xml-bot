import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Subject } from 'rxjs';
import { assign } from 'xstate';

import { BotContext, BotEvent } from './bot.interface';
import { OutgoingMessage } from './models';

@Injectable()
export class BotActions {
  constructor(private readonly config: ConfigService) {}

  utterIntroduction(
    dispatcher: Subject<OutgoingMessage>,
    context: BotContext,
    event: BotEvent,
  ): void {
    return dispatcher.next({
      text: 'Hi! 我是西门良。请给我留言，我会尽快回复你的。',
    });
  }

  utterGoodbye(
    dispatcher: Subject<OutgoingMessage>,
    context: BotContext,
    event: BotEvent,
  ): void {
    return dispatcher.next({
      text: '如果您有任何疑问，可以回复任意消息重新激活。',
    });
  }

  utterAskRephrase(
    dispatcher: Subject<OutgoingMessage>,
    context: BotContext,
    event: BotEvent,
  ): void {
    return dispatcher.next({
      text: '目前机器人暂时无法回答该问题，现在将会话直接转接。后续我会把对话记录添加到机器人中，扩充机器人的能力。',
    });
  }

  utterConnectAgent(
    dispatcher: Subject<OutgoingMessage>,
    context: BotContext,
    event: BotEvent,
  ): void {
    return dispatcher.next({
      text: '正在为您转接，请稍候',
    });
  }

  switchToAgent(
    dispatcher: Subject<OutgoingMessage>,
    context: BotContext,
    event: BotEvent,
  ): void {
    return dispatcher.next({
      custom: {
        service_state: 3,
        servicer_userid: this.config.get<string>('bot.servicerUserId'),
      },
    });
  }

  async listen(
    dispatcher: Subject<OutgoingMessage>,
    context: BotContext,
    event: BotEvent,
  ): Promise<void> {
    return dispatcher.complete();
  }

  public getActions(dispatcher: Subject<OutgoingMessage>) {
    return {
      utter_introduction: this.utterIntroduction.bind(this, dispatcher),
      utter_goodbye: this.utterGoodbye.bind(this, dispatcher),
      utter_ask_rephrase: this.utterAskRephrase.bind(this, dispatcher),
      utter_connect_agent: this.utterConnectAgent.bind(this, dispatcher),
      action_switch_to_agent: this.switchToAgent.bind(this, dispatcher),
      action_listen: this.listen.bind(this, dispatcher),
      assign_sender: assign((context, event) => ({
        sender: (event as any).sender,
      })),
    };
  }
}
