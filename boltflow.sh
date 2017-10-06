#!/usr/bin/env bash

echo "⇒ Boltflow 🚀 - version 0.5.3"

# Store bolt's install directory
WD="./www"

if [[ $1 = "update" ]] ; then
    COMPOSERCOMMAND="update"
else
    COMPOSERCOMMAND="install"
fi

if [[ ! -f "composer.phar" ]] ; then
    curl -sS https://getcomposer.org/installer | php
fi

if [[ ! -f "$WD/composer.lock" ]] ; then
    composer create-project bolt/composer-install:^3.3 www --prefer-dist --no-interaction
else

    if [[ $1 = "update" ]] ; then
        php composer.phar selfupdate
    fi

    php composer.phar $COMPOSERCOMMAND --no-dev -d $WD

    if [[ -f "$WD/extensions/composer.json" ]] ; then
        php composer.phar $COMPOSERCOMMAND --no-dev -d $WD/extensions
    fi

    php $WD/app/nut cache:clear

fi

echo ""
echo "Done! 👍"
