import { Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class BasePublisher<T extends Event> {
  abstract subject: T['subject'];
  protected client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  async publish(data: T['data']): Promise<void> {
    try {
      await new Promise<void>((resolve, reject) => {
        this.client.publish(this.subject, JSON.stringify(data), (err) => {
          if (err) {
            return reject(err);
          }

          console.log('Event Published to subject', this.subject);
          console.log('Event Data: ', this.subject, data);

          resolve();
        });
      });
    } catch (err) {
      console.log('Error publishing message: ', err);
    }
  }
}
