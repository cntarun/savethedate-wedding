import { useState } from "react";
import BoardingPass from "./components/BoardingPass.jsx";
import AmbientBackground from "./components/AmbientBackground.jsx";
import Hero from "./components/Hero.jsx";
import JourneyMap from "./components/JourneyMap.jsx";
import Proposals from "./components/Proposals.jsx";
import PassportStamp from "./components/PassportStamp.jsx";
import Countdown from "./components/Countdown.jsx";
import EventDetails from "./components/EventDetails.jsx";
import Itinerary from "./components/Itinerary.jsx";
import MusicToggle from "./components/MusicToggle.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  // Flips true once the boarding-pass entry animation finishes,
  // which cues the hero text to animate in.
  const [entered, setEntered] = useState(false);

  return (
    <main className="relative">
      {!entered && <BoardingPass onDone={() => setEntered(true)} />}

      <AmbientBackground />

      <div className="relative z-20">
        <Hero started={entered} />
        <JourneyMap />
        <Proposals />
        <PassportStamp />
        <Countdown />
        <EventDetails />
        <Itinerary />
        <Footer />
      </div>

      <MusicToggle />
    </main>
  );
}
