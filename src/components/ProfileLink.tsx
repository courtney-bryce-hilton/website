import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faBluesky,
  faGithub,
  faGoogleScholar,
} from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { Profile, ProfileLinkIcon } from "../types.ts";
import { ExternalLink } from "./ExternalLink.tsx";

// note: rendering 'CV' icon with just letters
const ICONS: Record<Exclude<ProfileLinkIcon, "cv">, IconDefinition> = {
  github: faGithub,
  bluesky: faBluesky,
  email: faEnvelope,
  scholar: faGoogleScholar,
};

type ProfileLinkProps = Profile["links"][number];

export function ProfileLink({ label, href, icon }: ProfileLinkProps) {
  const content =
    icon === "cv" ? (
      <span className="bio__cv" aria-hidden="true">
        CV
      </span>
    ) : (
      <FontAwesomeIcon icon={ICONS[icon]} />
    );

  // exception: mailto links hand off to the mail client; a new tab would just be left blank.
  if (href.startsWith("mailto:")) {
    return (
      <a href={href} title={label} aria-label={label}>
        {content}
      </a>
    );
  }

  return (
    <ExternalLink
      href={href}
      title={label}
      aria-label={`${label} (opens in a new tab)`}
    >
      {content}
    </ExternalLink>
  );
}
