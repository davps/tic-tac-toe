# Documentation of installation steps, dev docs, etc.

## Steps to generate the gif of the demo

- Record video with QuickTime Player: File > New screen recording
- Run this command on the video

```
ffmpeg -y -ss 0 -t 30 -i demo.mov \
-vf fps=10,scale=320:-1:flags=lanczos,palettegen palette.png

ffmpeg -ss 0 -t 30 -i demo.mov -i palette.png -filter_complex \
"fps=10,scale=320:-1:flags=lanczos[x];[x][1:v]paletteuse" output.gif
```

Arguments:

- `-ss 0`: Start at second 0
- `-t 30`: Go until second 30

Source: https://superuser.com/a/556031

## Deployment to Heroku

I've used this [Heroku Buildpack for create-react-app](https://github.com/mars/create-react-app-buildpack)

### Relevant links

- https://docs.travis-ci.com/user/encryption-keys/
- https://docs.travis-ci.com/user/deployment/heroku/

### Install Travis CLI on Ubuntu Server 16.04 LTS

```
sudo apt-get update
sudo apt-get install rubygems-integration
sudo apt-get install bundler
gem install travis
```

Then follow the instructions from the Travis CI docs
