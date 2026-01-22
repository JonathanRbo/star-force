// ========================================
// STAR FORCE - Custom Scripts
// Landing Page de Suplementos Premium
// Otimizado com Squeleton Framework
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar componentes
  initMobileMenu();
  initTestimonialsCarousel();
  initAnimations();
  initHeaderScroll();
  initScrollToTop();
  initCartSystem();
  initCheckoutForm();
  initEasterEgg();

  console.log('%c⚡ STAR FORCE ⚡', 'font-size: 24px; font-weight: bold; color: #FFD700; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
  console.log('%cPowered by Squeleton Framework v4', 'font-size: 14px; color: #FFA500;');
});

// ========================================
// Mobile Menu Toggle
// ========================================
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const menuIcon = document.getElementById('menu-icon');

  if (!menuBtn || !mobileMenu) return;

  // Toggle menu
  menuBtn.addEventListener('click', () => {
    const isActive = mobileMenu.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', isActive);
    mobileMenu.setAttribute('aria-hidden', !isActive);

    // Animate icon
    if (isActive) {
      menuIcon.classList.remove('iccon-menu-1');
      menuIcon.classList.add('iccon-x-1');
    } else {
      menuIcon.classList.remove('iccon-x-1');
      menuIcon.classList.add('iccon-menu-1');
    }
  });

  // Close menu quando clicar em um link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      menuIcon.classList.remove('iccon-x-1');
      menuIcon.classList.add('iccon-menu-1');
    });
  });

  // Close menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        menuIcon.classList.remove('iccon-x-1');
        menuIcon.classList.add('iccon-menu-1');
      }
    }
  });
}

// ========================================
// Carousel de Depoimentos (Embla)
// ========================================
function initTestimonialsCarousel() {
  const viewport = document.querySelector('.slide__viewport');
  if (!viewport || typeof EmblaCarousel === 'undefined') return;

  const embla = EmblaCarousel(viewport, {
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps'
  });

  // Navigation buttons
  const prevBtn = document.querySelector('.slide__prev');
  const nextBtn = document.querySelector('.slide__next');

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => embla.scrollPrev());
    nextBtn.addEventListener('click', () => embla.scrollNext());
  }

  // Dots navigation
  const dotsContainer = document.querySelector('.slide__dots');
  if (dotsContainer) {
    const slides = embla.slideNodes();

    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
      dot.addEventListener('click', () => embla.scrollTo(index));
      dotsContainer.appendChild(dot);
    });

    const updateDots = () => {
      const dots = dotsContainer.querySelectorAll('button');
      dots.forEach((dot, index) => {
        dot.classList.toggle('is-selected', index === embla.selectedScrollSnap());
      });
    };

    embla.on('select', updateDots);
    embla.on('reInit', updateDots);
    updateDots();
  }

  // Auto-play com pause ao hover
  let autoplayInterval = setInterval(() => embla.scrollNext(), 5000);

  viewport.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  viewport.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => embla.scrollNext(), 5000);
  });
}

// ========================================
// Animações WOW.js
// ========================================
function initAnimations() {
  if (typeof WOW !== 'undefined') {
    new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 100,
      mobile: true,
      live: true
    }).init();
  }
}

// ========================================
// Header Scroll Effect
// ========================================
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ========================================
// Scroll to Top Button
// ========================================
function initScrollToTop() {
  const button = document.createElement('button');
  button.innerHTML = '<span class="iccon-arrow-up-1"></span>';
  button.className = 'scroll-to-top d-none';
  button.setAttribute('aria-label', 'Voltar ao topo');

  document.body.appendChild(button);

  // Show/hide based on scroll
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      button.classList.remove('d-none');
      button.classList.add('d-flex');
    } else {
      button.classList.add('d-none');
      button.classList.remove('d-flex');
    }
  });

  // Scroll to top on click
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========================================
// Sistema de Carrinho
// ========================================
function initCartSystem() {
  // Dados dos produtos
  const productsData = [
    {
      id: 1,
      name: 'Whey Protein Morango',
      price: 299.99,
      image: 'imagem/vend1.jpg'
    },
    {
      id: 2,
      name: 'Whey Protein Chocolate',
      price: 299.99,
      image: 'slide/vend2.jpg'
    },
    {
      id: 3,
      name: 'Whey Protein Natural',
      price: 299.99,
      image: 'slide/vend3.jpg'
    }
  ];

  // Pegar todos os modais de produto
  const productModals = document.querySelectorAll('[data-modal^="modal-produto-"]');

  productModals.forEach((modal, index) => {
    const addToCartBtn = modal.querySelector('.btn-primary');
    const quantitySelect = modal.querySelector('.quantity-select');

    if (addToCartBtn && quantitySelect) {
      addToCartBtn.addEventListener('click', function(e) {
        e.preventDefault();

        const productData = productsData[index];
        const quantity = parseInt(quantitySelect.value) || 1;

        if (productData && window.cartManager) {
          // Passar o botão para animar
          window.cartManager.addProduct({
            id: productData.id,
            name: productData.name,
            price: productData.price,
            image: productData.image,
            quantity: quantity
          }, this); // 'this' é o botão clicado
        }
      });
    }
  });
}

// ========================================
// Formulário de Checkout
// ========================================
function initCheckoutForm() {
  const checkoutForm = document.getElementById('checkout-form');
  if (!checkoutForm) return;

  checkoutForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validar formulário
    if (!checkoutForm.checkValidity()) {
      checkoutForm.reportValidity();
      return;
    }

    // Pegar dados do formulário
    const formData = new FormData(checkoutForm);

    // Processar checkout via CartManager
    if (window.cartManager) {
      window.cartManager.processCheckout(formData);
    }
  });

  // Máscara de telefone
  const phoneInput = checkoutForm.querySelector('input[name="phone"]');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 10) {
        e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else if (value.length > 6) {
        e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
      } else if (value.length > 2) {
        e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else {
        e.target.value = value;
      }
    });
  }

  // Máscara de CEP
  const zipcodeInput = checkoutForm.querySelector('input[name="zipcode"]');
  if (zipcodeInput) {
    zipcodeInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 8) value = value.slice(0, 8);

      if (value.length > 5) {
        e.target.value = `${value.slice(0, 5)}-${value.slice(5)}`;
      } else {
        e.target.value = value;
      }
    });

    // Buscar CEP (ViaCEP API)
    zipcodeInput.addEventListener('blur', async function() {
      const cep = this.value.replace(/\D/g, '');
      if (cep.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();

          if (!data.erro) {
            checkoutForm.querySelector('input[name="street"]').value = data.logradouro || '';
            checkoutForm.querySelector('input[name="neighborhood"]').value = data.bairro || '';
            checkoutForm.querySelector('input[name="city"]').value = data.localidade || '';
            checkoutForm.querySelector('input[name="state"]').value = data.uf || '';
          }
        } catch (error) {
          console.error('Erro ao buscar CEP:', error);
        }
      }
    });
  }

  // Estado em maiúsculas
  const stateInput = checkoutForm.querySelector('input[name="state"]');
  if (stateInput) {
    stateInput.addEventListener('input', function(e) {
      e.target.value = e.target.value.toUpperCase();
    });
  }
}

// ========================================
// Toast Notification System
// ========================================
function showToast(message, type = 'info') {
  if (typeof Toastify !== 'undefined') {
    const backgrounds = {
      success: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      error: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
      info: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    };

    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      stopOnFocus: true,
      style: {
        background: backgrounds[type] || backgrounds.info,
        color: type === 'success' ? '#0a0a0a' : '#ffffff',
        fontWeight: '700',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }
    }).showToast();
  } else {
    // Fallback para navegadores sem Toastify
    alert(message);
  }
}

// ========================================
// Easter Egg: Logo Click
// ========================================
function initEasterEgg() {
  let logoClickCount = 0;
  const logo = document.querySelector('.logo img');

  if (logo) {
    logo.addEventListener('click', function() {
      logoClickCount++;

      if (logoClickCount === 5) {
        showToast('🌟 Easter Egg! Use o código STARFORCE2026 para 10% OFF!', 'success');
        logoClickCount = 0;

        // Efeito visual na logo
        this.style.animation = 'spin 0.5s ease-in-out';
        setTimeout(() => {
          this.style.animation = '';
        }, 500);
      }
    });
  }
}

// ========================================
// Lazy Loading de Imagens (nativo)
// ========================================
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src || img.src;
  });
} else {
  // Fallback para navegadores antigos
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ========================================
// Smooth Scroll Melhorado (Squeleton já faz isso)
// Removido código duplicado - Squeleton lida com isso nativamente
// ========================================

// ========================================
// Performance Monitoring (Dev only)
// ========================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  window.addEventListener('load', () => {
    if (window.performance) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`%c⚡ Página carregada em ${pageLoadTime}ms`, 'color: #FFD700; font-weight: bold;');
    }
  });
}

// ========================================
// Animação de Spin para Easter Egg
// ========================================
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
