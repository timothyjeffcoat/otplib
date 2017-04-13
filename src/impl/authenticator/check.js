import totpCheck from '../../core/totpCheck';
import decodeKey from './decodeKey';

/**
 * Checks the provided OTP token against system generated token
 *
 * @module impl/authenticator/check
 * @param {string} token - the OTP token to check
 * @param {string} secret - your secret that is used to generate the token
 * @param {object} options - options which was used to generate it originally
 * @param {object} options.window - window of time to check
 * @return {boolean}
 */
function check(token, secret, options = {}) {
  return totpCheck(token, decodeKey(secret, 'binary'), options);
}

export default check;
