import LegalPage from "@/components/LegalPage";

export default function LegalNoticePage() {
  return (
    <LegalPage
      label="INFORMATIONS"
      title="Mentions légales"
      intro="Les informations d'identification et de publication de Prime Digital."
      sections={[
        {
          title: "Éditeur du site",
          paragraphs: [
            "Prime Digital est un service de vente de produits numériques. Le contact officiel est le 01 57 23 46 89.",
            "Le site est édité avec Next.js et hébergé sur une infrastructure web permettant le traitement sécurisé des commandes.",
          ],
        },
        {
          title: "Paiements",
          paragraphs: [
            "Les paiements sont opérés par SasPay. Prime Digital ne reçoit pas et ne conserve pas les données complètes des moyens de paiement.",
            "Les logos, noms et marques de tiers restent la propriété de leurs détenteurs respectifs et sont mentionnés uniquement pour identifier les produits proposés.",
          ],
        },
        {
          title: "Propriété intellectuelle",
          paragraphs: [
            "Les textes, éléments graphiques et composants propres à Prime Digital ne peuvent être réutilisés sans autorisation.",
            "Les contenus fournis avec une commande sont destinés à l'usage prévu dans l'offre et ne doivent pas être redistribués publiquement.",
          ],
        },
      ]}
    />
  );
}
