emailjs.init({
  publicKey: "jrEFSAuOigClUp_rS",
});

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");
const requiredFields = [
  { id: "name", errorId: "name-error", validator: (value) => value.trim().length >= 2 },
  { id: "email", errorId: "email-error", validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) },
  { id: "subject", errorId: "subject-error", validator: (value) => value.trim().length >= 3 },
  { id: "message", errorId: "message-error", validator: (value) => value.trim().length >= 10 },
];

function validateForm() {
  let valid = true;

  requiredFields.forEach(({ id, errorId, validator }) => {
    const input = document.getElementById(id);
    const error = document.getElementById(errorId);
    const value = input.value;
    const isValid = validator(value);

    error.textContent = isValid ? "" : "Please provide a valid value.";

    if (!isValid) {
      valid = false;
    }
  });

  return valid;
}

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!validateForm()) {
    formStatus.textContent = "Please complete the highlighted fields before sending.";
    return;
  }

  submitBtn.classList.add("is-loading");
  submitBtn.disabled = true;
  formStatus.textContent = "Sending your message...";

  emailjs
    .sendForm("service_ls4nzew", "template_3n7ejcq", contactForm)
    .then(() => {
      formStatus.textContent = "Message sent successfully! I’ll get back to you soon.";
      contactForm.reset();
      requiredFields.forEach(({ errorId }) => {
        document.getElementById(errorId).textContent = "";
      });
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      formStatus.textContent = "Failed to send message. Please try again.";
    })
    .finally(() => {
      submitBtn.classList.remove("is-loading");
      submitBtn.disabled = false;
    });
});
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projectCards.forEach((card) => {
      const category = card.dataset.category;
      const show = filter === "All" || category === filter;
      card.style.display = show ? "flex" : "none";
    });
  });
});

// Theme toggle
const heroSection = document.querySelector(".hero");
const mouseGlow = document.querySelector(".mouse-glow");
const roleText = document.getElementById("roleText");

if (heroSection && mouseGlow) {
  heroSection.addEventListener("mousemove", (event) => {
    const rect = heroSection.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    mouseGlow.style.left = `${x}px`;
    mouseGlow.style.top = `${y}px`;
    mouseGlow.style.opacity = "1";
  });

  heroSection.addEventListener("mouseleave", () => {
    mouseGlow.style.opacity = "0";
  });
}

if (roleText) {
  const rolePhrase = "MERN Full Stack Developer";
  let index = 0;

  const typeRole = () => {
    roleText.textContent = rolePhrase.slice(0, index);
    index += 1;

    if (index <= rolePhrase.length) {
      window.setTimeout(typeRole, 80);
    }
  };

  typeRole();
}

const themeToggle = document.getElementById("themeToggle");
const userTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function applyTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.setAttribute("aria-label", "Activate dark mode");
  } else {
    document.body.classList.remove("light-theme");
    themeToggle.setAttribute("aria-label", "Activate light mode");
  }
  localStorage.setItem("theme", theme);
}

applyTheme(userTheme || (prefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("light-theme")
    ? "dark"
    : "light";
  applyTheme(nextTheme);
});

// Hamburger menu toggle
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

hamburgerBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close mobile menu after a link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// Active nav link highlight on scroll
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navAnchors.forEach((a) => {
          a.classList.toggle("active", a.dataset.section === id);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
);

sections.forEach((section) => navObserver.observe(section));

const scrollTopBtn = document.getElementById("scrollTopBtn");
const loadingScreen = document.getElementById("loadingScreen");
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const scrollProgress = document.getElementById("scrollProgress");
const currentYear = document.getElementById("currentYear");
const lastUpdated = document.getElementById("lastUpdated");
const modal = document.getElementById("certificateModal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const certificateLinks = document.querySelectorAll(".featured-certification-image, .certification-card");
const revealElements = document.querySelectorAll(".reveal");
const statValues = document.querySelectorAll(".stat-value");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastUpdated) {
  lastUpdated.textContent = "2026";
}

window.addEventListener("load", () => {
  window.setTimeout(() => {
    loadingScreen?.classList.add("hidden");
  }, 700);
});

window.addEventListener("mousemove", (event) => {
  cursorDot.style.opacity = "1";
  cursorRing.style.opacity = "1";
  cursorDot.style.left = `${event.clientX}px`;
  cursorDot.style.top = `${event.clientY}px`;
  cursorRing.style.left = `${event.clientX}px`;
  cursorRing.style.top = `${event.clientY}px`;
});

window.addEventListener("mouseout", () => {
  cursorDot.style.opacity = "0";
  cursorRing.style.opacity = "0";
});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (scrollTop / height) * 100 : 0;

  scrollProgress.style.width = `${progress}%`;

  if (scrollTop > 400) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }

  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight - 120) {
      element.classList.add("visible");
    }
  });
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

revealElements.forEach((element) => observer.observe(element));

statValues.forEach((stat) => {
  const target = Number(stat.dataset.target || 0);
  let current = 0;
  const increment = Math.max(1, Math.ceil(target / 35));

  const tick = () => {
    current += increment;
    if (current >= target) {
      stat.textContent = target;
      return;
    }
    stat.textContent = current;
    window.setTimeout(tick, 30);
  };

  window.setTimeout(tick, 200);
});

certificateLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.classList.contains("certification-card") && !link.href.startsWith("http")) {
      event.preventDefault();
      modalImage.src = "assets/IRC.jpg";
      modal.hidden = false;
      document.body.style.overflow = "hidden";
    }
  });
});

modalClose?.addEventListener("click", () => {
  modal.hidden = true;
  document.body.style.overflow = "";
});

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.hidden = true;
    document.body.style.overflow = "";
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modal.hidden = true;
    document.body.style.overflow = "";
  }
});
