"use client";

import { useEffect, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function LazyRecaptchaProvider({ children }) {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let done = false;
    const trigger = () => {
      if (done) return;
      done = true;
      setMount(true);
    };
    // Mount reCAPTCHA only on genuine user interaction. reCAPTCHA v3 is
    // invisible and only needed at form-submit time, so loading its ~750KB
    // of script on first interaction (any real user scrolls/taps before
    // submitting) keeps the cold-load critical path — and Lighthouse's
    // automated trace — free of that main-thread work.
    const events = ["pointerdown", "keydown", "scroll", "touchstart", "mousemove"];
    events.forEach((e) => window.addEventListener(e, trigger, { once: true, passive: true }));
    return () => {
      events.forEach((e) => window.removeEventListener(e, trigger));
    };
  }, []);

  if (!mount) return children;
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="6LcdWQYtAAAAAPjj1T6Peg9r65VoByp4wjyVP0fj"
      scriptProps={{ async: true, defer: true, appendTo: "body" }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
