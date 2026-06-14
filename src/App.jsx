import { useEffect, useRef, useState } from "react";

import "./App.css";
import logoImage from "./assets/ABDUL_COMPANY.png";
import handbookCoverImage from "./assets/cover-handbook.png";
import inventoryImage from "./assets/excel.jpg";
import projectImage from "./assets/squre.jpg";

import PdfPreview from "./component/PdfPreview";

import {
  SiGithub,
  SiGmail,
  SiInstagram,
  SiLinkedin,
  SiTiktok,
  SiWhatsapp,
} from "react-icons/si";
import {
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiExternalLink,
  FiFileText,
  FiLoader,
  FiMail,
  FiMenu,
  FiX,
} from "react-icons/fi";

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
  {
    icon: <SiGithub />,
    label: "GitHub",
    href: "https://github.com/muhamadabdulyusuf",
  },
];

const purposeCards = [
  {
    title: "Merawat Jejak",
    description:
      "Setiap karya punya asal-usul. Abdul Company mencatat prosesnya agar perjalanan tidak hilang setelah hasilnya selesai.",
  },
  {
    title: "Menguji Bentuk",
    description:
      "Project yang tumbuh akan diuji pelan-pelan sampai cukup matang untuk berdiri sebagai brand sendiri.",
  },
  {
    title: "Menjaga Kejujuran",
    description:
      "Yang ditampilkan harus punya konteks, proses, atau bukti. Tidak perlu terlihat besar sebelum waktunya.",
  },
  {
    title: "Lintas Bidang",
    description:
      "Bidangnya boleh berubah: system, hospitality, F&B, creative, digital product, atau clothing. Yang dijaga adalah arahnya.",
  },
];

const principles = [
  "Rapi",
  "Jujur",
  "Tumbuh",
  "Fungsional",
  "Elegant",
  "Disiplin",
  "Trustworthy",
  "Kolaboratif",
];

const archiveProjects = [
  {
    title: "Handbook by Ari",
    label: "Document case",
    image: handbookCoverImage,
    description:
      "Handbook ini menjadi catatan bahwa informasi yang rapi bisa mengubah pengetahuan sederhana menjadi pegangan kerja.",
    action: "Preview PDF",
    type: "preview",
  },
  {
    title: "Abdul Company Website",
    label: "Parent brand home",
    image: projectImage,
    description:
      "Website ini adalah fondasi rumah induk: tempat karya, arsip, eksperimen, dan brand kecil disusun agar punya arah.",
    action: "View site",
    href: "#home",
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
          {isSuccessfulResult ? <FiCheckCircle /> : <FiAlertCircle />}{" "}
          {result}
        </span>
      )}
    </form>
  );
}

function App() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const navbarRef = useRef(null);
  const hamburgerRef = useRef(null);

  const closeModal = () => setActiveModal(null);

  const openPdfPreview = (event) => {
    event.preventDefault();
    setActiveModal({
      type: "pdf",
      title: "Handbook by Ari",
      detail: "Catatan dokumen dari arsip kerja Abdul Company.",
      pdfSrc: "/documents/handbook.pdf",
    });
  };

  const closeNavbar = () => setIsNavbarOpen(false);

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
        closeModal();
        closeNavbar();
      }

      const isPreviewShortcut =
        (event.ctrlKey || event.metaKey) &&
        ["s", "p"].includes(event.key.toLowerCase());

      if (activeModal?.type === "pdf" && isPreviewShortcut) {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [activeModal]);

  useEffect(() => {
    if (!activeModal) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeModal]);

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
          <div className="hero-content">
            <p className="eyebrow">Founder-led creative studio in progress</p>
            <h1>Tempat karya bertumbuh sebelum menemukan bentuk besarnya.</h1>
            <p className="hero-copy">
              Abdul Company adalah ruang induk untuk merawat proses: mencatat
              yang sedang dibangun, menguji gagasan di dunia nyata, lalu
              memberi tempat bagi project seperti Artha System untuk tumbuh
              menjadi brand yang utuh.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                Lihat Jejak Karya <FiArrowRight />
              </a>
              <a
                className="button secondary"
                href={ARTHA_SYSTEM_URL}
                target="_blank"
                rel="noreferrer"
              >
                Buka Artha System <FiExternalLink />
              </a>
            </div>
          </div>

          <div className="hero-status" aria-label="Abdul Company direction">
            <div>
              <span>Yang dijaga</span>
              <strong>Jejak karya</strong>
            </div>
            <div>
              <span>Bentuk pertama</span>
              <strong>Artha System</strong>
            </div>
            <div>
              <span>Arah berikutnya</span>
              <strong>Studio brand kecil</strong>
            </div>
          </div>
        </section>

        <section className="purpose section-shell" id="purpose">
          <div className="section-heading">
            <p className="eyebrow">Purpose</p>
            <h2>Bukan panggung untuk terlihat besar. Ini ruang untuk bertumbuh dengan arah.</h2>
            <p>
              Fokus utamanya adalah dokumentasi perjalanan. Dari sana, setiap
              project bisa menemukan bentuknya sendiri tanpa kehilangan asalnya.
            </p>
          </div>

          <div className="purpose-grid">
            {purposeCards.map((card) => (
              <article key={card.title} className="purpose-card">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>

          <div className="principles-strip" aria-label="Brand principles">
            {principles.map((principle) => (
              <span key={principle}>{principle}</span>
            ))}
          </div>
        </section>

        <section className="work section-shell" id="work">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">My Recent Work</p>
              <h2>Bukti lebih dulu. Cerita menyusul dengan tenang.</h2>
            </div>
            <p>
              Untuk sekarang, bagian ini adalah pusat Abdul Company. Tiap karya
              tidak hanya dipajang, tapi dicatat sebagai jejak keputusan,
              percobaan, dan keberanian untuk mulai.
            </p>
          </div>

          <article className="featured-work">
            <div className="featured-media">
              <img src={inventoryImage} alt="Artha System inventory project" />
              <div className="live-badge">Live product</div>
            </div>
            <div className="featured-copy">
              <p className="eyebrow">Owned brand / Inventory system</p>
              <h3>Artha System</h3>
              <p>
                Artha System lahir dari kebutuhan untuk membuat operasional
                lebih sadar terhadap datanya sendiri. Ia bukan hanya menghitung
                stok, tapi membaca ritme kerja: kapan harus PO, apa yang perlu
                didorong, dan keputusan apa yang sebaiknya dibuat sebelum
                masalah terlihat.
              </p>
              <div className="feature-points">
                <span>Inventory control</span>
                <span>Worksheet</span>
                <span>Operational monitoring</span>
              </div>
              <div className="work-actions">
                <a
                  className="button primary"
                  href={ARTHA_SYSTEM_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Buka live site <FiExternalLink />
                </a>
                <a
                  className="button ghost"
                  href={DRIVE_PROJECT_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Buka arsip <FiArrowRight />
                </a>
              </div>
            </div>
          </article>

          <div className="archive-grid">
            {archiveProjects.map((project) => (
              <article key={project.title} className="archive-card">
                <img src={project.image} alt={project.title} />
                <div>
                  <span>{project.label}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.type === "preview" ? (
                    <a href="#preview" onClick={openPdfPreview}>
                      <FiFileText /> {project.action}
                    </a>
                  ) : (
                    <a href={project.href}>
                      {project.action} <FiArrowRight />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="vision section-shell" id="vision">
          <div className="vision-copy">
            <p className="eyebrow">Direction</p>
            <h2>Yang dicari bukan riuh. Yang dibangun adalah arah.</h2>
            <p>
              Satu tahun ke depan, Abdul Company diarahkan menjadi rumah yang
              lebih tertata: tempat project diuji, brand kecil dirawat, client
              dipilih dengan cocok, dan partner dibangun dengan nilai yang
              sejalan.
            </p>
          </div>
          <div className="vision-grid">
            <div>
              <strong>03</strong>
              <span>project aktif</span>
            </div>
            <div>
              <strong>05</strong>
              <span>brand kecil</span>
            </div>
            <div>
              <strong>01</strong>
              <span>company profile</span>
            </div>
            <div>
              <strong>+</strong>
              <span>client dan partner</span>
            </div>
          </div>
        </section>

        <section className="contact section-shell" id="contact">
          <div className="contact-layout">
            <div className="contact-copy">
              <p className="eyebrow">Contact</p>
              <h2>Percakapan yang baik biasanya dimulai dari konteks yang jujur.</h2>
              <p>
                Untuk project, dokumentasi, brand kecil, atau kolaborasi, kirim
                pesan singkat tentang apa yang sedang lo bangun dan kenapa itu
                penting. Dari sana, arah bisa dibaca lebih jernih.
              </p>
              <div className="social-row" aria-label="Social links">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
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
          Personal brand yang sedang tumbuh menjadi creative studio untuk
          karya yang terdokumentasi, brand kecil, dan kolaborasi yang punya
          arah.
        </p>
        <p>(c) 2026 Muhamad Abdul Yusuf. All rights reserved.</p>
      </footer>

      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content pdf-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="pdf-close-icon"
              onClick={closeModal}
              aria-label="Close preview"
            >
              <FiX />
            </button>

            <div className="pdf-modal-header">
              <div>
                <p className="eyebrow">Archive preview</p>
                <h3>{activeModal.title}</h3>
                <p>{activeModal.detail}</p>
              </div>
            </div>

            <div
              className="pdf-preview-shell"
              onContextMenu={(event) => event.preventDefault()}
              onDragStart={(event) => event.preventDefault()}
            >
              <PdfPreview src={activeModal.pdfSrc} />
            </div>

            <div className="pdf-modal-footer">
              <p>Preview ini adalah bagian dari arsip kerja Abdul Company.</p>
              <a className="button secondary" href="#contact" onClick={closeModal}>
                Mulai percakapan <FiArrowRight />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
