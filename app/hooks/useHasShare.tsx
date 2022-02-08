import { useEffect, useState } from 'react';

export function useHasShare(): boolean {
  const [hasShare, setHasShare] = useState(false);

  useEffect(() => {
    setHasShare(!!navigator.share);
  }, []);

  return hasShare;
}
