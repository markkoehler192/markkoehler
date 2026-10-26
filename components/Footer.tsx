import { getSprache } from "@/lib/sprache-server";

export async function Footer() {
  const { t } = await getSprache();
  return (
    <footer className="footer">
      <span>{t("Bereitgestellt von", "Provided by")}</span>
      <img src="/icons/logo-kurios.svg" alt="KURIOS" width={64} height={12} />
      <span>{t("· Mit KI erstellt, bitte vor dem Veröffentlichen kurz prüfen.", "· Made with AI, please check before publishing.")}</span>
    </footer>
  );
}
