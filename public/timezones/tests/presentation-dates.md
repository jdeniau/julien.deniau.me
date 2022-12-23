## Retour vers le futur

Est-ce que quelqu'un peut me dire quel jour on est aujourd'hui ? (parce que je n'ai aucune mémoire, je ne me rappelle jamais de la date)

Ah mince, on est le XX XXX XXXX ? Excusez-moi il faut que j'appelle ma belle-sœur, c'est son anniversaire ! Elle vit à Tahiti. Ha ben non, mince, chez elle on est encore hier ? Ou déjà demain peut-être ? 🤔

### Qu'est-ce qu'une date exactement ?

Une date, c'est un moyen de se repérer dans le temps. C'est généralement assez pratique pour se synchroniser quand on est plusieurs : je suis né le 10 décembre 1985 à 0h30. Tout le monde comprend ça.

Une date c'est donc :

- une année,
- un mois,
- un jour,
- une heure,
- une minute,
- une seconde et un milliseconde si on veut être (très) précis,
- [reveal] un fuseau horaire !
- [reveal] une calendrier !! et oui, si mon référenciel c'est le calendrier hébraïque, on ne va pas **du tout** être synchro !

On peut, parfois, ignorer certaine donnée, car elle sont "naturelle" en fonction du contexte:

- Venez mangez dimanche 20 novembre 2022 à 12 heure 00, heure de Paris dans le calendrier Grégorien… Enfin venez manger ce dimanche midi quoi !

Voila, c'est tout, merci d'être venu !

Sauf, qu'en fait, c'est un peu plus compliqué que ça… surtout les fuseaux horaires.

## Pourquoi les fuseaux horaires c'est compliqué

Voici la terre

(affichage mapemonde 3D)

Et sa représentation "plane"

(transition vers une carte du monde)

Depuis des miléraires (TOCHECK), on considére que "midi", c'est quand le soleil est à l'équinoxe (le plus haut dans le ciel). Ca correspond plus ou moins à la moitié d'une journée (mid-day), et son petit copain minuit (mi-nuit) permet d'avoir le milieu de la nuit.

Sauf que "midi" à Paris, ce n'est pas la même chose que "midi" à Tahiti, ni à Lyon d'ailleurs !

Jusqu'a à la fin du 19ème siècle, chaque ville avait son heure locale (vu qu'un définissait l'heure grace au soleil, c'est le cadran solaire qui définissait l'heure de chaque ville, normal). Avec l'essort des transports, en particulier du train, avoir une heure par ville, ce n'est **vraiment** pas pratique : aux Etats-Unis, chaque compagnie féroviaire utilisait son propre système de mesure du temps, basé sur son siège social ou un terminus important. La gare centrale de Pittsburg, partagée par plusieurs compagnie, utilisait six heure différentes !

En 1858, le mathématicien Quirico Filopanti posa les bases d'un système universel. Puis en 1876, en se basant sur les travaux de Filopanti, le géographe Sandford Fleming proposa le système actuel, basé sur le méridien de Greenwich, dans la banlieue de Londres. Le système est adopté en 1884 lors de la conférence internationale du Méridien.

### Les fuseaux horaires par pays

Il y a 24h dans une journée, on a donc découpé la terre en 24 portions égales pour créer des fuseaux horaires : l'heure "UTC" du méridien de Greenwich, jusqu'à UTC-11 à l'ouest, et UTC+12 à l'est. Malin l'humain ! (meme avec le black "malin")

(affichage carte avec "tranches")

Enfin égales… c'est quand même plus pratique d'avoir le même fuseau horaire quand on est dans le même pays.

(affichage avec vrai fuseaux horaires)

Enfin dans un même pays… si il n'est pas trop grand. USA 4 fuseaux horaires, Russie : 11 fuseaux horaires, France : 14 fuseaux horaires (déjà 3 pour la Polynésie Française) !
(affichage des cartes une par une ou aggrandissement, ou coloration)

Bon il y a quand même des pays ou c'est simple. La Chine : un seul fuseaux horaires.

Sauf que du coup c'est le bordel :

- A l'ouest de la chine on se couche à minuit quand à l'est on se couche à 20h
- Les Ouigour (à l'ouest) utilisent chez eux leur propre heure, non officielle, par dissidence avec le régime en place.

### Les TZ chelou

En parlant de rebelles : chaque pays choisi à quel fuseau horaire il se "raccroche". Il sagit généralement un décallage d'heure entières comparé à UTC… mais parfois :

- Iran : UTC+3:30,
- Afghanistan : UTC+4:30,
- Australie centrale : UTC+10:30
- Inde et Sri Lanka : UTC+5:30
- Népal : UTC+5:45 ! 😵‍💫

Un autre genre de rebelle vis-à-vis du système actuel :

Pour faciliter la communication avec l'ensemble de ses iles, qui se trouvent des deux côté de la ligne du changement de date, l'état du Kiribati applique les fuseaux horaires UTC+12, mais aussi UTC+13 et UTC+14 (zoom carte ?)

Au total, de 24 on est passé à 37 fuseaux horaires !

## Tout est politique (ou économique) !

### Cocorico

Revenons en 1884 un moment. Etaient proposés comme méridien de référence le méridient de Greenwich, dans la banlieue de Londres, ou le méridien de Paris.
En 1884, quand on est la Grande Bretagne, on gère un empire qui représente _en gros_ un quart des habitants de la planète. On a aussi un copain qui s'appelle les Etats-Unis, qui pèse un peu dans "le Game" à l'international. Les deux réunis représentent les deux tiers de la flotte mondiale. Pas trop compliqué d'imposer son méridien.
En contre-partie, pour faire plaisir, la Grande Bretagne accepte de passer au système métrique. Et les Etats-Unis ? (meme "mothing to do here")

Les français ? Et bien ils ont le seum ! (photo de Laura "trop dég")

La France mettrons prêt de 30 ans à accepter le méridien de Greenwich, et c'est le 9 mars 1911 que le texte de loi est enfin accepté. L'heure légale étant donc : « l'heure du temps moyen de l'observatoire de Paris retardée de 9 minutes 21 secondes » (faut pas déconner et laisser gagner les anglais !).

OK, mais… on est plus sur UTC aujourd'hui, si ?

Avançons un peu dans le temps : nous sommes en juin 1940. L'armée allemande occupe la France, et impose l'heure Allemande en France. Heure qui, bien que remise en question, ne sera pas abandonné. (carte)

Par sympathie pour Hitler, l'Espagne de Franco passe aussi à l'heure allemande en 1942. (carte)

### Samoa

En 2011, les Samoa ont purement et simpplement supprimé le 30 décembre ! L'Australie et la Nouvelle-Zélande étant ses partenaires commerciaux principaux, ils ont décidé de passer de UTC-11 à UTC+13, et pour ce faire ils ont du supprimer un jour.

Ils avaient fait le changement inverse le 4 juillet 1892, les Etats-Unis étant leur partenaire commercial de l'époque ! Le 4 juillet (fête nationale des Etats Unis) a donc duré… deux jours !

### Conclusion politique

**D'accord**, donc tout est politique ou économique voila pourquoi c'est le bordel (Image Xavier Auberge espagnole ?) ! Tout change tout le temps en fonction des gouvernements ou pour des raisons de gros sous !

## DST

A oui, j'avais oublié le DST. Encore un bazar lié à l'économie. Le DST c'est l'heure d'été (Daylight Saving Time). Pour éviter le « gaspillage de la lumière », au XXème siècle, on décide de se décaller les horloges d'une heure entre mars et octobre.
Dans les faits, en 2009, l'économie réalisée est estimée à 0,015 % de la consommation énergétique : on a baissé la consommation d'éclairage, et on consomme bien plus au global.

Avec l'heure d'été, on passe de 37 à 43 fuseaux horaires.

Et là encore, beaucoup de politique, et beaucoup de changement dans le temps.

### En France

La France met en place l'heure d'été en 1916, puis l'abandonne en 1945. On le remet en place en 1976 "temporairement" après la crise pétrolière. En 1996, pour s'harmoniser avec l'union Européenne, on a changé le jour du passage à l'heure d'hiver.

Enfin je dis en France, mais dans les départements et collectivités d'outre-mer, on ne passe pas à l'heure d'été… sauf à Saint-Pierre-et-Miquelon qui change d'heure en même temps que… les Etats-Unis ! (et oui, économiquement c'est plus pratique)

### En Europe

Depuis 2019, dans l'Union Européenne, chaque pays peut supprimer le changement d'heure. Seulement par manque de consensus, chaque pays peut choisir si il reste en heure d'hiver ou en heure d'été.

La France étant plus fan de l'heure d'été, il pourrait être 14h à Paris, quand il est 13h en Allemagne, pourtant plus à l'Est ! 🤦

Le COVID ayant un peu prit le dessus, en 2022, aucune décision n'a été prise.

### Etats-Unis

Aux Etats-Unis, chaque état est libre d'appliquer l'heure d'été, ce que font tous les états sauf Hawaï et l'Arizona : en été, en allant de Los Angeles à Phoenix on ne change pas d'heure, mais on change d'heure en hiver.

### Australie

La palme du bazar revient à l'Australie.
L'Australie est coupé en trois fuseaux horaires en hiver :

- UTC+8 à l'Ouest,
- UTC+10 à l'Est,
- UTC+9:30 au centre 😖

En été certains états, mais pas tous, passent à l'heure d'été. On se retrouve donc avec :

- à l'ouest : UTC+8,
- au centre nord : UTC+9:30,
- au centre sud : UTC+10:30,
- au nord est : UTC+10:00,
- au sud est : UTC+11

On peut donc « revenir dans le temps » simplement en voyageant du sud au nord !

## Côté informatique, ça donne quoi tout ça ?

Et oui, en informatique, comment on fait pour gérer tout ce bazar exactement ?

### La (les ?) normes

En informatique, on aime bien les normes. C'est un peu comme les lois : ça permet à tout le monde de se comprendre.

**La** norme sur la gestion des dates, c'est la norme ISO 8601 ("Représentation de la date et l'heure"), et pour la standardisation des dates en informatique en particulier, son "profil" RFC3339.

En ISO 8601, une date ressemble à ça :

`2022-11-19T22:27:00+01:00`

Année-Mois-Jour T(ime) Heure:minute:seconde décallage UTC.

OK. Le décallage UTC c'est cool. Enfin disons que c'est déjà ça. Mais pourtant on l'a vu : entre l'heure d'été et les changements à travers le temps, on ne peut pas travailler avec des dates de façon précise si l'on n'a pas le fuseau horaire exact : si vous êtes à UTC-7 en été, quel heure sera-t-til dans 6 mois ? Impossible à savoir sans savoir si vous parlez de l'heure de Phoenix ou bien l'heure de Los Angeles.

Mais du coup c'est quoi le standard des fuseaux horaires ?

Et bien il n'y en a pas ! Enfin pas encore tout du moins. Il y a une proposition pour étendre la RFC3339 afin de pouvoir ajouter le fuseau horaire dans le format: 2022-11-19T22:27:00+01:00[Europe/Paris].

Le format est en parti dicté par l'implémentation JavaZDT qui est très utilisée. Mais cela ne fonctionne pas en PHP par example !

D'ailleurs il n'y a même pas de "liste officielle des fuseaux horaires". C'est souvent la liste du IANA (Internet Assigned Numbers Authority), qui gère les DNS et les adresses IP, entre autre, et qui maintient une liste à jour des fuseaux horaires, qui est utilisée.

### Les langages

#### PHP

Clairement en PHP, c'est la meilleure API de gestion de date avec laquelle j'ai pu travailler, notamment pour la gestion des constructeurs / modificateurs en anglais (`new DateTime('next monday 10:00 Europe/Paris')` fonctionne !).

La librairie standard est suffisante pour faire énormement.

Ne gère malheureusement pas le format non standard JavaZDT.

[php.net/datetime](https://www.php.net/datetime)

#### Java

Ca a l'air plutôt très bien géré, des classes pour gérer les DateTime, les Calendar, les TimeZone avec les heures d'été, etc. (c'est pour cela que la norme est fortement inspirée de JavaZDT)

[documentation de Date](https://docs.oracle.com/javase/7/docs/api/java/util/Date.html)

#### Python

C'est fonctionnel, mais pas top, surtout la gestion des timezones qui fonctionne pas ou mal sous Windows.

- [SPL zoneinfo](https://docs.python.org/3/library/zoneinfo.html#data-sources)
- [dateutil tzwin](https://dateutil.readthedocs.io/en/stable/tzwin.html)

#### Ruby

> DateTime does not consider any leap seconds, does not track any summer time rules.

Ca ne sent pas très bon dès le départ ! Mais [la documentation](https://ruby-doc.org/stdlib-2.6.1/libdoc/date/rdoc/DateTime.html) montre que c'est le bordel dès d'entrée.

La doc termine comme ça :

> If you also have to deal with timezones then best of luck - just bear in mind that you'll probably be dealing with local solar times, since it wasn't until the 19th century that the introduction of the railways necessitated the need for Standard Time and eventually timezones.

#### Javascript

Pire librairie possible : API pas pratique, sujette à l'erreur, inconsistante :

```js
d = new Date()
>> Date Mon Nov 21 2022 23:14:30 GMT+0100 (heure normale d’Europe centrale)

d.getDay() // en fait : day of week
>> 1
d.getDate() // day ?
>> 21
d.getMonth() // 0-indexé
>> 10
```

MomentJS, par contre est super puissant: API top et super simple a utilié.

`moment-timezone` fait 1 Mo de donnée (112Ko gzippé) par contre !

Remplacé par luxon, day.js, etc. et surtout par [Temporal](https://tc39.es/proposal-temporal/docs/index.html), actuellement stage 3. Temporal se base sur le format JavaZDT pour l'affichage des fuseaux horaires.

### SQL : attention la galère

#### Comment les DB gèrent les TimeZones ?

> le standard SQL possède un **mélange étrange** de types de date/heure et de possibilités.

_[la documentation de Postgresql](https://docs.postgresql.fr/10/datatype-datetime.html#DATATYPE-TIMEZONES)_

En SQL, il y a un fuseau horaire défini sur le serveur (comme en PHP par exemple).
On peut aussi modifier sa TimeZone pour la durée de sa session.

Un petit test rapide, de ce que ça donne.

```sql
SET time_zone = 'America/Phoenix';
INSERT INTO test VALUES (5, '2022-11-24T12:00:00');
SELECT * FROM test WHERE id = 5;

# 2022-11-24 12:00:00

SET time_zone = 'Europe/Paris';

SELECT * FROM test WHERE id = 5;

# 2022-11-24 12:00:00
```

dafuk ?! On insère une donnée locale, mais elle reste locale, même si on change la timezone de la session.

On peut cela dit convertir depuis une TZ vers une autre :

- MySQL / MariaDB : `CONVERT_TZ(datetime, from_tz, to_tz)`
- SQLServer : `datetime AT TIME ZONE to_TZ`
- Postgresql : AT TIMEZONE (?) ou bien datetime::timestamptz

Si j'ai bien compris, on utilise la valeur de la session et pas la valeur de la donnée. Dans Postgresql par exemple, la donnée est juste convertie pour être stockée en UTC.

De tout façon, le retour de donnée contient seulement un décallage à UTC, mais pas le fuseau horaire.

#### Comment on stocke la donnée ?

| value               | timezone     |
| ------------------- | ------------ |
| 2022-11-25T12:00:00 | Europe/Paris |

Deux façons de faire :

- Je stocke l'heure locale de la donnée
- Je stocke l'heure UTC de la donnée (et il est donc 13h heure de Paris)

Pro heure locale :

- Si la loi change, la donnée reste valide… enfin si la donnée ne concerne pas des échanges internationaux.
- Facilité de debug (la valeur est humainement lisible, pas besoin d'ajouter / soustraire pour avoir la "vrai" heure)

Pro heure UTC :

- Permet de comparer des dates sur des fuseaux horaires différents (pour trier par example).
- Plus généralement, met la représentation des dates sur la "vrai" ligne temporelle.
- Evite les problèmes avec l'heure d'été : le 30 octobre 2022 en France, les horloges passeront deux fois entre 2 h et 3 h. Impossible donc de savoir si c'est 2 h UTC+1 ou bien 2h UTC+2. Cela dit cela complexifie aussi pas mal la gestion.

Le dernier point fait qu'il est considéré comme une bonne pratique de toujours stocker la valeur UTC d'une date.

### Et dans une API ?

C'est un peu le même combat que pour SQL, mais avec plus de flexibilité.

On peut à minima travailler avec la RFC3339 et avoir un format `2022-11-25T12:00:00+01:00`. Cela dit, vu que l'on n'a pas le fuseau horaire, il est toujours impossible de "bouger" dans le temps sans se tromper sur l'heure d'été.

Utiliser le format JavaZDT ? Pourquoi pas… sauf qu'aujourd'hui les librairies ne reconnaissent pas toute cette information.

Si vous travaillez juste pour de l'affichage, avoir le format RFC3339 est suffisant. Si vous voulez travailler sur de la donnée, alors le mieux est surement d'avoir deux clés :

```json
{
  "value": "2022-11-25T12:00:00+01:00",
  "timezone": "Europe/Paris"
}
```

### Le bug de 2038

![bug de 2038](https://imgs.xkcd.com/comics/y2k_and_2038.png)

En informatique, les dates sont représentées par des "timestamp" : le nombre de secondes écoulées depuis le 1er janvier 1970.

Hors le 19 janvier 2038 à 3 h 14 min 7 s, on va dépasser la taille maximale de stockage d'un nombre entier sur les systèmes 32 bits. On va "boucler", et revenir… le 13 décemble 1901 (un timestamp de `−2 147 483 648`).

En PHP 8.0, la gestion des heures d'été était impactée par ce bug (corrigé en 8.1). A Mapado on n'avait pas vérifié la donnée réelle de notre stack de tests, et nos évènements de tests en 2100 avait une mauvaise représentation. Le passage a php 8.1 a fait planté la stack de tests !

## La vie, l'univers et le reste

OK donc on a vu que c'était bien le bazar.

Et encore, je ne vous ai pas parlé des secondes intercallaires, ces secondes qui sont ajoutée pour ajuster le temps UTC aux variations de vitesses de rotation de la terre.

Mais finalement les humains se sont quand même coordonnés sur la planête pour avoir un temps universel… universel ? terrestre plutôt !

Que va-t-il se passer quand on aura colonisé la Lune ou Mars ? Va-t-on garder "UTC" comme référence ? Peu probable, tout comme on a abandonné les heure locale, il y aura probablement un temps "solaire". Et plus tard ? Un temps de la Galaxie ?

On considère que l'on est sur une "ligne temporelle", mais on est a peu prêt sûrs que le temps est "étiré" à l'approche d'un trou noir. Là encore, comment gérer la conversion ? Est-ce les même valeurs qui s'écoulent juste moins vite ?

### One more brainfuck

![timezone in antartica](https://lesjoiesducode.fr/content/046/antarctique-fuseaux.webp)

L'antartique : ce continent inhabité dans lequel cohabitent… 12 fuseaux horaires différents !

L'antartique n'est pas officiellement divisée en fuseau horaires. Cela dit, le continent a été divisé en territoires, pour lesquels le fuseau horaire correspond soit à celui du pays auquel ils appartiennent, soit à celui du pays qui les approvisionne.

Certaines base scientifiques se sont lâchées en plus de ça :

- Alors que le changement d'heure n'est pas appliqué sur la majeure partie du continent, la station de recherche Palmer, détenue et financée par les États-Unis, mais exploitée sur le territoire chilien, suit l'heure du Chili.
- La station Troll, située dans une zone revendiquée par la Norvège, suit le temps universel (UTC) d'octobre à mars, puis passe en UTC+2 (WTF) de mars à octobre. (Elle porte très bien son nom.)

En complément, des chercheurs travaillant dans la station d'un autre pays que le leur optent parfois pour suivre le fuseau horaire de leur pays d'origine, du moment qu'ils n'ont pas à travailler avec d'autres équipes, cela facilitant les communications avec leur maison mère.
