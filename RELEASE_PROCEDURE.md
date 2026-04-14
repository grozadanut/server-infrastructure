Deploy app

git-cliff --bumped-version
git tag vx.x.x
git push origin --tags
git-cliff --latest

Translate changelog and add to server-infrastructure/www/changelog/changelog.md