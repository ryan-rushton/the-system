import { createRoot } from 'react-dom/client';
import { AppWrapper } from './AppWrapper';
import './index.css';

const container = document.getElementById('root');
if (container == null) {
  throw new Error('Unable to get document root');
}
const root = createRoot(container);

root.render(<AppWrapper />);
