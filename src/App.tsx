import { lazy, Suspense, useEffect, useState } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { GoldDefs } from './components/Ornaments';
import UpdatesStrip from './components/UpdatesStrip';
import EnvelopeEntry from './components/EnvelopeEntry';
import Nav from './components/Nav';
import Hero from './components/Hero';
import GaneshWelcome from './components/GaneshWelcome';
import FamilyInvite from './components/FamilyInvite';
import EventJourney from './components/EventJourney';
import Venue from './components/Venue';
import FamilyDetails from './components/FamilyDetails';
import FamilyMessage from './components/FamilyMessage';
import SaveTheDate from './components/SaveTheDate';
import Finale from './components/Finale';
import FloatingControls from './components/FloatingControls';
import { useMusic } from './hooks/useMusic';
import { withViewTransition } from './utils/viewTransition';

const Gallery = lazy(() => import('./components/Gallery'));
const ShareSheet = lazy(() => import('./components/ShareSheet'));

export default function App() {
  const music = useMusic();
  const [started, setStarted] = useState(false);
  const [share, setShare] = useState(false);

  // Attempt autoplay on load; if blocked the envelope tap unlocks it.
  useEffect(() => { void music.play(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict={false}>
        <GoldDefs />
        <a href="#home" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[200] focus:rounded focus:bg-gold focus:px-3 focus:py-2 focus:text-wine-deep">Skip to content</a>
        <EnvelopeEntry onOpen={() => { setStarted(true); void music.play(); }} />
        <UpdatesStrip />
        <Nav />
        <main>
          <Hero started={started} />
          <GaneshWelcome />
          <FamilyInvite />
          <EventJourney />
          <Venue />
          <FamilyDetails />
          <FamilyMessage />
          <SaveTheDate />
          <Suspense fallback={null}><Gallery /></Suspense>
        </main>
        <Finale />
        <FloatingControls music={music.state} onMusic={music.toggle} onShare={() => withViewTransition(() => setShare(true))} />
        {share && <Suspense fallback={null}><ShareSheet onClose={() => withViewTransition(() => setShare(false))} /></Suspense>}
      </LazyMotion>
    </MotionConfig>
  );
}
