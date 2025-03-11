import { ref } from 'vue';
import { useMSAuth } from '~/composables/useMSAuth';
import { AzureUsers } from '~/services/azureUsers';

export const useAzureUsers = () => {
  const { acquireTokenSilent, acquireTokenPopup } = useMSAuth();

  const config = useRuntimeConfig();
  const azureScopes = config.public.AZURE_SCOPES;
  const scopes = ref((azureScopes).split(','));

  const azureUsersService = new AzureUsers(acquireTokenSilent, acquireTokenPopup, scopes.value);
  const users = ref<{ id: string; displayName: string; userPrincipalName: string }[]>([]);
  const errorMessage = ref<string>('');

  const getDomainUsers = async () => {
    try {
      users.value = await azureUsersService.getDomainUsers();
      errorMessage.value = users.value.length === 0 ? 'No users fetched - check permissions' : '';
    } catch (error) {
      errorMessage.value = 'Failed to load users: Insufficient privileges';
      users.value = [];
    }
  };

  return {
    users,
    errorMessage,
    getDomainUsers,
  };
};