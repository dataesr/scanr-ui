Server folder is just for testing purpose for now.

To start developping,

```bash
cd ../client && npm i
npm run dev
```

To deploy in staging, simply push your code to the remote staging branch.

To deploy in production:

```bash
git switch main
git pull origin main --rebase --tags
git merge origin staging
cd client
npm version [patch|minor|major]
cd ..
git add .
git tag -l (to get the tag list)
git commit -m '<new tag>'
git tag <new tag>
git push origin main --tags
git switch staging
git merge origin main
git push origin staging --tags
```
