export default class SecretKey {
    static generateKey() {
        const crypto = require('crypto');
        return crypto.createHash('sha3-256').update('mcmmiguel').digest('hex');
    }
}
