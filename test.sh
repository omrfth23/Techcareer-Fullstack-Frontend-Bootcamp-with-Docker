#!/bin/bash
# file_mvc (Install)
file_mvc() {
    # Geriye Sayım
    ./bashscript_countdown.sh

    echo -e "\n\e[36m\n###### MVC için dosya yapıları ######\e[0m"
    echo -e "\e[33mMVC için dosya yapıları yüklemek ister misiniz? [e/h]\e[0m"
    read -p "" mvc

    if [[ "$mvc" == "e" || "$mvc" == "E" ]]; then
        echo -e "\e[32mMVC için dosya yapıları...\e[0m"

        # Geriye Sayım
        ./bashscript_countdown.sh

        # pictures klasörü yoksa oluştur
        if [ ! -d "pictures" ]; then
            mkdir models
            echo "models klasörü oluşturuldu."
        else
            echo "models klasörü zaten mevcut."
        fi

        # models klasörü yoksa oluştur
        if [ ! -d "models" ]; then
            mkdir models
            echo "models klasörü oluşturuldu."
        else
            echo "models klasörü zaten mevcut."
        fi

        # public klasörü yoksa oluştur
        if [ ! -d "public" ]; then
            mkdir -p public/admin/js
            mkdir -p public/admin/css
            echo "public klasörü oluşturuldu."
        else
            echo "public klasörü zaten mevcut."
        fi

        # routes klasörü yoksa oluştur
        if [ ! -d "routes" ]; then
            mkdir routes
            echo "routes klasörü oluşturuldu."
        else
            echo "routes klasörü zaten mevcut."
        fi

        # views klasörü yoksa oluştur
        if [ ! -d "views" ]; then
            mkdir views
            echo "views klasörü oluşturuldu."
        else
            echo "views klasörü zaten mevcut."
        fi
    else
        echo -e "\e[31mNpm Save Yüklenmeye Başlanmadı ....\e[0m"
    fi        
}

# Fonksiyonu çalıştır
file_mvc