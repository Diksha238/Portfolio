import { useState, useEffect, useRef } from "react";

const SPELLS = ["Lumos", "Alohomora", "Accio", "Expecto Patronum", "Wingardium Leviosa"];

const PROJECTS = [
  {
    name: "CodeReviewAI",
    spell: "Lumos Maxima",
    house: "Ravenclaw",
    houseColor: "#1a5276",
    description: "AI-powered code review platform for students. GitHub Copilot replaces thinking — CodeReviewAI teaches thinking.",
    tech: ["Spring Boot", "Spring AI", "Ollama", "React"],
    link: "https://github.com/Diksha238/dsa-reviewer",
    rune: "⚡",
  },
  {
    name: "Gauriksha Bank",
    spell: "Alohomora",
    house: "Slytherin",
    houseColor: "#1e8449",
    description: "Full-stack banking app with ML-powered fraud detection. Spring Boot + Python Flask + Random Forest on 284k transactions.",
    tech: ["Java", "Spring Boot", "Python", "PostgreSQL", "React"],
    link: "https://github.com/Diksha238/gauriksha-bank",
    rune: "🐍",
  },
  {
    name: "EduLens",
    spell: "Revelio",
    house: "Gryffindor",
    houseColor: "#922b21",
    description: "AI handwritten answer sheet evaluator using Computer Vision. Automated grading with OCR + NLP scoring.",
    tech: ["Python", "OpenCV", "FastAPI", "React"],
    link: "#",
    rune: "🦁",
  },
];

const SKILLS = [
  { name: "Java & Spring Boot", house: "Slytherin", level: 92, color: "#1e8449" },
  { name: "AI/ML & Python", house: "Ravenclaw", level: 78, color: "#1a5276" },
  { name: "React & Frontend", house: "Gryffindor", level: 72, color: "#922b21" },
  { name: "PostgreSQL & DBs", house: "Hufflepuff", level: 80, color: "#b7950b" },
  { name: "Docker & DevOps", house: "Slytherin", level: 65, color: "#1e8449" },
  { name: "Spring AI + Ollama", house: "Ravenclaw", level: 70, color: "#1a5276" },
];

const CANDLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 7) % 90}%`,
  delay: `${(i * 0.4) % 3}s`,
  duration: `${2.5 + (i * 0.3) % 2}s`,
  height: `${60 + (i * 17) % 60}px`,
}));

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: `${1 + Math.random() * 2}px`,
  delay: `${Math.random() * 4}s`,
}));

export default function HarryPotterPortfolio() {
  const [marauderUnlocked, setMarauderUnlocked] = useState(false);
  const [spellText, setSpellText] = useState("");
  const [activeSection, setActiveSection] = useState("great-hall");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [castSpell, setCastSpell] = useState("");
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [snitchPos, setSnitchPos] = useState({ x: 200, y: 200 });
  const [letterOpen, setLetterOpen] = useState(false);
  const snitchRef = useRef(null);

  useEffect(() => {
    let angle = 0;
    const interval = setInterval(() => {
      angle += 0.02;
      const cx = window.innerWidth / 2 + Math.cos(angle * 1.3) * (window.innerWidth * 0.35);
      const cy = 300 + Math.sin(angle) * 150;
      setSnitchPos({ x: cx, y: cy });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const handleMarauderInput = (e) => {
    const val = e.target.value;
    setSpellText(val);
    if (val.toLowerCase().includes("mischief managed") || val.toLowerCase().includes("solemnly swear")) {
      setMarauderUnlocked(true);
    }
  };

  const triggerSpell = (spell) => {
    setCastSpell(spell);
    setTimeout(() => setCastSpell(""), 2000);
  };

  const navItems = [
    { id: "great-hall", label: "Great Hall", icon: "🏰" },
    { id: "sorting", label: "Skills", icon: "🎩" },
    { id: "common-room", label: "Projects", icon: "📜" },
    { id: "owlery", label: "Contact", icon: "🦉" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0a0a1a 0%, #1a0a2e 30%, #0d1117 100%)",
      fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
      cursor: "none",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Custom Snitch Cursor */}
      <div style={{
        position: "fixed",
        left: cursorPos.x - 10,
        top: cursorPos.y - 10,
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "radial-gradient(circle at 30% 30%, #f5d020, #c8a600)",
        boxShadow: "0 0 12px #f5d020aa, 0 0 24px #f5d02066",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "transform 0.05s",
      }} />

      {/* Floating Golden Snitch decoration */}
      <div style={{
        position: "fixed",
        left: snitchPos.x - 12,
        top: snitchPos.y - 12,
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: "radial-gradient(circle at 30% 30%, #f5d020, #c8a600)",
        boxShadow: "0 0 20px #f5d020cc, 0 0 40px #f5d02066",
        pointerEvents: "none",
        zIndex: 100,
        transition: "left 0.08s ease-out, top 0.08s ease-out",
      }}>
        {/* Wings */}
        <div style={{
          position: "absolute", top: 4, left: -18,
          width: 16, height: 8,
          background: "rgba(200,220,255,0.5)",
          borderRadius: "50% 0 0 50%",
          transform: "rotate(-20deg)",
          animation: "wingFlap 0.15s infinite alternate",
        }} />
        <div style={{
          position: "absolute", top: 4, right: -18,
          width: 16, height: 8,
          background: "rgba(200,220,255,0.5)",
          borderRadius: "0 50% 50% 0",
          transform: "rotate(20deg)",
          animation: "wingFlap 0.15s infinite alternate-reverse",
        }} />
      </div>

      {/* Stars */}
      {STARS.map(s => (
        <div key={s.id} style={{
          position: "fixed",
          top: s.top,
          left: s.left,
          width: s.size,
          height: s.size,
          borderRadius: "50%",
          background: "#ffffff",
          opacity: 0.6,
          animation: `twinkle ${2 + Math.random() * 3}s ${s.delay} infinite alternate`,
          pointerEvents: "none",
          zIndex: 0,
        }} />
      ))}

      {/* Floating Candles */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "100vh", pointerEvents: "none", zIndex: 1 }}>
        {CANDLES.map(c => (
          <div key={c.id} style={{
            position: "absolute",
            left: c.left,
            top: "10%",
            animation: `floatCandle ${c.duration} ${c.delay} infinite ease-in-out alternate`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            {/* Flame */}
            <div style={{
              width: 6,
              height: 12,
              background: "radial-gradient(ellipse at 50% 80%, #ff8c00, #ffff00 50%, #ffffff)",
              borderRadius: "50% 50% 20% 20%",
              boxShadow: "0 0 8px #ff8c00, 0 0 16px #ff8c0066",
              animation: `flicker ${c.duration} ${c.delay} infinite`,
              marginBottom: 2,
            }} />
            {/* Candle body */}
            <div style={{
              width: 8,
              height: c.height,
              background: "linear-gradient(180deg, #f5e6d0, #e8d5b7)",
              borderRadius: "2px",
              boxShadow: "2px 0 4px rgba(0,0,0,0.3)",
            }} />
          </div>
        ))}
      </div>

      {/* Spell Cast Flash */}
      {castSpell && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9000,
          fontSize: "3rem",
          fontWeight: "bold",
          color: "#a8e6cf",
          textShadow: "0 0 30px #a8e6cf, 0 0 60px #a8e6cf44",
          animation: "spellFade 2s ease-out",
          pointerEvents: "none",
          fontStyle: "italic",
          letterSpacing: 4,
        }}>
          ✨ {castSpell}! ✨
        </div>
      )}

      {/* NAV — Marauder's Map style */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        padding: "12px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(10, 5, 20, 0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(197, 164, 93, 0.3)",
      }}>
        <div style={{
          fontSize: "1.1rem",
          color: "#c5a45d",
          letterSpacing: 3,
          fontStyle: "italic",
          textShadow: "0 0 10px rgba(197, 164, 93, 0.5)",
        }}>
          ⚡ Dikshu Sharma
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => {
              setActiveSection(item.id);
              triggerSpell(SPELLS[navItems.findIndex(n => n.id === item.id)]);
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
            }} style={{
              background: activeSection === item.id ? "rgba(197, 164, 93, 0.2)" : "transparent",
              border: `1px solid ${activeSection === item.id ? "rgba(197, 164, 93, 0.6)" : "rgba(197, 164, 93, 0.2)"}`,
              color: activeSection === item.id ? "#c5a45d" : "rgba(197, 164, 93, 0.6)",
              padding: "6px 16px",
              borderRadius: 4,
              cursor: "none",
              fontSize: "0.85rem",
              letterSpacing: 1,
              fontFamily: "inherit",
              transition: "all 0.3s",
            }}>
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        {/* Marauder's Map input */}
        <div style={{ position: "relative" }}>
          <input
            placeholder="I solemnly swear..."
            value={spellText}
            onChange={handleMarauderInput}
            style={{
              background: "rgba(197, 164, 93, 0.05)",
              border: "1px solid rgba(197, 164, 93, 0.3)",
              color: "#c5a45d",
              padding: "6px 12px",
              borderRadius: 4,
              fontSize: "0.8rem",
              fontFamily: "inherit",
              fontStyle: "italic",
              outline: "none",
              width: 180,
              cursor: "none",
            }}
          />
          {marauderUnlocked && (
            <div style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              background: "rgba(20, 14, 5, 0.95)",
              border: "1px solid #c5a45d",
              borderRadius: 4,
              padding: 12,
              color: "#c5a45d",
              fontSize: "0.75rem",
              width: 200,
              fontStyle: "italic",
              zIndex: 999,
            }}>
              🗺️ Mischief Managed!<br/>
              <span style={{ color: "rgba(197, 164, 93, 0.6)", fontSize: "0.7rem" }}>
                You've unlocked the Marauder's Map. All secrets revealed.
              </span>
            </div>
          )}
        </div>
      </nav>

      {/* ===== HERO — GREAT HALL ===== */}
      <section id="great-hall" style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 2,
        paddingTop: 80,
        textAlign: "center",
        padding: "120px 40px 80px",
      }}>

        {/* Hogwarts seal */}
        <div style={{
          fontSize: "4rem",
          marginBottom: 20,
          animation: "rotateSeal 20s linear infinite",
          filter: "drop-shadow(0 0 20px rgba(197, 164, 93, 0.5))",
        }}>⚡</div>

        {/* Acceptance Letter */}
        {!letterOpen ? (
          <div
            onClick={() => setLetterOpen(true)}
            style={{
              background: "rgba(245, 230, 190, 0.08)",
              border: "2px solid rgba(197, 164, 93, 0.4)",
              borderRadius: 8,
              padding: "20px 40px",
              cursor: "none",
              marginBottom: 40,
              animation: "pulse 3s infinite",
              maxWidth: 400,
            }}>
            <div style={{ color: "#c5a45d", fontSize: "0.85rem", letterSpacing: 3, marginBottom: 8 }}>
              📜 HOGWARTS SCHOOL OF ENGINEERING
            </div>
            <div style={{ color: "rgba(197, 164, 93, 0.6)", fontSize: "0.75rem", fontStyle: "italic" }}>
              Click to open your acceptance letter
            </div>
          </div>
        ) : (
          <div style={{
            background: "rgba(245, 230, 190, 0.06)",
            border: "1px solid rgba(197, 164, 93, 0.3)",
            borderRadius: 8,
            padding: "24px 40px",
            maxWidth: 520,
            marginBottom: 40,
            animation: "fadeInUp 0.5s ease-out",
          }}>
            <div style={{ color: "#c5a45d", fontSize: "0.75rem", letterSpacing: 3, marginBottom: 16, opacity: 0.7 }}>
              HOGWARTS SCHOOL OF WITCHCRAFT & ENGINEERING
            </div>
            <div style={{ color: "rgba(245, 230, 190, 0.9)", fontSize: "0.9rem", lineHeight: 1.8, fontStyle: "italic" }}>
              Dear Ms. Diksha Nagpal,<br/>
              We are pleased to inform you that you have been accepted at Hogwarts School of Engineering and AI/ML. You are required to report for 3rd Year, Department of Computer Science (Specialisation: Dark Arts of Machine Learning).
            </div>
          </div>
        )}

        <h1 style={{
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          color: "#f5e6be",
          letterSpacing: 6,
          fontWeight: "normal",
          margin: "0 0 8px",
          textShadow: "0 0 40px rgba(197, 164, 93, 0.4), 0 2px 4px rgba(0,0,0,0.8)",
          lineHeight: 1.1,
        }}>
          Diksha Nagpal
        </h1>

        <div style={{
          color: "#c5a45d",
          fontSize: "1rem",
          letterSpacing: 8,
          marginBottom: 32,
          opacity: 0.8,
          textTransform: "uppercase",
        }}>
          3rd Year · B.Tech CSE · AI/ML
        </div>

        <div style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 48,
        }}>
          {["Backend Witch 🐍", "AI/ML Seeker ⚡", "Spring Boot Wizard 🧙"].map(tag => (
            <span key={tag} style={{
              padding: "6px 18px",
              border: "1px solid rgba(197, 164, 93, 0.35)",
              borderRadius: 20,
              color: "rgba(197, 164, 93, 0.8)",
              fontSize: "0.8rem",
              letterSpacing: 2,
              background: "rgba(197, 164, 93, 0.05)",
            }}>{tag}</span>
          ))}
        </div>

        {/* Spell buttons */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { spell: "Accio Resume", action: () => {triggerSpell("Accio Resume"); window.open("https://drive.google.com/file/d/1dEpCSLaQn5DWIpm5CLl-_X6B9VbLlreY/view?usp=sharing");} },
            { spell: "Alohomora GitHub", action: () => { triggerSpell("Alohomora"); window.open("https://github.com/Diksha238", "_blank"); } },
          ].map(btn => (
            <button key={btn.spell} onClick={btn.action} style={{
              padding: "12px 28px",
              background: "rgba(197, 164, 93, 0.1)",
              border: "1px solid rgba(197, 164, 93, 0.5)",
              color: "#c5a45d",
              borderRadius: 4,
              fontSize: "0.9rem",
              fontFamily: "inherit",
              fontStyle: "italic",
              letterSpacing: 2,
              cursor: "none",
              transition: "all 0.3s",
            }}
              onMouseEnter={e => {
                e.target.style.background = "rgba(197, 164, 93, 0.2)";
                e.target.style.boxShadow = "0 0 20px rgba(197, 164, 93, 0.3)";
              }}
              onMouseLeave={e => {
                e.target.style.background = "rgba(197, 164, 93, 0.1)";
                e.target.style.boxShadow = "none";
              }}>
              ✨ {btn.spell}
            </button>
          ))}
        </div>
      </section>

      {/* ===== SORTING HAT — SKILLS ===== */}
      <section id="sorting" style={{
        minHeight: "100vh",
        padding: "100px 40px",
        position: "relative",
        zIndex: 2,
        maxWidth: 900,
        margin: "0 auto",
      }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>🎩</div>
          <h2 style={{
            color: "#f5e6be",
            fontSize: "2rem",
            fontWeight: "normal",
            letterSpacing: 4,
            margin: "0 0 12px",
          }}>The Sorting Hat Speaks</h2>
          <p style={{ color: "rgba(197, 164, 93, 0.6)", fontStyle: "italic", fontSize: "0.9rem" }}>
            "Hmm... difficult. Very difficult. Plenty of cunning, remarkable wit, loyalty, and courage..."
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {SKILLS.map((skill, i) => (
            <div key={skill.name} style={{
              background: "rgba(10, 5, 20, 0.7)",
              border: `1px solid ${skill.color}44`,
              borderRadius: 8,
              padding: "20px 24px",
              animation: `fadeInUp ${0.3 + i * 0.1}s ease-out both`,
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
              }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ color: "#f5e6be", fontSize: "0.95rem" }}>{skill.name}</span>
                <span style={{
                  fontSize: "0.7rem",
                  padding: "2px 8px",
                  borderRadius: 10,
                  background: `${skill.color}22`,
                  color: skill.color,
                  border: `1px solid ${skill.color}44`,
                }}>{skill.house}</span>
              </div>
              <div style={{
                height: 6,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 3,
                overflow: "hidden",
              }}>
                <div style={{
                  height: "100%",
                  width: `${skill.level}%`,
                  background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                  borderRadius: 3,
                  animation: `barFill 1.5s ${i * 0.1}s ease-out both`,
                  boxShadow: `0 0 8px ${skill.color}66`,
                }} />
              </div>
              <div style={{ textAlign: "right", marginTop: 6, color: `${skill.color}`, fontSize: "0.8rem" }}>
                {skill.level} OWLs
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PROJECTS — COMMON ROOM ===== */}
      <section id="common-room" style={{
        minHeight: "100vh",
        padding: "100px 40px",
        position: "relative",
        zIndex: 2,
        maxWidth: 1100,
        margin: "0 auto",
      }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>📜</div>
          <h2 style={{
            color: "#f5e6be",
            fontSize: "2rem",
            fontWeight: "normal",
            letterSpacing: 4,
            margin: "0 0 12px",
          }}>The Portrait Gallery</h2>
          <p style={{ color: "rgba(197, 164, 93, 0.6)", fontStyle: "italic", fontSize: "0.9rem" }}>
            Hover to cast the spell and reveal each project's secrets
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
          {PROJECTS.map((project, i) => (
            <div
              key={project.name}
              onMouseEnter={() => {
                setHoveredProject(project.name);
                triggerSpell(project.spell);
              }}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                background: hoveredProject === project.name
                  ? "rgba(15, 10, 30, 0.95)"
                  : "rgba(10, 5, 20, 0.7)",
                border: `1px solid ${hoveredProject === project.name ? project.houseColor : "rgba(197, 164, 93, 0.2)"}`,
                borderRadius: 8,
                padding: "28px 28px",
                cursor: "none",
                transition: "all 0.4s ease",
                position: "relative",
                overflow: "hidden",
                transform: hoveredProject === project.name ? "translateY(-4px)" : "none",
                boxShadow: hoveredProject === project.name ? `0 20px 40px ${project.houseColor}33` : "none",
                animation: `fadeInUp ${0.3 + i * 0.15}s ease-out both`,
              }}>

              {/* Portrait frame corners */}
              {["0 0", "0 auto", "auto 0", "auto auto"].map((m, ci) => (
                <div key={ci} style={{
                  position: "absolute",
                  top: ci < 2 ? 8 : "auto",
                  bottom: ci >= 2 ? 8 : "auto",
                  left: ci % 2 === 0 ? 8 : "auto",
                  right: ci % 2 === 1 ? 8 : "auto",
                  width: 12, height: 12,
                  borderTop: ci < 2 ? `1px solid ${project.houseColor}66` : "none",
                  borderBottom: ci >= 2 ? `1px solid ${project.houseColor}66` : "none",
                  borderLeft: ci % 2 === 0 ? `1px solid ${project.houseColor}66` : "none",
                  borderRight: ci % 2 === 1 ? `1px solid ${project.houseColor}66` : "none",
                }} />
              ))}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <span style={{ fontSize: "2rem" }}>{project.rune}</span>
                <span style={{
                  fontSize: "0.7rem",
                  padding: "3px 10px",
                  borderRadius: 10,
                  background: `${project.houseColor}22`,
                  color: project.houseColor,
                  border: `1px solid ${project.houseColor}44`,
                  letterSpacing: 1,
                }}>{project.house}</span>
              </div>

              <h3 style={{
                color: "#f5e6be",
                fontSize: "1.2rem",
                fontWeight: "normal",
                letterSpacing: 2,
                margin: "0 0 8px",
              }}>{project.name}</h3>

              <div style={{
                color: "rgba(197, 164, 93, 0.5)",
                fontSize: "0.75rem",
                fontStyle: "italic",
                marginBottom: 12,
                letterSpacing: 1,
              }}>✨ {project.spell}</div>

              <p style={{
                color: "rgba(245, 230, 190, 0.7)",
                fontSize: "0.85rem",
                lineHeight: 1.7,
                margin: "0 0 16px",
                minHeight: hoveredProject === project.name ? 0 : "auto",
              }}>{project.description}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                {project.tech.map(t => (
                  <span key={t} style={{
                    padding: "3px 10px",
                    background: "rgba(197, 164, 93, 0.08)",
                    border: "1px solid rgba(197, 164, 93, 0.2)",
                    borderRadius: 12,
                    color: "rgba(197, 164, 93, 0.7)",
                    fontSize: "0.72rem",
                    letterSpacing: 0.5,
                  }}>{t}</span>
                ))}
              </div>

              <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: project.houseColor,
                textDecoration: "none",
                fontSize: "0.8rem",
                fontStyle: "italic",
                letterSpacing: 1,
                cursor: "none",
                transition: "opacity 0.3s",
              }}
                onClick={e => e.stopPropagation()}>
                Alohomora → View Project
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CONTACT — OWLERY ===== */}
      <section id="owlery" style={{
        padding: "100px 40px 120px",
        position: "relative",
        zIndex: 2,
        maxWidth: 600,
        margin: "0 auto",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "3rem", marginBottom: 12 }}>🦉</div>
        <h2 style={{
          color: "#f5e6be",
          fontSize: "2rem",
          fontWeight: "normal",
          letterSpacing: 4,
          margin: "0 0 12px",
        }}>Send an Owl</h2>
        <p style={{ color: "rgba(197, 164, 93, 0.6)", fontStyle: "italic", marginBottom: 40 }}>
          "Hedwig, deliver this message with haste."
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { label: "📧 Expecto Email", href: "mailto:diksha@example.com" },
            { label: "🐙 Accio GitHub", href: "https://github.com/Diksha238" },
            { label: "💼 Revelio LinkedIn", href: "#" },
          ].map(link => (
            <a key={link.label} href={link.href} style={{
              display: "block",
              padding: "16px 32px",
              background: "rgba(197, 164, 93, 0.06)",
              border: "1px solid rgba(197, 164, 93, 0.3)",
              borderRadius: 6,
              color: "#c5a45d",
              textDecoration: "none",
              fontSize: "1rem",
              fontFamily: "inherit",
              fontStyle: "italic",
              letterSpacing: 2,
              cursor: "none",
              transition: "all 0.3s",
            }}
              onMouseEnter={e => {
                e.target.style.background = "rgba(197, 164, 93, 0.15)";
                e.target.style.borderColor = "rgba(197, 164, 93, 0.6)";
                e.target.style.boxShadow = "0 0 20px rgba(197, 164, 93, 0.2)";
              }}
              onMouseLeave={e => {
                e.target.style.background = "rgba(197, 164, 93, 0.06)";
                e.target.style.borderColor = "rgba(197, 164, 93, 0.3)";
                e.target.style.boxShadow = "none";
              }}>
              {link.label}
            </a>
          ))}
        </div>

        <div style={{
          marginTop: 60,
          color: "rgba(197, 164, 93, 0.3)",
          fontSize: "0.8rem",
          fontStyle: "italic",
          letterSpacing: 2,
        }}>
          — Mischief Managed —
        </div>
      </section>

      <style>{`
        @keyframes floatCandle {
          from { transform: translateY(0px) rotate(-2deg); }
          to { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes flicker {
          0%, 100% { transform: scaleY(1) scaleX(1); opacity: 1; }
          50% { transform: scaleY(1.1) scaleX(0.9); opacity: 0.85; }
        }
        @keyframes twinkle {
          from { opacity: 0.2; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1.2); }
        }
        @keyframes wingFlap {
          from { transform: rotate(-30deg) scaleY(0.7); }
          to { transform: rotate(30deg) scaleY(1); }
        }
        @keyframes rotateSeal {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 rgba(197, 164, 93, 0); }
          50% { box-shadow: 0 0 24px rgba(197, 164, 93, 0.3); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes barFill {
          from { width: 0%; }
        }
        @keyframes spellFade {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          30% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
          70% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.3); }
        }
      `}</style>
    </div>
  );
}
