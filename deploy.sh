# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist


git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
git push -f git@github.com:pilgrimmemoirs.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:pilgrimmemoirs/split.git master:gh-pages

cd -
