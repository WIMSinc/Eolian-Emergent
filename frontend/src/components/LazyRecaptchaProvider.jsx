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
    const events = ["pointerdown", "keydown", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, trigger, { once: true, passive: true }));
    const idle = "requestIdleCallback" in window
      ? window.requestIdleCallback(trigger, { timeout: 8000 })
      : setTimeout(trigger, 6000);
    return () => {
      events.forEach((e) => window.removeEventListener(e, trigger));
      if ("cancelIdleCallback" in window && typeof idle === "number") window.cancelIdleCallback(idle);
      else clearTimeout(idle);
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
