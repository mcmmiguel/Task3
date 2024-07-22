export default class SecretKey {
    static generateKey() {
        const crypto = require('crypto');
        const KEY_LENGTH_IN_BYTES = crypto.randomBytes(32);
        return crypto.createHash('sha3-256').update(KEY_LENGTH_IN_BYTES).digest('hex');
    }
}
