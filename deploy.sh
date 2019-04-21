#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build --mode production

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'vuejs.getlonlat.top' > CNAME

git init
git add -A
git commit -m 'deploy'


# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:getlonlat/vuejs.git master:gh-pages

cd -
