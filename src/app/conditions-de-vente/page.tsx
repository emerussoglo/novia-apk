import LegalPage from "@/components/LegalPage";

export default function SalesTermsPage() {
  return (
    <LegalPage
      label="INFORMATIONS"
      title="Conditions de vente"
      intro="Les règles applicables à l'achat et à la livraison de nos produits numériques."
      sections={[
        {
          title: "Produits et commande",
          paragraphs: [
            "Prime Digital propose des offres numériques à usage personnel. Le descriptif, le prix et les éléments inclus sont affichés avant la validation de la commande.",
            "La commande est confirmée après paiement accepté par SasPay. Une référence de transaction peut être demandée pour toute assistance.",
          ],
        },
        {
          title: "Paiement et livraison",
          paragraphs: [
            "Le paiement est traité en francs CFA par SasPay. La confirmation du paiement est vérifiée côté serveur avant la mise à disposition des fichiers.",
            "La livraison est numérique et intervient sur la page de confirmation après validation de la transaction. Conserve tes fichiers après téléchargement.",
          ],
        },
        {
          title: "Assistance et remboursement",
          paragraphs: [
            "En cas de difficulté technique, contacte le support avec ta référence de transaction. Nous chercherons une solution dans un délai raisonnable.",
            "Les demandes de remboursement sont étudiées au cas par cas lorsqu'un problème de livraison ou de fonctionnement n'a pas pu être résolu.",
          ],
        },
      ]}
    />
  );
}
