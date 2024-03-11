import RingCentral from '@rc-ex/core';
import WebSocketExtension from '@rc-ex/ws';

const rc = new RingCentral({
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
  server: process.env.RINGCENTRAL_SERVER_URL,
});

const main = async () => {
  await rc.authorize({
    jwt: process.env.RINGCENTRAL_JWT_TOKEN!,
  });
  const wsExt = new WebSocketExtension();
  await rc.installExtension(wsExt);
  await wsExt.subscribe(['/restapi/v1.0/account/~/extension/~/message-store'], (event) => {
    console.log(JSON.stringify(event, null, 2));
  });
};
main();

// Attention: this demo code doesn't show how to manage your access token.
// By default, access token will expire in 1 hour. And after one hour, you WebSocket connection will break (because access token expired)
// You will need to setup a timer to refresh your token. `rc.refresh()`
// Or I suppose your existing system has a way to maintain your token.
