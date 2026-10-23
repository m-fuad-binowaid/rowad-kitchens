import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import '@fontsource/ibm-plex-sans-arabic/arabic-400.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-500.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-600.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import './styles/global.css';
const root = document.getElementById('root')!;
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
const route = window.location.pathname.replace(/\/$/, '') || '/';
if (root.hasChildNodes() && root.dataset.route === route) hydrateRoot(root, app);
else {
  root.replaceChildren();
  createRoot(root).render(app);
}
