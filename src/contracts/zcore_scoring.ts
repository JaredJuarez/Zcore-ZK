import * as Client from 'zcore_scoring';
import { rpcUrl } from './util';

export default new Client.Client({
  networkPassphrase: 'Standalone Network ; February 2017',
  contractId: 'CCF37GMJONVW6ABZBHUQ4C4VMJ3PSFKQC5YUFQMDWZODT54Q2TE5KBJC',
  rpcUrl,
  allowHttp: true,
  publicKey: undefined,
});
