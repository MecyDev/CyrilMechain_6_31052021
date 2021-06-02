fetch("./js/json/FishEyeData.json")
  .then(JSON.parse(FishEyeData.json))
  .then((photograph) => {
    console.log(photograph);
  });
