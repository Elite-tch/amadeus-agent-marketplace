import { useEffect, useRef } from 'react';

/**
 * Hook to automatically register users when they connect their wallet
 * Checks if user exists in DB, creates new user if not
 */
export function useUserRegistration(account: string | null, isConnected: boolean) {
  const hasRegistered = useRef(false);

  useEffect(() => {
    // Reset registration flag when account changes or disconnects
    if (!account) {
      hasRegistered.current = false;
      return;
    }

    // Only attempt registration once per connection
    if (!isConnected || hasRegistered.current) {
      return;
    }

    const registerUser = async () => {
      try {
        // Check if user exists
        const checkResponse = await fetch(`/api/user?publicKey=${encodeURIComponent(account)}`);

        if (checkResponse.ok) {
          const data = await checkResponse.json();
          if (data.success && data.data) {
            console.log('User already exists:', data.data);
            hasRegistered.current = true;
            return;
          }
        }

        // User doesn't exist, create new user
        if (checkResponse.status === 404) {
          console.log('Creating new user for:', account);

          const createResponse = await fetch('/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              publicKey: account,
              role: 'user'
            })
          });

          if (createResponse.ok) {
            const data = await createResponse.json();
            console.log('User created successfully:', data.data);
            hasRegistered.current = true;
          } else {
            const error = await createResponse.json();
            console.error('Failed to create user:', error);
          }
        }
      } catch (error) {
        console.error('Error during user registration:', error);
      }
    };

    void registerUser();
  }, [account, isConnected]);
}
