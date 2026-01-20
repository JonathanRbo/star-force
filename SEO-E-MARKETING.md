# 🎯 Guia de SEO e Marketing - Star Force

## 📈 Meta Tags para Adicionar no `<head>`

Adicione estas meta tags no arquivo [index.html](index.html#L1):

```html
<!-- SEO Básico -->
<meta name="description" content="Star Force - Whey Protein premium certificado internacionalmente. Mais de 50.000 atletas confiam. 25g de proteína por dose. Frete grátis acima de R$ 200.">
<meta name="keywords" content="whey protein, suplementos, proteína, fitness, musculação, star force, creatina, BCAA">
<meta name="author" content="Star Force Suplementos">

<!-- Open Graph (Facebook, WhatsApp) -->
<meta property="og:title" content="Star Force - Suplementos de Alta Performance">
<meta property="og:description" content="Whey Protein premium certificado. 25g de proteína por dose. Frete grátis acima de R$ 200.">
<meta property="og:image" content="https://seu-dominio.com/imagem/logo-starforce.svg">
<meta property="og:url" content="https://seu-dominio.com">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Star Force">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Star Force - Suplementos de Alta Performance">
<meta name="twitter:description" content="Whey Protein premium certificado. 25g de proteína por dose.">
<meta name="twitter:image" content="https://seu-dominio.com/imagem/logo-starforce.svg">

<!-- Mobile -->
<meta name="theme-color" content="#FFD700">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

<!-- Canonical URL -->
<link rel="canonical" href="https://seu-dominio.com">

<!-- Favicon -->
<link rel="icon" type="image/png" href="imagem/Stars.jpg">
<link rel="apple-touch-icon" href="imagem/Stars.jpg">
```

---

## 🔍 Schema.org (Rich Snippets)

Adicione antes do `</body>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "Star Force Suplementos",
  "description": "Loja de suplementos alimentares premium",
  "url": "https://seu-dominio.com",
  "logo": "https://seu-dominio.com/imagem/logo-starforce.svg",
  "image": "https://seu-dominio.com/imagem/logo-starforce.svg",
  "telephone": "+55-11-99999-9999",
  "email": "contato@starforce.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BR"
  },
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "14728"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Whey Protein Star Force",
  "image": "https://seu-dominio.com/imagem/vend1.jpg",
  "description": "Whey protein concentrado premium com 25g de proteína por dose",
  "brand": {
    "@type": "Brand",
    "name": "Star Force"
  },
  "offers": {
    "@type": "Offer",
    "price": "299.99",
    "priceCurrency": "BRL",
    "availability": "https://schema.org/InStock",
    "url": "https://seu-dominio.com#produtos"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "4822"
  }
}
</script>
```

---

## 🚀 Google Analytics

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 📊 Facebook Pixel

```html
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'SEU_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

---

## 📝 Sitemap.xml

Crie arquivo `sitemap.xml` na raiz:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://seu-dominio.com/</loc>
    <lastmod>2026-01-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://seu-dominio.com/#produtos</loc>
    <lastmod>2026-01-20</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## 🤖 Robots.txt

Crie arquivo `robots.txt` na raiz:

```txt
User-agent: *
Allow: /

Sitemap: https://seu-dominio.com/sitemap.xml
```

---

## 💡 Dicas de Marketing

### 1. Google Meu Negócio
- Cadastre a empresa
- Adicione fotos dos produtos
- Responda avaliações
- Poste atualizações semanais

### 2. Redes Sociais
- **Instagram**: Posts de produtos, stories de clientes
- **Facebook**: Anúncios segmentados, grupos fitness
- **YouTube**: Vídeos de unboxing, receitas com whey
- **TikTok**: Vídeos curtos, trends fitness

### 3. E-mail Marketing
- Newsletter semanal
- Cupons de desconto para aniversariantes
- Carrinho abandonado (implementar futuramente)
- Dicas de treino e nutrição

### 4. WhatsApp Business
- Atendimento rápido
- Catálogo de produtos
- Status com ofertas
- Grupos VIP para clientes

### 5. Blog (Criar futuramente)
- "Como tomar whey corretamente"
- "Diferença entre whey isolado e concentrado"
- "Receitas fit com whey protein"
- "Guia completo de suplementação"

### 6. Parcerias
- Academias locais
- Personal trainers (programa de afiliados)
- Influenciadores fitness
- Nutricionistas

---

## 🎁 Estratégias de Conversão

### Já Implementadas ✅
- ✅ Frete grátis acima de R$ 200
- ✅ 5% desconto no PIX
- ✅ 12x sem juros
- ✅ Certificações visíveis
- ✅ Depoimentos de clientes
- ✅ Badges de destaque

### Para Implementar 📋
- [ ] Popup de primeira compra (-10%)
- [ ] Timer de oferta limitada
- [ ] "X pessoas compraram hoje"
- [ ] "Apenas X unidades restantes"
- [ ] Chat ao vivo
- [ ] Garantia de 30 dias
- [ ] Programa de pontos/cashback
- [ ] Combo de produtos (desconto progressivo)

---

## 📱 WhatsApp Link

Adicione no rodapé:

```html
<a
  href="https://wa.me/5511999999999?text=Olá! Vim do site e gostaria de saber mais sobre os produtos Star Force"
  target="_blank"
  class="whatsapp-float"
>
  <span class="iccon-message-circle-1"></span>
</a>
```

CSS:
```css
.whatsapp-float {
  position: fixed;
  bottom: 90px;
  right: 30px;
  background: #25D366;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.5);
  z-index: 999;
  transition: all 0.3s;
  animation: pulse 2s infinite;
}

.whatsapp-float:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 30px rgba(37, 211, 102, 0.7);
}
```

---

## 🎯 Funil de Vendas

### Topo de Funil (Atração)
- Anúncios no Google/Facebook
- SEO orgânico
- Conteúdo educativo (blog)
- Vídeos no YouTube

### Meio de Funil (Consideração)
- E-mail marketing
- Retargeting
- Depoimentos e cases
- Comparativos de produtos

### Fundo de Funil (Conversão)
- Cupons de desconto
- Frete grátis
- Garantia estendida
- Urgência/escassez

### Pós-Venda (Fidelização)
- E-mail de agradecimento
- Pesquisa de satisfação
- Programa de indicação
- Ofertas exclusivas

---

## 📊 KPIs para Acompanhar

### Tráfego
- Visitantes únicos
- Pageviews
- Taxa de rejeição
- Tempo médio no site

### Conversão
- Taxa de conversão (%)
- Ticket médio (R$)
- Carrinho abandonado (%)
- ROI de anúncios

### Produtos
- Produto mais vendido
- Produto mais visto
- Taxa de conversão por produto

### Canais
- Fonte de tráfego (Google, Instagram, etc)
- Taxa de conversão por canal
- Custo por aquisição (CPA)

---

## 🎨 A/B Testing (Testar Futuramente)

### Elementos para Testar
- Cor do botão CTA
- Texto do CTA ("Comprar Agora" vs "Adicionar ao Carrinho")
- Posição do botão de checkout
- Formato de desconto (% vs R$)
- Imagens de produtos
- Títulos das seções
- Preço (R$ 299,99 vs R$ 300)

---

## 🔒 Trust Signals

### Já Implementados ✅
- ✅ Certificações (ISO, FDA, ANVISA, GMP)
- ✅ Depoimentos reais
- ✅ Avaliações com estrelas
- ✅ "Compra 100% segura"

### Para Adicionar 📋
- [ ] Selo SSL no checkout
- [ ] Logotipos de formas de pagamento
- [ ] "X clientes satisfeitos"
- [ ] Medalhas/prêmios
- [ ] Garantia destacada

---

## 📞 Call-to-Actions (CTAs)

### Primários (Conversão)
- "Comprar Agora"
- "Adicionar ao Carrinho"
- "Finalizar Compra"

### Secundários (Engajamento)
- "Ver Detalhes"
- "Saber Mais"
- "Continuar Comprando"

### Terciários (Suporte)
- "Falar no WhatsApp"
- "Tirar Dúvidas"
- "Ver Depoimentos"

---

**Dica Final**: Teste tudo! Use Google Analytics e Hotjar para entender o comportamento dos usuários e otimizar continuamente.
