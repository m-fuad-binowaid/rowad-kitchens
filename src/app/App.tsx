import { Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { LocaleProvider } from '../localization/Locale';
import { Layout } from '../components/Layout';
import { Metadata } from '../components/Metadata';
import Home from '../pages/Home';
import About from '../pages/About';
import Kitchens from '../pages/Kitchens';
import Projects from '../pages/Projects';
import ProjectDetail from '../pages/ProjectDetail';
import Process from '../pages/Process';
import Showrooms from '../pages/Showrooms';
import Contact from '../pages/Contact';
import Catalog from '../pages/Catalog';
import NotFound from '../pages/NotFound';
export default function App() {
  return (
    <LocaleProvider>
      <MotionConfig reducedMotion="user">
        <Metadata />
        <Routes>
          {['', 'en'].map((prefix) => (
            <Route key={prefix} path={prefix ? `/${prefix}` : '/'} element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="kitchens" element={<Kitchens />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:slug" element={<ProjectDetail />} />
              <Route path="process" element={<Process />} />
              <Route path="showrooms" element={<Showrooms />} />
              <Route path="contact" element={<Contact />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          ))}
        </Routes>
      </MotionConfig>
    </LocaleProvider>
  );
}
