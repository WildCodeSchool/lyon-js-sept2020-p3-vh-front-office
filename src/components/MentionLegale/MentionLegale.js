import React from 'react';
import { Helmet } from 'react-helmet';
import './MentionsLegale.scss';

const MentionLegale = () => {
  return (
    <div className="page-mentions-légales">
      <Helmet>
        <title>Mentions Légales</title>
      </Helmet>
      <div className="container-mentions-legales">
        <div className="h1-hr">
          <h1 className="titre-mentions-legales">Mentions légales</h1>
          <p>_______</p>
        </div>
        <h3 className="catégories-mentions-légales">Activités principales</h3>
        <p className="paragraphes-mentions-légales">
          Morgane PARDO HYPNOSE : pratique de l’hypnose, de thérapies brèves, du
          reiki, du magnétisme, formation et coaching.
        </p>
        <h3>Siège social</h3>
        <p>Adresse postale : 1-3 rue de Milan – 69100 VILLEURBANNE</p>
        <h3>Contact</h3>
        <p>
          Par téléphone : 06 76 82 95 27 <br />
          Par courriel : morgane.pardo@yahoo.com
        </p>
        <h3>RCS</h3>
        <p>
          Microentreprise Immatriculée au RCS Lyon 845 258 284 <br /> <br />
          SIRET 845 258 284 00015 <br /> APE : 9609Z <br />
          TVA non applicable, art. 293 B du CGI.
        </p>
        <h3>Données personnelles</h3>
        <p>
          Conformément à l'article 34 de la Loi du 6 janvier 1978, vous disposez
          d'un droit individuel d'accès de modification, de rectification et de
          suppression des informations personnelles vous concernant, droit qui
          pourra être exercé en adressant un e-mail àmorgane.pardo@yahoo.com
        </p>
        <h3>Edition/publication</h3>
        <p>
          Le site "http://morgane-pardo-hypnose.com"est la propriété de Madame
          Morgane PARDO - 1-3 rue de Milan – 69100 VILLEURBANNE
        </p>
        <h3>Directrice de la publication</h3>
        <p>Madame Morgane PARDO</p>
        <h3>Hébergement</h3>
        <p>
          Hetzner Online GmbH - Industriestr. 25, 91710 Gunzenhausen - Allemagne
        </p>
        <h3>Logiciel</h3>
        <p>Ce site est réalisé et propulsé par HTTP5000.</p>
        <h3>Données personnelles</h3>
        <p>Aucune donnée personnelle n'est recueillie sur ce site.</p>
        <h3>Droits d'auteur- Copyright</h3>
        <p>
          Les éléments figurant sur ce site relèvent de la législation française
          et internationale et sont protégés par le droit de la propriété
          intellectuelle. Aucune représentation ou reproduction intégrale ou
          partielle ou aucune utilisation ne peut être faite sans avoir obtenu
          l'accord préalable de leurs propriétaires respectifs.
        </p>
        <h3>Liens hypertextes</h3>
        <p>
          Les liens hypertextes proposés sur ce site en direction d'autres
          ressources existantes sur internet n'engagent pas la responsabilité du
          ou des propriétaires de ce site. Pour toute insertion de lien vers ce
          site ou échange de lien, nous contacter par courrier à l'adresse
          ci-dessus. Crédits photos : Pexels.com / Unsplash.com / Morgane Pardo
        </p>
      </div>
    </div>
  );
};

export default MentionLegale;
