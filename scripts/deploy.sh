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

git config --global user.name $GIT_USER
git config --global user.email $GIT_EMAIL
git config --global credential.helper store
echo "https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com" > ~/.git-credentials

./scripts/install_hugo.sh

npm start && npm run deploy

rm ~/.git-credentials
