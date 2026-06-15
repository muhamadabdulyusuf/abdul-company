import { useEffect, useRef, useState } from "react";

import "./App.css";
import logoImage from "./assets/ABDUL_COMPANY.png";
import inventoryImage from "./assets/excel.jpg";
import founderImage from "./assets/founder-cutout.png";
import planningImage from "./assets/service1.jpg";
import notebookImage from "./assets/squre.jpg";
import arthaBrandLogo from "./assets/brands/artha-system.svg";
import groomingBrandLogo from "./assets/brands/grooming-co.svg";
import vittyaBrandLogo from "./assets/brands/vittya.svg";

import {
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiExternalLink,
  FiLoader,
  FiMail,
  FiMenu,
  FiX,
} from "react-icons/fi";
import {
  SiGmail,
  SiInstagram,
  SiLinkedin,
  SiTiktok,
  SiWhatsapp,
} from "react-icons/si";

const ARTHA_SYSTEM_URL = "https://artha-system.vercel.app";
const DRIVE_PROJECT_URL =
  "https://drive.google.com/drive/folders/1QEbfEMCTRlQiKwlsjx_VY4u_67QaNotp?usp=drive_link";

const socialLinks = [
  {
    icon: <SiWhatsapp />,
    label: "WhatsApp",
    href: "https://wa.me/6282320681141",
  },
  {
    icon: <SiInstagram />,
    label: "Instagram",
    href: "https://www.instagram.com/ab_duullll/",
  },
  {
    icon: <SiTiktok />,
    label: "TikTok",
    href: "https://www.tiktok.com/@abdul.yusuf_va?lang=en-GB",
  },
  {
    icon: <SiLinkedin />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhamad-abdul-yusuf-b862b7374/",
  },
  {
    icon: <SiGmail />,
    label: "Email",
    href: "mailto:muhaamdabdulyusuf73@gmail.com",
  },
  // {
  //   icon: <SiGithub />,
  //   label: "GitHub",
  //   href: "https://github.com/muhamadabdulyusuf",
  // },
];

const purposeLines = [
  {
    number: "01",
    title: "Yang dikerjain, disimpan jejaknya.",
    description:
      "Biar karya nggak cuma selesai, lewat, lalu hilang di folder. Ada tempat buat hasil, alasan, dan prosesnya.",
  },
  {
    number: "02",
    title: "Yang masih mentah, tetap boleh masuk.",
    description:
      "Ide nggak harus langsung kelihatan besar. Kadang cukup ditaruh dulu, diuji, lalu dibaca ulang saat waktunya tepat.",
  },
  {
    number: "03",
    title: "Yang tumbuh, bisa naik kelas.",
    description:
      "Kalau satu project makin jelas arahnya, dia bisa berdiri sebagai brand sendiri tanpa kehilangan asal ceritanya.",
  },
  {
    number: "04",
    title: "Yang beda bidang, tetap satu benang merah.",
    description:
      "Bidangnya boleh bebas. Standarnya tetap sama: rapi, jujur, berguna, dan bisa dipertanggungjawabkan.",
  },
];

const brandTicker = [
  {
    name: "Grooming Co.",
    logo: groomingBrandLogo,
    tone: "grooming",
  },
  {
    name: "Vittya.com",
    logo: vittyaBrandLogo,
    tone: "vittya",
  },
  {
    name: "Artha System",
    logo: arthaBrandLogo,
    tone: "artha",
  },
];

const systemSignals = [
  {
    label: "PO Signal",
    value: "Kapan harus beli lagi",
  },
  {
    label: "Upsell Cue",
    value: "Barang mana yang perlu didorong",
  },
  {
    label: "Stock Health",
    value: "Bagian mana yang mulai nggak sehat",
  },
];

const workSlides = [
  {
    title: "Artha System",
    eyebrow: "Produk sendiri / Inventory system",
    label: "Sudah live",
    image: inventoryImage,
    number: "01",
    description:
      "Artha System lahir dari rasa gemas pada stok yang sering dianggap angka mati. Di sini, stok dibaca seperti sinyal: kapan beli lagi, barang mana yang layak didorong, dan keputusan apa yang jangan ditunda.",
    points: ["Inventory control", "Worksheet", "Operational monitoring"],
    signals: systemSignals,
    primaryAction: {
      label: "Buka live site",
      href: ARTHA_SYSTEM_URL,
      external: true,
    },
    secondaryAction: {
      label: "Buka arsip",
      href: DRIVE_PROJECT_URL,
      external: true,
    },
    tone: "aqua",
  },
  {
    title: "Ruang Rasa",
    eyebrow: "Lorem concept / F&B direction",
    label: "Concept draft",
    image: planningImage,
    number: "02",
    description:
      "Lorem ipsum yang gue bayangin sebagai catatan rasa: tempat ide menu, suasana ruang, dan ritme pelayanan dikumpulkan sebelum punya bentuk bisnis yang utuh.",
    points: ["Menu note", "Hospitality", "Brand sketch"],
    primaryAction: {
      label: "Coming soon",
      href: "#contact",
    },
    secondaryAction: {
      label: "Catatan konsep",
      href: "#purpose",
    },
    tone: "amber",
  },
  {
    title: "Abdul Notes",
    eyebrow: "Lorem archive / Personal documentation",
    label: "In writing",
    image: notebookImage,
    number: "03",
    description:
      "Lorem ipsum buat ruang catatan: potongan proses, keputusan kecil, dan pelajaran yang belum tentu jadi brand, tapi tetap layak disimpan sebagai jejak.",
    points: ["Journal", "Process log", "Working notes"],
    primaryAction: {
      label: "Coming soon",
      href: "#contact",
    },
    secondaryAction: {
      label: "Lihat arah",
      href: "#vision",
    },
    tone: "violet",
  },
  {
    title: "Forma Studio",
    eyebrow: "Lorem concept / Creative direction",
    label: "Exploration",
    image: inventoryImage,
    number: "04",
    description:
      "Lorem ipsum sebagai wadah eksplorasi visual: identitas, interface, dan sistem kecil yang nanti bisa berubah jadi layanan, produk, atau kolaborasi.",
    points: ["Interface", "Identity", "Prototype"],
    primaryAction: {
      label: "Coming soon",
      href: "#contact",
    },
    secondaryAction: {
      label: "Mulai cerita",
      href: "#contact",
    },
    tone: "coral",
  },
];

function ContactForm() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  const FALLBACK_EMAIL = "muhaamdabdulyusuf73@gmail.com";
  const isWeb3FormsReady = Boolean(ACCESS_KEY);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!isWeb3FormsReady) {
      const form = event.target;
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const subject = encodeURIComponent(
        `Abdul Company inquiry from ${name || "Website Visitor"}`,
      );
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      );

      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
      setResult("Email Draft Ready");
      setIsSubmitting(false);
      setTimeout(() => setResult(""), 5000);
      return;
    }

    setResult("Sending....");

    const formData = new FormData(event.target);
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", "Pesan Baru dari Abdul Company");
    formData.append("botcheck", "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setResult("Form Submitted Successfully!");
        event.target.reset();
      } else {
        setResult(data.message || "Error submitting form. Please try again.");
      }
    } catch {
      setResult("Network Error. Please try again later.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setResult(""), 5000);
    }
  };

  const isSuccessfulResult =
    result.includes("Success") || result.includes("Ready");

  return (
    <form onSubmit={onSubmit} className="contact-form">
      <label>
        Nama
        <input
          type="text"
          name="name"
          placeholder="Nama lo"
          required
          disabled={isSubmitting}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          name="email"
          placeholder="email@domain.com"
          required
          disabled={isSubmitting}
        />
      </label>
      <label>
        Pesan
        <textarea
          name="message"
          placeholder="Tulis konteksnya: project, brand, masalah, atau bentuk kolaborasi yang lagi lo pikirkan..."
          required
          disabled={isSubmitting}
        ></textarea>
      </label>

      <button type="submit" disabled={isSubmitting} className="submit-btn">
        {isSubmitting ? (
          <>
            <FiLoader className="loading-icon" /> Mengirim
          </>
        ) : (
          <>
            <FiMail /> {isWeb3FormsReady ? "Kirim Pesan" : "Buka Draft Email"}
          </>
        )}
      </button>

      {!isWeb3FormsReady && (
        <p className="contact-form-note">
          Pesan akan dibuka sebagai draft email, supaya obrolan pertama tetap
          punya jejak yang jelas.
        </p>
      )}

      {result && result !== "Sending...." && (
        <span
          className={`form-status ${isSuccessfulResult ? "success" : "error"}`}
        >
          {isSuccessfulResult ? <FiCheckCircle /> : <FiAlertCircle />} {result}
        </span>
      )}
    </form>
  );
}

function App() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);

  const navbarRef = useRef(null);
  const hamburgerRef = useRef(null);
  const activeWork = workSlides[activeWorkIndex];

  const closeNavbar = () => setIsNavbarOpen(false);
  const goToWorkSlide = (index) => {
    setActiveWorkIndex((index + workSlides.length) % workSlides.length);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const isClickOnHamburger = hamburgerRef.current?.contains(event.target);
      const isClickOnNavbar = navbarRef.current?.contains(event.target);

      if (!isClickOnNavbar && !isClickOnHamburger) {
        setIsNavbarOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if (event.key === "Escape") {
        closeNavbar();
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveWorkIndex(
        (currentIndex) => (currentIndex + 1) % workSlides.length,
      );
    }, 6500);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <>
      <header className="site-header">
        <a className="brand-link" href="#home" onClick={closeNavbar}>
          <img src={logoImage} alt="Abdul Company" />
          <span>Abdul Company</span>
        </a>

        <nav
          ref={navbarRef}
          className={`site-nav ${isNavbarOpen ? "active" : ""}`}
          aria-label="Primary navigation"
        >
          <a href="#purpose" onClick={closeNavbar}>
            Purpose
          </a>
          <a href="#work" onClick={closeNavbar}>
            Work
          </a>
          <a href="#vision" onClick={closeNavbar}>
            Direction
          </a>
          <a href="#contact" onClick={closeNavbar}>
            Contact
          </a>
        </nav>

        <div className="header-actions">
          <a
            className="header-product-link"
            href={ARTHA_SYSTEM_URL}
            target="_blank"
            rel="noreferrer"
          >
            Artha System <FiExternalLink />
          </a>
          <button
            ref={hamburgerRef}
            type="button"
            className="menu-button"
            aria-label="Toggle navigation"
            aria-expanded={isNavbarOpen}
            onClick={() => setIsNavbarOpen((prev) => !prev)}
          >
            {isNavbarOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-wordmark" aria-hidden="true">
            Abdul Company
          </div>
          <div className="hero-figure" aria-hidden="true">
            <img src={founderImage} alt="" />
          </div>
          <div className="hero-note" aria-hidden="true">
            <span></span>
            <p>
              Kalam takdir belum terucap. Biarkan ia bersemayam dalam
              keheningan, mengalir tenang menuju takdirnya.
            </p>
          </div>

          <div className="hero-content">
            <p className="eyebrow">
              A journey of a thousand miles begins with a single step.
            </p>
            <h1>And Abdul Company is where that first step is taken.</h1>
            <p className="hero-copy">
              Sebuah arsip hidup dan lab kecil untuk ide-ide yang menolak
              berhenti sebagai draf. Tempat gue mencatat proses, menguji batas
              sistem, dan membangun fondasi awal bagi brand-brand masa depan.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                My recent work <FiArrowRight />
              </a>
              {/* <a
                className="button secondary"
                href={ARTHA_SYSTEM_URL}
                target="_blank"
                rel="noreferrer"
              >
                Buka Artha System <FiExternalLink />
              </a> */}
            </div>
          </div>

          <div className="hero-marquee" aria-hidden="true">
            <div>
              {[...brandTicker, ...brandTicker, ...brandTicker, ...brandTicker].map((brand, index) => (
                <span
                  className={`brand-ticker-item brand-ticker-${brand.tone}`}
                  key={`${brand.name}-${index}`}
                >
                  <img className="brand-logo" src={brand.logo} alt={brand.name} />
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="purpose section-shell" id="purpose">
          <div className="section-heading">
            <p className="eyebrow">Purpose</p>
            <h2>Bukan semua harus jadi besar. Tapi semua harus punya jejak.</h2>
            <p>
              Ini blog pribadi kalau dilihat dari isinya, dan brand kalau
              dilihat dari cara gue merapikannya. Tempat buat menaruh hal yang
              sedang dicari bentuknya, sampai sebagian dari mereka siap punya
              nama sendiri.
            </p>
          </div>

          <p className="manifesto-quote">
            Arsip ini bukan museum. Ini meja kerja yang terus bergerak.
          </p>

          <div className="purpose-lines">
            {purposeLines.map((line) => (
              <article key={line.title} className="purpose-line">
                <span className="purpose-index">{line.number}</span>
                <h3>{line.title}</h3>
                <p>{line.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="work section-shell" id="work">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">My Recent Work</p>
              <h2>Artha System bukan pajangan. Ini bukti kerja.</h2>
            </div>
            <p>
              Slide pertama adalah yang sudah hidup. Sisanya gue taruh sebagai
              ruang bayangan: ide yang nanti bisa dipilih, diuji, atau dibuang.
            </p>
          </div>

          <div className="work-carousel" aria-label="Recent work carousel">
            <article
              key={activeWork.title}
              className={`featured-work featured-work-${activeWork.tone}`}
            >
              <div className="featured-media">
                <img
                  src={activeWork.image}
                  alt={`${activeWork.title} preview`}
                />
                <div className="live-badge">{activeWork.label}</div>
              </div>
              {activeWork.signals && (
                <div className="system-signals" aria-hidden="true">
                  {activeWork.signals.map((signal) => (
                    <div key={signal.label}>
                      <span>{signal.label}</span>
                      <strong>{signal.value}</strong>
                    </div>
                  ))}
                </div>
              )}
              <div className="featured-copy">
                <span className="featured-number">{activeWork.number}</span>
                <p className="eyebrow">{activeWork.eyebrow}</p>
                <h3>{activeWork.title}</h3>
                <p>{activeWork.description}</p>
                <div className="feature-points">
                  {activeWork.points.map((point) => (
                    <span key={point}>{point}</span>
                  ))}
                </div>
                <div className="work-actions">
                  <a
                    className="button primary"
                    href={activeWork.primaryAction.href}
                    target={
                      activeWork.primaryAction.external ? "_blank" : undefined
                    }
                    rel={
                      activeWork.primaryAction.external
                        ? "noreferrer"
                        : undefined
                    }
                  >
                    {activeWork.primaryAction.label}{" "}
                    {activeWork.primaryAction.external ? (
                      <FiExternalLink />
                    ) : (
                      <FiArrowRight />
                    )}
                  </a>
                  <a
                    className="button ghost"
                    href={activeWork.secondaryAction.href}
                    target={
                      activeWork.secondaryAction.external ? "_blank" : undefined
                    }
                    rel={
                      activeWork.secondaryAction.external
                        ? "noreferrer"
                        : undefined
                    }
                  >
                    {activeWork.secondaryAction.label}{" "}
                    {activeWork.secondaryAction.external ? (
                      <FiExternalLink />
                    ) : (
                      <FiArrowRight />
                    )}
                  </a>
                </div>
              </div>
            </article>

            <div className="carousel-controls" aria-label="Work slide controls">
              <button
                type="button"
                className="carousel-arrow"
                aria-label="Previous work"
                onClick={() => goToWorkSlide(activeWorkIndex - 1)}
              >
                <span aria-hidden="true">{"<"}</span>
              </button>
              <div className="carousel-dots">
                {workSlides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    className={index === activeWorkIndex ? "active" : ""}
                    aria-label={`Go to ${slide.title}`}
                    aria-current={index === activeWorkIndex}
                    onClick={() => goToWorkSlide(index)}
                  >
                    <span>{slide.number}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="carousel-arrow"
                aria-label="Next work"
                onClick={() => goToWorkSlide(activeWorkIndex + 1)}
              >
                <span aria-hidden="true">{">"}</span>
              </button>
            </div>
          </div>
        </section>

        <section className="vision section-shell" id="vision">
          <div className="vision-copy">
            <p className="eyebrow">Direction</p>
            <h2>Pelan-pelan, arsip ini jadi peta jalan.</h2>
            <p>
              Gue nggak mau Abdul Company terdengar lebih besar dari
              kenyataannya. Tapi gue juga nggak mau perjalanan ini berantakan.
              Jadi tiap langkah dirapikan: mana yang jadi project, mana yang
              jadi brand, mana yang cukup tinggal sebagai pelajaran.
            </p>
          </div>
          <div className="vision-grid">
            <div>
              <strong>01</strong>
              <span>Arsip kerja yang terus diisi</span>
            </div>
            <div>
              <strong>02</strong>
              <span>Project nyata ditaruh paling depan</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Brand kecil tumbuh kalau sudah siap</span>
            </div>
            <div>
              <strong>04</strong>
              <span>Kolaborasi masuk saat nilainya jelas</span>
            </div>
          </div>
        </section>

        <section className="contact section-shell" id="contact">
          <div className="contact-layout">
            <div className="contact-copy">
              <p className="eyebrow">Contact</p>
              <h2>Kalau ada yang nyambung, mulai dari cerita.</h2>
              <p>
                Buat project, dokumentasi, sistem, brand kecil, atau kolaborasi,
                kirim pesan tentang apa yang lagi lo pikirin. Nggak perlu
                dibikin kaku. Yang penting arahnya jelas.
              </p>
              <div className="social-row" aria-label="Social links">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={
                      link.href.startsWith("mailto:") ? undefined : "_blank"
                    }
                    rel={
                      link.href.startsWith("mailto:") ? undefined : "noreferrer"
                    }
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <img src={logoImage} alt="Abdul Company" />
          <span>Abdul Company</span>
        </div>
        <p>
          Arsip pribadi berwajah brand: tempat project, catatan, eksperimen, dan
          kolaborasi gue kumpulkan.
        </p>
        <p>(c) 2026 Muhamad Abdul Yusuf. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
