export default class HMAC {
    static generateHMAC(key: string, move: string) {
        const crypto = require('crypto');
        return crypto.createHmac('sha3-256', key).update(move).digest('hex');
    }
}