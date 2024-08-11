import { GitHub, Instagram, Mail } from "react-feather";

export function Socials() {
  return (
    <div className="flex gap-6">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/meszarosdezso"
      >
        <GitHub size={24} className="hover:text-white" />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://instagram.com/meszarosdezso"
      >
        <Instagram size={24} className="hover:text-white" />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="mailto:devzsomeszaros@gmail.com"
      >
        <Mail size={24} className="hover:text-white" />
      </a>
    </div>
  );
}
