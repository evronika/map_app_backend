Ensure you have installed MongoDB on your laptop. To install and run it, you need:
```$xslt
brew update
brew install mongodb
mkdir -p /data/db
sudo chown -R `id -un` /data/db
brew services run mongodb-community

```
**To run api**, you will need to :
```$xslt
cd api
npm install
npm run serve
```