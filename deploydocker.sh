function push {
  docker tag pptxgen pricecomstock/pptxgen
  docker push pricecomstock/pptxgen:latest
}

function testcontainer {
  docker run -p 5002:80 pptxgen > /dev/null &
  echo "Do you still wish to deploy?"
  select yn in "Yes" "No"; do
      case $yn in
          Yes ) push; break;;
          No ) break;;
      esac
  done
}

docker build --no-cache --tag=pptxgen .
echo ""
echo "=============================="
echo ""
echo "Container built!"
echo "You can either launch a test container on port 5002, or throw caution to the wind and just push to DockerHub"
echo "Please choose next step:"
select next in "Test" "Push" "Nothing"; do
  case $next in
    Test ) testcontainer; break;;
    Push ) push; break;;
    Nothing ) break;;
  esac
done



