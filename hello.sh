get_today(){
	today=`date '+%Y%m%d'`
	echo $today
}

make_major_tag(){
	day=$(get_today)
	tag="v.${day}.0"
	echo $tag
}

tags=$(git tag)

make_major_tag
