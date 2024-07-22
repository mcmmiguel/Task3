export default class SecretKey {
    static generateKey() {
        const crypto = require('crypto');
        const randomBytes = crypto.randomBytes(32);
        return crypto.createHash('sha3-256').update(randomBytes).digest('hex');
    }
}
