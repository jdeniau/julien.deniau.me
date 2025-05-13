---
theme: default # seriph
# class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
defaults:
  foo: true
transition: slide-left
title: 'Open-source: Pourquoi ? Comment ?'
mdc: true
background: /home-bg.png
backgroundSize: cover
layout: cover
---

<h1 v-mark.highlight="{at:0, color: '#ffc12c60'}" style="text-transform:uppercase">Open-source</h1>

## Pourquoi ? Comment ?

<!--
Bonjour,

Aujourd'hui je vous propose de parler un peu d'open-source,

Disclaimer : Cette présentation est un mélange de retour d'expérience personnelle, et du fruit de mes recherches sur le sujet.

Comme 20 min de présentation c'est assez court, et que l'open-source, c'est assez vaste, j'ai mis des lien vers mes source que je ne peux que vous encourager à aller lire !
-->


---
layout: image-left

image: /avatar-poufsouffle-portrait.jpg
backgroundSize: contain
---

<style>
  .social {
    display: flex;
    align-items: center;
    margin: 5px 0;
  }

  .social .icon {
    margin: 0 10px 0 0;
    width: 1em;
  }
</style>

# Qui suis-je ?

## <span v-mark.underline.yellow="0">Julien Deniau</span>


_Fait un peu d'open-source à mes heures perdues…_


<div>
  <div>
  <span v-mark.underline.blue="0">
    🏢 Mapado
  </span>
  </div>

_…et essaie de motiver ses collègues à en faire_
 
</div>

#### <span v-mark.underline.gray="0">En savoir plus sur moi ?</span>

<div class="social">
  <span class="icon" style="margin-left: -3px; margin-right: 13px">🌎</span> https://julien.deniau.me
</div>

<div class="social">
  <img class="icon" src="/social-github.svg" /> jdeniau
</div>

<div class="social">
  <img class="icon" src="/social-bluesky.svg" /> @julien.deniau.me
</div>

<div class="social">
<img class="icon" src="/social-mastodon.svg" /> piaille.fr/@jdeniau 
</div>


<!--
Pourquoi cette présentation ? Peut-être que vous êtes un peu dans le même cas que mes collègues :

- Vous avez envi de contribuer, mais vous ne savez pas vraiment comment faire ?
- "C'est quoi les bonnes pratiques"
- "Pourquoi est-ce que je ferais ça à vrai dire ?
-->

---
layout: section
---

# L'<span v-mark.highlight.yellow="0">open-source</span>, c'est quoi ?

<!--
Mais avant de rentrer dans le vif du sujet, commençons par savoir un peu de quoi on parle : 
l'open-source, c'est quoi ?
-->

---
layout: image
image: /xkcd.png
backgroundSize: contain
class: flex flex-items-end flex-justify-end
---

<div class="color-neutral">

&copy; [xkcd](https://xkcd.com/2347/)

</div>

<!--
Vous connaissez peut-être cette image de xkcd ?

L'open-source c'est un peu ça : des gens qui développent des briques que d'autres peuvent réutiliser comme ils veulent, généralement gratuitement, et en pouvant en modifier le code source.

-->

---
layout: section
---

# Quel <span v-mark.highlight.yellow="0">intérêt</span> exactement ?

---
layout: image
image: /xkcd.png
backgroundSize: contain
class: flex flex-items-end flex-justify-end
---

<div class="color-neutral">

&copy; [xkcd](https://xkcd.com/2347/)

</div>

<!--
Vous connaissez peut-être cette image de xkcd ?

L'intérêt pour les entreprises c'est de pouvoir se baser sur le code des autres sans avoir à perdre du temps dessus.<br />
Je suis très content qu'une personne maintienne ce fameux package depuis le Nebraska, sans que j'ai à le faire moi-même.
-->

---

# Quel <span v-mark.highlight.yellow="0">intérêt</span> exactement ?
## C'est <span v-mark.underline.cyan="0">un peu plus</span> que ça

<br />

<style>
  </style>

<div class="grid grid-cols-2" style="margin-top: 2rem; font-size: 2rem; height: 280px">

<figure class="flex flex-col flex-items-center">💰 <figcaption>coût</figcaption></figure>
<figure class="flex flex-col flex-items-center">⛓️‍💥 <figcaption>non-dépendance</figcaption></figure>
<figure class="flex flex-col flex-items-center">🧟 <figcaption>pérennité / communauté</figcaption></figure>
<figure class="flex flex-col flex-items-center">🫣 <figcaption>sécurité</figcaption></figure>

</div>

<!--
- Le coût est toujours sensiblement moins élevé que les solutions propriétaires
- pas de "vendor lock-in" ("enfermement propriétaire" en français) (machine à café + capsules)
- si une solution open-source meurt, ça sera d'une mort lente, comparé à une entreprise
- source libre = tout le monde peut auditer le code et remonter les failles de sécurité. (tous les algo de sécurité actuels sont open-sources, proton pass ou bitwarden sont open source)

-->


---
layout: statement
---

# Mais pour <span v-mark.highlight.yellow="0">vous</span> ?

<img src="/finger.webp" style="width: 200px; margin: 0 auto" />

<!--
Mais là ce n'est pas des entreprises que je veux parler, mais de vous !
Quel intérêt peut-on avoir, en tant qu'individu, à travailler sur les projets open-source ?
-->

---
layout: section
---
# Gagner de <span v-mark.highlight.yellow="0">l'argent</span> ? 🤑 

<!--
Gagner de la thune !! C'est la base, non ?

Non plus sérieusement, comment est-ce qu'on fait pour gagner sa vie en faisant de l'open-source
-->

---

# <span v-mark.highlight.yellow="0">Monétiser</span> l'open-source ?

- Créer un produit open-source et <span v-mark.underline.gray="0">le vendre</span> (license, conseils, version "pro")
  - elastic search
  - Symfony
  - react-admin
- <span v-mark.underline.gray="0">les dons</span> et subventions
  - babeljs
  - vuejs
  - socket.io

<v-click>

<ul style="list-style: none">
  <li>
    <ul>
      <li>
        <p>
          PostCSS:</p> 
        <ul>
          <li>téléchargé 80 M de fois par semaine (130 / sec)</li>
          <li>Utilisé par Meta, Google, etc.</li>
          <li>17 000 $ / an récurrent (+ 29 000 $ de don non récurrent)</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

</v-click>

<!--
Globalement, il y a plus ou moins deux façons de gagner de l'argent avec l'open-source : vendre des choses autour de votre produit, ou bien recevoir des dons.

C'est bien si vous avez un "gros" projet, mais dans 99% des cas, vous ne gagnerez pas beaucoup d'argent avec.

[click] PostCSS par exemple, téléchargé 80M/sem (130x / seconde) qui est utilisé entre autre par meta ou google, n'a gagné en 2024 que 17 000 $ récurrent par an (+ 29 000 $ de don non récurrent),
-->

---
layout: quote
---

<blockquote>
<h2>
<span v-mark.underline.orange="0">Almost nobody</span> makes a living writing free software. <br />
As a percentage of all software engineers, 
it’s <span v-mark.underline.orange="0">so few</span> we can basically round down to <span v-mark.circle="{ at:0, color: 'orange' }">zero</span>.
</h2>
</blockquote>

  <p><a href="https://jacobian.org/2024/feb/16/paying-maintainers-is-good/">
  Paying people to work on open source is good actually - 
  Jacob Kaplan-Moss
  </a></p>

<v-click>

<h2 class="text-center" style="margin-top:50px"> Quelques initiatives récentes :</h2>

<div class="flex justify-evenly items-center" style="margin-top: 20px">

  <a href="https://oscollective.org/">
    <img src="/open-source-collective.png" style="max-height: 50px" />
  </a>
  
  <a href="https://thanks.dev/">
    <img src="/thanks-dev.svg" />
  </a>

  <a href="https://github.com/sponsors/">
    <img src="/github-sponsor.png" style="max-height: 50px; margin: 0 auto" />

    Github sponsors
  </a>
</div>

<div class="flex justify-evenly items-center" style="margin-top: 20px">
  <a href="https://opensourcepledge.com/"><img src="/opensourcepledge.svg" style="max-height: 70px" /></a>

  <a href="https://copiepublique.fr/"><img src="/copie-publique.svg" style="max-height: 70px" /></a>
</div>

</v-click>

<!--
Presque personne ne vie de l'écritusre de logiciel open-source. C'est un pourcentage tellement faible qu'on peut arrondir à zéro.

[click] Il y a quelques initiatives qui vont dans le bon sens, mais on est quand même très loin dre dire que c'est suffisant.

-->

---
layout: section
---
# <span v-mark.crossed-off.black="0">Gagner de l'argent ? 💸</span>

<!--
Vraiment pas pour les petits projets.

Globalement, il vaut mieux travailler en tant que salarié ou faire du free-lance !
-->



---
layout: section
---
# La notoriété ! 😎



---
layout: fact
---

# L'heure du <span v-mark.highlight.yellow="0">quizz</span> !

## Qui connait … ?

<!--
Petit quizz : levez la main si vous connaissez…

-->

---
layout: quizz
image: /Daniel_Stenberg.jpg
who: Daniel Stenberg
---

<v-click>

<logos-curl style="font-size: 3em;" />

 <div class="color-neutral">
  (tout le monde utilise curl, même sans le savoir)
</div>

</v-click>

---
layout: quizz
position: left
image: /Dries_buytaert.jpg
who: Dries Buytaert
---


<v-click>

<div>
  <div >
    <logos-drupal style="font-size: 3em;" class="mr-5" /> 
    <div class="color-neutral">
      (2% de l'internet mondial tourne sous Drupal)
    </div> 
  </div>

</div>

</v-click>

---
layout: quizz
image: /zeev-andi.png
who: Andi Gutsman / Zeev Suraski
---

<v-click>

<div>
  <div class="flex flex-items-center">
    <logos-php style="font-size: 3em;" class="mr-5" /> 
    <div>
      Zend Engine 
      <div class="color-neutral">
        Le moteur de PHP
      </div>
    </div>
  </div>

</div>

</v-click>

<!--
Ils ont créé le Zend Engine, le moteur qui fait PHP depuis PHP 4
-->

---
layout: quizz
position: left
image: /michael_dowling.png
who: Michael Dowling
---

<v-click>

<div>
  <div class="flex flex-items-center">
    <img src="/guzzlephp.png" class="mr-5" /> 
    <div>
      Guzzle PHP
      <div class="color-neutral">
        (12 000 000 installations / mois)<br />
        (~ 5 installations / seconde)
      </div>
    </div>
  </div>
</div>

</v-click>

---
layout: quizz
position: right
image: /jordan_walke.jpg
who: Jordan Walke

---

<v-click>

<div>
  <div class="flex flex-items-center">
    <logos-react style="font-size: 3em;" class="mr-5" /> 
    <div>
    ReactJS
      <div class="color-neutral">
      (120 000 000 installations / mois)<br />
      (~ 50 installations / seconde)
    </div>
  </div>
  </div>
  
</div>

</v-click>

---
layout: quizz
image: /all-4.png
---

<div class="flex flex-items-center">
  Anders Hejlsberg ? 
  
<v-click>

<div class="flex flex-items-center ml2">
  <logos-typescript style="font-size: 1.5em;" class="mr-2" /> TypeScript
</div>

</v-click>

</div>

<div class="flex flex-items-center">
  Guido Van Rossum ? 
  
<v-after>

<div class="flex flex-items-center ml2">
  <logos-python style="font-size: 1em;" class="mr-2" /> Python
</div>

</v-after>

</div>

<div class="flex flex-items-center">
  <!-- James Long ?  -->
  Ondřej Mirtes ?
  
<v-after>

<div class="flex flex-items-center ml2">
  <!-- <logos-prettier style="font-size: 1em;" class="mr-2" /> Prettier -->
  <img src="/logo.phpstan.png" style="height: 1.2em" class="mr-2" /> PHPStan
  <!-- <logos-phpstan style="font-size: 1em;" class="mr-2" /> PHPStan -->
</div>

</v-after>

</div>

<div class="flex flex-items-center">
  Michael Widenius ? 
  
<v-after>

<div class="flex flex-items-center ml2">
  <logos-mysql style="font-size: 1em;" class="mr-2" /> MySQL
</div>

</v-after>

</div>

<!--
Dans la liste des gens que vous avez vu, qui connaissait plus de 2 personnes ?
-->

---
layout: section
---
# <span  v-mark.crossed-off.black="0">La notoriété ! <img src="/foreveralone.png" style="height: 1em; display: inline-block;" /></span>

<!--
Ne comptez pas trop dessus 😊
-->

---
layout: quote
---

<h1>Où sont les femmes dans ton quizz ? 🙎‍♀️</h1>

<p>Ou plutôt : « où sont les femmes dans l'open-source ? »</p>

<blockquote>
  Only <span v-mark.highlight.yellow="0">1,5%</span> of OSS contributors were women, compared to <span v-mark.circle.yellow="0">28%</span> in proprietary software. <sup>1</sup>
</blockquote>

<div class="mt10 color-neutral text-right"  style="font-size: .7em">

&nbsp; 1. [Where are women in Open Source?](https://openforumeurope.org/where-are-women-of-open-source/)

</div>

<!--
Dans mon quizz, je n'ai mis que des hommes : elle est où la diversité là dedans ?

Dans le développement logiciel, il y a 28% de femmes, mais seulement 1,5% dans l'open-source !

Dans tous les "Releases Manager" de PHP entre la  5.6 et la 8.4, il n'y a eu que deux femmes vs 19 hommes !

- Peu de role model féminin,
- Plus de résponsabilités familiales (et donc moins de temps pour "s'amuser" à ça)
- discrimination et sexisme dans les communautés open-source,
- seule les femmes vraiment expérimentées osent franchir le pas.
-->


---
layout: section
---

# Rendre son <span v-mark.highlight.yellow="0">CV</span> attirant ? 💌

---
layout: image
image: /julien-vs-lienju.png
backgroundSize: 80%
---

<!--
Vous recruteriez plus "julien" à gauche ou bien "lienju" à droite ?

En tant que recruteur, on a plus de billes avec un compte github qui a des "trucs" dedans.

Attention, cela ne veut pas dire qu'un github vide est un mauvais développeur-euse, ni d'ailleurs qu'un github plein est le compte d'un bon développeur-euse !

On a cela dit moins d'info pour comparer.

C'est une autre façon de vous connaitre (en plus de votre CV et des entretiens), ça permet d'annexer votre CV.

Potentiellement, si vous contribuez sur un package que l'entreprise utilise, c'est un "match" direct.
-->

---
layout: section
---

# <span v-mark.highlight.yellow="0">Tester</span> des trucs 🧑‍🔬


---
layout: center
---

# <span v-mark.highlight.yellow="0">Tester</span> des trucs 🧑‍🔬

Amusez-vous avec des trucs différents (lib de test, bundler, framework)

<!--
Vous voulez testez ce super outil qui vient de sortir ? C'est l'occasion !

Et si c'est cool, vous l'utiliserez peut-être ensuite dans votre entreprise !

Coder sur un projet open-source peut vous servir de "bac à sable" pour tester d'autres librairies.

-->

---
layout: section
---

# La connaissance ? 🧠

---
layout: center
---
# Un grand <span v-mark.highlight.yellow="0">OUI</span> !

- remontée d'<span v-mark.underline.gray="0">erreurs</span>,
- <span v-mark.underline.gray="0">échanges</span> avec les gens,
- <span v-mark.underline.gray="0">fonctionnement</span> interne,
- développement de <span v-mark.underline.gray="0">fonctionnalités</span>.

<!--
Vous allez apprendre beaucoup de choses en travaillant sur un projet open-source, en échangeant avec les gens qui vous remontent des erreurs, en apprenant leur usage, en développant des fonctionnalités sur des projets que vous utilisez ou bien en voyant vos utilisateurs proposer des modifications sur vos projets.

Si il n'y avait qu'une seule raison à retenir de "pourquoi faire de l'open-source", c'est celle-ci !

Ca fait maintenant 20 ans que je développe, et je suis toujours autant surpris des échanges que je peux avoir en faisant de l'open-source (bien plus que dans le monde de l'entreprise !)
-->


---
layout: section
---

# <span v-mark.highlight.yellow="0">Dette</span> envers l'open-source ? 💱

---
layout: image
image: /xkcd.png
backgroundSize: contain
class: flex flex-items-end flex-justify-end
---

<div class="color-neutral">

&copy; [xkcd](https://xkcd.com/2347/)

</div>

<!--
Vous connaissez peut-être cette image de xkcd ?

On utilise tous les jours beaucoup de packages open-source,
et contribuer est une forme de "remboursement de cette dette" (au même titre que financer directement les créateurs par ex.).

C'est un peu du troc : vous développez un package que j'utilise, et j'en développe un que vous utilisez.

Dans certains cas, c'est peut-être vous la personne aléatoire du Nebraska.
-->


---
layout: section
---

# <span v-mark.highlight.yellow="0">Reconnaissance</span><br /> des utilisateurs ? 😘

---
layout: quote
clicks: 1
---

# C'est <span v-mark.underline.green="0">HYPER</span> gratifiant !

<div>

![](/issue-love.png)

</div>

<video
class="position-absolute top-5 right-5"
v-if="$slidev.nav.clicks === 1"
v-motion
 src="/fainting-michelle-hsieh.mp4" autoplay loop></video>

<!--
Vous avez un utilisateur et il vous fait un commentaire / remarque ?

Perso quand j'ai un commentaire comme celui-ci, je suis comme ça !
-->

---
layout: image
image: /francoisz.png
backgroundSize: contain
style:
  width: 70%
  height: 70%
  margin: 8% auto
---

<!--
Mais je ne suis pas le seul. François Zaninotto, créateur de FakerPHP, est aussi toujours refait quand il reçoit des messages de remerciement.

-->


---
layout: section
---

# Des <span v-mark.highlight.red="0">mauvais</span> côté ? 😈

---
layout: image
image: /dev.png
backgroundSize: contain
---

<!--
Ca prend un peu de temps perso !
-->

---
layout: image
image: /alone-desert.jpg
backgroundSize: contain
backgroundColor: black
---

<!--
Vous allez vous sentir seul :

Il est peu probable que votre projet intéresse beaucoup de monde, et vous allez vous sentir seul à le maintenir.

Quand bien même votre projet est utile, il est peu probable que vous ayez de l'aide malgré tout le temps que vous allez investir. Au mieux vous aurez des bug reportés ou des demandes d'évolutions, mais peu de gens pour vous accompagner dans votre voyage.

-->

---
layout: section
---
# <span v-mark.highlight.yellow="0">Comment</span> fait-on ? 🤔

## J'aimerai me lancer, mais je n'ai pas d'idée…

<!--


-->

---
layout: quote
---

# Développez <span v-mark.underline.green="0">pour vous</span> !

Vous êtes les premiers utilisateurs de votre package

<div class="color-neutral">
Et surement les seuls…
</div>


---
layout: default
---

## Vous ne trouvez rien de dispo qui vous aille ? <span v-mark.underline.green="0">Codez-le !</span>

### (et open-sourcez-le !)

À titre perso:

- [changelog-view](https://github.com/jdeniau/changelog-view): Afficher le détail des <span v-mark.underline.gray="0">changelog des dépendances</span> en ligne de commande
- [ink-tab](https://github.com/jdeniau/ink-tab): plugin ink (React dans le terminal) pour <span v-mark.underline.gray="0">afficher des onglets</span> (pour changelog-view)
- [prettier-plugin-gherkin](https://github.com/mapado/prettier-plugin-gherkin): j'adore <span v-mark.underline.gray="0">prettier</span>, je travaille avec Behat, j'ai développé le plugin prettier
- [behat-reviewdog-formatter](https://github.com/jdeniau/behat-reviewdog-formatter): Intégrer <span v-mark.underline.gray="0">behat dans reviewdog</span>
<!-- - [metch-fock](https://github.com/mapado/metch-fock): Librairie JS simple pour <span v-mark.underline.gray="0">mocker fetch</span> qui fonctionne avec Node 18+ -->
- [Tiana Tables](https://github.com/jdeniau/tiana-tables): Logiciel de <span v-mark.underline.gray="0">requête SQL</span> simple, joli et multi-platforme.
- etc.


<!--

- reviewdog : permet de remonter les erreurs depuis notre CI jenkins dans les PR github
- Tiana Tables: mysqlworkbench c'est un outil pour les admins, dbeaver pire UX ever. Le mieux que j'ai trouvé c'est HeidiSQL mais ça ne fonctionne que sous Windows.
-->


---
layout: default
---

## Vous avez dev un <span v-mark.underline.green="0">truc cool au bureau</span> qui ne risque rien ?

### Open-sourcez-le !

A Mapado:

- [rest-client-js-sdk](https://github.com/mapado/rest-client-js-sdk): client SDK agnostique JS
- [rest-client-sdk](https://github.com/mapado/rest-client-sdk): client SDK agnostique PHP
<!-- - [install-deps-from-pr](https://github.com/mapado/install-deps-from-pr): installer les dépendances depuis une PR -->
<!-- - [generator-mapado](https://github.com/mapado/generator-mapado): générateur yeoman pour créer une lib -->
- [haversine](https://github.com/mapado/haversine): <span v-mark.underline.gray="0">distance</span> entre deux points sur terre
<!-- - [watch-module](https://github.com/mapado/watch-module): "watcher" pour travailler en multi-repo en JS -->
<!-- - [TwigExtensionsBundle](https://github.com/mapado/TwigExtensionsBundle): extension twig pour `parse_url` -->
<!-- - [pretty-types](https://github.com/mapado/pretty-types): extension doctrine pour avoir des JSON <span v-mark.underline.gray="0">lisibles en base</span> -->
- [datection](https://github.com/mapado/datection): détection et rendu de <span v-mark.underline.gray="0">date</span>
- etc.

<!--
Mapado: 27 packages open-sourcés
-->

---
layout: quote
---

<blockquote  style="padding: 25px 30px">
  <h2>C'est un <span v-mark.highlight.yellow="0">side-project</span> pour vous "amuser", en assumant que vous ne gagnerez <span v-mark.underline.red="0">pas d'argent</span> dessus.</h2>
</blockquote>

<div class="text-right">
  
_L'open-source, par Julien D._

</div>

---
layout: section
---

# Les <span v-mark.highlight.yellow="0">clés</span> du succès 📈

<!--
-->

---
layout: default

clicks: 3
---

# Les <span v-mark.highlight.yellow="0">clés</span> du succès

Pas de recette magique, sans ces ingrédients, peu de chance de succès :

- <span v-mark.underline.green="0">Périmetrer</span> votre projet et garder le simple

<v-click at="1">

- Définir votre <span v-mark.underline.green="1">vision</span> <sup>1</sup>

</v-click>

<v-click at="2">

- Rendre votre projet <span v-mark.underline.green="2">qualitatif</span>:
  - les tests
  - la documentation <sup>2</sup>

</v-click>

<v-click at="3">

- <span v-mark.underline.green="3">Communiquer</span> <sup>3</sup>

</v-click>

<v-click at="1">

<div class="mt10 color-neutral">
Refs:

1. Thomas JARRAND: [Comment (enfin) sortir vos side projects](https://youtu.be/DCudohbJ6gU)

<v-click at="2">

2. Marmelab: [La documentation, clé du succès open source](https://marmelab.com/blog/2024/01/10/open-source-documentation.html)

</v-click>

<v-click at="3">

3. [Le Twitterix de Dan Abramov](https://twitter.com/dan_abramov2)

</v-click>

</div>

</v-click>

<!--
[click] 1. A quoi sert vraiment ce que je fais ? Est-ce que c'est pérenne ? Où est-ce que je vais ?

[click] 2. tests, docs, changelog: si vous voulez que quelqu'un utilise un jour votre projet, alors vous DEVEZ atteindre un certain niveau de qualité.

[click] 3. La communication. Je pense qu'un des meilleurs recrutement de l'équipe de React a été le recrutement de Dan Abramov, qui a passé un temps de dingue à communiquer sur React et son écosystème.
-->

---
layout: section
---

# <span v-mark.highlight.yellow="0">Et si</span> ça marchait ?! 🚀

<!--
Je suis assez pessimiste sur l'avenir de votre projet open-source depuis tout à l'heure, mais en fait, peut-être qu'il fonctionnera
-->


--- 
layout: default
---

# <span v-mark.highlight.yellow="0">Et si</span> ça marchait ?! 🚀

<!-- - metch-fock : 1 téléchargement par semaine -->
<!-- - watch-module : 1 téléchargement par semaine -->
- changelog-view : 4 téléchargements par semaine
- rest-client-sdk (JS et PHP) : <span v-mark.underline.gray="0">100</span> téléchargements par semaine

<v-click>

- ink-tab : <span v-mark.underline.yellow="1">200</span> téléchargements par semaine

</v-click>
<v-click>

- prettier-plugin-gherkin : <span v-mark.underline.orange="2">50 000</span> téléchargements par semaine (et ça monte !)

</v-click>
<v-click>

- haversine : <span v-mark.underline.red="1">600 000</span> téléchargements par semaine (top 1% des projets python)

</v-click>

---
layout: quote
---

## C'est très cool pour vous !

(mais ce n'est <span v-mark.underline.cyan="0">pas un but en soit</span>)

<!--
-->

---
layout: quote
---

# <span style="display: block; text-align: center">Attention : garder une <span v-mark.highlight.red="0">vie perso</span> !</span>

<img src="/duty_calls.png" style="max-height: 38vh; margin: 10px auto" />

<a href="https://xkcd.com/386/">Duty Calls - © xkcd</a>


<p><a href="https://tkdodo.eu/blog/my-open-source-origin-story#the-dark-side-of-open-source">
My Open Source Origin Story - 
Dominik "TkDodo" Dorfmeister (mainteneur de react-query)
</a></p>


<!--
(Ca ne vient pas de moi, je n'en suis pas du tout là)
On peut vite se laisser entrainer, voir maltraiter, par ses utilisateurs qui ne sont pas forcément toujours bienveillants

Il y a un super article de Dominik "TkDodo" Dorfmeister (mainteneur de react-query) qui explique qu'il a parfois prioriser des discussions avec des inconnus sur internet plutôt que des repas de familles.
-->


---
layout: section
---

# L'open-source, <br /> ce n'est <span v-mark.highlight.yellow="0">pas que créer</span> un projet

---
layout: section
---

# <span v-mark.highlight.yellow="0">Contribuez</span> à des projets existants 🤝

---
layout: default
---

# <span v-mark.highlight.yellow="0">Contribuez</span> à des projets existants

1. Rapportez les <span v-mark.underline.gray="0">bugs</span> que vous rencontrez,
2. Mieux : <span v-mark.underline.gray="0">corrigez</span> les bugs que vous rencontrez (et soumettez des PRs !), <sup>1, 2</sup>
3. Proposez <span v-mark.underline.gray="0">des évolutions</span> que vous aimeriez,
4. "<span v-mark.underline.gray="0">donner</span> plutôt que recevoir",
5. Intégrer la <span v-mark.underline.gray="0">"core team"</span> (les mainteneurs).

<v-click>

<ul class="ml10">
<li>Investir <span v-mark.underline.gray="1">encore plus de temps</span> sans avoir de retour.</li>
<li>Travailler sur des projets bien <span v-mark.underline.gray="1">plus gros</span> !</li>
</ul>

</v-click>

<v-click>

A titre personnel, je suis devenu mainteneur de <a href="https://immutable-js.com/">immutable.js</a> : <span v-mark.underline.purple="2">22 000 000</span> téléchargements / semaine.

</v-click>

<div class="color-gray">

Refs:

1. [Awesome First PR Opportunities](https://github.com/MunGell/awesome-for-beginners)
2. [PR faite sur sli.dev pendant la rédaction de cette présentation: "fix: prev might be undefined"](https://github.com/antfu/markdown-it-mdc/pull/7)

</div>

<!--
1. Peu de chance d'avoir un bug corrigé si le mainteneur ne sait pas qu'il existe ! 
2. il y a des projets qui ont des "issues" taggées "good first issue" ou "help wanted"

    pendant la rédaction de ce talk où j'ai testé sli.dev, j'ai rencontré deux bugs, pour lesquels j'ai soumis des PRs

3. En accord avec la vision du mainteneur
4. Aidez les mainteneurs sur les issues ou les PRs
5. Après beaucoup d'effort, vous passerez peut-être dans la "core team".


[click] Ca veut dire quoi ?

Vous travaillerez sur des projets surement beaucoup impactants que vos projets perso.

[click] Pour rappel, le top projet Mapado c'est haversine à 600 000 / semaine puis le plugin prettier à 50 000 / semaine.
ça fait environ 30 téléchargements par seconde. Autant vous dire que quand je dois faire un release, je serre bien les fesses.
-->

---
layout: section
---

# <span v-mark.highlight.yellow="0">Participer</span> à des meet-up et conférences 🎙️

### Combattez votre syndrôme de l'imposteur ! <sup>1</sup>

<br />

<div class="color-gray text-right" style="font-size: .7em">

&nbsp;1. Mathieu Mure: [Le leader imposteur](https://tech.bedrockstreaming.com/le-leader-imposteur)

</div>

<!--
Coder c'est bien, mais il n'y a pas que ça pour faire vivre la communauté open-source.

Vous pouvez participer à des meet-up, des conférences, etc. En tant que spectateur c'est pas mal, mais osez présenter quelque chose : on a tous quelque chose à partager !

Je vous parlais de la communication pour React. Vous pouvez aussi présenter des projets qui vous plaisent et qui valent le détour.

Si Symfony par exemple est devenu ce qu'il est aujourd'hui, c'est aussi grâce à la communauté qui en parle énormément dans tous les évènements de l'AFUP entre autre.
-->

---
layout: image
image: /retours-confs.jpg
backgroundSize: contain

---

<h1 
  class="color-black" 
  style="background: rgba(255, 255, 255, 0.8); display: inline-block; border-radius: 8px; padding: .1em .3em;"
>Et c'est très vite très <span v-mark.highlight.yellow="0">gratifiant</span></h1>

<!--
En plus de ça a titre perso, même si ça fait toujours peur d'être sur scène, c'est très gratifiant ensuite.
-->


---
layout: section
---

# Publier des articles de <span v-mark.highlight.yellow="0">blog</span> 📝

---
layout: quote
---

> <span style="font-size: 2em">On a <span v-mark.highlight.green="0">tous</span> quelque chose à <span v-mark.underline.green="0">partager</span>.</span>
>
> _Kenny Dits, M6Web ([refonte front end de 6play](https://www.youtube.com/watch?v=6KUXRuNzBwM))_

<img src="/kenny.png" style="max-height: 38vh; margin: 10px auto" />

<!--
En 2014, Kenny Dits, co-CTO de M6Web / Bedrock hérite de la refonte de 6play, jusqu'alors faite en Flash (oui oui c'était une autre époque !)

Flash étant sur le déclin, et surtout 2014 c'était la sortie de "HTML5" ! On pouvait enfin faire des interface animées, réactives, et qui ressemblent à quelque chose.

Seulement les "gros" projets pour faire de belles interfaces en JS en 2014 c'est AngularJS, Backbone, ou Ember. Et à M6 ils avaient un gros besoin de SEO, chose qui fonctionnaient mal, voir pas du tout, avec ces frameworks.

C'est en tombant sur un blogpost d'une agence hongroise sur la migration de angular à react qu'ils s'est dit "OK en fait c'est ça qu'il nous faut !".

Il a présenté son retour d'expérience à blend web mix en 2015, et termine sa conférence en insistant sur le fait que si il n'était pas tombé sur cet article, jamais ils n'auraient envisagé d'utiliser cette techno.
-->

---
layout: quote
---

<div style="display: flex; flex-direction: row; justify-content: space-between;">
<div>
  <blockquote style="padding: 25px 30px">

  # L'<span v-mark.underline.cyan="0">open-source</span>

  ## C'est gratuit, et c'est <span v-mark.highlight.yellow="0">**pas** toi le produit</span> !

  </blockquote>

  <div class="text-right">

  _Julien D._

  </div>
</div>

<div>
  Notez-moi sur openfeedback !

  <img src="/qrcode.colored.svg" style="max-height: 200px; margin: 0 auto" />
</div>
</div>

<!--

Pour conclure, finalement, je crois que ce que je préfère dans l'open-source, c'est que c'est gratuit, et que ce n'est pas toi le produit.

Pistes de questions:

- Ma boite ne m'autorise pas à faire de l'open source ?
- J'ai fait un truc dans le cadre de ma boite, mais il y a trop de dependence interne ? Travail de déblayage : extraire ce qui est utile, faire un autre package, et baser sa stack dessus.
-->
