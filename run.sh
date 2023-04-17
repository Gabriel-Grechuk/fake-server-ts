#!/bin/sh

command -v deno >/dev/null 2>&1 || { printf "[ \033[31mERROR\033[0m ] You need \033[96mdeno\033[0m to run this project.\n"; exit 1; }

deno run --allow-env --allow-read src/main.ts $*
