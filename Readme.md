# Techcareer Frontend Full Stack- Dockerize
[GitHub Address](https://github.com/hamitmizrak/2025_techcareer_frontend_fullstack_1.git)
[Mongo Database]()
---

## Version
```sh
code .
git -v
node -v
npm -v
tsc --version
```
---


## Git
```sh
git init
git add .
git commit -m "Frontend init"
git remote add origin GITHUB_URL
git push -u origin master
git push -u origin main

git branch
git pull
git pull origin master

git clone https://github.com/hamitmizrak/2025_techcareer_frontend_fullstack_1.git

```
---

## Visual Studio Code (VS Code) Extensions
```sh
Auto Close Tag            => Jun Han
Auto Complete Tag         => Jun Han
Auto Rename Tag           => Jun Han
Better Comments           => Aaron Bond
Bootstrap5 Quick Snippets =>  Anbuselvan Rocky
Css Snippet               => Joy-yu
Dev Containers            => Microsoft
Docker                    => Microsoft
Docker Compsose            => Microsoft
ES7+ React/Redux/React-Native snippets => dsznajder
Git Graph                   => mhutchie
Live Server                => Ritwick Dey
MAterial Icon Theme        => Philipp Kief
Prettier - Code Formatter  => Prettier
Prettier ESLint            => Rebecca Vest
Rainbow Brackets           => MHammed Talhaouy


```
---

## Teknoloji İsimleri
```sh
HTML5
CSS3
BOOTSTRAP5
JS
TYPESCRIPT
EJS
NODE JS
MONGODB
EXPRESS JS
GIT/GITHUB
DOCKER
REST API
NGINX
CI/CD
```
---



## Teknoloji İçerikleri
```sh
nodemon
mongoose
bod-parser
compression
cookie-parser
cors
dotenv
ejs
express
express-rate-limit
helmet
mongodb
mongoose
morgan
swagger-jsdoc
swagger-ui-express
typescript
winston
```
---

## NPM 
```sh
npm init
npm init -y
```
---


## NPM INIT
```sh
npm init
package name: 
1-) herşeyi küçük harfle yaz
2-) boşluk kullanma bunun yerine (- veya _ kullan)
3-) Türkçe karakterlerden (üğşçö) kullanma

package name: offline_node_blog
version: v1.0.0 (Semantic version)
description: Html5,css3,bootstrap5, js, es, nodejs, jquery, express,nodemon
entry point: index.js
test command: start 
git repository: https://github.com/hamitmizrak/2025_techcareer_frontend_fullstack_1.git
keywords: Html5,css3,bootstrap5, js, es, ejs, nodejs, nodemon, jquery, express
author: Yüksek Bilgisayar Mühendisi Hamit Mızrak
license: ISC
Is this OK? yes
```
---


## NPM INIT -Y 
```sh

npm init -y
Default
{
  "name": "2025_techcareer_frontend_fullstack_1",
  "version": "1.0.0",
  "description": "[GitHub Address](https://github.com/hamitmizrak/2025_techcareer_frontend_fullstack_1.git)\r [Mongo Database]()\r ---",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
---

## NPM Sıklıkla Kullanılan Komutlar-1
```sh
npm search express
npm install express
npm install express@4.16.1
npm install express            # Local
npm install express --save     # Local
npm install express --save-dev # dev-dependencies
npm install express -D         # dev-dependencies
npm install express -g         # Global

npm install
npm i

npm update
npm update express

npm uninstall express
npm uninstall express@4.16.1
```
---

## npm delete
```sh
rm -rf node_modules
npm install

```
---


## NPM Sıklıkla Kullanılan Komutlar-2
```sh
npm list
npm ls
npm list -g            # Globalde ben ne paketleri yüklemişim
npm list -g --depth=0  # Globalde sadece ana branch'e yüklediklerimi bana göster

npm root                 # Local projemizdeli node_modules kütüphanesini göstersin
npm root -g              # GLocal projemizdeli node_modules kütüphanesini göstersin
Global node_modules: C:\Users\Hamit-Mizrak\AppData\Roaming\npm\node_modules
```
---


## NPM Sıklıkla Kullanılan Komutlar-3
```sh
npm update              # package.json içindeki dosyalardaki paketleri günceller
npm outdated            # Projede eskiyen veya güncellenmesi gereken paketleride gösterir
npm audit               # Bağımlılıkların gücenlik analizleri rapor eder
npm audit fix           # Belirlenen güvenlik açıklarını otomatik olarak düzeltir.
npm dedupe              # Bağımlılıkların tekrarlanan kopyalarını temizler.
npm rebuild             # Tüm bağımlıkları yeniden derleme

npm info <paket-adi>    #  Belirli paketin detaylı bilgileri gösterir
npm cache clean --force # npm önbelleğini temizler
npm cache verify        # Cache dorğulaması
npm config list         # (Npm yapılandırılmalarını görmek içindir)
npm config set <key> <value> #  npm config set registry https://registry.npmjs.org/  )

# https://www.npmjs.com/
npm login                # npm hesabınıza giriş içindir)
npm pack                 # Node.js paketini .tgz sıkıştırma formatında ekliyor
npm publish              # ilgili pkaeti npm gönder
```
---


## Npm Package Install (Local --save) 
```sh
npm list  
npm list -g 
npm root 
npm root -g

# https://www.npmjs.com/
npm i body-parser compression cors csurf cookie-parser ejs  express express-rate-limit helmet mongodb morgan mongoose swagger-jsdoc swagger-ui-express  winston --save 
npm list  
```
---

## Npm Package Install (Local --save-dev) 
```sh
npm list  
npm list -g 
npm root 
npm root -g

# https://www.npmjs.com/
npm i nodemon typescript   --save-dev
npm i nodemon @types/node dotenv concurrently --save-dev
npm i eslint eslint-config-prettier eslint-plugin-prettier npm-run-all --save-dev
npm i prettier ts-node --save-dev
npm list  
```
---

## Npm Package Install (Global)
```sh
npm list
npm list -g
npm root
npm root -g

npm i body-parser compression cors csurf cookie-parser ejs  express express-rate-limit helmet mongodb morgan mongoose swagger-jsdoc swagger-ui-express  winston -g
npm list -g 

```
---


## Typescript kurulum
```sh
npm install typescript -g          # global
npm install typescript --save-dev  # local

tsconfig dosyası için aşağıdaki komutu çalıştır:
tsc --init --locale tr
tsc --init

tsc 
tsc -w (Sistem kendi compiler yapıyor yazdıklarımı kendi ekliyor.)
```
---


## Konu
```sh

src/index.ts => eklemek ve içine şunu ekle 
let exam = "Merhabalar Ts";
console.log(exam);

```
---

## Nodemon kurulum
```sh
npm install  nodemon -g
npm install  nodemon --save-dev
nodemon ./src/index.js
```
---

## package.json içinden Script yazmak
```sh
  "scripts": {
    "start_app": "ts-node src/app.ts",
    "start_index": "ts-node src/app.ts",
    "dev_app": "nodemon src/app.ts",
    "dev_index": "nodemon src/index.ts",
    "build": "tsc",
    "build_watch": "tsc -w",
    "start_app:app": "node dist/app.js",
    "start_index:index": "node dist/index.js",
    "nodemon_app": "nodemon ./dist/app.js",
    "nodemon_app_watch": "nodemon --watch src --watch dist ./dist/app.js",
    "nodemon_index": "nodemon ./dist/index.js",
    "nodemon_index_watch": "nodemon --watch src --watch dist ./dist/index.js",
    "asenkron_app": "concurrently \"npm run build_watch\" \"npm run nodemon_app_watch\"",
    "asenkron_index": "concurrently \"npm run build_watch\" \"npm run nodemon_index_watch\"",
    "senkron:app": "npm-run-all --parallel  build_watch nodemon_app_watch",
    "senkron:index": "npm-run-all --parallel  build_watch nodemon_index_watch"
  }
```
---


## Nodemon
```sh
script 
bashscript
```
---





## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---

## Konu
```sh

```
---


