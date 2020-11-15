# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd dist


git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:pilgrimmemoirs/Split.git master:gh-pages

cd -
