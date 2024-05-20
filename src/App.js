import React, { useEffect } from "react";
import "./App.css";
import launchpad from "./launchpad.svg";

const COLORS = [
  "#bbf7d0",
  "#99f6e4",
  "#bfdbfe",
  "#ddd6fe",
  "#f5d0fe",
  "#fed7aa",
  "#fee2e2",
];
const TAGS = [
  "New Companies Onboarded",
  "Registration open",
  "#ieee-launchpad-officehours ",
  "21 Day Challenge",
  "Level 2 Updates",
];
const DURATION = 25000;
const ROWS = 3;
const TAGS_PER_ROW = 5;

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

const InfiniteLoopSlider = ({ children, duration, reverse = false }) => {
  return (
    <div
      className="loop-slider"
      style={{
        "--duration": `${duration}ms`,
        "--direction": reverse ? "reverse" : "normal",
      }}
    >
      <div className="inner">
        {children}
        {children}
      </div>
    </div>
  );
};

const Tag = ({ text }) => (
  <div className="tag">
    <span>#</span> {text}
  </div>
);

const LandingPageSection = () => {
  return (
    <section className="landing-page-section">
      <div className="landing">
        <h1 className="lpheader">Welcome to </h1>
        <img src={launchpad} alt="Launchpad Logo" className="launchpad-logo" />
      </div>
    </section>
  );
};

const AboutUsSection = () => (
  <section className="about-us-section">
    <div className="landing">
      <h2>About</h2>
      <p>
        One of the most prestigious events of IEEE Kerala Section and GTech
        MuLearn that is determined to serve the goal of creating opportunities
        for engineering students and graduates. Launchpad Kerala 2024 is a
        premier job fair that brings together talented individuals and
        innovative companies in the technical and engineering fields. This
        collaboration between IEEE Kerala Section and GTech MuLearn aims to
        propel advancement and innovation within Kerala's employment landscape
        by facilitating the seamless exchange of ideas and expertise.
      </p>
      <p>
        You're invited to join LaunchPad Kerala 2024—an exciting event offering
        unmatched opportunities for candidates and companies alike. Register now
        to engage, network, and discover diverse career avenues!
      </p>
      <div className="register-button">
        <button
          onClick={() =>
            (window.location.href = "https://launchpadkerala.org/registration")
          }
        >
          Register Now
        </button>
      </div>
    </div>
  </section>
);

const LaunchpadUpdatesSection = () => (
  <section className="launchpad-updates-section">
    <h2 className="updts">
      <span className="lp">Launchpad</span> Updates
    </h2>
    <p className="updts">Here is a quick glance at the latest updates!</p>
    <div className="tag-list">
      {[...new Array(ROWS)].map((_, i) => (
        <InfiniteLoopSlider
          key={i}
          duration={random(DURATION - 5000, DURATION + 5000)}
          reverse={i % 2}
        >
          {shuffle(TAGS)
            .slice(0, TAGS_PER_ROW)
            .map((tag) => (
              <Tag text={tag} key={tag} />
            ))}
        </InfiniteLoopSlider>
      ))}
      <div className="fade" />
    </div>
  </section>
);

const EventRoadmapSection = () => (
  <section className="event-roadmap-section">
    <div className="landing">
      <h2>
        <span className="lp">Event</span> Roadmap
      </h2>
    </div>
    <div className="step-boxes">
      <div className="step-box fade-in" data-default="1. Participant Registration"></div>
      <div className="step-box fade-in" data-default="2. Company registration" ></div>
      <div className="step-box fade-in" data-default="3. Challenge Start"></div>
      <div className="step-box fade-in" data-default="4. Online Exam"></div>
      <div className="step-box fade-in" data-default="5. Consolidated Rank List"></div>
      <div className="step-box fade-in" data-default="6. Option Selection" ></div>
      <div className="step-box fade-in" data-default="7. Confirmation Mail" ></div>
      <div className="step-box fade-in" data-default="8. Interviews"></div>
    </div>
  </section>
);

const App = () => {
  useEffect(() => {
    const fadeIns = document.querySelectorAll(".fade-in");
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.9,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, options);

    fadeIns.forEach((fadeIn) => {
      observer.observe(fadeIn);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="app">
      <LandingPageSection />
      <AboutUsSection />
      <LaunchpadUpdatesSection />
      <EventRoadmapSection />
    </div>
  );
};

export default App;
