// ========================================
// STAR FORCE - Cart Manager
// Sistema de Carrinho com API PHP + LocalStorage
// ========================================

class CartManager {
  constructor() {
    this.apiUrl = 'api/cart.php';
    this.cart = [];
    this.total = 0;
    this.count = 0;
    this.init();
  }

  // ========================================
  // Inicialização
  // ========================================
  async init() {
    await this.loadCart();
    this.updateUI();
    this.attachEventListeners();
  }

  // ========================================
  // Carregar carrinho do servidor
  // ========================================
  async loadCart() {
    try {
      const response = await fetch(`${this.apiUrl}?action=get`);
      const data = await response.json();

      if (data.success) {
        this.cart = data.cart || [];
        this.total = data.total || 0;
        this.count = data.count || 0;
      } else {
        // Fallback para LocalStorage
        this.loadFromLocalStorage();
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
      this.loadFromLocalStorage();
    }
  }

  // ========================================
  // Adicionar produto ao carrinho
  // ========================================
  async addProduct(product) {
    try {
      const formData = new FormData();
      formData.append('action', 'add');
      formData.append('product_id', product.id);
      formData.append('product_name', product.name);
      formData.append('product_price', product.price);
      formData.append('product_image', product.image || '');
      formData.append('quantity', product.quantity || 1);

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        this.cart = data.cart;
        this.total = data.total;
        this.count = data.count;
        this.updateUI();
        this.saveToLocalStorage();
        this.showToast(`✓ ${product.name} adicionado ao carrinho!`, 'success');
        return true;
      } else {
        this.showToast('Erro ao adicionar produto', 'error');
        return false;
      }
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      this.addToLocalStorage(product);
      return false;
    }
  }

  // ========================================
  // Atualizar quantidade
  // ========================================
  async updateQuantity(productId, quantity) {
    if (quantity < 1) {
      return this.removeProduct(productId);
    }

    try {
      const formData = new FormData();
      formData.append('action', 'update');
      formData.append('product_id', productId);
      formData.append('quantity', quantity);

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        this.cart = data.cart;
        this.total = data.total;
        this.count = data.count;
        this.updateUI();
        this.saveToLocalStorage();
        return true;
      }
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
    }
    return false;
  }

  // ========================================
  // Remover produto
  // ========================================
  async removeProduct(productId) {
    try {
      const formData = new FormData();
      formData.append('action', 'remove');
      formData.append('product_id', productId);

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        this.cart = data.cart;
        this.total = data.total;
        this.count = data.count;
        this.updateUI();
        this.saveToLocalStorage();
        this.showToast('Produto removido do carrinho', 'info');
        return true;
      }
    } catch (error) {
      console.error('Erro ao remover produto:', error);
    }
    return false;
  }

  // ========================================
  // Limpar carrinho
  // ========================================
  async clearCart() {
    try {
      const formData = new FormData();
      formData.append('action', 'clear');

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        this.cart = [];
        this.total = 0;
        this.count = 0;
        this.updateUI();
        this.saveToLocalStorage();
        this.showToast('Carrinho limpo', 'info');
        return true;
      }
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
    }
    return false;
  }

  // ========================================
  // Atualizar UI
  // ========================================
  updateUI() {
    // Atualizar badges do carrinho
    this.updateCartBadges();

    // Atualizar modal do carrinho
    this.updateCartModal();
  }

  // ========================================
  // Atualizar badges
  // ========================================
  updateCartBadges() {
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      badge.textContent = this.count;

      // Animation
      badge.style.transform = 'scale(1.3)';
      setTimeout(() => {
        badge.style.transform = 'scale(1)';
      }, 200);
    });
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

    // Esconder mensagem vazia
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
  }

  // ========================================
  // Criar elemento de item do carrinho
  // ========================================
  createCartItemElement(item) {
    const div = document.createElement('div');
    div.className = 'cart-item d-flex f-gap-15 p-15-all border-rd-8 m-15-b';
    div.setAttribute('data-product-id', item.id);

    const itemTotal = (item.price * item.quantity).toFixed(2).replace('.', ',');

    div.innerHTML = `
      ${item.image ? `<img src="${item.image}" alt="${item.name}" class="cart-item-image">` : ''}
      <div class="cart-item-info f-1">
        <h4 class="fs-8 fw-700 m-5-b">${item.name}</h4>
        <p class="fs-7 opacity-7">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
        <div class="cart-item-controls d-flex f-gap-10 m-10-t align-items-center">
          <button class="cart-qty-btn cart-qty-minus" data-id="${item.id}" aria-label="Diminuir quantidade">
            <span class="iccon-minus-1"></span>
          </button>
          <input type="number" class="cart-qty-input" value="${item.quantity}" min="1" data-id="${item.id}" aria-label="Quantidade">
          <button class="cart-qty-btn cart-qty-plus" data-id="${item.id}" aria-label="Aumentar quantidade">
            <span class="iccon-plus-1"></span>
          </button>
          <span class="cart-item-total fs-8 fw-700 m-15-l">R$ ${itemTotal}</span>
        </div>
      </div>
      <button class="cart-remove-btn" data-id="${item.id}" aria-label="Remover produto">
        <span class="iccon-trash-1"></span>
      </button>
    `;

    return div;
  }

  // ========================================
  // Event Listeners
  // ========================================
  attachEventListeners() {
    // Event delegation para botões do modal
    document.addEventListener('click', async (e) => {
      // Botão de aumentar quantidade
      if (e.target.closest('.cart-qty-plus')) {
        const btn = e.target.closest('.cart-qty-plus');
        const productId = parseInt(btn.dataset.id);
        const input = document.querySelector(`.cart-qty-input[data-id="${productId}"]`);
        const newQty = parseInt(input.value) + 1;
        input.value = newQty;
        await this.updateQuantity(productId, newQty);
      }

      // Botão de diminuir quantidade
      if (e.target.closest('.cart-qty-minus')) {
        const btn = e.target.closest('.cart-qty-minus');
        const productId = parseInt(btn.dataset.id);
        const input = document.querySelector(`.cart-qty-input[data-id="${productId}"]`);
        const newQty = Math.max(1, parseInt(input.value) - 1);
        input.value = newQty;
        await this.updateQuantity(productId, newQty);
      }

      // Botão de remover
      if (e.target.closest('.cart-remove-btn')) {
        const btn = e.target.closest('.cart-remove-btn');
        const productId = parseInt(btn.dataset.id);
        await this.removeProduct(productId);
      }

      // Botão de limpar carrinho
      if (e.target.closest('#clear-cart-btn')) {
        if (confirm('Tem certeza que deseja limpar o carrinho?')) {
          await this.clearCart();
        }
      }
    });

    // Input de quantidade manual
    document.addEventListener('change', async (e) => {
      if (e.target.classList.contains('cart-qty-input')) {
        const productId = parseInt(e.target.dataset.id);
        const newQty = Math.max(1, parseInt(e.target.value) || 1);
        e.target.value = newQty;
        await this.updateQuantity(productId, newQty);
      }
    });
  }

  // ========================================
  // LocalStorage Fallback
  // ========================================
  saveToLocalStorage() {
    try {
      localStorage.setItem('starforce_cart', JSON.stringify({
        cart: this.cart,
        total: this.total,
        count: this.count
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
        this.cart = parsed.cart || [];
        this.total = parsed.total || 0;
        this.count = parsed.count || 0;
      }
    } catch (error) {
      console.error('Erro ao carregar do LocalStorage:', error);
    }
  }

  addToLocalStorage(product) {
    // Adicionar produto localmente se API falhar
    const existing = this.cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += product.quantity || 1;
    } else {
      this.cart.push(product);
    }

    this.recalculateTotal();
    this.updateUI();
    this.saveToLocalStorage();
    this.showToast(`✓ ${product.name} adicionado ao carrinho!`, 'success');
  }

  recalculateTotal() {
    this.total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  // ========================================
  // Toast Notification
  // ========================================
  showToast(message, type = 'info') {
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
    }
  }
}

// ========================================
// Inicializar Cart Manager globalmente
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  window.cartManager = new CartManager();
});
