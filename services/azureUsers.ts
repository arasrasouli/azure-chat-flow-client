// services/azureUsers.ts
export class AzureUsers {
    private acquireTokenSilent: (scopes: string[]) => Promise<string | null>;
    private acquireTokenPopup: (scopes: string[]) => Promise<string | null>;
    private scopes: string[];
  
    constructor(
      acquireTokenSilent: (scopes: string[]) => Promise<string | null>,
      acquireTokenPopup: (scopes: string[]) => Promise<string | null>,
      scopes: string[]
    ) {
      this.acquireTokenSilent = acquireTokenSilent;
      this.acquireTokenPopup = acquireTokenPopup || (async () => null);
      this.scopes = scopes;
    }
  
    async getDomainUsers(): Promise<{ id: string; displayName: string; userPrincipalName: string }[]> {
      try {
        let token = await this.acquireTokenSilent(this.scopes);
        if (!token) {
          console.log('Silent token acquisition failed, falling back to popup');
          token = await this.acquireTokenPopup(this.scopes);
        }
        if (!token) throw new Error('Failed to acquire token - check MSAL configuration or scopes');
  
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        console.log('Acquired token for Graph API:', {
          success: !!token,
          length: token.length,
          scopes: tokenPayload.scp || tokenPayload.scope,
        });
  
        const response = await fetch('https://graph.microsoft.com/v1.0/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Graph API error: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        const users = data.value.map((user: any) => ({
          id: user.id,
          displayName: user.displayName,
          userPrincipalName: user.userPrincipalName,
        }));
        console.log('Fetched Azure AD users:', users);
        return users;
      } catch (error) {
        console.error('Error fetching Azure AD users:', error);
        return [];
      }
    }
  }