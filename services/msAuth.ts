import { BrowserCacheLocation, EventType, PublicClientApplication } from "@azure/msal-browser";

export class MSAuth {
  private msalInstance: PublicClientApplication;
  private tokenExpirationTimer: any;
  private loginRequest = { scopes: ["User.Read"] };

  constructor(config: any, nuxtApp: any) {
    if (!nuxtApp.$msal) {
      const msalConfig = {
        auth: {
          clientId: config.public.AZURE_CLIENT_ID,
          authority: config.public.AZURE_AUTHORITY,
          redirectUri: config.public.AZURE_REDIRECT_URI,
          navigateToLoginRequestUrl: true,
        },
        cache: {
          cacheLocation: BrowserCacheLocation.LocalStorage,
          storeAuthStateInCookie: true,
        },
        system: {
          tokenRenewalOffsetSeconds: 300,
        },
      };

      this.msalInstance = new PublicClientApplication(msalConfig);
      nuxtApp.provide("msal", this.msalInstance);
    } else {
      this.msalInstance = nuxtApp.$msal;
    }
  }

  async initialize() {
    await this.msalInstance.initialize();
    try {
      const response = await this.msalInstance.handleRedirectPromise();
      this.handleResponse(response);
    } catch (err) {
      console.error("MSAL initialization error:", err);
    }

    this.msalInstance.addEventCallback((event) => {
      if (event.eventType === EventType.LOGIN_SUCCESS) {
        this.setupTokenExpirationTimer();
      }
    });
  }

  private handleResponse(response: any) {
    if (response?.account) {
      this.setupTokenExpirationTimer();
    } else {
      console.log("LOGIN");
    }
  }

  private setupTokenExpirationTimer() {
    const accounts = this.msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      const account = accounts[0];
      if (account.idTokenClaims?.exp) {
        const tokenExpirationTime = account.idTokenClaims.exp * 1000;
        const timeUntilExpiration = tokenExpirationTime - Date.now();

        clearTimeout(this.tokenExpirationTimer);

        this.tokenExpirationTimer = setTimeout(() => {
          this.refreshAccessToken(account);
        }, timeUntilExpiration);
      }
    }
  }

  private async refreshAccessToken(account: any) {
    try {
      const response = await this.msalInstance.acquireTokenSilent({
        account,
        scopes: ["User.Read"],
      });
      console.log("Refreshed Access Token:", response.accessToken);
      this.setupTokenExpirationTimer();
    } catch (err) {
      console.error("Token refresh error:", err);
    }
  }

  async signIn() {
    try {
      await this.msalInstance.loginPopup(this.loginRequest);
    } catch (err) {
      console.error("Login error:", err);
    }
  }

  async acquireTokenSilent() {
    const accounts = this.msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      const account = accounts[0];
      this.msalInstance.setActiveAccount(account);
      try {
        const response = await this.msalInstance.acquireTokenSilent({
          account,
          scopes: ["User.Read"],
        });
        return response.accessToken;
      } catch (err) {
        return null;
      }
    } else {
      console.error("No accounts found");
      return null;
    }
  }

  getAccounts() {
    return this.msalInstance.getAllAccounts();
  }

  isAuthenticated() {
    return this.getAccounts().length > 0;
  }

  async signOut() {
    const accounts = this.msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      const account = accounts[0];
      try {
        if (account.homeAccountId) {
          await this.msalInstance.logoutPopup({ account });
          localStorage.clear();
          console.log("Logged out successfully");
        } else {
          console.error("No homeAccountId found on the account");
        }
      } catch (error) {
        console.error("Logout error:", error);
      }
    } else {
      console.error("No accounts found to log out");
    }
  }
}
