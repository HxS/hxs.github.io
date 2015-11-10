wget https://github.com/spf13/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_linux_amd64.tar.gz
tar xvzf hugo_${HUGO_VERSION}_linux_amd64.tar.gz
mkdir -v $TRAVIS_BUILD_DIR/bin
mv -v hugo_${HUGO_VERSION}_linux_amd64/hugo_${HUGO_VERSION}_linux_amd64 $TRAVIS_BUILD_DIR/bin/hugo
rm -v -rf hugo_${HUGO_VERSION}_linux_amd64*
chmod -v +x $TRAVIS_BUILD_DIR/bin/hugo
