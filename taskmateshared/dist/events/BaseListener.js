"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseListener = void 0;
class BaseListener {
    constructor(client) {
        this.ackWait = 24 * 60 * 60 * 1000;
        this.client = client;
    }
    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setDurableName(this.queueGroupName);
    }
    listen() {
        const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());
        subscription.on('message', (msg) => {
            console.log(`Message received: ${this.subject} / ${this.queueGroupName} / ${this.parseMessage(msg)}`);
            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        });
    }
    parseMessage(msg) {
        const data = msg.getData();
        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf-8'));
    }
}
exports.BaseListener = BaseListener;
//# sourceMappingURL=BaseListener.js.map