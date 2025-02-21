import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  get client(): Stan {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }

    return this._client;
  }

  async connect(
    clusterId: string,
    clientId: string,
    url: string
  ): Promise<void> {
    this._client = nats.connect(clusterId, clientId, { url, verbose: true });
    try {
      await new Promise<void>((resolve, reject) => {
        this.client.on('connect', () => {
          console.log('Connected To NATS Streaming Server (Natswrapper)');
          resolve();
        });
        this.client.on('error', (error) => {
          console.log('Error connecting to NATS (Natswrapper Reject): ', error);
          reject(error);
        });
      });
    } catch (err) {
      console.log('Error connecting to NATS (Natswrapper Catch): ', err);
    }
  }
}

const natsWrapper = new NatsWrapper();
export default natsWrapper;
