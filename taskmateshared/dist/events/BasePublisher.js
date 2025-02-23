"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePublisher = void 0;
class BasePublisher {
    constructor(client) {
        this.client = client;
    }
    publish(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new Promise((resolve, reject) => {
                    this.client.publish(this.subject, JSON.stringify(data), (err) => {
                        if (err) {
                            return reject(err);
                        }
                        console.log('Event Published to subject', this.subject);
                        console.log('Event Data: ', this.subject, data);
                        resolve();
                    });
                });
            }
            catch (err) {
                console.log('Error publishing message: ', err);
            }
        });
    }
}
exports.BasePublisher = BasePublisher;
//# sourceMappingURL=BasePublisher.js.map