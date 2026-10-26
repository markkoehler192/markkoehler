import { Shell } from "@/components/Shell";
import { getSprache } from "@/lib/sprache-server";
import { Live } from "./Live";

export default async function LiveSeite() {
  const { s } = await getSprache();
  return (
    <Shell>
      <Live key={s} />
    </Shell>
  );
}
