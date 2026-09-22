import LegalPage from "@/components/LegalPage";

export default function PrivacyPage() {
  return (
    <LegalPage
      label="INFORMATIONS"
      title="Politique de confidentialité"
      intro="Cette page explique quelles informations Prime Digital utilise et comment elles sont protégées."
      sections={[
        {
          title: "Données collectées",
          paragraphs: [
            "Lors d'une commande, nous recueillons uniquement les informations nécessaires au traitement du paiement et à la livraison numérique : nom, adresse email et informations liées à la transaction.",
            "Les données de carte ou de mobile money sont saisies dans l'interface sécurisée de SasPay et ne sont pas stockées par Prime Digital.",
          ],
        },
        {
          title: "Utilisation des données",
          paragraphs: [
            "Ces informations servent à confirmer la commande, fournir les fichiers achetés, répondre au support et prévenir les paiements frauduleux.",
            "Nous ne vendons pas les données personnelles et ne les utilisons pas à des fins publicitaires sans consentement.",
          ],
        },
        {
          title: "Conservation et droits",
          paragraphs: [
            "Les données sont conservées pendant la durée nécessaire au suivi de la commande et aux obligations comptables applicables.",
            "Pour demander une correction, une suppression ou une information sur tes données, contacte Prime Digital au 01 57 23 46 89.",
          ],
        },
      ]}
    />
  );
}
