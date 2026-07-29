emailjs.init({
  publicKey: "jrEFSAuOigClUp_rS",
});

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  emailjs
    .sendForm("service_ls4nzew", "template_3n7ejcq", contactForm)
    .then(() => {
      alert("Message sent successfully!");

      contactForm.reset();
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);

      alert("Failed to send message. Please try again.");
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

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
