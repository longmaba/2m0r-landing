import { useRef, type CSSProperties } from "react";
import { ArrowDown, Mail, RadioTower, Sparkles, Zap } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import labBg from "./assets/generated/ai-junk-lab-bg.png";
import machineCore from "./assets/generated/machine-core.png";

const stickerModules = import.meta.glob("./assets/generated/stickers/sticker-*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const stickers = Object.entries(stickerModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .slice(0, 14)
  .map(([, src]) => src);

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  ScrollToPlugin,
  SplitText,
  ScrambleTextPlugin,
  Flip,
  Observer,
  Draggable,
  InertiaPlugin,
);

const phrases = [
  "model evals over hype",
  "boring workflows, useful wins",
  "ship the tiny thing first",
  "tools change, taste compounds",
  "if it works, it works",
];

const tokens = [
  "prompt debt",
  "new model?",
  "agent loop",
  "cheap eval",
  "ship it",
  "what works",
  "less slideware",
  "human check",
];

const services = [
  "AI workflow audits",
  "model and tool evaluation",
  "internal automation prototypes",
  "agentic product experiments",
  "RAG and knowledge systems",
  "team enablement that survives Monday",
];

const people = [
  {
    name: "Hoang",
    role: "AI operator",
    bio: "Finds the shortest path between shiny demos and work people actually repeat.",
  },
  {
    name: "Long",
    role: "AI builder",
    bio: "Turns weird model behavior into useful prototypes, automations, and launchable loops.",
  },
];

const stickerPlacements = [
  { x: "3vw", y: "12vh", size: "clamp(5rem, 13vw, 14rem)" },
  { x: "76vw", y: "7vh", size: "clamp(5rem, 12vw, 13rem)" },
  { x: "13vw", y: "62vh", size: "clamp(5rem, 12vw, 12rem)" },
  { x: "70vw", y: "61vh", size: "clamp(6rem, 14vw, 15rem)" },
  { x: "4vw", y: "39vh", size: "clamp(5rem, 12vw, 12rem)" },
  { x: "83vw", y: "34vh", size: "clamp(5rem, 10vw, 11rem)" },
  { x: "43vw", y: "76vh", size: "clamp(5rem, 13vw, 13rem)" },
  { x: "35vw", y: "8vh", size: "clamp(5rem, 11vw, 12rem)" },
  { x: "58vw", y: "13vh", size: "clamp(5rem, 12vw, 13rem)" },
  { x: "78vw", y: "78vh", size: "clamp(5rem, 11vw, 12rem)" },
  { x: "19vw", y: "18vh", size: "clamp(5rem, 13vw, 14rem)" },
  { x: "55vw", y: "51vh", size: "clamp(5rem, 11vw, 12rem)" },
  { x: "28vw", y: "73vh", size: "clamp(4.5rem, 10vw, 10rem)" },
  { x: "88vw", y: "16vh", size: "clamp(4.5rem, 9vw, 10rem)" },
] satisfies Array<{ x: string; y: string; size: string }>;

const tokenPlacements = [
  { x: "8%", y: "12%", r: "-7deg" },
  { x: "39%", y: "16%", r: "4deg" },
  { x: "67%", y: "10%", r: "-3deg" },
  { x: "18%", y: "38%", r: "6deg" },
  { x: "55%", y: "41%", r: "-8deg" },
  { x: "76%", y: "48%", r: "5deg" },
  { x: "11%", y: "68%", r: "3deg" },
  { x: "48%", y: "70%", r: "-4deg" },
] satisfies Array<{ x: string; y: string; r: string }>;

export default function App() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const splitApi = SplitText as typeof SplitText & {
        create: (target: gsap.DOMTarget, vars?: Record<string, unknown>) => SplitText;
      };
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.matchMedia("(max-width: 760px)").matches;

      gsap.defaults({ ease: "power3.out", duration: 0.8 });
      gsap.set(root, { "--chaos": 0.5, "--tilt": "0deg", "--heat": 0.2 });

      if (reduceMotion) {
        gsap.set(q(".reveal, .hero-title, .tagline, .machine-core, .drift-token"), {
          clearProps: "all",
          autoAlpha: 1,
        });
        return;
      }

      const cursor = q(".cursor-orb")[0] as HTMLElement | undefined;
      const xTo = cursor ? gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" }) : null;
      const yTo = cursor ? gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" }) : null;
      const chaosTo = gsap.quickTo(root, "--chaos", { duration: 0.5, ease: "power2" });
      const heatTo = gsap.quickTo(root, "--heat", { duration: 0.7, ease: "power2" });

      const onPointerMove = (event: PointerEvent) => {
        xTo?.(event.clientX);
        yTo?.(event.clientY);
        const xProgress = gsap.utils.normalize(0, window.innerWidth, event.clientX);
        const yProgress = gsap.utils.normalize(0, window.innerHeight, event.clientY);
        chaosTo(gsap.utils.clamp(0.1, 1, xProgress));
        heatTo(gsap.utils.clamp(0.1, 1, 1 - yProgress));
        gsap.to(q(".magnet"), {
          x: (index) => (xProgress - 0.5) * (index + 1) * 18,
          y: (index) => (yProgress - 0.5) * (index + 1) * 14,
          rotation: (xProgress - 0.5) * 10,
          duration: 0.5,
          overwrite: "auto",
        });
      };
      root.addEventListener("pointermove", onPointerMove);

      const heroSplit = splitApi.create(q(".hero-title")[0], {
        type: "chars",
        charsClass: "hero-char",
        aria: "auto",
      });
      const lineSplit = splitApi.create(q(".tagline")[0], {
        type: "words",
        wordsClass: "tag-word",
        aria: "auto",
      });

      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .from(heroSplit.chars, {
          yPercent: () => gsap.utils.random(isMobile ? -42 : -180, isMobile ? 42 : 180),
          xPercent: () => gsap.utils.random(isMobile ? -32 : -120, isMobile ? 32 : 120),
          rotation: () => gsap.utils.random(isMobile ? -18 : -48, isMobile ? 18 : 48),
          scale: 0.2,
          autoAlpha: 0,
          duration: isMobile ? 1.05 : 1.5,
          stagger: { each: 0.045, from: "random" },
        })
        .from(
          lineSplit.words,
          {
            y: 48,
            autoAlpha: 0,
            skewX: -18,
            duration: 0.9,
            stagger: 0.055,
          },
          "-=0.85",
        )
        .from(q(".hero-command"), { y: 24, autoAlpha: 0, stagger: 0.08 }, "-=0.55")
        .from(q(".lab-bg"), { scale: 1.12, autoAlpha: 0, duration: 1.7 }, 0);

      gsap.to(q(".ticker-track"), {
        xPercent: -50,
        duration: 16,
        ease: "none",
        repeat: -1,
      });

      gsap.to(q(".sticker-float"), {
        y: isMobile ? "random(-14, 14)" : "random(-30, 30)",
        x: isMobile ? "random(-10, 10)" : "random(-24, 24)",
        rotation: isMobile ? "random(-8, 8)" : "random(-16, 16)",
        scale: "random(0.92, 1.08)",
        duration: "random(2.2, 4.2)",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.18, from: "random" },
      });

      gsap.to(q(".drift-token"), {
        y: isMobile ? "random(-8, 8)" : "random(-18, 18)",
        rotation: isMobile ? "random(-4, 4)" : "random(-7, 7)",
        duration: "random(1.4, 2.8)",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.09, from: "random" },
      });

      const draggables = Draggable.create(q(".drift-token"), {
        type: "x,y",
        bounds: root,
        inertia: true,
        edgeResistance: 0.72,
        cursor: "grab",
        activeCursor: "grabbing",
        onDragStart() {
          gsap.to(this.target, { scale: 1.08, rotation: "+=8", duration: 0.18 });
        },
        onDragEnd() {
          gsap.to(this.target, { scale: 1, duration: 0.25 });
        },
      });

      const observer = Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        tolerance: 12,
        onUp: () => gsap.to(root, { "--tilt": "-2.5deg", "--heat": 0.8, duration: 0.35 }),
        onDown: () => gsap.to(root, { "--tilt": "2.5deg", "--heat": 0.35, duration: 0.35 }),
        onLeft: () => gsap.to(q(".machine-ring"), { rotation: "-=24", duration: 0.6 }),
        onRight: () => gsap.to(q(".machine-ring"), { rotation: "+=24", duration: 0.6 }),
      });

      let phraseIndex = 0;
      let scramble: gsap.core.Tween;
      scramble = gsap.delayedCall(1.2, () => {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        gsap.to(q(".scramble-line"), {
          duration: 0.75,
          scrambleText: {
            text: phrases[phraseIndex],
            chars: "01<>_/#$",
            revealDelay: 0.1,
            speed: 0.4,
          },
        });
        scramble.restart(true);
      });

      const machineTl = gsap.timeline({
        scrollTrigger: {
          trigger: q(".machine-stage")[0],
          start: "top top",
          end: isMobile ? "+=2600" : "+=3600",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      });

      machineTl
        .fromTo(
          q(".machine-core"),
          { yPercent: isMobile ? 18 : 50, scale: 0.45, rotation: -18, autoAlpha: 0 },
          { yPercent: 0, scale: isMobile ? 0.84 : 1, rotation: 0, autoAlpha: 1, duration: 1.1 },
        )
        .from(
          q(".machine-ring"),
          { scale: 0.2, rotation: -180, autoAlpha: 0, stagger: 0.08, duration: 0.8 },
          "<0.15",
        )
        .to(q(".hero-ghost"), { scale: isMobile ? 0.7 : 0.38, yPercent: isMobile ? -24 : -52, autoAlpha: 0.18, duration: 0.7 }, "<")
        .from(q(".orbit-name"), { autoAlpha: 0, scale: 0.3, stagger: 0.1, duration: 0.5 }, "-=0.4")
        .to(q(".orbit-name.is-hoang"), { x: isMobile ? "0vw" : "4vw", y: isMobile ? "1vh" : "3vh", rotation: -7, duration: 0.75 })
        .to(q(".orbit-name.is-long"), { x: isMobile ? "0vw" : "-5vw", y: isMobile ? "1vh" : "2vh", rotation: 7, duration: 0.75 }, "<")
        .from(q(".machine-copy .line"), { yPercent: 110, autoAlpha: 0, stagger: 0.08, duration: 0.75 }, "-=0.45")
        .to(q(".machine-core"), { scale: isMobile ? 0.72 : 0.82, xPercent: isMobile ? 14 : -22, rotation: -3, duration: 0.9 })
        .fromTo(
          q(".service-chip"),
          { x: 160, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, stagger: 0.08, duration: 0.7 },
          "<0.1",
        )
        .to(q(".service-chip"), { x: (i) => (isMobile ? 0 : i % 2 === 0 ? -40 : 28), rotation: (i) => (i % 2 === 0 ? -4 : 4), stagger: 0.05 })
        .to(q(".machine-core"), { xPercent: isMobile ? 18 : 0, scale: isMobile ? 0.78 : 1.08, rotation: 3, duration: 0.8 })
        .fromTo(q(".final-command"), { y: 80, autoAlpha: 0, scale: 0.9 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.7 }, "-=0.35")
        .to(
          q(
            ".machine-copy, .service-stream, .orbit-name, .machine-core, .hero-ghost, .sticker-float, .ring-stack, .scramble-panel",
          ),
          { y: isMobile ? -18 : -42, autoAlpha: isMobile ? 0.18 : 0, scale: 0.96, duration: 0.8, stagger: 0.015 },
          "+=0.35",
        )
        .to(q(".final-command"), { y: isMobile ? -18 : -42, autoAlpha: 0, scale: 0.96, duration: 0.35 }, "<");

      const refreshOnLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", refreshOnLoad, { once: true });

      ScrollTrigger.batch(q(".reveal"), {
        start: "top 82%",
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 54, autoAlpha: 0, rotation: -2 },
            { y: 0, autoAlpha: 1, rotation: 0, stagger: 0.08, duration: 0.8, overwrite: true },
          ),
        onLeaveBack: (batch) => gsap.set(batch, { y: 48, autoAlpha: 0, overwrite: true }),
      });

      const bioCards = q(".bio-card") as HTMLElement[];
      const flipHandlers = bioCards.map((card) => {
        const expand = () => {
          const state = Flip.getState(bioCards);
          bioCards.forEach((item) => item.classList.toggle("is-expanded", item === card));
          Flip.from(state, { duration: 0.48, ease: "power3.inOut", absolute: false, nested: true });
        };
        const collapse = () => {
          const state = Flip.getState(bioCards);
          bioCards.forEach((item) => item.classList.remove("is-expanded"));
          Flip.from(state, { duration: 0.4, ease: "power3.inOut", absolute: false, nested: true });
        };
        card.addEventListener("pointerenter", expand);
        card.addEventListener("focusin", expand);
        card.addEventListener("pointerleave", collapse);
        card.addEventListener("focusout", collapse);
        return () => {
          card.removeEventListener("pointerenter", expand);
          card.removeEventListener("focusin", expand);
          card.removeEventListener("pointerleave", collapse);
          card.removeEventListener("focusout", collapse);
        };
      });

      return () => {
        root.removeEventListener("pointermove", onPointerMove);
        heroSplit.revert();
        lineSplit.revert();
        draggables.forEach((draggable) => draggable.kill());
        observer.kill();
        scramble.kill();
        window.removeEventListener("load", refreshOnLoad);
        bioCards.forEach((card) => card.classList.remove("is-expanded"));
        flipHandlers.forEach((remove) => remove());
      };
    },
    { scope: rootRef },
  );

  const scrollToMachine = () => {
    gsap.to(window, {
      duration: 1.1,
      scrollTo: { y: "#machine", offsetY: 0 },
      ease: "power3.inOut",
    });
  };

  return (
    <main ref={rootRef} className="app-shell">
      <div className="cursor-orb" aria-hidden="true" />

      <section className="hero-section" aria-label="2m0r introduction">
        <img className="lab-bg" src={labBg} alt="" aria-hidden="true" />
        <div className="noise-layer" aria-hidden="true" />
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {phrases.concat(phrases).map((phrase, index) => (
              <span key={`${phrase}-${index}`}>{phrase}</span>
            ))}
          </div>
        </div>

        <p className="hero-command magnet">
          <RadioTower size={18} /> Hoang + Long / AI consulting duo
        </p>
        <h1 className="hero-title">2m0r</h1>
        <p className="tagline">2 men, no rich, still shipping.</p>
        <div className="hero-actions hero-command">
          <a className="action-link primary-action" href="mailto:hello@2m0r.com">
            <Mail size={18} />
            hello@2m0r.com
          </a>
          <button className="action-link" type="button" onClick={scrollToMachine}>
            <ArrowDown size={18} />
            break the page
          </button>
        </div>
      </section>

      <section id="machine" className="machine-stage" aria-label="Scroll machine">
        <div className="pin-scene">
          <div className="hero-ghost" aria-hidden="true">
            2m0r
          </div>
          <div className="ring-stack" aria-hidden="true">
            <span className="machine-ring ring-one" />
            <span className="machine-ring ring-two" />
            <span className="machine-ring ring-three" />
          </div>
          <img className="machine-core" src={machineCore} alt="A strange handmade AI machine" />
          {stickers.map((src, index) => {
            const placement = stickerPlacements[index % stickerPlacements.length];
            const style = {
              "--x": placement.x,
              "--y": placement.y,
              "--size": placement.size,
            } as CSSProperties;

            return (
              <img
                className="sticker-float"
                key={src}
                src={src}
                style={style}
                alt=""
                aria-hidden="true"
              />
            );
          })}

          <div className="orbit-name is-hoang">Hoang</div>
          <div className="orbit-name is-long">Long</div>

          <div className="machine-copy">
            <p className="line">We test the new AI thing.</p>
            <p className="line">We keep only what works.</p>
            <p className="line">Then we wire it into real work.</p>
          </div>

          <div className="scramble-panel">
            <Zap size={18} />
            <span className="scramble-line">{phrases[0]}</span>
          </div>

          <div className="service-stream">
            {services.map((service) => (
              <span className="service-chip" key={service}>
                {service}
              </span>
            ))}
          </div>

          <a className="final-command" href="mailto:hello@2m0r.com">
            <Sparkles size={18} />
            ask us what is worth using
          </a>
        </div>
      </section>

      <section className="duo-section" aria-label="Hoang and Long">
        <div className="section-label reveal">the two men</div>
        <div className="bio-grid">
          {people.map((person) => (
            <article className="bio-card reveal" key={person.name} tabIndex={0}>
              <span>{person.role}</span>
              <h2>{person.name}</h2>
              <p>{person.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="chaos-section" aria-label="Practical AI consulting">
        <div className="section-label reveal">what we touch</div>
        <div className="chaos-board">
          {tokens.map((token, index) => {
            const placement = tokenPlacements[index % tokenPlacements.length];

            return (
            <button
              className="drift-token reveal"
              type="button"
              key={token}
              style={
                {
                  "--x": placement.x,
                  "--y": placement.y,
                  "--r": placement.r,
                } as CSSProperties
              }
            >
              {token}
            </button>
            );
          })}
        </div>
        <div className="consulting-copy reveal">
          <p>
            We help teams make sense of fast-moving AI tooling without pretending every release is a
            revolution. The output is practical: smaller workflows, better model choices, useful
            prototypes, and fewer meetings about imaginary roadmaps.
          </p>
        </div>
      </section>

      <section className="closing-section" aria-label="Contact 2m0r">
        <div className="closing-stack reveal">
          <p>Got a messy AI idea?</p>
          <h2>Throw it into the machine.</h2>
          <a className="closing-cta" href="mailto:hello@2m0r.com">
            <Mail size={20} />
            hello@2m0r.com
          </a>
        </div>
      </section>
    </main>
  );
}
