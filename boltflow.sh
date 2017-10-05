#!/usr/bin/env bash

PUBLICFOLDER="public"

echo "⇒ Boltflow 🚀 - version 0.5.3"

# Store the script working directory
PWD="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Store bolt's install directory
WD="$PWD/www"

if [[ $1 = "update" ]] ; then
    COMPOSERCOMMAND="update"
else
    COMPOSERCOMMAND="install"
fi

cd $WD

if [[ ! -f "$WD/composer.json" ]] ; then
    mv $WD/composer.json.dist $WD/composer.json
fi

if [[ ! -f "$WD/composer.json" ]] ; then
    mv $WD/composer.json.dist $WD/composer.json
fi

mkdir -p app/database app/cache extensions/ $PUBLICFOLDER/files/ $PUBLICFOLDER/thumbs/ $PUBLICFOLDER/extensions/
chmod -Rf 777 app/database/ app/cache/ app/config/ extensions/
chmod -Rf 777 $PUBLICFOLDER/files/ $PUBLICFOLDER/theme/ $PUBLICFOLDER/thumbs/ $PUBLICFOLDER/extensions/

if [[ ! -f "$WD/composer.phar" ]] ; then
    curl -sS https://getcomposer.org/installer | php
fi

if [[ $1 = "update" ]] ; then
    php composer.phar selfupdate
fi

php composer.phar $COMPOSERCOMMAND --no-dev

if [[ -f "$WD/extensions/composer.json" ]] ; then
    cd extensions
    php ../composer.phar $COMPOSERCOMMAND --no-dev
    cd ..
fi

php app/nut cache:clear

cd $PWD

echo ""
echo "Done! 👍"
