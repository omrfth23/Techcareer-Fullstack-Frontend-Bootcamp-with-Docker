
# Shebang (#!/): Betiğin Bash kabuğu ile çalışacağını gösterir.
# bin/bash: names
# İşletim sistemine Bash betiğinin çalışacağını söyler
#!/bin/bash
echo "Docker Kurulumlar"

# User Variable
INFORMATION="Bilgi"
NPM_SAVE="Npm Save Yükleniyor"
NPM_SAVE_DEV="Npm Save Dev Yükleniyor"
NPM_GLOBAL="Npm Global Yükleniyor"
PACKAGE_JSON="Package Json"
NPM_UPDATE="Npm Update"
NPM_COMPILER="Npm Compiler"
TYPESCRIPT="Typescript Install"


# ÖNEMLİ NOT: eğer windows üzerinden çalıştırıyorsanız sudo tanımayacaktır.
# ÖNEMLİ NOT: nginx eğer browserda istediğiniz sonuç çıkmazsa browserin cache belleğini temizleyiniz. yoksa nginx'in kendi sayfasını görürüsünüz.
#####################################################################################################
#####################################################################################################
# Bashscriptlere İzin Vermemiz
chmod +x bashscript_countdown.sh

#####################################################################################################
#####################################################################################################
# Install
package_json() {
    # Geriye Say
    ./bashscript_countdown.sh

    echo -e "\n###### ${PACKAGE_JSON} ######  "
    read -p "Package.json Yüklemek İster misiniz ? e/h " packageJsonResult
    if [[ $packageJsonResult == "e" || $packageJsonResult == "E" ]]; then
        echo -e "package Json Yüklenmeye başlandı ..."

        # Geriye Say
        ./bashscript_countdown.sh

        rm -rf node_modules
        npm init -y 
    else
        echo -e "package Json Yüklenmeye Başlanmadı ...."
    fi
}
package_json


#####################################################################################################
#####################################################################################################
# Local Save (Install)
npm_local_save() {
    # Geriye Say
    ./bashscript_countdown.sh

    echo -e "\n###### ${NPM_SAVE} ######  "
    read -p "Npm Paketlerini Yüklemek İster misiniz ? e/h " npmSaveResult
    if [[ $npmSaveResult == "e" || $npmSaveResult == "E" ]]; then
        echo -e "Npm Save Yüklenmeye başlandı ..."

        # Geriye Say
        ./bashscript_countdown.sh

        npm list  
        npm list -g 
        npm root 
        npm root -g

        # https://www.npmjs.com/
        npm i body-parser compression cors csurf cookie-parser ejs  express express-rate-limit helmet mongodb morgan mongoose swagger-jsdoc swagger-ui-express  winston --save 
        npm list
        npm install
        npm dedupe  # Bağımlılıkların tekrarlanan kopyalarını temizler.

    else
        echo -e "Npm Save Yüklenmeye Başlanmadı ...."
    fi
}
npm_local_save

#####################################################################################################
#####################################################################################################
# Local Save Dev (Install)
npm_local_dev_sav() {
    # Geriye Say
    ./bashscript_countdown.sh

    echo -e "\n###### ${NPM_SAVE_DEV} ######  "
    read -p "npm Save-Dev Paketlerini Yüklemek İster misiniz ? e/h " npmDevSaveResult
    if [[ $npmDevSaveResult == "e" || $npmDevSaveResult == "E" ]]; then
        echo -e "Npm Dev-Save Yüklenmeye başlandı ..."

        # Geriye Say
        ./bashscript_countdown.sh

        npm list  
        npm list -g 
        npm root 
        npm root -g

        # https://www.npmjs.com/
        npm i nodemon typescript   --save-dev
        npm i nodemon @types/node dotenv concurrently --save-dev
        npm i eslint eslint-config-prettier eslint-plugin-prettier npm-run-all --save-dev
        npm i prettier ts-node --save-dev
        npm install
        npm dedupe  # Bağımlılıkların tekrarlanan kopyalarını temizler.

    else
        echo -e "Npm Save-Dev Yüklenmeye Başlanmadı ...."
    fi
}
npm_local_dev_sav


#####################################################################################################
#####################################################################################################
# Global Save (Install)
npm_global_save() {
    # Geriye Say
    ./bashscript_countdown.sh

    echo -e "\n###### ${NPM_GLOBAL} ######  "
    read -p "npm Global  Paketlerini Yüklemek İster misiniz ? e/h " npmGlobalResult
    if [[ $npmGlobalResult == "e" || $npmGlobalResult == "E" ]]; then
        echo -e "Npm Global Yüklenmeye başlandı ..."

        # Geriye Say
        ./bashscript_countdown.sh

        npm list  
        npm list -g 
        npm root 
        npm root -g

        # https://www.npmjs.com/
        npm i body-parser compression cors csurf cookie-parser ejs  express express-rate-limit helmet mongodb morgan mongoose swagger-jsdoc swagger-ui-express  winston -g
    else
        echo -e "Npm Global Save Yüklenmeye Başlanmadı ...."
    fi
}
npm_global_save

#####################################################################################################
#####################################################################################################
# Typescript (Install)
typescript_install() {
    # Geriye Say
    ./bashscript_countdown.sh

    echo -e "\n###### ${TYPESCRIPT} ######  "
    read -p "TypeScript Yüklemek İster misiniz ? e/h " typescriptResult
    if [[ $typescriptResult == "e" || $typescriptResult == "E" ]]; then
        echo -e "typescript Yüklenmeye başlandı ..."

        # Geriye Say
        ./bashscript_countdown.sh

        npm install typescript -g          # global
        npm install typescript --save-dev  # local
        tsc --init --locale tr
        #tsc --init
        ls -al
        mkdir src
        cd src
        cat >> index.js
        #cat >> index.js -q
        exit

    else
        echo -e "Typescript Yüklenmeye Başlanmadı ...."
    fi
}
typescript_install


#####################################################################################################
#####################################################################################################
# Update (Install)
npm_update() {
    # Geriye Say
    ./bashscript_countdown.sh

    echo -e "\n###### ${NPM_UPDATE} ######  "
    read -p "npm Global  Paketlerini Yüklemek İster misiniz ? e/h " npmUpdateResult
    if [[ $npmUpdateResult == "e" || $npmUpdateResult == "E" ]]; then
        echo -e "Npm Global Yüklenmeye başlandı ..."

        # Geriye Say
        ./bashscript_countdown.sh
        npm outdated
        npm install
        npm update
    else
        echo -e "Npm Global Save Yüklenmeye Başlanmadı ...."
    fi
}
npm_update


#####################################################################################################
#####################################################################################################
# Npm Compiler (Install)
npm_compiler() {
    # Geriye Say
    ./bashscript_countdown.sh

    echo -e "\n###### ${NPM_COMPILER} ######  "
    read -p "npm Compiler Paketlerini Yüklemek İster misiniz ? e/h " npmCompilerResult
    if [[ $npmCompilerResult == "e" || $npmCompilerResult == "E" ]]; then
        echo -e "Npm Compiler Yüklenmeye başlandı ..."

        # Geriye Say
        ./bashscript_countdown.sh
        npm rebuild             # Tüm bağımlıkları yeniden derleme
    else
        echo -e "Npm Global Save Yüklenmeye Başlanmadı ...."
    fi
}
npm_compiler



#####################################################################################################
#####################################################################################################
# Git (Install)
git_push() {
    # Geriye Say
    ./bashscript_countdown.sh

    echo -e "\n###### ${GIT} ######  "
    read -p "Git Yüklemek İster misiniz ? e/h " gitResult
    if [[ $gitResult == "e" || $gitResult == "E" ]]; then
        echo -e "Git Yüklenmeye başlandı ..."

        # Geriye Say
        ./bashscript_countdown.sh
        git add .
        git commit -m "commit mesajı"
        git push
    else
        echo -e "Git Push Yüklenmeye Başlanmadı ...."
    fi
}
npm_compiler



