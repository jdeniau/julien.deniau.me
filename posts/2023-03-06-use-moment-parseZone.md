---
date: 2023-03-06
title: N'utilisez jamais le constructeur de momentjs directement !
emphasis: Il est bien trop sensible à l'erreurs
icon: code
lang: fr
---

## Enseignement du jour :

Quand vous utiliser momentjs, ne faite jamais jAmAiS JAMAIS `moment('une date')`

## Pourquoi ?

RTFM

> **Please read:**
>
> - `moment(...)` is local mode. Ambiguous input (without offset) is assumed to be local time. Unambiguous input (with offset) is adjusted to local time.
> - `moment.utc(...)` is utc mode. Ambiguous input is assumed to be UTC. Unambiguous input is adjusted to UTC.
> - `moment.parseZone()` keep the input zone passed in. Ambiguous input is assumed to be UTC.
> - `moment.tz(...)` with the moment-timezone plugin can parse input in a specific time zone.

Car on est en "local mode", autrement dit, moment converti la valeur que vous lui passez en "heure locale". C'est quoi l'heure locale ? C'est un truc auquel on ne peut avoir aucune confiance ! Pourquoi ? Parce que c'est une donnée qui est renseignée par l'utilisateur !

```js
// Voyons voir quelle heure il est à New-York…
moment('2023-03-06T16:00:00-06:00').format()
> '2023-03-06T23:00:00+01:00'
```

OK ! Il est 23 h à New-York (En fait je bluffe il est 10h, d'ailleurs j'ai volontairement mis un décalage UTC faux, parce que je suis un utilisateur et je fais n'importe quoi avec mon terminal !).

D'ailleurs même nos serveurs Mapado ne disent pas là même chose ?

```js
// serveur de dev
> moment('2023-03-06T16:00:00-06:00').format()
'2023-03-06T22:00:00+00:00'

// serveur de CI  
> moment('2023-03-06T16:00:00-06:00').format()
'2023-03-06T23:00:00+01:00'
```

 la dev doit être configuré en UTC, alors que la CI est surement en Europe/Paris !
 

### Exception

Il y a une petite exception à cette règle : lorsque vous voulez connaitre l'heure locale de l'utilisateur, c'est bien évidement le "mode local" que vous voulez (mais `moment.parseZone().format('HH')` fonctionne aussi).

## TLDR;

- Utilisez tout le temps `moment.tz` dès que vous avez la TZ
- Utilisez `moment.parseZone` pour garder le décalage UTC fourni par l'API si vous ne l'avez pas
- Utilisez `moment.utc` pour forcer de l'UTC (vous ne voulez surement pas faire ça)
- N'utilisez pas `moment()` car c'est de la merde (cet avis est assez opiniâtre 😄 )
