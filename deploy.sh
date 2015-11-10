#!/usr/bin/env bash

if  [ -z "$GIT_USER" ]; then
    echo "GIT_USER has not existed."
    exit 1
fi

if  [ -z "$GIT_EMAIL" ]; then
    echo "GIT_EMAIL has not existed."
    exit 1
fi

if  [ -z "$GITHUB_USER" ]; then
    echo "GITHUB_USER has not existed."
    exit 1
fi

if  [ -z "$GITHUB_TOKEN" ]; then
    echo "GITHUB_TOKEN has not existed."
    exit 1
fi

HUGO_VERSION=0.14

wget https://github.com/spf13/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_linux_amd64.tar.gz
tar xvzf hugo_${HUGO_VERSION}_linux_amd64.tar.gz
mv hugo_${HUGO_VERSION}_linux_amd64/hugo_${HUGO_VERSION}_linux_amd64 hugo
export PATH=$PATH:$PWD/hugo_${HUGO_VERSION}_linux_amd64/

git config --global user.name $GIT_USER
git config --global user.email $GIT_EMAIL
git config --global github.user $GITHUB_USER
git config --global github.token $GITHUB_TOKEN

npm start
npm run deploy
