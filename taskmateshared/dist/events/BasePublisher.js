"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePublisher = void 0;
class BasePublisher {
    constructor(client) {
        this.client = client;
    }
    publish(data) {
        return new Promise((resolve, reject) => {
            this.client.publish(this.subject, JSON.stringify(data), (err) => {
                if (err) {
                    return reject(err);
                }
                console.log('Event Published to subbject', this.subject);
                resolve();
            });
        });
    }
}
exports.BasePublisher = BasePublisher;
//# sourceMappingURL=BasePublisher.js.map