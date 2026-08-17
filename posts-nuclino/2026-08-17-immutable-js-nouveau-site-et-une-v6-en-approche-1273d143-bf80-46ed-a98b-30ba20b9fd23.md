---
date: "2026-08-17"
title: "Immutable.js : nouveau site, et une v6 en approche"
emphasis: "Le site a été entièrement redesigné, et la v6 est en bêta. Petit tour de ce qui change."
icon: "code"
lang: "fr"
---

Immutable.js, c'est 28 millions de téléchargements par semaine, et un projet bien plus actif qu'on ne l'imagine. La preuve : deux nouvelles d'un coup. Le site vient d'être entièrement refait, et la v6 est en bêta.

## Pourquoi refaire le site ?

Parce qu'il commençait à dater. Pour vous donner une idée : la phrase d'accroche de la documentation, c'était « Read the docs and eat your vegetables. » depuis des années. Je l'aime bien, mais elle résumait assez fidèlement l'ambiance générale du site.

La documentation elle-même était déjà correcte : depuis la 5.1.3, on est passé d'une doc autogénérée depuis le fichier `.d.ts` à une vraie doc en markdown, avec des exemples exécutables sur quasiment toutes les méthodes.

Ce qui n'allait pas, c'était tout le reste : la page d'accueil était un rendu brut du README derrière une bannière animée, il n'y avait pas de thème sombre, et sur mobile, c'était complexe de trouver ce que l'on voulait.

Trois choses en particulier ont changé.

### 1. Un thème clair / sombre / auto

En 2026, le monde est divisé en deux : ceux qui veulent un thème lisible, et ceux qui veulent un thème noir. Personnellement, je lis la doc en clair. Bon, ok, je code en sombre. Il fallait donc les deux.

Le thème a trois états : clair, sombre, et **auto**. Auto suit `prefers-color-scheme` **en direct** — si votre OS bascule en sombre à 19h, la page bascule avec, sans reload. Le choix est persisté d'une visite à l'autre. Et tout le site suit le thème, y compris les blocs de code et l'éditeur : plus de bloc de code blanc éclatant incrusté au milieu d'une page sombre.

### 2. Le mobile

Avant, le site était pensé desktop, et vaguement adapté pour mobile.

Maintenant il y a un header unique, sticky, partagé par toutes les pages (logo, nav, recherche, switch de thème, pill avec le nombre d'étoiles GitHub), qui se replie proprement en menu burger. Et la sidebar de la doc s'escamote derrière un toggle au lieu de manger la moitié de l'écran.

Ce n'est pas glamour à raconter, mais c'est ce qui change le plus la vie quand on cherche la signature de `mergeDeep` depuis son téléphone dans le métro.

### 3. Le playground

Le [playground](https://immutable-js.com/play/) est maintenant en plein écran, avec une vraie barre d'outils : des presets pour démarrer, un bouton Reset, un bouton Run, et deux panneaux éditeur / résultat côte à côte.

Le truc utile : le bouton **Share**. Le code est encodé en base64 dans le hash de l'URL et restauré au chargement. Concrètement, ça veut dire que vous pouvez maintenant coller un lien vers un cas reproductible dans une issue GitHub ou sur StackOverflow, sans que personne n'ait besoin d'installer quoi que ce soit.

### Le reste

Pour être complet : nouvelle page d'accueil (hero, présentation de la famille de collections, grille "pourquoi immutable", exemples en onglets, REPL en direct), doc en trois colonnes avec sélecteur de version et sommaire de page, et une page dédiée à l'[extension navigateur](https://immutable-js.com/browser-extension/) avec des captures avant/après.

Un point important : c'est un changement de **couche de présentation uniquement**. Le contenu MDX et les définitions d'API générées n'ont pas bougé d'un poil. Ce qui veut aussi dire qu'aucune URL n'a changé.

👉 [immutable-js.com](https://immutable-js.com/)

## Et la v6, du coup ?

Le site, c'était l'échauffement. Le gros morceau, c'est la v6, qui est en bêta.

### On passe au JavaScript moderne

Jusqu'ici, Immutable était compilé en ES2015 avec [buble](https://github.com/bublejs/buble). On est en 2026, tous les navigateurs qu'on cible sérieusement supportent les classes.

Donc : buble → babel, et on ne transpile plus que pour `last 2 versions` + `not dead`.

C'est un breaking change assumé : ça veut dire qu'on abandonne les vieux navigateurs supportés jusqu'à la v5 (IE ≤ 12, Safari ≤ 8). Si vous avez encore besoin de les supporter, vous pouvez transpiler `node_modules/immutable/dist/immutable.js` vous-même — et honnêtement, vous le faites probablement déjà pour la moitié de vos dépendances.

L'effet de bord sympa, c'est la taille du bundle :

<!-- table header=false -->
| fichier                | avant | après |
| ---------------------- | ----- | ----- |
| immutable.es.js        | 175ko | 148ko |
| immutable.es.js (gzip) | 37ko  | 32ko  |
| immutable.js           | 197ko | 158ko |
| immutable.min.js       | 67ko  | 57ko  |

Petite précision : ces chiffres ne mesurent que la migration buble → babel, pas le nettoyage de code qui suit. Ils sont donc plutôt pessimistes.

### On migre vers TypeScript

C'est le chantier de fond. La base de code passe progressivement de JavaScript à TypeScript — pas de la doc, pas des `.d.ts` (ceux-là étaient déjà là), mais du **code source lui-même**.

Ça a commencé doucement en 5.1.x avec des fichiers isolés (`Iterator.ts`, `Hash.ts`, `Math.ts`, `toJS.ts`…) sans aucun changement de runtime, et ça continue en 6.x sur les gros morceaux.

L'intérêt, pour vous : les bugs de typage entre l'implémentation et les définitions publiques disparaissent par construction. Fini les cas où le `.d.ts` promet un truc que le JS ne fait pas.

Pour moi, mainteneur : je peux enfin toucher au trie de `List` sans avoir peur. Ce n'est pas rien sur une lib de cet âge.

### Ce qui casse

Il y a des breaking changes, mais rassurez-vous, la liste est courte et il n'y a pas de piège :

- **`instanceof`** **ne marche plus sur les factories.** `Map()`, `List()`, `Set()`, `Record()`, `Seq()`… sont des factories, pas des constructeurs de classe. On s'appuyait sur d'anciennes fonctions-classes, plus maintenant.
  ```
  - m instanceof Map;  // ne marche plus
  + Map.isMap(m);      // à utiliser à la place

  ```
  À noter : `instanceof` n'a jamais été la façon recommandée de tester une collection Immutable. Ça marchait, c'est tout.
- **Les collections vides ne sont plus des singletons.** `Map() === Map()` était `true`, alors que `Set.of('a') !== Set.of('a')`. Une incohérence qu'on avait déjà corrigée pour `List` en 5.0, c'est maintenant vrai partout.
- **TypeScript 5 minimum.** On utilise les [const type parameters](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#const-type-parameters) pour les types de `getIn`. TS 5.0 a plus de deux ans, il est temps.
- **La compatibilité transducers-js disparaît.** `cognitect-labs/transducers-js` est archivé depuis 2023, on n'allait pas maintenir un pont vers un projet mort.
- **La clé legacy** **`'@@iterator'`** **n'est plus reconnue.** Si vous avez un objet qui expose son itérateur uniquement sous cette clé pré-ES2015, il sera traité comme un objet simple par `Seq()`, `Collection()`, `fromJS()`. Définissez une vraie méthode `Symbol.iterator`.

Le [changelog complet](https://github.com/immutable-js/immutable-js/blob/6.x/CHANGELOG.md#600) détaille tout, PR par PR.

## Comment tester la bêta ?

```bash
npm install immutable@next
```

Ce que je vous conseille : une branche dédiée, vous installez la bêta, vous lancez votre suite de tests, et vous regardez ce qui pète.

C'est aussi simple que ça, et c'est **exactement** ce dont j'ai besoin.

## Justement, j'ai besoin de vous

Je vais être direct : maintenir un projet avec 28 millions de téléchargements par semaine et presque aucun retour direct, c'est dur.

Je vois les chiffres. Je vois les issues quand quelque chose casse. Mais je ne sais pas comment vous utilisez la lib au quotidien, ce qui vous manque, ni quelles décisions de la v6 vont vous faire mal.

Alors si Immutable.js tourne dans votre stack :

- Installez la bêta et dites-moi ce qui casse — même si c'est "rien n'a cassé", ça m'est utile.
- Si vous avez un doute sur un breaking change, ouvrez une [discussion](https://github.com/immutable-js/immutable-js/discussions). Il est encore temps de revenir en arrière, et c'est bien plus facile maintenant qu'après la sortie.
- Et si le nouveau site vous pique les yeux quelque part, ou vous plait, vous pouvez me dire ce que vous en pensez dans [cette discussion sur GitHub](https://github.com/immutable-js/immutable-js/discussions/2270).

Le bon moment pour râler, c'est maintenant. 🙂

- Le site : [immutable-js.com](https://immutable-js.com/)
- Le changelog v6 : [CHANGELOG.md#600](https://github.com/immutable-js/immutable-js/blob/6.x/CHANGELOG.md#600)
- Le dépôt : [github.com/immutable-js/immutable-js](https://github.com/immutable-js/immutable-js)
