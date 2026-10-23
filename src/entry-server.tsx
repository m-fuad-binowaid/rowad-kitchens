import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './app/App';
import { routes } from './content/site';
export { routes };
export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
