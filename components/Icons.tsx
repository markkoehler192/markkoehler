// Icons aus der Figma-Skizze (public/icons). Als <img>, damit die Originaldateien gelten.
type Props = { size?: number };

export const SearchIcon = ({ size = 16 }: Props) => (
  <img src="/icons/search.svg" alt="" width={size} height={size} />
);
export const ArrowRight = ({ size = 24 }: Props) => (
  <img src="/icons/arrow-right.svg" alt="" width={size} height={size} />
);
export const ArrowTool = ({ size = 20 }: Props) => (
  <img src="/icons/arrow-tool.svg" alt="" width={size} height={size} />
);
export const ArrowSend = ({ size = 18 }: Props) => (
  <img src="/icons/arrow-send.svg" alt="" width={size} height={size} />
);
export const FolderIcon = ({ size = 36 }: Props) => (
  <img src={size > 24 ? "/icons/folder.svg" : "/icons/folder-small.svg"} alt="" width={size} height={size} />
);
export const PlayIcon = ({ size = 56 }: Props) => (
  <img src="/icons/play.svg" alt="" width={size} height={size} />
);
