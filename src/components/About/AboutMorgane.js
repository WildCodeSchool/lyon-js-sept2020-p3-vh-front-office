import React from 'react';
import { Helmet } from 'react-helmet';
import {
  AiOutlineMail,
  AiFillFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from 'react-icons/ai';
import './AboutMorgane.scss';

export default function AboutMorgane() {
  return (
    <div className="presentationContainer">
      <Helmet>
        <title>Qui suis-je</title>
      </Helmet>
      <h1 className="titleAbout"> A Propos</h1>
      <div className="squareAboutGrey">
        <div className="imageText">
          <img
            className="imageMorgane"
            alt=""
            src="https://lirp-cdn.multiscreensite.com/82a74c83/dms3rep/multi/opt/morgane_pardo-400w.jpg"
            width="290"
            height="290"
          />
          <h2 className="whoTitle">Qui suis je?</h2>
          <div className="paragraphs">
            <div className="first-part">
              <p className="first-paragraph">
                Originaire de Lyon, dans un premier temps je suis des études de
                médecine, puis de biologie moléculaire, ayant à cœur de percer
                les mystères cellulaires de l’être humain.
                <br />
                <br />
                Après des soucis de santé qui m’obligent à reconsidérer mes
                choix de carrière, j’effectue des études de droit et de
                management des ressources humaines. J’occupe alors divers
                métiers aux seins de PME et de Grands Comptes. Cependant, je
                réalise rapidement que ce métier me met en conflit avec
                certaines de mes valeurs. En recherche d’une voie plus
                authentique et plus en accord avec mon identité, je me tourne
                naturellement vers les médecines non conventionnelles, la
                psychologie et l’hypnose ericksonienne. Rêveuse lucide et
                hypersensible depuis l’enfance, j’ai longtemps cherché des
                réponses dans les livres afin de canaliser ma sensibilité et mon
                empathie. En revanche, ce n’est qu’en rencontrant l’hypnose que
                j’ai pu mettre des mots sur mon état de conscience modifié
                nocturne. Et puis il y avait aussi mes mains, ces mains qui
                soignent lorsque je les appose sur une zone sensible du corps de
                l’autre.
                <br />
                <br />
                <br />
                <img
                  className="first-picture"
                  alt=""
                  src="https://lirp-cdn.multiscreensite.com/md/unsplash/dms3rep/multi/opt/photo-1506102383123-c8ef1e872756-1920w.jpg"
                  width="100%"
                  height="100%"
                />
              </p>
            </div>
            <div className="second-part">
              <p className="second-paragraph">
                <br />
                <img
                  className="second-picture"
                  alt=""
                  src="https://lirp-cdn.multiscreensite.com/82a74c83/dms3rep/multi/opt/morgane-pardo-hypnose2-1920w.jpg"
                  width="100%"
                  height="100%"
                />
                <br />
                Prenant conscience du sens de mon existence, je me forme alors à
                diverses médecines douces corporelles : magnétisme, Reiki et Tui
                Na, par exemple.
                <br />
                <br />
                Mais également en psychologie sociale, en psychopathologie, au
                niveau praticien en hypnose éricksonienne avec Kévin FINEL, en
                PNL (Programmation Neuro – Linguistique) et en RITMO®
                (combinaison de l’hypnose et de l’EMDR) avec Lili RUGGIERI. Ma
                curiosité de l’être humain me pousse à me former en continu afin
                de toujours mieux appréhender et comprendre l’autre pour mieux
                l’accompagner dans sa quête de sens, de bonheur, de mieux-être.
                Le tout dans une volonté constante d’amélioration et d’évolution
                de mon approche. J’adhère également au Syndicat Des Métiers de
                l’Hypnose dans le but de garantir à mes clients un cadre
                déontologique, éthique et professionnel sûr. Ayant été chahutée
                par la vie, d’autre m’ont accompagnée afin que je trouve ma
                voie, c’est à mon tour de vous éclairer le chemin pendant
                quelques temps afin que vous trouviez votre propre lumière.
                <br />
                <br />
                <img
                  className="third-picture"
                  alt=""
                  src="https://lirp-cdn.multiscreensite.com/82a74c83/dms3rep/multi/opt/morgane-pardo-hypnose2-1920w.jpg"
                  width="100%"
                  height="100%"
                />
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2>Rejoignez-moi !</h2>
        </div>
        <div className="socialMedia">
          <ul className="icon-bar">
            <div>
              <li className="list">
                <a href="http://www.google.com">
                  <AiOutlineMail size={40} color="black" />
                </a>
              </li>
            </div>
            <div>
              <li className="list">
                <a href="http://www.google.com">
                  <AiFillFacebook size={40} color="black" />
                </a>
              </li>
            </div>
            <div>
              <li className="list">
                <a href="http://www.google.com">
                  <AiOutlineTwitter size={40} color="black" />
                </a>
              </li>
            </div>
            <div>
              <li className="list">
                <a href="http://www.google.com">
                  <AiOutlineInstagram size={40} color="black" />
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
