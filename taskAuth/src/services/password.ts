import util from 'util';
import crypto from 'crypto';

const asyncScript = util.promisify(crypto.scrypt);

class Password {
  static async hashPassword(password: string): Promise<string> {
    const salt = crypto.randomBytes(8).toString('hex');
    const hashedPassword = (await asyncScript(password, salt, 64)) as Buffer;

    return `${hashedPassword.toString('hex')}.${salt}`;
  }

  static async comparePassword(
    storedPassword: string,
    suppliedPassword: string
  ): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split('.');
    const hashedSuppliedPassword = (await asyncScript(
      suppliedPassword,
      salt,
      64
    )) as Buffer;

    return hashedPassword === hashedSuppliedPassword.toString('hex');
  }
}

export default Password;
