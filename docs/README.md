# Documentation of installation steps, dev docs, etc.

## Steps to generate the gif of the demo

- Record video with QuickTime Player: File > New screen recording
- Run this command on the video

```
 ffmpeg -i demo.mov -pix_fmt rgb24 demo.gif
```

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
