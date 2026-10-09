import { useState } from "react";
import { profile } from "../data/profile.ts";
import { ProfileLink } from "../components/ProfileLink.tsx";
import { ScrollCue } from "../components/ScrollCue.tsx";

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
          <div className="bio__row">
            <div className="bio__bodies">
              {profile.bio.map((paragraph, i) => (
                <p key={i} className="bio__body">
                  {paragraph}
                </p>
              ))}
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

          <ul className="bio__links">
            {profile.links.map((link) => (
              <li key={link.href}>
                <ProfileLink {...link} />
              </li>
            ))}
          </ul>
          <div className="cues">
            <ScrollCue target="publications" label="Publications" />
            <ScrollCue target="media" label="Media Coverage" />
          </div>
        </div>
      </div>
    </section>
  );
}
