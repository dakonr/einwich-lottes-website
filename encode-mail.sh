#!/usr/bin/env bash

read -r -p "E-Mail-Adresse eingeben: " email

# User-Part (vor @) encodieren, Domain-Part (ab @) als Klartext behalten
user="${email%%@*}"
domain="${email#*@}"

if [ -z "$user" ] || [ "$user" = "$email" ]; then
  echo "Fehler: Keine gültige E-Mail-Adresse (fehlendes @)." >&2
  exit 1
fi

encoded=$(printf '%s' "$user" | od -An -t u1 | tr -s ' ' '\n' | grep -E '^[0-9]+$' | paste -sd, -)

echo
echo "Für data-c:"
echo "${encoded}@${domain}"
echo
echo "HTML-Beispiel:"
echo "<a href=\"#\" data-c=\"${encoded}@${domain}\">E-Mail anzeigen</a>"

# This function encodes the user part of an E-Mail Address to a correct data-c part which will be decoded from js/email.js
