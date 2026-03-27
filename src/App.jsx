// ====================== IMPORTS ======================
import { useEffect, useRef, useState } from "react";

// Pastikan path dan file ini ada di folder Anda
import "./App.css";
import logoImage from "./assets/ABDUL_COMPANY.png";
import handbookCoverImage from "./assets/cover-handbook.png";
import inventoryImage from "./assets/excel.jpg";
import projectImage from "./assets/squre.jpg";

// Komponen custom (Pastikan file-file ini ada di folder './component')
import FallingText from "./component/FallingText";
import Lanyard from "./component/Lanyard";
import LogoLoop from "./component/LogoLoop";
import PdfPreview from "./component/PdfPreview";
import ScrollReveal from "./component/ScrollReveal";

// Library Icons
import {
  SiGithub,
  SiGmail,
  SiInstagram,
  SiLinkedin,
  SiTiktok,
  SiWhatsapp,
} from "react-icons/si";
// Icon untuk Form Status
import { FiAlertCircle, FiCheckCircle, FiLoader } from "react-icons/fi";

// ====================== DATA ======================
const techLogos = [
  {
    node: <SiWhatsapp />,
    title: "WhatsApp Communication",
    href: "https://wa.me/6282320681141",
  },
  {
    node: <SiInstagram />,
    title: "Instagram Management",
    href: "https://www.instagram.com/ab_duullll/",
  },
  {
    node: <SiTiktok />,
    title: "TikTok Content",
    href: "https://www.tiktok.com/@abdul.yusuf_va?lang=en-GB",
  },
  {
    node: <SiLinkedin />,
    title: "LinkedIn Outreach",
    href: "https://www.linkedin.com/in/muhamad-abdul-yusuf-b862b7374/",
  },
  {
    node: <SiGmail />,
    title: "Gmail Management",
    href: "mailto:muhaamdabdulyusuf73@gmail.com",
  },
  {
    node: <SiGithub />,
    title: "GitHub",
    href: "https://github.com/muhamadabdulyusuf",
  },
];

// ====================== CONTACT FORM ======================
function ContactForm() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Kunci Akses Web3Forms diambil dari .env.local
  // VARIABEL INI HARUS ADA DI .env LOKAL DAN DI KONFIGURASI VERCEL
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
      const subject = encodeURIComponent(`Inquiry from ${name || "Website Visitor"}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      );

      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
      setResult("Mail Draft Opened Successfully!");
      setIsSubmitting(false);
      setTimeout(() => setResult(""), 5000);
      return;
    }

    setResult("Sending....");

    const formData = new FormData(event.target);
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", "Pesan Baru dari Portofolio Web Abdul");
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

  return (
    <form onSubmit={onSubmit} className="contact-form">
      <input
        type="text"
        name="name"
        placeholder="Nama Anda"
        required
        disabled={isSubmitting}
      />
      <input
        type="email"
        name="email"
        placeholder="Email Anda"
        required
        disabled={isSubmitting}
      />
      <textarea
        name="message"
        placeholder="Pesan Anda"
        required
        disabled={isSubmitting}
      ></textarea>

      <button type="submit" disabled={isSubmitting} className="submit-btn">
        {isSubmitting ? (
          <>
            <FiLoader className="loading-icon" /> Mengirim...
          </>
        ) : !isWeb3FormsReady ? (
          "Open Email Draft"
        ) : (
          "Submit Form"
        )}
      </button>

      {!isWeb3FormsReady && (
        <p className="contact-form-note">
          Web form belum dikonfigurasi. Untuk sementara tombol ini akan membuka
          draft email ke Abdul Company.
        </p>
      )}

      {/* Menampilkan status dengan icon yang lebih visual */}
      {result && result !== "Sending...." && (
        <span
          className={`form-status ${result.includes("Success") ? "success" : "error"}`}
        >
          {result.includes("Success") ? <FiCheckCircle /> : <FiAlertCircle />}{" "}
          {result}
        </span>
      )}
    </form>
  );
}

// ====================== APP ======================
function App() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModal, setActiveModal] = useState(null);

  const navbarRef = useRef(null);
  const hamburgerRef = useRef(null);
  const searchInputRef = useRef(null);

  const openServiceModal = (e, title, detail) => {
    e.preventDefault();
    setActiveModal({ type: "service", title, detail });
  };

  const openPdfPreview = (e) => {
    e.preventDefault();
    setActiveModal({
      type: "pdf",
      title: "Bare Minimum Crew",
      detail: "",
      pdfSrc: "/documents/handbook.pdf",
    });
  };

  const closeModal = () => setActiveModal(null);

  const handleHamburgerClick = () => {
    setIsNavbarOpen((prev) => !prev);
    if (isSearchVisible) setIsSearchVisible(false);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (isSearchVisible && searchTerm.length > 0) {
      handleSearchSubmit(e);
      return;
    }
    setIsSearchVisible(true);
    setSearchTerm("");
    if (isNavbarOpen) setIsNavbarOpen(false);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearchVisible(false);
    setSearchTerm("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }

    const handleOutsideClick = (event) => {
      const isClickOnHamburger = hamburgerRef.current?.contains(event.target);
      const isClickOnNavbar = navbarRef.current?.contains(event.target);
      const isClickOnSearchIcon = event.target.closest("#search");
      const isClickOnSearchForm = searchInputRef.current
        ?.closest(".search-form")
        ?.contains(event.target);

      if (isSearchVisible && !isClickOnSearchForm && !isClickOnSearchIcon) {
        setIsSearchVisible(false);
        setSearchTerm("");
      }
      if (!isClickOnNavbar && !isClickOnHamburger && !isClickOnSearchIcon) {
        setIsNavbarOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isNavbarOpen, isSearchVisible]);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === "Enter" && isSearchVisible) handleSearchSubmit(e);
      if (e.key === "Escape" && activeModal) closeModal();

      const isPreviewShortcut =
        (e.ctrlKey || e.metaKey) && ["s", "p"].includes(e.key.toLowerCase());

      if (activeModal?.type === "pdf" && isPreviewShortcut) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [activeModal, isSearchVisible]);

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
      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo">
          <img
            src={logoImage}
            className="navbar-logo"
            alt="Logo Abdul Company"
          />
          <a className="navbar-logo-text" href="#home">
            abdul
          </a>
        </div>
        <div
          ref={navbarRef}
          className={`navbar-nav ${isNavbarOpen ? "active" : ""}`}
        >
          <a href="#home">Home</a>
          <a href="#about">About Me</a>
          <a href="#service">Service</a>
          <a href="#project">Project</a>
        </div>
        <div className="navbar-extra">
          <div className={`search-form ${isSearchVisible ? "active" : ""}`}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Cari..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <a href="#" id="search" onClick={handleSearchClick}>
            <i data-feather="search"></i>
          </a>
          <button
            ref={hamburgerRef}
            className="hamburger-btn"
            onClick={handleHamburgerClick}
          >
            <i data-feather="menu"></i>
          </button>
        </div>
      </div>

      {/* HERO */}
      <section className="hero" id="home">
        <main className="content">
          <span className="hero-eyebrow">Abdul Company Creative Laboratory</span>
          <h1>
            Tempat kerja yang <span>tenang, rapi, dan terus bertumbuh.</span>
          </h1>
          <p>
            Abdul Company adalah ruang tempat karya, sistem, dan kolaborasi
            saya disusun dengan pendekatan yang bersih, fungsional, dan
            profesional.
          </p>
          <div className="hero-actions">
            <a href="#project" className="cta">
              View Selected Work
            </a>
          </div>
        </main>
      </section>

      <div className="lanyard-wrapper">
        <Lanyard />
      </div>

      {/* ABOUT */}
      <section id="about" className="about">
        <h2>
          About <span>Me</span>
        </h2>
        <p className="section-intro">
          Abdul Company saya bangun sebagai ruang kerja yang mendokumentasikan
          proses, sistem, dan hasil nyata dari tiap proyek yang saya tangani.
        </p>
        <div className="about-row">
          <div className="about-content">
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur={0}
              baseRotation={0}
              blurStrength={0.2}
            >
              Hai! Saya Muhamad Abdul Yusuf. Berpengalaman di dunia hospitality,
              berangkat dari Food & Beverage Service. Suka kerja yang dinamis,
              ketemu banyak orang, dan kasih pelayanan yang bikin tamu merasa
              nyaman dan puas. Selain itu, saya juga jalanin kerjaan sebagai
              Virtual Assistant. Biasanya bantu ngatur jadwal, bikin dokumen,
              riset, atau tugas-tugas ringan lainnya.
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SERVICE */}
      <section id="service" className="service">
        <h2>
          What I Bring <span>to Your Table</span>
        </h2>
        <p className="section-intro">
          Fokus saya adalah membuat alur kerja lebih ringan, lebih rapi, dan
          lebih siap dipakai dalam kebutuhan operasional sehari-hari.
        </p>
        <div className="demo">
          <FallingText
            text={
              "Email Management Administrative Sosial Media Management Excel Word Power Point Hospitality Food and Beverage Service Barista"
            }
            highlightWords={["..."]}
            highlightClass="highlighted"
            trigger="hover"
            backgroundColor="transparent"
            gravity={0.56}
            mouseConstraintStiffness={0.9}
          />
        </div>
        <div className="service-cards-container">
          {/* Email Management */}
          <div className="service-card">
            <i data-feather="mail" className="service-icon"></i>
            <h3>Email Management</h3>
            <p>
              Mengatur lalu lintas pesan masuk (inbox), menyusun draf balasan
              profesional, serta melakukan kurasi email penting agar komunikasi
              bisnis tetap berjalan lancar.
            </p>
            <a
              href="#!"
              className="service-cta"
              onClick={(e) =>
                openServiceModal(
                  e,
                  "Email Management",
                  "• Memfilter email masuk berdasarkan prioritas.\n• Menyusun draf balasan profesional untuk klien.\n• Membersihkan spam dan mengorganisir folder arsip.",
                )
              }
            >
              Learn More
            </a>
          </div>

          {/* Microsoft Office */}
          <div className="service-card">
            <i data-feather="layers" className="service-icon"></i>
            <h3>Microsoft Office</h3>
            <p>
              Mahir mengoperasikan Word, Excel, dan PowerPoint untuk mendukung
              kebutuhan bisnis dan presentasi.
            </p>
            <a
              href="#!"
              className="service-cta"
              onClick={(e) =>
                openServiceModal(
                  e,
                  "Microsoft Office",
                  "• Excel: Pembuatan laporan keuangan, pivot table, dan otomasi data.\n• Word: Pembuatan surat resmi, proposal, dan dokumen bisnis.\n• PPT: Desain slide presentasi yang clean dan profesional.",
                )
              }
            >
              Learn More
            </a>
          </div>

          {/* Administrative */}
          <div className="service-card">
            <i data-feather="clipboard" className="service-icon"></i>
            <h3>Administrative</h3>
            <p>
              Menyediakan dukungan operasional mulai dari entri data, manajemen
              jadwal, hingga pengarsipan dokumen digital.
            </p>
            <a
              href="#!"
              className="service-cta"
              onClick={(e) =>
                openServiceModal(
                  e,
                  "Administrative Support",
                  "• Data Entry: Input data cepat dengan akurasi tinggi.\n• Calendar Management: Mengatur jadwal meeting dan pengingat harian.\n• Digital Filing: Pengarsipan dokumen cloud yang sistematis.",
                )
              }
            >
              Learn More
            </a>
          </div>

          {/* Sosial Media Management */}
          <div className="service-card">
            <i data-feather="share-2" className="service-icon"></i>
            <h3>Sosial Media Management</h3>
            <p>
              Mengelola kehadiran digital melalui perencanaan konten yang
              konsisten dan memantau interaksi audiens.
            </p>
            <a
              href="#!"
              className="service-cta"
              onClick={(e) =>
                openServiceModal(
                  e,
                  "Social Media Management",
                  "• Content Planning: Membuat kalender konten mingguan.\n• Audience Interaction: Merespons komentar dan DM secara profesional.\n• Analytics: Memantau pertumbuhan followers dan engagement.",
                )
              }
            >
              Learn More
            </a>
          </div>

          {/* Design */}
          <div className="service-card">
            <i data-feather="pen-tool" className="service-icon"></i>
            <h3>Design</h3>
            <p>
              Menyediakan jasa desain grafis kreatif untuk kebutuhan promosi,
              konten media sosial, dan presentasi.
            </p>
            <a
              href="#!"
              className="service-cta"
              onClick={(e) =>
                openServiceModal(
                  e,
                  "Creative Design",
                  "• Social Media Graphics: Desain feed dan story Instagram yang estetik.\n• Presentation Design: Slide PowerPoint/Canva yang profesional.\n• Branding: Pembuatan aset visual sederhana untuk identitas bisnis.",
                )
              }
            >
              Learn More
            </a>
          </div>

          {/* Barista */}
          <div className="service-card">
            <i data-feather="coffee" className="service-icon"></i>
            <h3>Barista</h3>
            <p>
              Dalam dua bulan perjalanan sebagai barista, saya fokus menjaga
              konsistensi rasa dan kualitas visual latte art. Meski tergolong
              singkat, progres ini menjadi pencapaian pribadi bagi saya karena
              mampu menguasai teknik dan komposisi menu secara cepat dan
              presisi.
            </p>
            <a
              href="#!"
              className="service-cta"
              onClick={(e) =>
                openServiceModal(
                  e,
                  "Barista Experience",
                  "Pencapaian dalam 2 Bulan:\n• Hafal 15+ resep beverage (Espresso & Non-Coffee) secara presisi.\n• Menguasai teknik milk steaming untuk texture yang halus.\n• Mahir membuat basic latte art (Pattern Love) untuk standar sajian.",
                )
              }
            >
              Learn More
            </a>
          </div>

          {/* Hospitality */}
          <div className="service-card">
            <i data-feather="user-check" className="service-icon"></i>
            <h3>Hospitality</h3>
            <p>
              Memiliki pengalaman operasional yang kuat di bagian F&B Service.
              Terbiasa menangani Guest Service secara langsung, efisiensi Room
              Service, hingga koordinasi tim di bagian Banquet. Komitmen saya
              adalah memberikan pelayanan yang cepat, ramah, dan sesuai standar
              hospitality
            </p>
            <a
              href="#!"
              className="service-cta"
              onClick={(e) =>
                openServiceModal(
                  e,
                  "Hospitality & F&B Service",
                  "Detail Pengalaman:\n• Waiter: Menangani guest relations dan table setup.\n• Room Service: Delivering food & service dengan standar privasi tamu.\n• Banquet: Berpengalaman melayani event berskala besar (Wedding/Gala).",
                )
              }
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* PROJECT */}
      <section id="project" className="project">
        <h2>
          My Recent <span>Work</span>
        </h2>
        <p className="project-subheading">
          Beberapa proyek dan hasil kerja yang menunjukkan keahlian saya.
        </p>
        <div className="project-row">
          <div className="project-card">
            <img
              src={inventoryImage}
              alt="Project: Inventory Management"
              className="project-card-img"
            />
            <h3 className="project-card-title">
              Project: Inventory Management
            </h3>
            <p className="project-card-description">
              Sistem inventaris otomatis yang memangkas proses manual. Input
              data penjualan, sistem menghitung sisa stok dan bahan baku secara
              real-time menggunakan formula Excel.
            </p>
            <a
              href="https://drive.google.com/drive/folders/1QEbfEMCTRlQiKwlsjx_VY4u_67QaNotp?usp=drive_link"
              className="project-link"
            >
              Download Now <i data-feather="arrow-right"></i>
            </a>
          </div>
          <div className="project-card">
            <img
              src={handbookCoverImage}
              alt="Project: Internal Comms Hub"
              className="project-card-img"
            />
            <h3 className="project-card-title">Project: Handbook by Ari</h3>
            <p className="project-card-description">
              Company handbook dalam format PDF dengan layout yang rapi untuk
              kebutuhan operasional, panduan internal, dan referensi kerja
              harian.
            </p>
            <a
              href="#preview"
              className="project-link"
              onClick={openPdfPreview}
            >
              Preview <i data-feather="arrow-right"></i>
            </a>
          </div>
          <div className="project-card">
            <img
              src={projectImage}
              alt="Project: Portofolio Web UI"
              className="project-card-img"
            />
            <h3 className="project-card-title">Project: Personal Web Presence</h3>
            <p className="project-card-description">
              Website presentasi personal yang dirancang untuk menampilkan karya,
              layanan, dan identitas kerja secara lebih terstruktur dan modern.
            </p>
            <a href="#home" className="project-link">
              View Case <i data-feather="arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact">
        <h2>
          Get In <span>Touch</span>
        </h2>
        <p className="contact-subheading">
          Jika kamu ingin membahas kolaborasi, sistem kerja, atau kebutuhan
          dokumen tertentu, kirimkan pesan melalui formulir di bawah ini.
        </p>
        <div className="contact-form-container">
          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div
          style={{
            height: "50px",
            width: "100%",
            position: "relative",
            overflow: "hidden",
            marginBottom: "20px",
          }}
        >
          <LogoLoop
            logos={techLogos}
            speed={60}
            direction="left"
            logoHeight={25}
            gap={10}
            hoverSpeed={0}
            scaleOnHover={true}
            fadeOut
            fadeOutColor="#1A1A1A"
            ariaLabel="Technology stack used"
          />
        </div>
        <p className="footer-title">Abdul Company</p>
        <p className="footer-copy">
          A working archive for selected systems, documents, and collaborative
          outputs.
        </p>
        <p>&copy; 2025 Muhamad Abdul Yusuf. All rights reserved.</p>
      </footer>

      {/* MODAL COMPONENT */}
      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className={`modal-content ${activeModal.type === "pdf" ? "pdf-modal" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-modal"
              onClick={closeModal}
              aria-label="Close preview"
            >
              &times;
            </button>

            {activeModal.type === "pdf" ? (
              <>
                <button
                  type="button"
                  className="pdf-close-icon"
                  onClick={closeModal}
                  aria-label="Close preview"
                >
                  &times;
                </button>

                <div className="pdf-modal-header">
                  <div>
                    <h3>{activeModal.title}</h3>
                    <p>{activeModal.detail}</p>
                  </div>
                </div>

                <div
                  className="pdf-preview-shell"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                >
                  <PdfPreview src={activeModal.pdfSrc} />
                </div>

                <div className="pdf-modal-footer">
                  <p>Preview mode is optimized for reading across desktop, tablet, and mobile.</p>
                  <div className="pdf-modal-footer-actions">
                    <a href="#contact" className="cta" onClick={closeModal}>
                      Discuss Similar Work
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3>{activeModal.title}</h3>
                <div className="modal-body">
                  <p style={{ whiteSpace: "pre-line" }}>{activeModal.detail}</p>
                </div>
                <a href="#contact" className="cta" onClick={closeModal}>
                  Hire Me
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
