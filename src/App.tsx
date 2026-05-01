import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { ProjectsPage } from './components/ProjectsPage';
import { RandomGamesSection } from './components/RandomGamesSection';
import { SubscribeModal } from './components/SubscribeModal';
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
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  useEffect(() => {
    const onHash = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    // Hash-routing doesn't auto-scroll; do it explicitly.
    window.scrollTo(0, 0);
  }, [route]);

  if (route === 'projects') {
    return (
      <div className="page">
        <a
          className="skipLink"
          href="#main"
          data-analytics-event="button_click"
          data-analytics-label="skip_to_content_link"
        >
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
      <a
        className="skipLink"
        href="#tags"
        data-analytics-event="button_click"
        data-analytics-label="skip_to_tags_link"
      >
        Skip to tags
      </a>
      <Hero onOpenSubscribe={() => setSubscribeOpen(true)} />
      <SubscribeModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />
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

