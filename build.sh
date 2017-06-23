OUTPATH=/Applications/MAMP/htdocs/ottoui
rm -Rf ${OUTPATH}
ng build --target=development --output-path=${OUTPATH} --base-href /ottoui/

