---
date: 2022-02-08
title: Pourquoi nous n'avons pas migré de Slack vers Teams
emphasis: Après deux semaines de test, voilà le retour d'expérience de notre migration de Slack vers Microsoft Teams
icon: users
image:
imageCredit:
---

On a un soucis avec Slack : les appels vidéos ne sont globalement pas terrible.

- Souvent des soucis de connexion,
- limité à 15 personnes pendant longtemps,
- pas possible d'enregistrer les réunions pour les absents,
- pas possibilité d'avoir un arrière plan flou (un besoin non négligeable pour ceux qui veulent garder leur appartement un peut privé, par exemple quand on teletravailler depuis sa chambre)

En plus de ça, à [Mapado](https://pro.mapado.com), l'équipe de relation client fait souvent des formations en live et enregistrées pour nos clients. Pour ce besoin on a un compte payant (et très cher) sur Zoom.
En plus de ça, nos clients ; qui travaillent pour beaucoup dans le secteur public ; travaillent sur Teams ou bien parfois seul Teams est autorisé (🤷 ?).

Du coup dans l'objectif de mutualiser les outils et de réduire les coûts, on a tenté de migrer de Slack vers Teams pendant deux semaines.

Voici le résultat de l'expérimentation...

## Un début difficile

"L'expérience" Teams commence à la connexion. Vraiment pas simple de se connecter :

En premier lieu, visiblement tout le monde n'a pas reçu les mails d'invitation générés par les administrateurs… Mettons ça sur le compte des mails plutôt que sur Teams en lui-même.

Continuons par là ou Teams devrait être au top : l'intégration sous Windows. Avec Windows 11, Teams est intégré en natif dans Windows : Super ! Sauf qu'il y a deux version de Teams : une "perso" (celle de windows 11) et une "pro". Il faut donc téléchargé un logiciel supplémentaire qui semble être déjà installé sur son poste… allez faire comprendre ça aux non-techniques 😵‍💫 !

Donc après l'installation, voila l'épreuve laborieuse de la connexion : avec un compte microsoft personnel (hotmail, xbox, etc.) Teams essaie sans cesse de se connecter avec son compte perso, du coup il faut se déconnecter partout pour pouvoir utiliser son compte Teams. Ensuite il faut bien ne pas se tromper sur le fait que c'est un compte pro, sinon on se retrouve seul dans un logiciel de messagerie perso.

Une fois le logiciel lancé, arrivent les premiers bugs

![bug-1](/images/slack-to-teams/bug-1.png)

Les emojis de réaction ne s'affichent simplement pas

![no-emoji](/images/slack-to-teams/no-emoji.png)

Ou encore quand on essaie de faire un sondage : j'obtiens une page blanche

![form-empty](/images/slack-to-teams/form-empty.png)

En essayer de créer un canal, : deux erreurs serveur, la troisième fois ça passe 🤦

![nouveau-channel.png](/images/slack-to-teams/nouveau-channel.png)

### Premiers contact

Passons ces premiers bugs étranges, on commence a se familiariser avec l'interface.

Globalement, le design est dépassé, on a l'impression de faire un bon dans le passé.

En plus de ça l'UX est "étrange", on y reviendra plus tard.

Mais le pire du pire : c'est lent, mais LENT mais d'une lenteur ! Chaque clic met plusieurs centaines de milisecondes a réagir et a aller là où l'on veut. C'est suffisament lent pour que l'on ait l'impression que l'application ait planté (surtout au vu des plantage précédents).

### Un petit tour sur Twitter

Après quelques jours, j'ai donc lancé un appel à l'aide sur Twitter pour essayer de voir les bons côtés de Teams.

https://twitter.com/j_deniau/status/1485532656402059264

Mais globalement, ma time-line est plutôt pro-Slack !

## On approfondit

En général, quand on change d'outil, c'est assez dûr au début, mais ça s'améliore avec la suite : on commence a prendre en main le logiciel et ça va mieux.

Avec Teams, c'est globalement de pire en pire avec le temps.

Encore des bugs de contenu qui ne s'affiche pas :

![bug-2.png](/images/slack-to-teams/bug-2.png)

### Integrations d'applis

Lorsque l'on a une notification github, on clique pour voir le texte, mais celui-ci se fait cacher par une "popup" d'actions

<video controls width="100%" preload="metadata">
  <source type="video/mp4" src="/images/slack-to-teams/notifs-github.mp4">
  <source type="video/webm" src="/images/slack-to-teams/notifs-github.webm">
</video>

Teams permet d'afficher des onglets avec des outils, on peut donc par exemple intégrer trello par exemple. C'est sympa… pour celui qui l'active. Pour les autres, c'est une galère sans nom pour comprendre ce qu'il faut faire pour avoir l'onglet : il faut en fait aller dans à un autre endroit pour se connecter à trello, en ensuite cela fonctionne.

### Des clics…

Dans Teams, les conversations d'équipes sont toutes des threads. Du coup dès que l'on doit mettre un message, on crée un nouveau thread, et les autres peuvent répondre à ce thread.
Cela se rapproche un peu d'un mur Facebook ou ce genre de chose. En soit cela fonctionne, mais on perd un peu le côté "discussion" où l'on peut envoyer des messages "rapide" à sa team, on est sans cesse obligé de cliquer pour créer un thread ou bien répondre à un thread existant.

En plus de ça, une fois que l'on quitte l'écran, le thread se ferme, et donc pour revoir les messages, il faut ré-ouvrir le thread en cliquant sur "XX réponses", puis si il y a trop de réponse, re-cliquer sur "Voir les réponses précédentes"

![clic-clic-clic.png](/images/slack-to-teams/clic-clic-clic.png)

Idem quand un message est trop long, il faut encore cliquer sur "Afficher plus" pour voir le contenu complêt du message

![clic-more.png](/images/slack-to-teams/clic-more.png)

Là ou l'on dirait que Teams est un logiciel fait de brics et de brocs, c'est quand ont essaie de taper un emoji au clavier : lorsque l'on écrit dans une conversation, on peut ouvrir une parenthèse et commencer à taper un emoji. Sauf que cela ne fonctionne pas dans un "chat" : deux endroits pour taper du texte = deux expériences de saise différentes !

### … et du scroll

Un truc assez incroyable aussi pour une application de messagerie : le fait de taper des messages n'est pas optimal.

Déjà, lorsque l'on tape un message trop long, le "viewport" sort de l'écran par le bas (il devrait y avoir les bouton de formattage du texte en dessous de la boite de saisie). Si l'on tape un message trop long, alors on ne voit carrément plus ce que l'on est en train de taper 🙈.

![no-scroll.png](/images/slack-to-teams/no-scroll.png)

Ou encore parfois en cliquant sur une notif ou bien dans un chat, le scroll se "bloque" au milieu et on se retrouve avec des messages déjà vu.

![no-scroll-2.png](/images/slack-to-teams/no-scroll-2.png)

Enfin, lorsque l'on est dans un channel, et que l'on reçoit un message dans ce channel, le nom du channel passe en gras pour noter que l'on a un nouveau message non lu… sauf que l'on est dans le channel et que l'on lit le message. On peut même y répondre, et le marqueur gras reste.
On est donc obligé de sortir et revenir pour faire disparaitre le marqueur.

### Les threads

L'onglet Conversations (les channels de groupe) sont assez perturbant aussi sur le fait qu'un vieux thread auquel on répond va passer tout en bas de l'écran, même si l'on n'est pas du tout concerné par ce thread.

On se retrouve au final avec des messages que l'on ne lit pas, soit parce que des vieux thread apparaissent en dessous, soit parce que ce sont des réponses à des threads qui se trouvent fermés et que l'on a pas envi de cliquer pour ouvrir et chercher parmis 50 messages où est-ce que l'on s'en était arrêté.

### Qui est là ?

Un petit point assez sympa de Slack, c'est que l'on peut voir très facilement qui de son équipe est présent

![presence-slack.png](/images/slack-to-teams/presence-slack.png)

Alors que sur Teams toutes les conversations sont mélangées, impossible de trier son équipe

![presence-teams.png](/images/slack-to-teams/presence-teams.png)

On peut trouver l'information dans le channel de son équipe, mais là encore, cela demande plusieurs clics pour une info importante au quotidien.

Dans la même logique, ce n'est pas simple de savoir si une personne est disponible pour un appel ou non.

## Des côtés positifs

Il y a (quand même) des côtés hyper positifs à Teams :

Les appels en visio sont vraiment bien fait :

- vue "grille" des utilisateurs pour voir les réactions des gens,
- prise de main à distance,
- possibilité de flouter son fond d'écran,
- possibilité d'enregistrer les vidéos,
- les notes de réunions (quand cela ne plante pas, CQFD.),
- la conversation de la réunion qui se trouve dans la visio et dans le channel.

là ou Slack est vraiment très en retard sur le sujet.

L'intégrations d'onglets est intéressante, dans notre cas pouvoir inclure un tableau trello ou bien les maquettes figma directement dans le channel dédié à un "focus produit".

Le fait d'avoir les réactions en émoji dans le flux "activité", là ou avec Slack on ne sait pas vraiment qui réagit à ses messages.

![reactions.png](/images/slack-to-teams/reactions.png)

Le côté webinaire intégré semble intéressant (c'était l'une des contraintes qui nous a fait nous poser la question du changement), mais on ne l'a pas encore testé.

Le fait d'avoir deux niveaux de canaux : le premier niveau par équipe, le deuxième pour le sujet est vraiment bien, là ou sur Slack tout est en vrac.

![canaux.png](/images/slack-to-teams/canaux.png)

## Le verdict

Après deux semaines de test, le verdict est sans appel :

![verdict.png](/images/slack-to-teams/verdict.png)

Sur dix votants, une seule personne est pleinement satisfaite, sinon tout le monde est pour le retour à Slack.

Du coup on est retourné sur Slack. On a quand même gardé notre compte Teams car au final un profil Zoom coute aussi cher que 15 utilisateurs Teams (pour la formation et les wébinaires).
On a aussi activé l'intégration des vidéos Teams dans Slack pour bénéficier du vrai point fort de Teams : la visio.

![teams-in-slack.png](/images/slack-to-teams/teams-in-slack.png)

Pour résumer en une seule phrase, je ne peux que citer que [Chris](https://twitter.com/chrismeiller) :

> Teams, c'est le meilleur outil pour que les gens ne télé-travaillent pas.
