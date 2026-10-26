"use client";

import Link from "next/link";
import { useSprache } from "@/components/Sprache";
import { useToast } from "@/components/Toast";

export function KontoAktionen() {
  const { t } = useSprache();
  const toast = useToast();
  return (
    <div className="row wrap gap-8">
      <button
        className="btn"
        onClick={() => toast({ titel: t("Link verschickt", "Link sent"), text: t("Du bekommst eine E-Mail, um dein Passwort neu zu setzen.", "You'll get an email to set a new password.") })}
      >
        {t("Passwort ändern", "Change password")}
      </button>
      <Link href="/einstellungen" className="btn">{t("Einstellungen", "Settings")}</Link>
    </div>
  );
}
