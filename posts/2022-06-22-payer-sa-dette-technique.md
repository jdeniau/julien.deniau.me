---
date: 2022-06-22
title: Payer sa dette technique
emphasis: Que faut-il payer ? Et quand ?
icon: code
image: /images/dette-technique/dette-technique-title.png
lang: fr
---

## De la dette ? Pourquoi est-elle là ?

Payer sa dette technique… c'est un peu l'arlésienne du développeur : on accumule du code sans cesse, avec des contraintes de temps, de contexte.

En soit, il n'y a pas foncièrement de problème a faire du "quick & dirty". Il n'est peut-être pas "beau", ni optimisé, mais il fonctionne.

## C'est quoi le problème avec la dette du coup ?

Le vrai problème avec la dette technique pour moi, c'est la maintenance du code :

Chaque fois qu'un développeur va vouloir ajouter ou modifier cette portion du code, le "coût" d'entrée sera plus cher (le code sera plus dur à comprendre) et le risque de bug en découlant plus important.

![](/images/dette-technique/dette-1.png)

## Du coup, on paye quoi ? Quand ?

La qualité de code, c'est une notion assez subjective.

![](/images/dette-technique/wtf-per-minute.png)

J'aime bien cette image, et pour moi, il faut payer sa dette quand le nombre de "WTF" par minute est trop élevé.

Plus un projet avance, et plus on arrive à sa faire une idée précise de "où l'on va" sur ce projet. Quand un morceau de code est important, qu'il est là pour durer, et qu'on a prit beaucoup de dette dessus, il faut absolument améliorer sa qualité.

### Le changement c'est maintenant !

On a toujours une bonne excuse pour ne pas payer la dette :

- "Je suis déjà en retard sur la deadline"

  - Plus on se dit ça, et plus on accumule du retard. Si on accumule dette sur dette, cela s'appelle la "spirale du surendettement". C'est le même principe en développement (heureusement c'est tout de même moins grave) : on ne prend pas les deux jours qui permettrait de simplifier le problème, la prochaine fois on va passer trois jours à rentrer dans le code, etc., etc.

- "C'est super complexe, et ce n'est pas moi qui ait bossé dessus"
  - C'est l'une des composantes du développement : on passe son temps à lire du code qui n'est pas a soit. Essayer de simplifier une portion de code que l'on ne connait pas est l'un des meilleurs moyens de comprendre ce code. "Mais c'est quoi cette variable ?", "Quand est-ce qu'on passe dans cette fonction ?", "Il y a vraiment besoin de faire ça ?".

## Comment on fait pour régler sa dette sans s'arracher le cheveux

Le genre de code que j'ai en tête est du code : vieux, non testé, plein de "if", avec des fonctions de plusieurs centaines de lignes.

Il n'y a pas de moyen "magique" pour payer sa dette, mais le chemin que j'emprunte moi en général c'est le suivant :

### 1. Ajouter des test, beaucoup de tests, beaucoup beaucoup de tests.

C'est la première chose à faire : on installe le filet de sécurité avant de faire des cascades.

Étant donné que vous allez tout démonter et remonter, vous ne voulez pas en plus tout casser, sur un code dont vous ne connaissez pas le fonctionnent, et que vous ne pourrez du coup pas corriger.

Idéalement il faut quasiment tout tester, et ajouter un test à chaque fois qu'un comportement semble étrange, ou à chaque fois que vous vous posez la question "Mais si en entrée j'ai cette valeur, ca donne quoi au runtime ?".

### 2. On utilise l'analyse statique

Si on est en JavaScript, on migre le fichier sur TypeScript (si vous n'utilisez pas du tout TypeScript, [c'est le moment de vous y mettre !](https://julien.deniau.me/typescript/#/)).

En PHP, on utilise [PHPStan](https://julien.deniau.me/phpstan/) et on l'utilise à fond : pas de "mixed", ni de règle ignorée.

L'analyse statique va probablement permettre déjà d'enlever une bonne partie du code que l'on a mis là "au cas où".

### 3. On vérifie que c'est toujours utilisé

Il est courant avec du "vieux" code que certains paramètre ne soient plus utilisés. Il faut remonter la chaine d'appels, mais on tombe souvent sur des paramètres qui ont toujours la même valeur, ou bien des cas d'usage qui n'existent plus.

Dans ce cas on peut directement enlever le code, et les tests qui vont avec.

Dans certains cas, des analyseurs statiques peuvent aider. [ts-unused-exports](https://github.com/pzavolinsky/ts-unused-exports) ou [js-unused-exports](https://github.com/devbridge/js-unused-exports) combiné avec la règle ESLint [no-unused-var](https://eslint.org/docs/rules/no-unused-vars) permet de supprimer des pans entiers de code mort.

### 4. On découpe

Si le code est trop long, on le découpe : la fonction principale doit être compréhensible en un coup d'œil. Le fait d'extraite des portions de code dans d'autres méthodes permet de simplifier le modèle mental de compréhension.

Par exemple avec le pseudo-code suivant :

```ts
function buyItem(item: Item, quantity: number) {
  if (quantity < 0) {
    const logMetadata = {
      id: item.id,
      name: item.name,
      qtt: quantity,
    };

    logService.log(logMetadata);
    throw new Error('quantity can not be negative');
  }

  sdk.buy(item, quantity);
}
```

Le fait de sortir toute la partie de log fait que l'on n'a pas a se "charger" mentalement avec la complexité du log à chaque fois que l'on lit ce code :

```ts
function buyItem(item: Item, quantity: number) {
  handleNegativeQuantity(item, quantity);

  sdk.buy(item, quantity);
}

function handleNegativeQuantity(item: Item, quantity: number) {
  if (quantity < 0) {
    const logMetadata = {
      id: item.id,
      name: item.name,
      qtt: quantity,
    };

    logService.log(logMetadata);
    throw new Error('quantity can not be negative');
  }
}
```

On a simplement sorti un morceau de code peu important du chemin critique de la fonction. Il est fort probable que l'on travaille souvent avec `buiItem`, mais que l'on ne mette jamais le nez dans `handleNegativeQuantity`. En faisant ce genre de changement, on rend le code vraiment plus facile à comprendre, et ça à chaque fois que l'on va travailler dessus.

### 5. On essaie de tout casser.

Une fois qu'on en ai là, on devrait avoir une bonne idée de ce que doit faire le code. C'est le moment où l'on peut tenter de faire des gros changements. On a fait un gros ménage, on a les idées claires, le code est testé, on peut tenter tout ce que l'on veut pour améliorer ce code.

l'objectif principal : rendre le code **MAINTENABLE**.

Votre vous futur vous remerciera !
