// ========================================
// STAR FORCE - Cart Manager v2.0
// Sistema de Carrinho 100% LocalStorage
// Sem dependência de PHP
// ========================================

class CartManager {
  constructor() {
    this.cart = [];
    this.total = 0;
    this.count = 0;
    this.init();
  }

  // ========================================
  // Inicialização
  // ========================================
  init() {
    this.loadFromLocalStorage();
    this.updateUI();
    this.attachEventListeners();
    console.log('✅ CartManager v2.0 inicializado');
  }

  // ========================================
  // Adicionar produto ao carrinho
  // ========================================
  addProduct(product, buttonElement = null) {
    // Validar dados do produto
    if (!product.id || !product.name || !product.price) {
      this.showToast('Erro: dados do produto inválidos', 'error');
      return false;
    }

    const quantity = parseInt(product.quantity) || 1;

    // Verificar se produto já existe no carrinho
    const existingProduct = this.cart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
      this.showToast(`${product.name} (${quantity}x) adicionado ao carrinho!`, 'success');
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.image || '',
        quantity: quantity
      });
      this.showToast(`${product.name} adicionado ao carrinho!`, 'success');
    }

    this.recalculateTotal();
    this.updateUI();
    this.saveToLocalStorage();

    // Animar badge do carrinho
    this.animateCartBadge();

    // Animar botão se fornecido
    if (buttonElement) {
      this.animateAddButton(buttonElement);
    }

    return true;
  }

  // ========================================
  // Comprar Agora (adiciona e vai direto pro checkout)
  // ========================================
  buyNow(product, buttonElement = null) {
    // Validar dados do produto
    if (!product.id || !product.name || !product.price) {
      this.showToast('Erro: dados do produto inválidos', 'error');
      return false;
    }

    const quantity = parseInt(product.quantity) || 1;

    // Verificar se produto já existe no carrinho
    const existingProduct = this.cart.find(item => item.id === product.id);

    if (existingProduct) {
      // Atualizar quantidade do produto existente
      existingProduct.quantity += quantity;
    } else {
      // Adicionar novo produto ao carrinho existente
      this.cart.push({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.image || '',
        quantity: quantity
      });
    }

    this.recalculateTotal();
    this.updateUI();
    this.saveToLocalStorage();

    // Animar botão se fornecido
    if (buttonElement) {
      const originalText = buttonElement.innerHTML;
      buttonElement.classList.add('btn-buying');
      buttonElement.innerHTML = '<span class="iccon-loader-1 spin"></span> Processando...';
      buttonElement.disabled = true;

      // Fechar modal do produto e abrir checkout
      setTimeout(() => {
        // Fechar modal do produto
        const productModal = buttonElement.closest('.modal-dialog');
        if (productModal) {
          const backdrop = productModal.querySelector('.dialog-backdrop');
          if (backdrop) backdrop.click();
        }

        // Restaurar botão
        buttonElement.classList.remove('btn-buying');
        buttonElement.innerHTML = originalText;
        buttonElement.disabled = false;

        // Abrir checkout após fechar modal
        setTimeout(() => {
          this.openCheckout();
        }, 300);
      }, 800);
    } else {
      // Sem animação, ir direto
      this.openCheckout();
    }

    return true;
  }

  // ========================================
  // Atualizar quantidade
  // ========================================
  updateQuantity(productId, quantity) {
    quantity = parseInt(quantity);

    if (quantity < 1) {
      return this.removeProduct(productId);
    }

    const product = this.cart.find(item => item.id === productId);
    if (product) {
      product.quantity = quantity;
      this.recalculateTotal();
      this.updateUI();
      this.saveToLocalStorage();
      return true;
    }

    return false;
  }

  // ========================================
  // Remover produto
  // ========================================
  removeProduct(productId) {
    const productIndex = this.cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
      const productName = this.cart[productIndex].name;
      this.cart.splice(productIndex, 1);
      this.recalculateTotal();
      this.updateUI();
      this.saveToLocalStorage();
      this.showToast(`🗑️ ${productName} removido do carrinho`, 'info');
      return true;
    }

    return false;
  }

  // ========================================
  // Limpar carrinho
  // ========================================
  clearCart() {
    if (this.cart.length === 0) {
      this.showToast('ℹ️ O carrinho já está vazio', 'info');
      return;
    }

    if (confirm('🗑️ Tem certeza que deseja limpar todo o carrinho?')) {
      this.cart = [];
      this.total = 0;
      this.count = 0;
      this.updateUI();
      this.saveToLocalStorage();
      this.showToast('✓ Carrinho limpo com sucesso', 'success');
    }
  }

  // ========================================
  // Recalcular total
  // ========================================
  recalculateTotal() {
    this.total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  // ========================================
  // Atualizar UI
  // ========================================
  updateUI() {
    this.updateCartBadges();
    this.updateCartModal();
  }

  // ========================================
  // Atualizar badges do carrinho
  // ========================================
  updateCartBadges() {
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      badge.textContent = this.count;
    });
  }

  // ========================================
  // Animar badge
  // ========================================
  animateCartBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      badge.classList.add('cart-badge-pulse');
      setTimeout(() => {
        badge.classList.remove('cart-badge-pulse');
      }, 600);
    });

    // Animar também o botão do carrinho no header
    const cartButtons = document.querySelectorAll('[data-modal-show="modal-cart"]');
    cartButtons.forEach(btn => {
      btn.classList.add('cart-btn-shake');
      setTimeout(() => {
        btn.classList.remove('cart-btn-shake');
      }, 500);
    });
  }

  // ========================================
  // Animar botão de adicionar
  // ========================================
  animateAddButton(button) {
    if (!button) return;

    const originalText = button.innerHTML;
    const originalWidth = button.offsetWidth;

    // Fixar largura para evitar "pulo"
    button.style.minWidth = originalWidth + 'px';

    // Mudar para estado de sucesso
    button.classList.add('btn-added');
    button.innerHTML = '<span class="iccon-check-1"></span> Adicionado!';
    button.disabled = true;

    // Voltar ao estado original após 2s
    setTimeout(() => {
      button.classList.remove('btn-added');
      button.innerHTML = originalText;
      button.disabled = false;
      button.style.minWidth = '';
    }, 2000);
  }

  // ========================================
  // Atualizar modal do carrinho
  // ========================================
  updateCartModal() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartFooter = document.getElementById('cart-footer');

    if (!cartItemsContainer) return;

    // Limpar container
    cartItemsContainer.innerHTML = '';

    // Se carrinho vazio
    if (this.cart.length === 0) {
      if (emptyCartMessage) emptyCartMessage.classList.remove('d-none');
      if (cartFooter) cartFooter.classList.add('d-none');
      return;
    }

    // Esconder mensagem vazia e mostrar footer
    if (emptyCartMessage) emptyCartMessage.classList.add('d-none');
    if (cartFooter) cartFooter.classList.remove('d-none');

    // Renderizar itens
    this.cart.forEach(item => {
      const cartItem = this.createCartItemElement(item);
      cartItemsContainer.appendChild(cartItem);
    });

    // Atualizar total
    if (cartTotal) {
      cartTotal.textContent = `R$ ${this.total.toFixed(2).replace('.', ',')}`;
    }

    // Atualizar info de frete grátis
    this.updateShippingInfo();
  }

  // ========================================
  // Atualizar info de frete
  // ========================================
  updateShippingInfo() {
    const shippingInfo = document.getElementById('shipping-info');
    if (!shippingInfo) return;

    const freeShippingThreshold = 200;
    const remaining = freeShippingThreshold - this.total;

    if (remaining > 0) {
      shippingInfo.innerHTML = `
        <span class="iccon-truck-1 text-gold"></span>
        Faltam <strong>R$ ${remaining.toFixed(2).replace('.', ',')}</strong> para frete grátis!
      `;
      shippingInfo.style.color = '#FFA500';
    } else {
      shippingInfo.innerHTML = `
        <span class="iccon-check-circle-1 text-gold"></span>
        <strong>Parabéns!</strong> Você ganhou frete grátis! 🎉
      `;
      shippingInfo.style.color = '#FFD700';
    }
  }

  // ========================================
  // Criar elemento de item do carrinho
  // ========================================
  createCartItemElement(item) {
    const div = document.createElement('div');
    div.className = 'cart-item d-flex f-gap-15 f-items-center';
    div.setAttribute('data-product-id', item.id);

    const itemTotal = (item.price * item.quantity).toFixed(2).replace('.', ',');
    const itemPrice = item.price.toFixed(2).replace('.', ',');

    div.innerHTML = `
      ${item.image ? `
        <div class="cart-item-image-wrapper">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image" loading="lazy">
        </div>
      ` : `
        <div class="cart-item-image-wrapper cart-item-no-image">
          <span class="iccon-package-1"></span>
        </div>
      `}

      <div class="cart-item-info">
        <h4 class="fs-9 fw-700">${item.name}</h4>
        <p class="fs-7 opacity-6">R$ ${itemPrice} / unidade</p>

        <div class="cart-item-controls">
          <div class="cart-qty-controls">
            <button class="cart-qty-btn cart-qty-minus" data-id="${item.id}" aria-label="Diminuir quantidade" title="Diminuir">
              <span class="iccon-minus-1"></span>
            </button>

            <input
              type="number"
              class="cart-qty-input"
              value="${item.quantity}"
              min="1"
              max="99"
              data-id="${item.id}"
              aria-label="Quantidade"
            >

            <button class="cart-qty-btn cart-qty-plus" data-id="${item.id}" aria-label="Aumentar quantidade" title="Aumentar">
              <span class="iccon-plus-1"></span>
            </button>
          </div>

          <div class="cart-item-total">
            <span class="fs-6 opacity-5 d-block">Subtotal</span>
            <span class="fw-800">R$ ${itemTotal}</span>
          </div>
        </div>
      </div>

      <button class="cart-remove-btn" data-id="${item.id}" aria-label="Remover produto" title="Remover">
        <span class="iccon-trash-2-1"></span>
      </button>
    `;

    return div;
  }

  // ========================================
  // Event Listeners
  // ========================================
  attachEventListeners() {
    // Event delegation para botões do carrinho
    document.addEventListener('click', (e) => {
      // Aumentar quantidade
      if (e.target.closest('.cart-qty-plus')) {
        const btn = e.target.closest('.cart-qty-plus');
        const productId = parseInt(btn.dataset.id);
        const input = document.querySelector(`.cart-qty-input[data-id="${productId}"]`);
        const newQty = Math.min(99, parseInt(input.value) + 1);
        input.value = newQty;
        this.updateQuantity(productId, newQty);
      }

      // Diminuir quantidade
      if (e.target.closest('.cart-qty-minus')) {
        const btn = e.target.closest('.cart-qty-minus');
        const productId = parseInt(btn.dataset.id);
        const input = document.querySelector(`.cart-qty-input[data-id="${productId}"]`);
        const newQty = Math.max(1, parseInt(input.value) - 1);
        input.value = newQty;
        this.updateQuantity(productId, newQty);
      }

      // Remover produto
      if (e.target.closest('.cart-remove-btn')) {
        const btn = e.target.closest('.cart-remove-btn');
        const productId = parseInt(btn.dataset.id);
        this.removeProduct(productId);
      }

      // Limpar carrinho
      if (e.target.closest('#clear-cart-btn')) {
        this.clearCart();
      }

      // Finalizar compra
      if (e.target.closest('#checkout-btn')) {
        this.openCheckout();
      }
    });

    // Input de quantidade manual
    document.addEventListener('change', (e) => {
      if (e.target.classList.contains('cart-qty-input')) {
        const productId = parseInt(e.target.dataset.id);
        let newQty = parseInt(e.target.value) || 1;
        newQty = Math.max(1, Math.min(99, newQty));
        e.target.value = newQty;
        this.updateQuantity(productId, newQty);
      }
    });
  }

  // ========================================
  // Abrir checkout
  // ========================================
  openCheckout() {
    if (this.cart.length === 0) {
      this.showToast('⚠️ Seu carrinho está vazio', 'error');
      return;
    }

    // Preencher resumo do pedido ANTES de abrir
    this.updateCheckoutSummary();

    // Fechar modal do carrinho manualmente
    const cartModalBackdrop = document.querySelector('[data-modal="modal-cart"] .dialog-backdrop');
    if (cartModalBackdrop) {
      cartModalBackdrop.click();
    }

    // Aguardar 300ms para animação de fechar
    setTimeout(() => {
      // Abrir modal de checkout usando trigger invisível
      const checkoutTrigger = document.getElementById('hidden-checkout-trigger');
      if (checkoutTrigger) {
        checkoutTrigger.click();
      } else {
        // Fallback manual
        const checkoutModal = document.querySelector('[data-modal="modal-checkout"]');
        if (checkoutModal) {
          checkoutModal.setAttribute('aria-hidden', 'false');
          checkoutModal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      }
    }, 300);
  }

  // ========================================
  // Atualizar resumo do checkout
  // ========================================
  updateCheckoutSummary() {
    const summaryContainer = document.getElementById('checkout-summary');
    if (!summaryContainer) return;

    let html = '';

    this.cart.forEach(item => {
      const itemTotal = (item.price * item.quantity).toFixed(2).replace('.', ',');
      html += `
        <div class="checkout-item d-flex f-justify-between p-10-tb border-bottom-1 border-color-dark-alt">
          <div>
            <span class="fs-8 fw-600">${item.name}</span>
            <span class="fs-7 opacity-7 m-5-l">x${item.quantity}</span>
          </div>
          <span class="fs-8 fw-700 text-gold">R$ ${itemTotal}</span>
        </div>
      `;
    });

    // Total
    const freeShipping = this.total >= 200;
    const shippingCost = freeShipping ? 0 : 15;
    const finalTotal = this.total + shippingCost;

    html += `
      <div class="checkout-totals m-20-t">
        <div class="d-flex f-justify-between p-10-tb">
          <span class="fs-8 opacity-8">Subtotal:</span>
          <span class="fs-8 fw-700">R$ ${this.total.toFixed(2).replace('.', ',')}</span>
        </div>
        <div class="d-flex f-justify-between p-10-tb">
          <span class="fs-8 opacity-8">Frete:</span>
          <span class="fs-8 fw-700 ${freeShipping ? 'text-gold' : ''}">
            ${freeShipping ? 'GRÁTIS' : 'R$ ' + shippingCost.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <div class="d-flex f-justify-between p-15-t border-top-2 border-color-gold-subtle">
          <span class="fs-10 fw-800">Total:</span>
          <span class="fs-12 fw-800 text-gold">R$ ${finalTotal.toFixed(2).replace('.', ',')}</span>
        </div>
      </div>
    `;

    summaryContainer.innerHTML = html;
  }

  // ========================================
  // Processar compra
  // ========================================
  processCheckout(formData) {
    // Simular processamento
    this.showToast('⏳ Processando pedido...', 'info');

    setTimeout(() => {
      // Salvar dados antes de limpar
      const customerName = formData.get('name') || 'Cliente';
      const customerEmail = formData.get('email') || '';

      // Limpar carrinho
      this.cart = [];
      this.total = 0;
      this.count = 0;
      this.saveToLocalStorage();
      this.updateUI();

      // Fechar modal de checkout
      const checkoutBackdrop = document.querySelector('[data-modal="modal-checkout"] .dialog-backdrop');
      if (checkoutBackdrop) {
        checkoutBackdrop.click();
      }

      // Aguardar fechar e mostrar sucesso
      setTimeout(() => {
        this.showSuccessModal(customerName, customerEmail);
      }, 400);
    }, 1500);
  }

  // ========================================
  // Mostrar modal de sucesso
  // ========================================
  showSuccessModal(customerName, customerEmail) {
    // Preencher dados do pedido
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    const orderNumberEl = document.getElementById('order-number');
    const customerNameEl = document.getElementById('customer-name');
    const customerEmailEl = document.getElementById('customer-email');

    if (orderNumberEl) orderNumberEl.textContent = `#${orderNumber}`;
    if (customerNameEl) customerNameEl.textContent = customerName;
    if (customerEmailEl) customerEmailEl.textContent = customerEmail;

    // Abrir modal de sucesso
    const successModal = document.querySelector('[data-modal="modal-success"]');
    if (successModal) {
      // Forçar abertura do modal
      successModal.setAttribute('aria-hidden', 'false');
      successModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      // Confetes!
      setTimeout(() => {
        this.launchConfetti();
      }, 300);

      this.showToast('🎉 Pedido realizado com sucesso!', 'success');
    } else {
      this.showToast('🎉 Pedido realizado com sucesso! Obrigado pela compra!', 'success');
    }
  }

  // ========================================
  // Confete (animação de sucesso)
  // ========================================
  launchConfetti() {
    // Usar biblioteca confetti se disponível
    if (typeof confetti !== 'undefined') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }

  // ========================================
  // LocalStorage
  // ========================================
  saveToLocalStorage() {
    try {
      localStorage.setItem('starforce_cart', JSON.stringify({
        cart: this.cart,
        total: this.total,
        count: this.count,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Erro ao salvar no LocalStorage:', error);
    }
  }

  loadFromLocalStorage() {
    try {
      const data = localStorage.getItem('starforce_cart');
      if (data) {
        const parsed = JSON.parse(data);

        // Verificar se dados não estão muito antigos (7 dias)
        const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        if (parsed.timestamp && parsed.timestamp < sevenDaysAgo) {
          console.log('Carrinho expirado, limpando...');
          localStorage.removeItem('starforce_cart');
          return;
        }

        this.cart = parsed.cart || [];
        this.total = parsed.total || 0;
        this.count = parsed.count || 0;
        this.recalculateTotal(); // Recalcular para garantir
      }
    } catch (error) {
      console.error('Erro ao carregar do LocalStorage:', error);
      localStorage.removeItem('starforce_cart');
    }
  }

  // ========================================
  // Toast Notification
  // ========================================
  showToast(message, type = 'info') {
    // Configurações por tipo
    const config = {
      success: {
        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        color: '#0a0a0a',
        icon: '✓'
      },
      error: {
        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
        color: '#ffffff',
        icon: '✕'
      },
      info: {
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        color: '#ffffff',
        icon: 'ℹ'
      }
    };

    const settings = config[type] || config.info;

    if (typeof Toastify !== 'undefined') {
      Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        className: `toast-${type}`,
        style: {
          background: settings.background,
          color: settings.color,
          fontWeight: '600',
          borderRadius: '10px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
          padding: '14px 22px',
          fontSize: '14px'
        }
      }).showToast();
    } else {
      // Fallback: criar toast customizado
      this.showCustomToast(message, settings);
    }
  }

  // ========================================
  // Toast Customizado (fallback)
  // ========================================
  showCustomToast(message, settings) {
    // Remover toast existente se houver
    const existingToast = document.querySelector('.custom-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = `
      <span class="toast-icon">${settings.icon}</span>
      <span class="toast-message">${message}</span>
    `;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${settings.background};
      color: ${settings.color};
      padding: 14px 22px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 14px;
      z-index: 99999;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
      animation: toastSlideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastSlideOut 0.3s ease-in forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// ========================================
// Inicializar Cart Manager globalmente
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  window.cartManager = new CartManager();
  console.log('🛒 Sistema de Carrinho Star Force v2.0 ativo!');
});
