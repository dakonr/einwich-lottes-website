#!/usr/bin/env bash

read -r -p "E-Mail-Adresse eingeben: " email
encoded=$(printf '%s' "$email" | od -An -t u1 | tr -s ' ' '\n' | grep -E '^[0-9]+$' | paste -sd, -)

echo
echo "Für data-c:"
echo "$encoded"
echo
echo "HTML-Beispiel:"
echo "<a data-c=\"$encoded\">E-Mail anzeigen</a>"

# This function encodes a E-Mail Address to a correct data-c part which will be decoded from js/email.js