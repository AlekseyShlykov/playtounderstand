import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { ProjectsPage } from './components/ProjectsPage';
import { RandomGamesSection } from './components/RandomGamesSection';
import { SubscribeSection } from './components/SubscribeSection';
import { TagsSection } from './components/TagsSection';

function getRoute() {
  const hash = window.location.hash || '#/';
  if (hash.startsWith('#/projects')) return 'projects' as const;
  return 'home' as const;
}

export function App() {
  const [route, setRoute] = useState<'home' | 'projects'>(() => {
    if (typeof window === 'undefined') return 'home';
    return getRoute();
  });

  useEffect(() => {
    const onHash = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  if (route === 'projects') {
    return (
      <div className="page">
        <a className="skipLink" href="#main">
          Skip to content
        </a>
        <div id="main">
          <ProjectsPage />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <a className="skipLink" href="#tags">
        Skip to tags
      </a>
      <Hero />
      <main className="main">
        <RandomGamesSection />
        <TagsSection />
        <SubscribeSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}

