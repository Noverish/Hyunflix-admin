import axios, { AxiosRequestConfig } from 'axios';
import * as NodeRSA from 'node-rsa';

import { AUTH_SERVER } from 'src/config';
import { LoginResult } from 'src/models';

export async function getRSAKey(): Promise<string> {
  const config: AxiosRequestConfig = {
    url: `${AUTH_SERVER}/rsa-key`,
    method: 'get',
  };

  return (await axios(config)).data.key;
}

export async function login(password: string): Promise<LoginResult> {
  const publicKeyString: string = await getRSAKey();
  const publicKey = new NodeRSA(publicKeyString, 'pkcs8-public');

  const config: AxiosRequestConfig = {
    url: `${AUTH_SERVER}/login`,
    method: 'post',
    data: {
      username: publicKey.encrypt('admin', 'base64'),
      password: publicKey.encrypt(password, 'base64'),
    },
  };

  return (await axios(config)).data;
}
