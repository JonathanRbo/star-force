# ⚡ Star Force - Landing Page de Suplementos Premium

Landing page profissional para e-commerce de suplementos alimentares, desenvolvida com HTML5, CSS3 e JavaScript vanilla.

![Star Force](imagem/Stars.jpg)

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

---

<div align="center">

**Desenvolvido com 💛 pela equipe Star Force**

![Made with Love](https://img.shields.io/badge/Made%20with-Love-gold)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

</div>
