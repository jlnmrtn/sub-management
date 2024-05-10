import { PubSub } from '@aws-amplify/pubsub';

export const pubsub = new PubSub({
      region: 'us-east-1',
      endpoint:
         'wss://d09323755mkjiu3rpk1l-ats.iot.us-east-1.amazonaws.com/mqtt'
    });