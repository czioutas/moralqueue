read -r -p "Please enter the number of requests : " c

DATE=`date +%Y-%m-%d:%H:%M:%S`
SECONDS=0
echo '=== Starting POST requests ===' $DATE
COUNTER=0
while [  $COUNTER -lt $c ]; do  
  response=$(echo curl --silent --write-out %{http_code} $headers --silent --output /dev/null 127.0.0.1:8000/first | bash)
  echo $response

  let COUNTER=COUNTER+1
done

echo '=== End POST reuqests ========' `date +%Y-%m-%d:%H:%M:%S`
echo '===' $SECONDS '================='

exit 1
