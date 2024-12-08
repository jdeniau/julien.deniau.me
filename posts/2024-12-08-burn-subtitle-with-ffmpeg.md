---
date: 2024-12-08
title: Burn a subtitle on a video file with ffmpeg
emphasis: How can you write and burn a subtitle on a video file ?
icon: video
image: /images/burned-subtitle.png
lang: en
blueskyUri: https://bsky.app/profile/julien.deniau.me/post/3lctdrskpus2v
---

I usually prefer having the subtitle file separated from the video file, but when I make a talk, I use [revealjs](https://revealjs.com/), and I wanted to burn the subtitle directly on the video file.

Here is the command I used to do it:

```sh
ffmpeg -i .\input-video.mp4 -vf subtitles="subtitle-file.srt:force_style='MarginV=40,Fontsize=18'" output-with-sub.mp4
```

* `-i` : input video file
* `-vf` : video filter
* `subtitles` : filter to add subtitles
* `subtitle-file.srt` : the subtitle file
* `force_style` : style of the subtitle

## Write the subtitle file

To write the subtitle, I did use [Subtitle edit](https://www.nikse.dk/subtitleedit), that did help me to synchronize the subtitle with the video.

## External subtitle on the web ?

I did not searched if video could be played in a browser with an external subtitle file, but as a matter of fact, it's perfectly possible to do it with the [`<track>`] element using a [`.vtt`](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API) file…

I will try that now 😉
