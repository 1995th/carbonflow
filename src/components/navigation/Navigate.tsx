import React, { useEffect } from 'react';
import { useNavigation } from '../../hooks/useNavigation';

interface NavigateProps {
  to: string;
}

export function Navigate({ to }: NavigateProps) {
  const { navigate } = useNavigation();

  useEffect(() => {
    navigate(to);
  }, [to, navigate]);

  return null;
}