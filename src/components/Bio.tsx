import { useState } from "react";
import { profile } from "../data/profile.ts";
import { ProfileLink } from "./ProfileLink.tsx";
import { ScrollCue } from "./ScrollCue.tsx";

export function Bio() {
  // Easter egg: click the photo to start it spinning, click again to stop.
  // `spun` stays true after the first click so pausing freezes the photo mid-turn.
  const [spun, setSpun] = useState(false);
  const [spinning, setSpinning] = useState(false);

  return (
    <section
      id="about"
      className="section section--centred"
      aria-labelledby="name"
    >
      <div className="container bio">
        <div className="bio__text">
          <h1 id="name" className="bio__name">
            {profile.name}
          </h1>
          <p className="bio__affiliation">{profile.affiliation}</p>
          <div className="bio__bodies">
            {profile.bio.map((paragraph, i) => (
              <p key={i} className="bio__body">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="bio__links">
            {profile.links.map((link) => (
              <li key={link.href}>
                <ProfileLink {...link} />
              </li>
            ))}
          </ul>
          <ScrollCue target="publications" label="Publications" />
        </div>
        {profile.photo && (
          <img
            className={`bio__photo${spun ? " bio__photo--spin" : ""}${
              spun && !spinning ? " bio__photo--paused" : ""
            }`}
            draggable={false}
            onClick={() => {
              setSpun(true);
              setSpinning((s) => !s);
            }}
            src={profile.photo}
            alt={profile.photoAlt ?? ""}
            width={240}
            height={290}
            fetchPriority="high"
          />
        )}
      </div>
    </section>
  );
}
