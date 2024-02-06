---
theme: default # seriph
# class: text-center
highlighter: shiki
lineNumbers: true
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
drawings:
  persist: false
defaults:
  foo: true
transition: slide-left
title: 'Open-source: Pourquoi ? Comment ?'
mdc: true
background: none
layout: cover
---

# Open-source : 

## Pourquoi ? Comment ?


<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)

saut de ligne ?
-->

---
layout: section
---


# L'open-source, c'est quoi ?

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
layout: fact
---

## Open-source != gratuit

<!--
Un logiciel open-source PEUT être gratuit (selon sa licence) mais ce n'est pas obligatoirement le cas.

Un logiciel gratuit n'est pas forcément open-source (pas accès aux sources, ex. adobe reader)
-->

---
layout: section
---


# Quel intérêt exactement ?

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

L'intérêt pour les entreprises c'est de pouvoir se baser sur le code des autres sans avoir à perdre du temps dessus.
-->

---

# Quel intérêt exactement ?
## C'est un peu plus que ça

<br />

* coût
* non-dépendance
* pérennité / communauté
* sécurité

<!--
- Le coût est toujours sensiblement moins élevé que les solutions propriétaires
- pas de "vendor lock-in" ("enfermement propriétaire" en français) (machine à café + capsules, logiciels avec format de fichiers propriétaire)
- si une solution open-source meurt, ça sera d'une mort lente, comparé à une entreprise
- source libre = tout le monde peut auditer le code et vérifier qu'il fonctionne comme annoncé. La communauté peut trouver et remonter les failles de sécurité. (tous les algo de sécurité actuels sont open-sources, proton pass est open source)
-->


---
layout: quote
---

# Mais pour vous ?

<!--
Mais là ce n'est pas des entreprises que je veux parler, mais de vous !
Quel intérêt peut-on avoir, en tant qu'individu, à travailler sur les projets open-source ?
-->

---
layout: section
---
# Gagner de l'argent ? 🤑 

---

# Monétiser l'open-source ?

- Créer un produit open-source et le vendre (license, conseils, version "pro")
  - elastic search
  - react-admin
  - mongodb
- les dons et subventions
  - babeljs
  - vuejs
  - socket.io

  
<!--
C'est bien si vous voulez fondez une société, ou si votre produit marche vraiment bien.

Idem pour les dons, si vous êtes un "énorme" projet, alors vous reussirez à gagner votre vie.
PostCSS par exemple, qui est utilisé entre autre par meta ou google, ne gagne que 12 000 $ récurrent par an (+ 26 000 $ de don non récurrent)
-->


---
layout: section
---
# <span class="line-through">Gagner de l'argent ? 💸</span>

<!--
Vraiment pas pour les petits projets.

Globalement, il vaut mieux travailler en tant que salarié !
-->



---
layout: section
---
# La notoriété ! 😎


---
layout: fact
---

# L'heure du quizz

## Qui connais … ?

---
layout: quizz
image:  https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Daniel_Stenberg_%28cropped%29.jpg/520px-Daniel_Stenberg_%28cropped%29.jpg
who: Daniel Stenberg
---


<v-click>

<logos-curl style="font-size: 5em;" />


</v-click>


---
layout: quizz
position: left
image: https://images.ctfassets.net/s5uo95nf6njh/5PpFIeuDxz2T89nZNED1EP/48d62a69f31a3ab6dfc58938eb7b8c2a/evan-you-portrait.jpg?w=1200&fm=avif
who: Evan You
---


<v-click>

<div>
  <div class="flex flex-items-center">
    <logos-vue style="font-size: 3em;" class="mr-5" /> 
    <div>
      VueJS
      <div class="color-neutral">
        (18 000 000 installations / mois)
      </div>
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


---
layout: quizz
position: left
image: https://avatars.githubusercontent.com/u/190930?v=4
who: Michael Dowling
---


<v-click>

<div>
  <div class="flex flex-items-center">
    <img src="https://avatars.githubusercontent.com/u/638632?s=48&v=4" class="mr-5" /> 
    <div>
      Guzzle PHP
      <div class="color-neutral">
        (12 000 000 installations / mois)
      </div>
    </div>
  </div>
</div>

</v-click>



---
layout: quizz
image: https://sindresorhus.com/assets/sindre-sorhus.jpg
who: Sindre Sorhus
---


<v-click>

<div>
  <div class="flex flex-items-center">
    <logos-javascript style="font-size: 3em;" class="mr-5" /> 
    <div>
      1000+ npm packages
      <div class="color-neutral">
        (2 milliards d'install / mois)
      </div>
    </div>
  </div>
</div>

</v-click>

---
layout: quizz
position: left
image: https://thediffpodcast.com/assets/images/jordan-2c43ff762e625d49ea58424e3e74188a.jpg
who: Jordan Walke
---


<v-click>

<div>
  <div class="flex flex-items-center">
    <logos-react style="font-size: 3em;" class="mr-5" /> 
    <div>
    ReactJS
      <div class="color-neutral">
      (94 000 000 installations / mois)
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
  <logos-typescript style="font-size: 2em;" class="mr-2" /> TypeScript
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
  James Long ?  
  
<v-after>

<div class="flex flex-items-center ml2">
  <logos-prettier style="font-size: 1em;" class="mr-2" /> Prettier
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



---
layout: section
---
# <span class="line-through">La notoriété ! 😥</span>

<!--
Ne comptez pas trop dessus 😊
-->



---
layout: section
---

# La connaissance ? 🧠


---
layout: center
---
# Un grand OUI !

- remontée d'erreurs,
- échanges avec les gens,
- fonctionnement interne,
- développement de fonctionnalités.

---
layout: section
---

# "Dette" envers l'open-source ?

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
et contribuer est une forme de "remboursement de cette dette (au même titre que financer directement les créateurs par ex.)

-->


---
layout: section
---

# Rendre son CV attirant ? 💌

---
layout: image
image: /julien-vs-lienju.png
backgroundSize: 80%
---

<!--
Vous recruteriez plus "julien" à gauche ou bien "lienju" à droite ?

En tant que recruteur, on a plus de billes avec un compte github qui a des "trucs" dedans.

Attention, cela ne veut pas dire qu'un github vide est un mauvais développeur, mais qu'on a moins d'info pour comparer.

C'est une autre façon de vous connaitre (en plus de votre CV et des entretiens), ça permet d'annexer votre CV.

Potentiellement, si vous contribuez sur un package que l'entreprise utilise, c'est un "match" direct.
-->

---
layout: section
---

## Reconnaissance des utilisateurs ? 😘

---
layout: quote
clicks: 1
---

# C'est HYPER gratifiant !


<div>

![](/issue-love.png)

</div>


<video
class="position-absolute top-5 right-5"
v-if="$slidev.nav.clicks === 1"
v-motion
 src="fainting-michelle-hsieh.mp4" autoplay loop></video>


<!--
Vous avez un utilisateur et il vous fait un commentaire / remarque ? 

Perso quand j'ai un commentaire comme celui-ci, je suis comme ça !
-->

---
layout: iframe
url: https://fosstodon.org/@francoisz/111857221043784067/embed
style: 
  width: 80% 
  height: 80%
  top: 10%
  left: 10%
---

---
layout: section
---

# Des mauvais côté ? 😈

---
layout: image
image: /dev.png
backgroundSize: contain
---

<!--
Ca prend un peu de temps perso !
-->

---
layout: section
---
# Comment fait-on ? 🤔

## Je n'ai pas d'idée…

---
layout: quote
---

## Développez pour vous !

Vous êtes les premiers utilisateurs de votre package

<div class="color-neutral">
Et surement les seuls…
</div>

---
layout: default
---

## Vous ne trouvez rien de dispo qui vous aille ? Codez-le !

### (et open-sourcez-le)

Pour ma part: 

- [changelog-view](https://github.com/jdeniau/changelog-view): Afficher le détail des changelog des dépendances en ligne de commande
- [ink-tab](https://github.com/jdeniau/ink-tab): plugin ink (React dans le terminal) pour afficher des onglets (pour changelog-view)
- [prettier-plugin-gherkin](https://github.com/mapado/prettier-plugin-gherkin): j'adore prettier, les plugins gherkins dispos avaient besoin de Go
- [behat-reviewdog-formatter](https://github.com/jdeniau/behat-reviewdog-formatter): Intégrer behat dans reviewdog
- [metch-fock](https://github.com/mapado/metch-fock): Librairie simple pour mocker fetch qui fonctionne avec Node 18+



---
layout: default
---

## Vous avez dev un truc cool au bureau qui ne risque rien ?

### Open-sourcez-le !

A Mapado: 

- [rest-client-js-sdk](https://github.com/mapado/rest-client-js-sdk): client SDK agnostique JS
- [rest-client-sdk](https://github.com/mapado/rest-client-sdk): client SDK agnostique PHP
- [install-deps-from-pr](https://github.com/mapado/install-deps-from-pr): installer les dépendances depuis une PR
- [generator-mapado](https://github.com/mapado/generator-mapado): générateur yeoman pour créer une lib
- [haversine](https://github.com/mapado/haversine): distance entre deux points sur terre
- [watch-module](https://github.com/mapado/watch-module): "watcher" pour travailler en multi-repo en JS
- [TwigExtensionsBundle](https://github.com/mapado/TwigExtensionsBundle): extension twig pour `parse_url`
- [pretty-types](https://github.com/mapado/pretty-types): extension doctrine pour avoir des JSON lisibles en base
- [datection](https://github.com/mapado/datection): détection et rendu de date
- etc.

---
layout: quote
---

# Mais pourquoi je me ferais 💩 à faire ça ?

---
layout: default
---

# Mais pourquoi je me ferais 💩 à faire ça ?

- Tester des trucs différents (lib de test, bundler, framework)
- Périmetrer votre projet et garder le simple
- Rendre votre projet qualitatif

<!--
Vous voulez testez ce super outil qui vient de sortir ? C'est l'occasion !

Et si c'est cool, on l'utilisera à Mapado !

A quoi sert vraiment ce que je fais ? Est-ce que c'est pérenne ? 

tests, docs, changelog: si vous voulez que quelqu'un utilise un jour votre projet, alors vous DEVEZ atteindre un certain niveau de qualité

-->

---
layout: quote
---

## C'est votre side-project pour vous amuser, en assumant que vous ne gagnerez pas d'argent dessus.

---
layout: section
---

# Et si ça marchait ?! 🚀

<!--
Je suis assez pessimiste sur l'avenir de votre projet open-source depuis tout à l'heure, mais en fait, peut-être qu'il fonctionnera 
-->


--- 
layout: default
---

# Et si ça marchait ?! 🚀

- metch-fock : 1 téléchargement par semaine
- watch-module : 1 téléchargement par semaine
- changelog-view : 4 téléchargements par semaine
- rest-client-sdk (JS et PHP) : 100 téléchargements par semaine

<v-click>

- ink-tab : 1000 téléchargements par semaine

</v-click>
<v-click>

- prettier-plugin-gherkin: 15 000 téléchargements par semaine (et ça monte !)

</v-click>
<v-click>

- haversine 300 000 téléchargements par semaine (top 1% des projets python)

</v-click>

---
layout: quote
---

C'est très cool pour vous !

(mais ce n'est pas un but en soit)