---
date: 2024-04-15
title: Ajouter un "sous-titre" à une vidéo avec ffmpeg
emphasis: Pour faire un générateur de meme maison
icon: video
image: /images/bad-news.png
lang: fr
---

Pour illustrer une conférence, j'ai récupéré un GIF style "meme", mais dont la qualité était très très mauvaise.

Heureusement, le site proposait aussi le format video .mp4. Seulement la vidéo ne contenait pas le sous-titre en gras et blanc.

J'ai donc fouillé un peu afin de comprendre comment intégrer ce sous-titre avec [ffmpeg](https://ffmpeg.org/).

## Ajouter du texte

J'ai trouvé le stackoverflow "[Text on video ffmpeg](https://stackoverflow.com/questions/17623676/text-on-video-ffmpeg)" afin d'ajouter un texte sur une image

Pour ajouter du texte à une vidéo, en bas de la vidéo, on peut utiliser le filtre `drawtext`.

La commande donnée sur stackoverflow était la suivante:

```sh
ffmpeg -i input.mp4 \
  -vf "drawtext=fontfile=/path/to/font.ttf:text='Stack Overflow':fontcolor=white:fontsize=24:box=1:boxcolor=black@0.5:boxborderw=5:x=(w-text_w)/2:y=(h-text_h)/2" \
   -codec:a copy output.mp4
```

J'ai joué sur la variable "fontfile", le "text" évidemment, la "fontsize" pour la grossir un peu, j'ai enlevé la "box" (enfin je l'ai mise transparent complêtement).

```sh
ffmpeg -i input.mp4 \
  -vf "drawtext=fontfile=futurama/fr-bold.ttf:text='GOOD NEWS EVERYONE':fontcolor=white:fontsize=48:box=1:boxcolor=black@0.0:boxborderw=5:x=(w-text_w)/2:y=h-th-30" \
  -codec:a copy output.mp4
```

## Entourer le texte avec une bordure

Le texte apparaissait blanc, sans bordure, j'ai donc ajouté les filtres `bordercolor` et `borderw` pour ajouter une bordure noire autour du texte.

En m'aidant de "[Is it possible to add stroke to text in ffmpeg?](https://stackoverflow.com/questions/53631819/is-it-possible-to-add-stroke-to-text-in-ffmpeg)", j'ai ajouté les filtres `bordercolor=black:borderw=3` pour avoir une bordure noire de "3" autour du text.

```sh
ffmpeg -i bad-news.mp4 \
  -vf "drawtext=fontfile=futurama/fr-bold.ttf:text='BAD NEWS EVERYONE':fontcolor=white:bordercolor=black:borderw=3:fontsize=48:box=1:boxcolor=black@0.0:boxborderw=5:x=(w-text_w)/2:y=h-th-30" \
  -codec:a copy bad-news-text.mp4
```

## Couper la fin de la vidéo et enlever le son

La vidéo avait un son qui ne m'intéressait pas, je l'ai donc enlevé avec `-an`, et j'ai ajouté `-ss 0 -to 1.4` pour dire à ffmpeg de garder la vidéo entre 0 et 1.4 secondes (il y avait 20 ms avec un changement de plan qui ne rendait pas bien avec la vidéo en boucle).

## Commande finale

```sh
ffmpeg -i bad-news.mp4 \
  -ss 0 -to 1.4 \
  -vf "drawtext=fontfile=futurama/fr-bold.ttf:text='BAD NEWS EVERYONE':fontcolor=white:bordercolor=black:borderw=3:fontsize=48:box=1:boxcolor=black@0.0:boxborderw=5:x=(w-text_w)/2:y=h-th-30" \
  -codec:a copy -an bad-news-text.mp4
```

## Comparaison des vidéos

<style>
    .local-flex {
        display: flex; 
        flex-direction: row;
        justify-content: center; 
        align-content: center; 
        gap: 10px
    }

    @media (max-width: 600px) {
        .local-flex {
            flex-direction: column;
        }
    }

    .local-flex video {
        max-width: 100%
    }
</style>

<div class="local-flex">
    <p><video src="/images/posts/bad-news.mp4" autoplay loop muted></video></p>
    <p><video src="/images/posts/bad-news-text.mp4" autoplay loop muted></video></p>
</div>

## Sources

1. [Text on video ffmpeg](https://stackoverflow.com/questions/17623676/text-on-video-ffmpeg)
2. [Is it possible to add stroke to text in ffmpeg?](https://stackoverflow.com/questions/53631819/is-it-possible-to-add-stroke-to-text-in-ffmpeg)
