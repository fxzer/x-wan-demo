#!/usr/bin/env sh

set -e

pnpm build

cd dist

git init 

git add -A

git commit -m '🎉deploy gh-pages🎉'

git push -f git@gitee.com:fxzer/x-wan-demo.git main:gh-pages

cd ..

