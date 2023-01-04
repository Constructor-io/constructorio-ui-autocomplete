import { useEffect, useState } from 'react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
const useCioClient = ({ apiKey, cioJsClient }) => {
  const [cioClient, setCioClient] = useState(cioJsClient);
  useEffect(() => {
    if (apiKey && !cioJsClient) {
      const client = new ConstructorIOClient({
        apiKey: apiKey,
        sendTrackingEvents: true
      });
      setCioClient(client);
    } else if (cioJsClient) {
      setCioClient(cioJsClient);
    }
  }, [apiKey, cioJsClient]);
  return cioClient;
};
export default useCioClient;
//# sourceMappingURL=useCioClient.js.map
