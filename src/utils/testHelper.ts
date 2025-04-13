import request from 'supertest';
import app from '../app';

export class testHelper {
  private static token = '';

  private static genUserData() {
    const timestamp = Date.now();
    const userData = {
      "email": `test-${timestamp}@gmail.com`,
      "name": "Ivan",
      "password": "12345678",
      "confirmPassword": "12345678"
    };
    return userData;
  }

  private static generateUser = async () => {
    const res = await request(app)
    .post('/api/v1/users')
    .send(this.genUserData());

    return res
  }
  private static setToken = (token: string) => {
    this.token = token;
  }
  public static getToken = () => {
    return this.token;
  }
  public static generateTokenAndUser = async () => {
    const createUserRes = await this.generateUser()
    const token = createUserRes.body.token;
    this.setToken(token);
    return token;
  }
}