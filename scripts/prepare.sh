#files_to_remove=('.DS_Store')

# Temporarily disable as they are being accounted for by the script
# Remove files which are not necessary
# for f in "${files_to_remove[@]}"; do
#   if test -f "$f"; then
#     echo "$f exists, removing"
#     rm -rf "$f"
#   fi
# done

# Check if ts-node is installed
if ! command -v ts-node >/dev/null; then
  echo "ts-node is not installed. Any changes to file structure of documentation files will not be handled."
  exit 0 # exit with 0 to continue anyway
fi

ts-node --esm scripts/generateRoutes.ts
