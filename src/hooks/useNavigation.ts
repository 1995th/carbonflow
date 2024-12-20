import { useState, useCallback } from 'react';

export function useNavigation() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const navigate = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  }, []);

  return {
    currentPath,
    navigate
  };
}