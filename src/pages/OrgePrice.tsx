import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function OrgePrice() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-[#FAF7F0] p-8">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-[#004D40]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>

        <div className="space-y-6 text-[#004D40]">
          <h1 className="text-2xl font-bold">Prix actuels du marché (aujourd'hui)</h1>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Orge fourragère</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>États-Unis : 220 à 240 euros par tonne métrique</li>
              <li>Canada : 210 à 230 euros par tonne métrique</li>
              <li>Union européenne : 250 à 270 euros par tonne métrique</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Orge de brasserie</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>États-Unis : 330 à 350 euros par tonne métrique</li>
              <li>Canada : 320 à 340 euros par tonne métrique</li>
              <li>Union européenne : 360 à 380 euros par tonne métrique</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Prix prévisionnels à la récolte (15 mars 2024)</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Orge fourragère</h3>
                <p>Les prix devraient augmenter de 3 à 5 % en raison d'une demande accrue des éleveurs et d'une offre mondiale plus restreinte.</p>
                <p className="font-semibold mt-2">Fourchette prévisionnelle : 257 à 283 euros par tonne métrique (Union européenne)</p>
              </div>
              
              <div>
                <h3 className="font-semibold">Orge de brasserie</h3>
                <p>Les prix devraient rester stables ou augmenter légèrement (1 à 2 %), soutenus par une demande constante de l'industrie brassicole.</p>
                <p className="font-semibold mt-2">Fourchette prévisionnelle : 363 à 387 euros par tonne métrique (Union européenne)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
