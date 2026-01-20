# ⚡ Star Force - Landing Page de Suplementos Premium

Landing page profissional para e-commerce de suplementos alimentares, desenvolvida com HTML5, CSS3 e JavaScript vanilla.

![Star Force](imagem/logo-starforce.svg)

## 🚀 Demonstração

- **Design**: Dark theme moderno com detalhes em dourado
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Performance**: Otimizado para carregamento rápido
- **Interativo**: Animações suaves e experiência fluida

---

## ✨ Funcionalidades

### 🛒 Sistema de Carrinho Completo
- ✅ Adicionar/remover produtos
- ✅ Alterar quantidades
- ✅ Cálculo automático de subtotal e total
- ✅ Indicador de frete grátis (acima de R$ 200)
- ✅ Persistência com LocalStorage
- ✅ Animações e feedback visual

### 💳 Checkout Funcional
- ✅ Formulário completo de dados pessoais
- ✅ Endereço de entrega com busca automática de CEP (ViaCEP)
- ✅ Seleção de forma de pagamento (PIX, Cartão, Boleto)
- ✅ Resumo do pedido em tempo real
- ✅ Modal de confirmação com animação de sucesso
- ✅ Máscaras automáticas (telefone, CEP)

### 🎨 Interface e UX
- ✅ Hero section impactante
- ✅ Seção de certificações (ISO, FDA, ANVISA, GMP)
- ✅ Diferenciais do produto
- ✅ Catálogo de produtos com modais
- ✅ Depoimentos em carrossel
- ✅ Call-to-action estratégicos
- ✅ Menu mobile responsivo
- ✅ Botão "voltar ao topo"
- ✅ Toast notifications
- ✅ Easter egg (clique 5x no logo!)

---

## 🛠️ Tecnologias Utilizadas

### Core
- **HTML5**: Estrutura semântica
- **CSS3**: Estilização avançada com variáveis CSS
- **JavaScript ES6+**: Lógica e interatividade

### Frameworks e Bibliotecas
- **Squeleton v4**: Framework CSS responsivo
- **WOW.js**: Animações on-scroll
- **Embla Carousel**: Carrossel de depoimentos
- **Google Fonts**: Tipografia (Inter)

### APIs
- **ViaCEP**: Busca automática de endereço por CEP
- **LocalStorage API**: Persistência do carrinho

---

## 📁 Estrutura do Projeto

```
star-force/
├── index.html              # Página principal
├── styles.css              # Estilos customizados
├── script.js               # JavaScript principal
├── cart.js                 # Sistema de carrinho v2.0
├── api/
│   └── cart.php           # API PHP (legado, não usado)
├── imagem/
│   ├── logo-starforce.svg # Logo principal
│   ├── vend1.jpg          # Produto 1 (Morango)
│   └── ...                # Outras imagens
├── slide/
│   ├── vend2.jpg          # Produto 2 (Chocolate)
│   ├── vend3.jpg          # Produto 3 (Natural)
│   └── ...                # Imagens do carrossel
└── README.md              # Este arquivo
```

---

## 🚀 Como Usar

### Instalação Local

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/star-force.git
cd star-force
```

2. **Abra o projeto**
```bash
# Opção 1: Abrir index.html diretamente no navegador
open index.html  # Mac
start index.html # Windows

# Opção 2: Usar servidor local (recomendado)
# Com Python 3:
python -m http.server 8000

# Com Node.js (http-server):
npx http-server -p 8000
```

3. **Acesse no navegador**
```
http://localhost:8000
```

### Deploy

#### GitHub Pages
1. Vá em Settings > Pages
2. Selecione branch `main`
3. Salve
4. Acesse em: `https://seu-usuario.github.io/star-force`

#### Netlify
1. Arraste a pasta do projeto para netlify.com/drop
2. Pronto! Site no ar em segundos

#### Vercel
```bash
npm i -g vercel
vercel
```

---

## 🎯 Melhorias Implementadas (v2.0)

### ✅ Correções
- [x] Sistema de carrinho 100% funcional (sem dependência de PHP)
- [x] Botão "Limpar Carrinho" funcionando
- [x] Imagens dos produtos aparecem corretamente no carrinho
- [x] Caminhos de imagem corrigidos

### ✅ Novos Recursos
- [x] Modal de checkout completo
- [x] Modal de confirmação de pedido
- [x] Busca automática de CEP
- [x] Máscaras de input (telefone, CEP)
- [x] Indicador de frete grátis dinâmico
- [x] Animação de sucesso com checkmark
- [x] Toast notifications melhoradas
- [x] Visual do carrinho completamente reformulado

---

## 📊 Performance

### Antes da Otimização
- Tamanho total: ~35 MB
- Tempo de carregamento: 8-12s (3G)

### Após Otimização (Recomendada)
- Tamanho total: ~1.5 MB
- Tempo de carregamento: <2s (3G)

**Veja**: [OTIMIZACAO-IMAGENS.md](OTIMIZACAO-IMAGENS.md) para instruções detalhadas.

---

## 🎨 Customização

### Cores (CSS Variables)
```css
:root {
  --color-gold: #FFD700;        /* Cor principal */
  --color-gold-dark: #FFA500;   /* Cor secundária */
  --color-dark: #0a0a0a;        /* Fundo */
  --color-dark-alt: #1a1a1a;    /* Fundo alternativo */
  --color-gray: #2a2a2a;        /* Cards */
}
```

### Produtos
Edite em `script.js`:
```javascript
const productsData = [
  {
    id: 1,
    name: 'Whey Protein Morango',
    price: 299.99,
    image: 'imagem/vend1.jpg'
  },
  // Adicione mais produtos...
];
```

### Valor de Frete Grátis
Edite em `cart.js`:
```javascript
const freeShippingThreshold = 200; // R$ 200
```

---

## 🐛 Problemas Conhecidos

- [ ] Imagens muito grandes (veja OTIMIZACAO-IMAGENS.md)
- [ ] Checkout é simulado (não envia dados para backend real)

---

## 🔮 Roadmap (Futuro)

- [ ] Integração com gateway de pagamento real (Stripe/MercadoPago)
- [ ] Backend com Node.js/Express
- [ ] Banco de dados (MongoDB/PostgreSQL)
- [ ] Painel administrativo
- [ ] Sistema de cupons de desconto
- [ ] Programa de fidelidade
- [ ] Blog integrado
- [ ] Múltiplos idiomas (i18n)
- [ ] PWA (Progressive Web App)
- [ ] Dark/Light mode toggle

---

## 👥 Equipe

- **Jonathan Ribeiro** - Designer & Tech Lead
- **Luan Silva** - Ex Pesquisador de Produtos
- **Nicolas Costa** - Ex Desenvolvedor Full Stack
- **Luis Fernandes** - Ex Front-end Developer

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de portfólio.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📞 Contato

- **E-mail**: jribeirojonathan@gmail.com
- **GitHub**: [@seu-usuario](https://github.com/seu-usuario)

---

<div align="center">

**Desenvolvido com 💛 pela equipe Star Force**

![Made with Love](https://img.shields.io/badge/Made%20with-Love-gold)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

</div>
