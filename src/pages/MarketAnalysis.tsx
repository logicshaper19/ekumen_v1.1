import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function MarketAnalysis() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* Top Navigation */}
      <div className="border-b border-[#004D40]/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-[#004D40] hover:bg-[#004D40]/5"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-[#004D40]">Analyse du Prix de l'Orge</h1>
            
            <h2 className="text-[#004D40]">Prix actuels du marché</h2>
            
            <h3>Orge fourragère</h3>
            <ul>
              <li>États-Unis : 220 à 240 euros par tonne métrique</li>
              <li>Canada : 210 à 230 euros par tonne métrique</li>
              <li>Union européenne : 250 à 270 euros par tonne métrique</li>
            </ul>

            <h3>Orge de brasserie</h3>
            <ul>
              <li>États-Unis : 330 à 350 euros par tonne métrique</li>
              <li>Canada : 320 à 340 euros par tonne métrique</li>
              <li>Union européenne : 360 à 380 euros par tonne métrique</li>
            </ul>

            <h2 className="text-[#004D40]">Prix prévisionnels à la récolte (15 mars 2024)</h2>
            
            <h3>Orge fourragère</h3>
            <p>Les prix devraient augmenter de 3 à 5 % en raison d'une demande accrue des éleveurs et d'une offre mondiale plus restreinte.</p>
            <p><strong>Fourchette prévisionnelle :</strong> 257 à 283 euros par tonne métrique (Union européenne)</p>

            <h3>Orge de brasserie</h3>
            <p>Les prix devraient rester stables ou augmenter légèrement (1 à 2 %), soutenus par une demande constante de l'industrie brassicole.</p>
            <p><strong>Fourchette prévisionnelle :</strong> 363 à 387 euros par tonne métrique (Union européenne)</p>

            <h2 className="text-[#004D40]">Facteurs clés influençant les prix futurs</h2>
            <ul>
              <li><strong>Offre mondiale :</strong> Les conditions météorologiques dans les principales régions productrices laissent entrevoir des réductions potentielles de rendement</li>
              <li><strong>Tendances de la demande :</strong> Demande croissante pour les protéines végétales et les biocarburants</li>
              <li><strong>Coûts de l'énergie :</strong> Les fluctuations des prix du carburant pourraient affecter les coûts de transport</li>
            </ul>

            <h2 className="text-[#004D40]">Recommandations</h2>
            <div className="bg-[#004D40]/5 p-6 rounded-lg">
              <h3>Vendre maintenant</h3>
              <p>Si vous avez des contraintes de stockage ou besoin de liquidités immédiates, les prix actuels sont favorables.</p>
              
              <h3>Attendre la récolte</h3>
              <p>Si vous pouvez stocker votre orge en toute sécurité, attendre la récolte pourrait générer des rendements plus élevés, surtout si l'offre se resserre davantage.</p>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <Button
                onClick={() => navigate('/signup')}
                className="bg-[#004D40] text-[#FAF7F0] hover:bg-[#004D40]/90"
              >
                Créer un compte pour des alertes personnalisées
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
