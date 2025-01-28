
# Shebang (#!/): Betiğin Bash kabuğu ile çalışacağını gösterir.
# bin/bash: names
# İşletim sistemine Bash betiğinin çalışacağını söyler

#!/bin/bash

echo -e "\e[34m Kurulumlar\e[0m"

# User Variables
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
ls -al
code .

#####################################################################################################
#####################################################################################################
# Install
create_empty_files_if_not_exists() {
    # Geriye Say
    ./bashscript_countdown.sh    

    echo -e "\e[36m\n###### ${PACKAGE_JSON} ######  \e[0m"
    echo -e "\e[33m Paketleri Yüklemek İster misiniz ? e/h\e[0m"
    read -p "" packageResult
    if [[ $packageResult == "e" || $packageResult == "E" ]]; then
        echo -e "\e[32mpackage Yüklenmeye başlandı ...\e[0m"

        # Geriye Say
        ./bashscript_countdown.sh    
        # Parametre olarak gelen dosyalar üzerinde işlem yap
        for file in "$@"; do
            if [ ! -f "$file" ]; then
                echo "$file dosyası oluşturuluyor..."
                touch "$file"
                echo "$file başarıyla oluşturuldu."
            else
                echo "$file zaten mevcut, oluşturulmadı."
            fi
        done
    else
        echo -e "\e[31mpackage Yüklenmeye Başlanmadı ....\e[0m"
    fi
}

# Fonksiyon çağrısı
# Örnek olarak tüm dosyalar için çağrı
create_empty_files_if_not_exists Dockerfile docker-compose.yml .gitlab-ci.yml .gitignore

#####################################################################################################
#####################################################################################################
# Install
package_json() {
    # Geriye Say
    ./bashscript_countdown.sh

    echo -e "\e[36m\n###### ${PACKAGE_JSON} ######  \e[0m"
    echo -e "\e[33mPackage.json Yüklemek İster misiniz ? e/h\e[0m"
    read -p "" packageJsonResult
    if [[ $packageJsonResult == "e" || $packageJsonResult == "E" ]]; then
        echo -e "\e[32mpackage Json Yüklenmeye başlandı ...\e[0m"

        # Geriye Say
        ./bashscript_countdown.sh

        rm -rf node_modules
        npm init -y 
    else
        echo -e "\e[31mpackage Json Yüklenmeye Başlanmadı ....\e[0m"
    fi
}
package_json

#####################################################################################################
#####################################################################################################
# Local Save (Install)
npm_local_save() {
    # Geriye Say
    ./bashscript_countdown.sh

    echo -e "\e[36m\n###### ${NPM_SAVE} ######  \e[0m"
    echo -e "\e[33mNpm Paketlerini Yüklemek İster misiniz ? e/h\e[0m"
    read -p "" npmSaveResult
    if [[ $npmSaveResult == "e" || $npmSaveResult == "E" ]]; then
        echo -e "\e[32mNpm Save Yüklenmeye başlandı ...\e[0m"

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
        echo -e "\e[31mNpm Save Yüklenmeye Başlanmadı ....\e[0m"
    fi
}
npm_local_save

#####################################################################################################
#####################################################################################################
# Local Save Dev (Install)
npm_local_dev_sav() {
    # Geriye Say
    ./bashscript_countdown.sh

    echo -e "\e[36m\n###### ${NPM_SAVE_DEV} ######  \e[0m"
    echo -e "\e[33mnpm Save-Dev Paketlerini Yüklemek İster misiniz ? e/h\e[0m"
    read -p "" npmDevSaveResult
    if [[ $npmDevSaveResult == "e" || $npmDevSaveResult == "E" ]]; then
        echo -e "\e[32mNpm Dev-Save Yüklenmeye başlandı ...\e[0m"

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
        echo -e "\e[31mNpm Save-Dev Yüklenmeye Başlanmadı ....\e[0m"
    fi
}
npm_local_dev_sav

#####################################################################################################
#####################################################################################################
# Global Save (Install)
npm_global_save() {
    # Geriye Say
    ./bashscript_countdown.sh

    echo -e "\e[36m\n###### ${NPM_GLOBAL} ######  \e[0m"
    echo -e "\e[33mnpm Global  Paketlerini Yüklemek İster misiniz ? e/h\e[0m"
    read -p "" npmGlobalResult
    if [[ $npmGlobalResult == "e" || $npmGlobalResult == "E" ]]; then
        echo -e "\e[32mNpm Global Yüklenmeye başlandı ...\e[0m"

        # Geriye Say
        ./bashscript_countdown.sh

        npm list  
        npm list -g 
        npm root 
        npm root -g

        # https://www.npmjs.com/
        npm i body-parser compression cors csurf cookie-parser ejs  express express-rate-limit helmet mongodb morgan mongoose swagger-jsdoc swagger-ui-express  winston -g
    else
        echo -e "\e[31mNpm Global Save Yüklenmeye Başlanmadı ....\e[0m"
    fi
}
npm_global_save

#####################################################################################################
#####################################################################################################
# Typescript (Install)
typescript_install() {
    # Geriye Sayım
    ./bashscript_countdown.sh

    echo -e "\e[36m\n###### TypeScript Kurulumu ######\e[0m"
    echo -e "\e[33mTypeScript yüklemek ister misiniz? [e/h]\e[0m"
    read -p "" typescriptResult

    if [[ "$typescriptResult" == "e" || "$typescriptResult" == "E" ]]; then
        echo -e "\e[32mTypeScript yüklenmeye başlıyor...\e[0m"

        # Geriye Sayım
        ./bashscript_countdown.sh

        # TypeScript kurulumları
        npm install typescript -g          # Global kurulum
        npm install typescript --save-dev  # Local kurulum
        tsc --init --locale tr             # TypeScript ayar dosyası oluşturma
        ls -al                             # Dosya listesini görüntüle

        # src klasörü yoksa oluştur
        if [ ! -d "src" ]; then
            mkdir src
            echo "src klasörü oluşturuldu."
        else
            echo "src klasörü zaten mevcut."
        fi

        # src dizinine gir
        cd src || exit

        # index.js yoksa oluştur
        if [ ! -f "index.js" ]; then
            echo "index.js oluşturuluyor..."
            cat > index.js <<EOL
// This is the initial content of index.js
console.log('Hello, world!');
EOL
            echo "index.js oluşturuldu ve içerik eklendi."
        else
            echo "index.js zaten mevcut."
        fi

        echo -e "\e[32mTypeScript kurulumu tamamlandı!\e[0m"
    else
        echo -e "\e[31mTypeScript kurulumu iptal edildi.\e[0m"
    fi
}

# Fonksiyonu çalıştır
typescript_install


#####################################################################################################
#####################################################################################################
# Update (Install)
npm_update() {
    # Geriye Sayım
    ./bashscript_countdown.sh

    echo -e "\e[36m\n###### ${NPM_UPDATE} ######  \e[0m"
    echo -e "\e[33mnpm Global  Paketlerini Yüklemek İster misiniz ? e/h\e[0m"
    read -p "" npmUpdateResult
    if [[ $npmUpdateResult == "e" || $npmUpdateResult == "E" ]]; then
        echo -e "\e[32mNpm Global Yüklenmeye başlandı ...\e[0m"

        # Geriye Say
        ./bashscript_countdown.sh
        npm outdated
        npm install
        npm update
    else
        echo -e "\e[31mNpm Global Save Yüklenmeye Başlanmadı ....\e[0m"
    fi
}
npm_update

#####################################################################################################
#####################################################################################################
# Npm Compiler (Install)
npm_compiler() {
    # Geriye Say
    ./bashscript_countdown.sh

    echo -e "\e[36m\n###### ${NPM_COMPILER} ######  \e[0m"
    echo -e "\e[33mnpm Compiler Paketlerini Yüklemek İster misiniz ? e/h\e[0m"
    read -p "" npmCompilerResult
    if [[ $npmCompilerResult == "e" || $npmCompilerResult == "E" ]]; then
        echo -e "\e[32mNpm Compiler Yüklenmeye başlandı ...\e[0m"

        # Geriye Say
        ./bashscript_countdown.sh
        npm rebuild             # Tüm bağımlıkları yeniden derleme
    else
        echo -e "\e[31mNpm Global Save Yüklenmeye Başlanmadı ....\e[0m"
    fi
}
npm_compiler

#####################################################################################################
#####################################################################################################
# Git (Install)
git_push() {
    # Geriye Say
    ./bashscript_countdown.sh

    echo -e "\e[36m\n###### ${GIT} ######  \e[0m"
    echo -e "\e[33mGit Yüklemek İster misiniz ? e/h\e[0m"
    read -p "" gitResult
    if [[ $gitResult == "e" || $gitResult == "E" ]]; then
        echo -e "\e[32mGit Yüklenmeye başlandı ...\e[0m"

        # Geriye Say
        ./bashscript_countdown.sh
        git add .
        git commit -m "commit mesajı"
        git push
    else
        echo -e "\e[31mGit Push Yüklenmeye Başlanmadı ....\e[0m"
    fi
}
git_push
