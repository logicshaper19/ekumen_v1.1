import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { ComplianceChart, TrendChart, DistributionChart } from '@/components/charts/DeclarationCharts';
import { chartData } from '@/data/declarationChartData';

interface DeclarationContent {
  id: string;
  title: string;
  description: string;
  summary: string;
  evolution: string;
  risks: string;
}

const declarationContents: Record<string, DeclarationContent> = {
  'declaration-activite': {
    id: 'declaration-activite',
    title: 'Déclaration d\'Activité Agricole',
    description: 'Cette déclaration est obligatoire pour toute exploitation agricole en France. Elle permet d\'officialiser votre activité auprès des autorités et d\'accéder aux différents dispositifs d\'aide et de soutien.',
    summary: `Points clés à retenir:
- Déclaration annuelle obligatoire avant le 15 mai
- Base pour les aides PAC et autres subventions
- Détails requis sur les surfaces cultivées et le cheptel
- Impact sur vos droits à paiement de base (DPB)
- Influence le calcul de vos cotisations sociales MSA`,
    evolution: `Changements importants pour 2024:
- Nouvelle plateforme de télédéclaration
- Renforcement des critères environnementaux
- Modification des codes cultures
- Nouvelles exigences sur la diversification des cultures
- Introduction de l'éco-régime dans la déclaration`,
    risks: `À surveiller particulièrement:
- Retard de déclaration: pénalités financières
- Erreurs dans les surfaces: impact sur les aides
- Non-respect des critères environnementaux: réduction des aides
- Incohérences avec les contrôles terrain
- Oubli de parcelles: perte de droits historiques`
  },
  'foncier-rural': {
    id: 'foncier-rural',
    title: 'Foncier Rural',
    description: 'Déclaration obligatoire concernant la gestion et l\'utilisation des terres agricoles, essentielle pour la conformité réglementaire et l\'accès aux aides.',
    summary: `Éléments essentiels:
- Recensement complet des parcelles exploitées
- Statut juridique des terres (propriété, fermage, etc.)
- Déclaration des changements d'usage des sols
- Identification des zones protégées
- Cartographie précise des exploitations`,
    evolution: `Mises à jour 2024:
- Nouveau système de géolocalisation des parcelles
- Intégration des données du cadastre
- Simplification des procédures de déclaration
- Renforcement du contrôle des zones sensibles
- Nouvelles règles sur les changements d'affectation`,
    risks: `Points de vigilance:
- Inexactitudes dans la déclaration des surfaces
- Non-déclaration des changements d'usage
- Conflits potentiels avec le cadastre
- Impact sur les droits de préemption
- Risques liés aux zones environnementales protégées`
  },
  'engrais-sols': {
    id: 'engrais-sols',
    title: 'Gestion des Engrais et Sols',
    description: 'Déclaration et suivi de l\'utilisation des fertilisants et de la gestion des sols agricoles.',
    summary: `Points essentiels:
- Plan prévisionnel de fumure
- Cahier d'épandage
- Analyses de sol régulières
- Respect des périodes d'épandage
- Gestion des zones vulnérables`,
    evolution: `Actualités 2024:
- Nouvelles limites d'épandage
- Contrôle renforcé des nitrates
- Obligations zones vulnérables
- Suivi numérique obligatoire
- Nouvelles normes d'application`,
    risks: `À surveiller:
- Dépassement des quotas
- Non-respect des périodes
- Pollution des eaux
- Sanctions administratives
- Impact sur les certifications`
  },
  'phytosanitaires': {
    id: 'phytosanitaires',
    title: 'Rapport sur l\'Utilisation des Produits Phytosanitaires',
    description: 'Suivi et déclaration de l\'utilisation des produits phytosanitaires sur l\'exploitation, conformément aux réglementations en vigueur.',
    summary: `La gestion des produits phytosanitaires nécessite une attention particulière au registre des traitements effectués. Le respect des doses et conditions d'application est primordial. Les zones de non-traitement doivent être strictement respectées. Un stockage conforme et une gestion rigoureuse des produits sont essentiels.`,
    evolution: `De nouvelles restrictions ont été mises en place sur certaines substances actives. Les zones non traitées ont été étendues pour mieux protéger l'environnement. Le suivi des résidus a été renforcé avec des contrôles plus fréquents. L'utilisation de solutions de biocontrôle est désormais privilégiée.`,
    risks: `Le stockage non conforme des produits représente un risque majeur pour la sécurité. Le dépassement des doses autorisées peut entraîner des sanctions importantes. Un défaut de traçabilité peut compromettre la certification de l'exploitation. Les impacts environnementaux doivent être surveillés de près.`
  },
  'conformite-sante-securite': {
    id: 'conformite-sante-securite',
    title: 'Conformité en Santé et Sécurité',
    description: 'Évaluation et suivi des mesures de santé et sécurité pour les travailleurs agricoles et l\'exploitation.',
    summary: `Éléments essentiels:
- Document unique d'évaluation des risques
- Équipements de protection individuelle
- Formation du personnel
- Protocoles sanitaires
- Maintenance des équipements`,
    evolution: `Changements majeurs:
- Renforcement des normes de sécurité
- Nouvelles exigences de formation
- Protocoles COVID-19 actualisés
- Suivi médical renforcé
- Prévention des risques psychosociaux`,
    risks: `Risques principaux:
- Accidents du travail
- Non-conformité des installations
- Défaut de formation
- Contrôles inspection du travail
- Responsabilité de l'employeur`
  },
  'efa': {
    id: 'efa',
    title: 'Zones de Focus Écologiques (EFA)',
    description: 'Déclaration des surfaces d\'intérêt écologique, essentielle pour la conformité environnementale et l\'accès aux aides PAC.',
    summary: `À retenir:
- 5% minimum de la surface en EFA
- Types d'éléments éligibles
- Coefficient de pondération
- Maintien des éléments déclarés
- Impact sur le verdissement`,
    evolution: `Nouveautés:
- Élargissement des éléments éligibles
- Nouvelle méthode de calcul
- Valorisation des haies
- Intégration des cultures dérobées
- Bonus pour la biodiversité`,
    risks: `Vigilance requise:
- Sous-déclaration des surfaces
- Destruction d'éléments déclarés
- Non-respect des critères d'entretien
- Impact sur les aides PAC
- Contrôles satellitaires renforcés`
  },
  'eau': {
    id: 'eau',
    title: 'Déclaration d\'Eau Agricole',
    description: 'Déclaration annuelle des prélèvements d\'eau pour l\'irrigation et autres usages agricoles.',
    summary: `Points essentiels:
- Volumes prélevés par point d'eau
- Période d'utilisation
- Type de cultures irriguées
- Matériel d'irrigation utilisé
- Compteurs volumétriques`,
    evolution: `Évolutions récentes:
- Quotas d'eau revus
- Nouveaux compteurs connectés
- Gestion collective de l'eau
- Restrictions saisonnières
- Tarification adaptée`,
    risks: `Risques majeurs:
- Dépassement des quotas
- Défaut de comptage
- Non-respect des arrêtés sécheresse
- Conflits d'usage
- Sanctions financières`
  },
  'carbone': {
    id: 'carbone',
    title: 'Bilan Carbone',
    description: 'Évaluation et déclaration de l\'empreinte carbone de l\'exploitation agricole, incluant les émissions directes et indirectes.',
    summary: `Composantes du bilan:
- Émissions liées au cheptel
- Consommation énergétique
- Utilisation des engrais
- Stockage carbone dans les sols
- Pratiques de conservation`,
    evolution: `Actualités 2024:
- Nouvelle méthode de calcul CAP'2ER
- Intégration des pratiques agroécologiques
- Valorisation du stockage carbone
- Objectifs de réduction renforcés
- Compensation carbone possible`,
    risks: `Points critiques:
- Sous-estimation des émissions
- Coût des mesures de réduction
- Impact sur la certification bas carbone
- Adaptation aux nouvelles normes
- Compétitivité de l'exploitation`
  },
  'pac': {
    id: 'pac',
    title: 'PAC - Politique Agricole Commune',
    description: 'Déclaration annuelle pour l\'obtention des aides de la Politique Agricole Commune, pilier essentiel du soutien agricole.',
    summary: `Points essentiels:
- Déclaration surfaces et cultures
- Droits à paiement de base
- Aides couplées végétales/animales
- Éco-régime et MAEC
- Critères d'éligibilité`,
    evolution: `Réforme PAC 2023-2027:
- Nouveau système d'éco-régimes
- Conditionnalité renforcée
- Redistribution des aides
- Convergence des DPB
- Soutien aux jeunes agriculteurs`,
    risks: `À surveiller:
- Erreurs de déclaration
- Non-respect conditionnalité
- Retards de paiement
- Sanctions administratives
- Contrôles sur place`
  },
  'identification-animaux': {
    id: 'identification-animaux',
    title: 'Identification et Enregistrement des Animaux',
    description: 'Système obligatoire d\'identification et de traçabilité des animaux d\'élevage, essentiel pour la sécurité sanitaire.',
    summary: `Obligations:
- Identification à la naissance
- Registre d'élevage à jour
- Notifications de mouvement
- Boucles électroniques
- Documents de circulation`,
    evolution: `Nouveautés:
- Dématérialisation complète
- Boucles électroniques RFID
- Application mobile de suivi
- Interconnexion des bases
- Traçabilité renforcée`,
    risks: `Points de vigilance:
- Retard de notification
- Perte de boucles
- Non-conformité registre
- Sanctions financières
- Blocage des mouvements`
  },
  'bien-etre': {
    id: 'bien-etre',
    title: 'Déclaration de Bien-être Animal',
    description: 'Rapport sur les conditions d\'élevage et le respect des normes de bien-être animal, incluant l\'habitat, l\'alimentation et les soins.',
    summary: `Critères principaux:
- Conditions de logement
- Accès extérieur
- Densité d'élevage
- Pratiques d'élevage
- Suivi sanitaire`,
    evolution: `Évolutions 2024:
- Nouvelles normes logement
- Enrichissement obligatoire
- Réduction des interventions
- Transport plus encadré
- Audit bien-être annuel`,
    risks: `Risques majeurs:
- Non-conformité installations
- Problèmes sanitaires
- Impact certification
- Contrôles inopinés
- Pression sociétale`
  },
  'cotisation': {
    id: 'cotisation',
    title: 'Cotisation Agricole',
    description: 'Déclaration des revenus professionnels et calcul des cotisations sociales MSA pour l\'exploitation agricole.',
    summary: `Éléments déclaratifs:
- Revenus professionnels
- Assiette de cotisations
- Options d'imposition
- Membres de l'exploitation
- Activités secondaires`,
    evolution: `Changements 2024:
- Nouveau calcul des cotisations
- Modulation possible
- Dispositifs d'exonération
- Déclaration en ligne
- Échéancier personnalisé`,
    risks: `Points d'attention:
- Retard de déclaration
- Erreur de calcul
- Impact sur prestations
- Majorations possibles
- Recouvrement forcé`
  },
  'tva': {
    id: 'tva',
    title: 'Déclaration de TVA Agricole',
    description: 'Déclaration périodique de la TVA spécifique aux activités agricoles, tenant compte des régimes particuliers du secteur.',
    summary: `Points clés:
- Régime applicable
- Périodicité déclarative
- Opérations concernées
- Crédits de TVA
- Remboursement forfaitaire`,
    evolution: `Actualités:
- Dématérialisation obligatoire
- Nouveaux taux sectoriels
- Délais de remboursement
- Contrôle renforcé
- Régime transitoire bio`,
    risks: `Risques fiscaux:
- Erreurs déclaratives
- Retards de paiement
- Rejet remboursement
- Contrôle fiscal
- Régularisations coûteuses`
  }
};

export function DeclarationOverview() {
  const navigate = useNavigate();
  const { categoryId, declarationId } = useParams();
  
  const declaration = declarationContents[declarationId || ''];
  const charts = chartData[declarationId as keyof typeof chartData];
  
  if (!declaration) {
    return <div>Déclaration non trouvée</div>;
  }

  const renderCharts = () => {
    if (!charts) return null;

    switch (declarationId) {
      case 'phytosanitaires':
      case 'efa':
      case 'eau':
      case 'carbone':
      case 'pac':
      case 'identification-animaux':
      case 'bien-etre':
      case 'cotisation':
      case 'tva':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>État de Conformité</CardTitle>
              </CardHeader>
              <CardContent>
                <ComplianceChart data={charts.compliance} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Évolution Mensuelle</CardTitle>
              </CardHeader>
              <CardContent>
                <TrendChart data={charts.usage} />
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Répartition par Type</CardTitle>
              </CardHeader>
              <CardContent>
                <DistributionChart data={charts.distribution} />
              </CardContent>
            </Card>
          </div>
        );
      
      case 'conformite-sante-securite':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Évolution des Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <TrendChart data={charts.incidents} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Conformité par Domaine</CardTitle>
              </CardHeader>
              <CardContent>
                <ComplianceChart data={charts.compliance} />
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Répartition des Risques</CardTitle>
              </CardHeader>
              <CardContent>
                <DistributionChart data={charts.riskAreas} />
              </CardContent>
            </Card>
          </div>
        );
      
      case 'engrais-sols':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Utilisation des Engrais</CardTitle>
              </CardHeader>
              <CardContent>
                <TrendChart data={charts.usage} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Types d'Engrais</CardTitle>
              </CardHeader>
              <CardContent>
                <DistributionChart data={charts.distribution} />
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Qualité des Sols par Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <ComplianceChart data={charts.soilQuality} />
              </CardContent>
            </Card>
          </div>
        );

      case 'declaration-activite':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>État de Conformité</CardTitle>
              </CardHeader>
              <CardContent>
                <ComplianceChart data={charts.compliance} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Activité Mensuelle</CardTitle>
              </CardHeader>
              <CardContent>
                <TrendChart data={charts.usage} />
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Répartition par Type d'Activité</CardTitle>
              </CardHeader>
              <CardContent>
                <DistributionChart data={charts.distribution} />
              </CardContent>
            </Card>
          </div>
        );

      case 'foncier-rural':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>État des Déclarations</CardTitle>
              </CardHeader>
              <CardContent>
                <ComplianceChart data={charts.compliance} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Évolution Mensuelle</CardTitle>
              </CardHeader>
              <CardContent>
                <TrendChart data={charts.usage} />
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Types de Terres</CardTitle>
              </CardHeader>
              <CardContent>
                <DistributionChart data={charts.distribution} />
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/reglementations')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux réglementaires
        </Button>
      </div>

      <h1 className="text-2xl font-bold mb-6">{declaration.title}</h1>

      {/* Top row: Description and Summary side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{declaration.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes de synthèse</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 whitespace-pre-line">{declaration.summary}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      {renderCharts()}

      {/* Evolution and Risks side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Évolutions et changements</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 whitespace-pre-line">{declaration.evolution}</p>
          </CardContent>
        </Card>

        <Card className="bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Risques pour mon exploitation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 whitespace-pre-line">{declaration.risks}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
