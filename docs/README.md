# Steps to generate the gif of the demo

- Record video with QuickTime Player: File > New screen recording
- Run this command on the video

```
 ffmpeg -i demo.mov -pix_fmt rgb24 demo.gif
```
