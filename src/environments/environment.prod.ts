import { default as authFile } from '../../auth_config.json';
export const environment = {
  production: true,
  auth: {
    domain: authFile.domain,
    clientId: authFile.clientId,
    redirectUri: window.location.origin
  }
};
