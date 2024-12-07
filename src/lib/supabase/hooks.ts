import { useEffect, useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { checkConnection, getConnectionState, resetConnectionState } from './connection';
import { NetworkError } from './errors';

const CONNECTION_CHECK_INTERVAL = 30000; // 30 seconds
const RETRY_DELAY = 5000; // 5 seconds

export function useSupabaseConnection() {
  const [isConnected, setIsConnected] = useState(getConnectionState().isConnected);
  const [isChecking, setIsChecking] = useState(false);
  const retryTimeoutRef = useRef<number>();
  const mountedRef = useRef(true);

  const handleConnectionCheck = useCallback(async (showToasts = true) => {
    if (!mountedRef.current || isChecking) return;
    
    setIsChecking(true);
    try {
      const connected = await checkConnection();
      if (mountedRef.current) {
        if (connected && !isConnected) {
          setIsConnected(true);
          if (showToasts) {
            toast.success('Connection restored');
          }
          resetConnectionState(); // Reset retry count on success
        } else if (!connected && isConnected) {
          setIsConnected(false);
          if (showToasts) {
            toast.error('Connection lost. Retrying...');
          }
        }
      }
    } catch (error) {
      if (mountedRef.current) {
        setIsConnected(false);
        if (error instanceof NetworkError && showToasts) {
          toast.error('Network error. Please check your connection.');
        }
      }
    } finally {
      if (mountedRef.current) {
        setIsChecking(false);
      }
    }
  }, [isConnected, isChecking]);

  const scheduleRetry = useCallback(() => {
    if (retryTimeoutRef.current) {
      window.clearTimeout(retryTimeoutRef.current);
    }
    retryTimeoutRef.current = window.setTimeout(() => {
      handleConnectionCheck(false);
    }, RETRY_DELAY);
  }, [handleConnectionCheck]);

  useEffect(() => {
    mountedRef.current = true;

    // Initial connection check
    handleConnectionCheck(false);

    // Set up periodic checks
    const intervalId = setInterval(() => {
      handleConnectionCheck(true);
    }, CONNECTION_CHECK_INTERVAL);

    // Handle online/offline events
    const handleOnline = () => {
      if (retryTimeoutRef.current) {
        window.clearTimeout(retryTimeoutRef.current);
      }
      handleConnectionCheck(true);
    };

    const handleOffline = () => {
      if (mountedRef.current) {
        setIsConnected(false);
        toast.error('Network connection lost');
        scheduleRetry();
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      mountedRef.current = false;
      clearInterval(intervalId);
      if (retryTimeoutRef.current) {
        window.clearTimeout(retryTimeoutRef.current);
      }
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleConnectionCheck, scheduleRetry]);

  return { isConnected, isChecking };
}