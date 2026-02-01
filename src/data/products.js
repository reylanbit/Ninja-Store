/**
 * 🍥 Catálogo Expandido de Produtos Naruto
 * 
 * Mais de 20 produtos organizados por categoria
 * Imagens utilizam placeholders de alta qualidade do Unsplash
 */

export const products = [
    // ===========================
    // CAMISETAS
    // ===========================
    {
        id: 1,
        name: "Coleção Mangekyou Sharingan",
        price: 299.90,
        description: "Coleção exclusiva de camisetas com o padrão Mangekyou Sharingan.",
        fullDescription: "Esta coleção inclui camisetas com os padrões Mangekyou Sharingan de Itachi, Sasuke e Madara. Feitas em 100% algodão premium, estampa em alta qualidade que não desbota mesmo após dezenas de lavagens. Corte moderno e confortável.",
        sizes: ["P", "M", "G", "GG", "XG"],
        colors: [
            { name: "Preto", code: "#0a0a0a" },
            { name: "Vermelho Sangue", code: "#8B0000" }
        ],
        category: "Camisetas",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
            "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800"
        ],
        rating: 4.9,
        reviews: 234,
        inStock: true,
        featured: true,
        discount: 15
    },
    {
        id: 2,
        name: "Camiseta Naruto Modo Sábio",
        price: 89.90,
        description: "Camiseta exclusiva do Naruto no Modo Sábio dos Seis Caminhos.",
        fullDescription: "Camiseta com estampa vibrante do Naruto Uzumaki em seu modo mais poderoso. Tecido 100% algodão penteado, máxima durabilidade e conforto. Design exclusivo criado por artistas fãs da série.",
        sizes: ["P", "M", "G", "GG"],
        colors: [
            { name: "Laranja Ninja", code: "#FF6B00" },
            { name: "Preto", code: "#0a0a0a" },
            { name: "Branco", code: "#FFFFFF" }
        ],
        category: "Camisetas",
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600",
        images: [
            "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800"
        ],
        rating: 4.8,
        reviews: 189,
        inStock: true,
        featured: true
    },
    {
        id: 3,
        name: "Camiseta Clan Uchiha",
        price: 79.90,
        description: "Camiseta com o símbolo do clã Uchiha nas costas.",
        fullDescription: "Represente o poderoso Clã Uchiha com esta camiseta premium. Leque vermelho e branco bordado nas costas. Tecido macio e respirável, perfeito para o dia a dia ou cosplay.",
        sizes: ["P", "M", "G", "GG", "XG"],
        colors: [
            { name: "Preto", code: "#0a0a0a" },
            { name: "Azul Marinho", code: "#1a1a3e" }
        ],
        category: "Camisetas",
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600",
        images: [
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800"
        ],
        rating: 4.7,
        reviews: 156,
        inStock: true
    },
    {
        id: 4,
        name: "Camiseta Kakashi Sensei",
        price: 84.90,
        description: "Camiseta com ilustração artística do Kakashi Hatake.",
        fullDescription: "O ninja copiador em uma arte exclusiva! Camiseta com ilustração do Kakashi lendo seu livro favorito. Estampa frontal em alta definição. Disponível em várias cores e tamanhos.",
        sizes: ["P", "M", "G", "GG"],
        colors: [
            { name: "Cinza", code: "#4a4a4a" },
            { name: "Branco", code: "#FFFFFF" }
        ],
        category: "Camisetas",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600",
        images: [
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800"
        ],
        rating: 4.9,
        reviews: 201,
        inStock: true
    },

    // ===========================
    // MOLETONS & CASACOS
    // ===========================
    {
        id: 5,
        name: "Moletom Akatsuki Premium",
        price: 199.90,
        description: "Moletom com capuz estampado com as nuvens vermelhas da Akatsuki.",
        fullDescription: "Moletom oficial da organização mais temida do mundo ninja! Confeccionado em moletom flanelado premium, com capuz duplo e bolso canguru. Estampa das nuvens vermelhas nas costas e detalhes nas mangas. Perfeito para inverno.",
        sizes: ["P", "M", "G", "GG", "XG"],
        colors: [
            { name: "Preto", code: "#0a0a0a" },
            { name: "Vermelho", code: "#8B0000" }
        ],
        category: "Moletons",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600",
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
            "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800"
        ],
        rating: 4.9,
        reviews: 312,
        inStock: true,
        featured: true,
        discount: 20
    },
    {
        id: 6,
        name: "Jaqueta Sasuke Revenge",
        price: 289.90,
        description: "Jaqueta inspirada no visual do Sasuke durante o arco da vingança.",
        fullDescription: "Jaqueta premium inspirada no estilo do Sasuke Uchiha. Tecido resistente com forro interno, zíper frontal de qualidade, bolsos laterais. Símbolo Uchiha bordado nas costas. Edição limitada.",
        sizes: ["P", "M", "G", "GG"],
        colors: [
            { name: "Preto Total", code: "#0a0a0a" }
        ],
        category: "Moletons",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800"
        ],
        rating: 4.8,
        reviews: 98,
        inStock: true,
        featured: true
    },
    {
        id: 7,
        name: "Moletom Konoha Vintage",
        price: 169.90,
        description: "Moletom com o símbolo da Vila da Folha em estilo vintage.",
        fullDescription: "Moletom vintage com o símbolo clássico de Konoha. Acabamento envelhecido proposital para um visual retrô. Tecido macio e quentinho, perfeito para qualquer ocasião.",
        sizes: ["P", "M", "G", "GG"],
        colors: [
            { name: "Verde Floresta", code: "#228B22" },
            { name: "Cinza Mescla", code: "#808080" }
        ],
        category: "Moletons",
        image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=600",
        images: [
            "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800"
        ],
        rating: 4.6,
        reviews: 87,
        inStock: true
    },

    // ===========================
    // ACESSÓRIOS
    // ===========================
    {
        id: 8,
        name: "Bandana da Vila da Folha",
        price: 59.90,
        description: "Bandana oficial da Vila da Folha (Konoha) com placa metálica.",
        fullDescription: "Torne-se um verdadeiro ninja de Konoha! Bandana com tecido de alta qualidade e placa metálica gravada a laser com o símbolo da Vila da Folha. Ajustável para qualquer tamanho de cabeça. Perfeita para cosplay.",
        sizes: ["Único"],
        colors: [
            { name: "Azul Clássico", code: "#1E4D8C" },
            { name: "Preto Renegado", code: "#0a0a0a" },
            { name: "Vermelho", code: "#8B0000" }
        ],
        category: "Acessórios",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600",
        images: [
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800"
        ],
        rating: 4.7,
        reviews: 245,
        inStock: true,
        featured: true
    },
    {
        id: 9,
        name: "Caneca Sharingan Termosensível",
        price: 49.90,
        description: "Caneca mágica que revela o Sharingan quando aquecida.",
        fullDescription: "Surpreenda-se toda manhã! Esta caneca de cerâmica 350ml revela o Sharingan de Itachi quando você coloca uma bebida quente. Efeito termosensível de alta qualidade. Não pode ir ao micro-ondas.",
        sizes: ["Único"],
        colors: [
            { name: "Preto Fosco", code: "#1a1a1a" }
        ],
        category: "Acessórios",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600",
        images: [
            "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800"
        ],
        rating: 4.8,
        reviews: 178,
        inStock: true
    },
    {
        id: 10,
        name: "Mochila ANBU Black Ops",
        price: 189.90,
        description: "Mochila tática inspirada nas forças especiais ANBU.",
        fullDescription: "Mochila resistente à água com design inspirado na ANBU. Múltiplos compartimentos, bolso para notebook 15\", alças acolchoadas e máscara ANBU estampada. Capacidade de 30L.",
        sizes: ["Único"],
        colors: [
            { name: "Preto Tático", code: "#0a0a0a" }
        ],
        category: "Acessórios",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"
        ],
        rating: 4.9,
        reviews: 156,
        inStock: true,
        featured: true
    },
    {
        id: 11,
        name: "Anel Akatsuki Completo",
        price: 39.90,
        description: "Réplica do anel usado pelos membros da Akatsuki.",
        fullDescription: "Anel metálico com kanji gravado, réplica fiel dos anéis usados pelos membros da Akatsuki. Disponível em todas as 10 versões dos membros. Material: liga metálica de alta qualidade.",
        sizes: ["P", "M", "G"],
        colors: [
            { name: "Prata", code: "#C0C0C0" },
            { name: "Vermelho", code: "#8B0000" }
        ],
        category: "Acessórios",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600",
        images: [
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800"
        ],
        rating: 4.5,
        reviews: 134,
        inStock: true
    },
    {
        id: 12,
        name: "Tigela de Ramen Ichiraku",
        price: 69.90,
        description: "Tigela de ramen oficial do Ichiraku, restaurante favorito do Naruto.",
        fullDescription: "Desfrute seu ramen como um verdadeiro ninja! Tigela de cerâmica de 800ml com o logo do Ichiraku Ramen. Acompanha par de hashis (pauzinhos) decorados. Própria para micro-ondas e lava-louças.",
        sizes: ["Único"],
        colors: [
            { name: "Bege Clássico", code: "#F5DEB3" },
            { name: "Preto", code: "#0a0a0a" }
        ],
        category: "Acessórios",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600",
        images: [
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800"
        ],
        rating: 4.9,
        reviews: 289,
        inStock: true,
        featured: true
    },

    // ===========================
    // COLECIONÁVEIS
    // ===========================
    {
        id: 13,
        name: "Figura de Ação Naruto Uzumaki",
        price: 249.90,
        description: "Figura articulada do Naruto no Modo Sábio dos Seis Caminhos, 25cm.",
        fullDescription: "Figura de colecionador com 25cm de altura, mais de 20 pontos de articulação. Inclui 3 expressões faciais intercambiáveis, mãos extras, kunais, shurikens e Rasengan com LED. Base incluída.",
        sizes: ["Único"],
        colors: [
            { name: "Original", code: "#FF6B00" }
        ],
        category: "Colecionáveis",
        image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=600",
        images: [
            "https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=800"
        ],
        rating: 4.9,
        reviews: 312,
        inStock: true,
        featured: true
    },
    {
        id: 14,
        name: "Figura Sasuke Chidori",
        price: 229.90,
        description: "Figura do Sasuke executando o Chidori com efeito LED.",
        fullDescription: "Sasuke Uchiha em pose de ataque executando o Chidori. Efeito LED azul no jutsu que pode ser ligado/desligado. 22cm de altura, base temática incluída. Edição limitada numerada.",
        sizes: ["Único"],
        colors: [
            { name: "Original", code: "#1a1a3e" }
        ],
        category: "Colecionáveis",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
        ],
        rating: 4.8,
        reviews: 189,
        inStock: true,
        featured: true
    },
    {
        id: 15,
        name: "Shuriken de Colecionador",
        price: 89.90,
        description: "Shuriken metálico decorativo, réplica das usadas por ninjas de elite.",
        fullDescription: "Réplica em tamanho real feita em aço inoxidável com acabamento envelhecido. Inclui base de exposição em madeira e certificado de autenticidade. Diâmetro: 15cm. Item decorativo, não é uma arma.",
        sizes: ["Único"],
        colors: [
            { name: "Prata Envelhecida", code: "#A9A9A9" },
            { name: "Preto Fosco", code: "#1a1a1a" }
        ],
        category: "Colecionáveis",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600",
        images: [
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
        ],
        rating: 4.6,
        reviews: 145,
        inStock: true
    },
    {
        id: 16,
        name: "Kunai Premium Box Set",
        price: 149.90,
        description: "Set com 3 kunais metálicas em caixa de colecionador.",
        fullDescription: "Conjunto de 3 kunais em tamanho real, feitas em liga metálica de alta durabilidade. Inclui caixa de madeira forrada com veludo vermelho. Cada kunai mede 25cm. Item decorativo para colecionadores.",
        sizes: ["Único"],
        colors: [
            { name: "Prata", code: "#C0C0C0" }
        ],
        category: "Colecionáveis",
        image: "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=600",
        images: [
            "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=800"
        ],
        rating: 4.8,
        reviews: 112,
        inStock: true
    },
    {
        id: 17,
        name: "Máscara ANBU de Porcelana",
        price: 119.90,
        description: "Máscara ANBU em porcelana artesanal, tamanho real.",
        fullDescription: "Máscara ANBU feita artesanalmente em porcelana de alta qualidade. Pintura detalhada à mão. Tamanho real (vestível ou decorativa). Inclui suporte de parede e cordão.",
        sizes: ["Único"],
        colors: [
            { name: "Branco", code: "#FFFFFF" },
            { name: "Kitsune (Raposa)", code: "#FF6B00" }
        ],
        category: "Colecionáveis",
        image: "https://images.unsplash.com/photo-1594387303756-deb3703e6f19?w=600",
        images: [
            "https://images.unsplash.com/photo-1594387303756-deb3703e6f19?w=800"
        ],
        rating: 4.9,
        reviews: 78,
        inStock: true
    },

    // ===========================
    // DECORAÇÃO
    // ===========================
    {
        id: 18,
        name: "Poster Akatsuki Rising",
        price: 39.90,
        description: "Poster artístico da Akatsuki em papel de alta gramatura.",
        fullDescription: "Poster premium em papel couché 230g com laminação fosca. Arte original mostrando todos os membros da Akatsuki. Tamanho: 60x90cm. Cores vibrantes que não desbotam.",
        sizes: ["60x90cm", "40x60cm"],
        colors: [
            { name: "Original", code: "#8B0000" }
        ],
        category: "Decoração",
        image: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=600",
        images: [
            "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800"
        ],
        rating: 4.7,
        reviews: 234,
        inStock: true
    },
    {
        id: 19,
        name: "Quadro LED Konoha Sunset",
        price: 159.90,
        description: "Quadro decorativo com LED mostrando Konoha ao pôr do sol.",
        fullDescription: "Quadro em MDF com impressão UV de altíssima qualidade. LEDs embutidos criam um efeito de pôr do sol realista. Tamanho: 50x35cm. Controle remoto para ajustar intensidade. Alimentação USB.",
        sizes: ["50x35cm"],
        colors: [
            { name: "Original", code: "#FF6B00" }
        ],
        category: "Decoração",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600",
        images: [
            "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800"
        ],
        rating: 4.9,
        reviews: 156,
        inStock: true,
        featured: true
    },
    {
        id: 20,
        name: "Luminária Rasengan 3D",
        price: 129.90,
        description: "Luminária 3D em formato do Rasengan com 7 cores.",
        fullDescription: "Luminária em acrílico com ilusão 3D do Rasengan. 7 cores intercambiáveis via controle remoto. Base em ABS premium. Alimentação USB ou 3 pilhas AA. Ótima luz noturna.",
        sizes: ["Único"],
        colors: [
            { name: "Multicolor", code: "#00BFFF" }
        ],
        category: "Decoração",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
        images: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
        ],
        rating: 4.8,
        reviews: 198,
        inStock: true
    },
    {
        id: 21,
        name: "Tapete Selo de Invocação",
        price: 199.90,
        description: "Tapete redondo com o selo de invocação de sapos.",
        fullDescription: "Tapete em pelúcia de alta densidade com o círculo de invocação usado por Naruto para invocar Gamabunta. Diâmetro: 120cm. Antiderrapante. Perfeito para quarto ou sala de jogos.",
        sizes: ["Único"],
        colors: [
            { name: "Vermelho/Preto", code: "#8B0000" }
        ],
        category: "Decoração",
        image: "https://images.unsplash.com/photo-1531923610693-c816870f3e01?w=600",
        images: [
            "https://images.unsplash.com/photo-1531923610693-c816870f3e01?w=800"
        ],
        rating: 4.7,
        reviews: 89,
        inStock: true
    },

    // ===========================
    // SPECIAL EDITIONS
    // ===========================
    {
        id: 22,
        name: "Box Ultimate Collector's Edition",
        price: 899.90,
        description: "Box exclusivo com itens limitados para verdadeiros fãs.",
        fullDescription: "A coleção definitiva! Inclui: Moletom Akatsuki G, Figura Naruto 25cm, Bandana Konoha, set de kunais, 5 posters artísticos, caneca termosensível e certificado numerado. Apenas 500 unidades no mundo!",
        sizes: ["G", "GG"],
        colors: [
            { name: "Edição Especial", code: "#FFD700" }
        ],
        category: "Edição Especial",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
        images: [
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800"
        ],
        rating: 5.0,
        reviews: 43,
        inStock: true,
        featured: true,
        discount: 0,
        limited: true
    }
];

// Categorias disponíveis para filtro
export const categories = [
    { id: 'camisetas', name: 'Camisetas', icon: '👕' },
    { id: 'moletons', name: 'Moletons', icon: '🧥' },
    { id: 'acessorios', name: 'Acessórios', icon: '🎒' },
    { id: 'colecionaveis', name: 'Colecionáveis', icon: '🎭' },
    { id: 'decoracao', name: 'Decoração', icon: '🖼️' },
    { id: 'edicao-especial', name: 'Edição Especial', icon: '⭐' }
];

// Produtos em destaque para a homepage
export const featuredProducts = products.filter(p => p.featured);

// Novidades (últimos 6 produtos)
export const newArrivals = products.slice(-6);

// Produtos com desconto
export const onSale = products.filter(p => p.discount > 0);

export default products;