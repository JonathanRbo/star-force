// ========================================
// STARS - Custom Scripts
// Landing Page de Suplementos
// ========================================

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {

  // Inicializar Carousel de Depoimentos com Embla
  initTestimonialsCarousel();

  // Inicializar animações WOW
  initAnimations();

  // Smooth scroll para links internos
  initSmoothScroll();

  // Header transparente com scroll
  initHeaderScroll();

});

// ========================================
// Carousel de Depoimentos (Embla)
// ========================================
function initTestimonialsCarousel() {
  const viewport = document.querySelector('.slide__viewport');

  if (!viewport) return;

  const embla = EmblaCarousel(viewport, {
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps',
    breakpoints: {
      '(min-width: 992px)': { slidesToScroll: 1 },
      '(min-width: 640px)': { slidesToScroll: 1 }
    }
  });

  // Botões de navegação
  const prevBtn = document.querySelector('.slide__prev');
  const nextBtn = document.querySelector('.slide__next');

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => embla.scrollPrev());
    nextBtn.addEventListener('click', () => embla.scrollNext());
  }

  // Dots de navegação
  const dotsContainer = document.querySelector('.slide__dots');

  if (dotsContainer) {
    const slides = embla.slideNodes();

    // Criar dots
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
      dot.addEventListener('click', () => embla.scrollTo(index));
      dotsContainer.appendChild(dot);
    });

    // Atualizar dots selecionados
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

  // Auto-play (opcional - a cada 5 segundos)
  let autoplayInterval = setInterval(() => {
    embla.scrollNext();
  }, 5000);

  // Pausar auto-play ao hover
  viewport.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });

  viewport.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
      embla.scrollNext();
    }, 5000);
  });
}

// ========================================
// Inicializar Animações WOW
// ========================================
function initAnimations() {
  if (typeof WOW !== 'undefined') {
    new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 100,
      mobile: true,
      live: true,
      scrollContainer: null
    }).init();
  }
}

// ========================================
// Smooth Scroll para Links Internos
// ========================================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Ignorar links vazios ou só com #
      if (href === '#' || href === '') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// Header com efeito de scroll
// ========================================
function initHeaderScroll() {
  const header = document.querySelector('.header');

  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Adicionar sombra ao scrollar
    if (currentScroll > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
      header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });
}

// ========================================
// Toast de Notificação (Adicionar ao Carrinho)
// ========================================
function showAddToCartToast(productName) {
  if (typeof Toastify !== 'undefined') {
    Toastify({
      text: `✓ ${productName} adicionado ao carrinho!`,
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      style: {
        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        color: '#0a0a0a',
        fontWeight: '700',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)'
      }
    }).showToast();
  }
}

// ========================================
// Adicionar listeners aos botões "Adicionar ao Carrinho"
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.modal-popup .btn-primary');

  addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      const productNames = [
        'Whey Protein Morango',
        'Whey Protein Chocolate',
        'Whey Protein Natural'
      ];

      const productName = productNames[index] || 'Produto';
      showAddToCartToast(productName);

      // Aqui você adicionaria a lógica real do carrinho
      console.log('Produto adicionado ao carrinho:', productName);
    });
  });
});

// ========================================
// Contador de produtos no carrinho (simulado)
// ========================================
let cartCount = 0;

function updateCartCount() {
  cartCount++;

  // Atualizar visual do botão carrinho (se houver contador no HTML)
  const cartButton = document.querySelector('.btn-primary');
  if (cartButton) {
    // Adicionar badge visual (opcional)
    console.log('Itens no carrinho:', cartCount);
  }
}

// ========================================
// Easter Egg: Logo Click Counter
// ========================================
let logoClickCount = 0;

document.addEventListener('DOMContentLoaded', function() {
  const logo = document.querySelector('.logo img');

  if (logo) {
    logo.addEventListener('click', function() {
      logoClickCount++;

      if (logoClickCount === 5) {
        if (typeof Toastify !== 'undefined') {
          Toastify({
            text: '🌟 Você descobriu um easter egg! Use o código STARS2026 para 10% OFF!',
            duration: 5000,
            close: true,
            gravity: 'bottom',
            position: 'center',
            style: {
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              color: '#0a0a0a',
              fontWeight: '700',
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(255, 215, 0, 0.5)',
              fontSize: '16px',
              padding: '16px 24px'
            }
          }).showToast();
        }

        logoClickCount = 0; // Reset
      }
    });
  }
});

// ========================================
// Lazy Loading de Imagens (opcional)
// ========================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  // Observar imagens com data-src
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========================================
// Scroll to Top Button (opcional)
// ========================================
function createScrollToTopButton() {
  const button = document.createElement('button');
  button.innerHTML = '<span class="iccon-arrow-up-1"></span>';
  button.className = 'scroll-to-top';
  button.setAttribute('aria-label', 'Voltar ao topo');

  button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
    color: #0a0a0a;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
    z-index: 1000;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  `;

  document.body.appendChild(button);

  // Mostrar/ocultar baseado no scroll
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      button.style.display = 'flex';
    } else {
      button.style.display = 'none';
    }
  });

  // Scroll to top ao clicar
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Hover effect
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'translateY(-5px) scale(1.1)';
    button.style.boxShadow = '0 8px 24px rgba(255, 215, 0, 0.5)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0) scale(1)';
    button.style.boxShadow = '0 4px 20px rgba(255, 215, 0, 0.3)';
  });
}

// Criar botão ao carregar
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ========================================
// Console Easter Egg
// ========================================
console.log('%c⭐ STARS SUPLEMENTOS ⭐', 'font-size: 24px; font-weight: bold; color: #FFD700; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
console.log('%cEste site foi desenvolvido com Squeleton Framework', 'font-size: 14px; color: #FFA500;');
console.log('%cProcurando por oportunidades? Entre em contato: jribeirojonathan@gmail.com', 'font-size: 12px; color: #999;');
