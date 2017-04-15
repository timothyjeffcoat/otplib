import crypto from 'crypto';
import hotpCounter from './hotpCounter';
import hotpSecret from './hotpSecret';

/**
 * Intermediate HOTP Digests
 *
 * @module core/hotpDigest
 * @param {string} secret - your secret that is used to generate the token
 * @param {number} counter - the OTP counter (usually it's an incremental count)
 * @param {string} options.algorithm - hmac algorithm
 * @param {function} options.createHmacSecret - the encoding function for secret
 * @param {string} options.encoding - the encoding of secret
 * @return {object}
 */
function hotpDigest(secret, counter, options) {
  if (typeof options !== 'object' || options == null) {
    throw new Error('[hotpDigest] argument 3 must be an object');
  }

  // Allow for direct digest use without going through hotpOptions
  const createHmacSecret = options.createHmacSecret || hotpSecret;

  // Convert secret to encoding for hmacSecret
  const hmacSecret = createHmacSecret(secret, options);

  // Ensure counter is a buffer or string (for HMAC creation)
  const hexCounter = hotpCounter(counter);

  // HMAC creation
  const cryptoHmac = crypto.createHmac(options.algorithm, hmacSecret);

  // Update HMAC with the counter
  return cryptoHmac.update(new Buffer(hexCounter, 'hex'))
    .digest('hex');
}

export default hotpDigest;
