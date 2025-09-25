import { Link } from 'react-router-dom'
import { ShoppingBag, Star, ArrowRight, Zap, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ShopTeaser = () => {
  const products = [
    {
      id: 1,
      name: "Robô IA para Code Review",
      description: "IA especializada em revisar código Java e Spring Boot",
      price: "R$ 97",
      originalPrice: "R$ 197",
      rating: 4.9,
      image: "🤖",
      badge: "Mais Vendido",
      badgeColor: "bg-[#FFD15A] text-black"
    },
    {
      id: 2,
      name: "Camiseta JavaCodeLab",
      description: "Camiseta premium para desenvolvedores Java",
      price: "R$ 49",
      originalPrice: "R$ 79",
      rating: 4.8,
      image: "👕",
      badge: "Novo",
      badgeColor: "bg-green-500 text-white"
    },
    {
      id: 3,
      name: "Kit Ferramentas Dev",
      description: "Conjunto de ferramentas essenciais para desenvolvimento",
      price: "R$ 149",
      originalPrice: "R$ 249",
      rating: 4.7,
      image: "🛠️",
      badge: "Oferta",
      badgeColor: "bg-red-500 text-white"
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShoppingBag className="w-6 h-6 text-[#FFD15A]" />
            <h2 className="text-3xl md:text-4xl font-geist font-bold text-[#E8E8E8]">
              Loja JavaCodeLab
            </h2>
          </div>
          <p className="text-lg text-[#E8E8E8]/70 font-roboto max-w-2xl mx-auto">
            Produtos exclusivos para desenvolvedores Java que querem se destacar
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="bg-[#2A2A2B] rounded-xl overflow-hidden border border-white/10 hover:border-[#FFD15A]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD15A]/10 hover-lift">
                {/* Product Image */}
                <div className="aspect-square bg-gradient-to-br from-[#FFD15A]/10 to-[#02a9f7]/10 relative overflow-hidden flex items-center justify-center">
                  <div className="text-6xl mb-4">{product.image}</div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-roboto font-bold ${product.badgeColor}`}>
                      {product.badge}
                    </span>
                  </div>

                  {/* Wishlist */}
                  <div className="absolute top-4 right-4">
                    <button className="w-8 h-8 bg-[#1A1A1B]/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#FFD15A]/20 transition-colors duration-200">
                      <Gift className="w-4 h-4 text-[#E8E8E8]/60 hover:text-[#FFD15A]" />
                    </button>
                  </div>

                  {/* Quick View */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button 
                      size="sm"
                      className="bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-medium"
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-geist font-semibold text-[#E8E8E8] mb-2 group-hover:text-[#FFD15A] transition-colors duration-200">
                    {product.name}
                  </h3>
                  
                  <p className="text-[#E8E8E8]/70 font-roboto text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#FFD15A] fill-current" />
                      <span className="text-sm font-roboto text-[#E8E8E8]">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-xs text-[#E8E8E8]/60 font-roboto">
                      (127 avaliações)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-geist font-bold text-[#FFD15A]">
                        {product.price}
                      </span>
                      <span className="text-sm text-[#E8E8E8]/50 line-through font-roboto">
                        {product.originalPrice}
                      </span>
                    </div>
                    <div className="text-xs text-green-400 font-roboto font-medium">
                      {Math.round(((parseInt(product.originalPrice.replace(/\D/g, '')) - parseInt(product.price.replace(/\D/g, ''))) / parseInt(product.originalPrice.replace(/\D/g, '')) * 100))}% OFF
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <Button 
                    className="w-full bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-medium group"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#FFD15A]/10 to-[#02a9f7]/10 rounded-2xl border border-[#FFD15A]/20 p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-6 h-6 text-[#FFD15A]" />
            <h3 className="text-2xl font-geist font-bold text-[#E8E8E8]">
              Oferta Especial
            </h3>
          </div>
          
          <p className="text-[#E8E8E8]/70 font-roboto mb-6 max-w-2xl mx-auto">
            Compre qualquer produto da loja e ganhe acesso gratuito ao nosso curso 
            "Spring Boot Avançado" (valor R$ 297)
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/loja">
              <Button 
                size="lg"
                className="bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-semibold px-8 group"
              >
                Explorar Loja Completa
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            <Button 
              variant="outline"
              size="lg"
              className="border-[#02a9f7] text-[#02a9f7] hover:bg-[#02a9f7] hover:text-white font-roboto font-semibold px-8"
            >
              Ver Cursos
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShopTeaser
