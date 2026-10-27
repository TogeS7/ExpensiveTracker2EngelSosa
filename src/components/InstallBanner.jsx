import { usePWAInstall } from '../hooks/usePWAInstall';

export default function InstallBanner() {
  const { isInstallable, install } = usePWAInstall();
  
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;

  if (isStandalone) return null; // Si ya está instalada, no mostramos nada

  return (
    <div style={{ padding: '10px', background: '#e0f7fa', textAlign: 'center' }}>
      {isInstallable ? (
        <button onClick={install}>Instalar App</button>
      ) : isIOS ? (
        <p>Para instalar en iOS: tocá "Compartir" y luego "Agregar a inicio".</p>
      ) : null}
    </div>
  );
}