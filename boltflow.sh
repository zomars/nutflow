#!/usr/bin/env bash

echo "⇒ Boltflow 🚀 - version 0.5.3"

# Store bolt's install directory
WD="./www"
PUBLICFOLDER="$WD/public"

if [[ $1 = "update" ]] ; then
    COMPOSERCOMMAND="update"
else
    COMPOSERCOMMAND="install"
fi

mkdir -p $WD/app/database $WD/app/cache  $WD/app/config $WD/extensions/ $PUBLICFOLDER/files/ $PUBLICFOLDER/theme/ $PUBLICFOLDER/thumbs/ $PUBLICFOLDER/extensions/
chmod -Rf 777 $WD/app/database/ $WD/app/cache/ $WD/app/config/ $WD/extensions/
chmod -Rf 777 $PUBLICFOLDER/files/ $PUBLICFOLDER/theme/ $PUBLICFOLDER/thumbs/ $PUBLICFOLDER/extensions/

if [[ ! -f "$WD/composer.phar" ]] ; then
    cd $WD
    curl -sS https://getcomposer.org/installer | php
    cd ..
fi

if [[ $1 = "update" ]] ; then
    php $WD/composer.phar selfupdate
fi

php $WD/composer.phar $COMPOSERCOMMAND --no-dev -d $WD

if [[ -f "$WD/extensions/composer.json" ]] ; then
    php $WD/composer.phar $COMPOSERCOMMAND --no-dev -d $WD/extensions
fi

php $WD/app/nut cache:clear

echo ""
echo "Done! 👍"
