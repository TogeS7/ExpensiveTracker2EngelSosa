import { useState, useEffect } from 'react';

export function usePWAInstall() {
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPromptInstall(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async () => {
    if (promptInstall) {
      promptInstall.prompt();
      await promptInstall.userChoice;
      setPromptInstall(null);
    }
  };

  return { isInstallable: !!promptInstall, install };
}