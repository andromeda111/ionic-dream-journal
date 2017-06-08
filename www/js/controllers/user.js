angular.module('app.user', [])

.controller('userCtrl', ['$scope', '$stateParams', '$http', '$state', '$ionicUser',
  function ($scope, $stateParams, $http, $state, $ionicUser) {
    const user = $ionicUser.details.username
    const apiUrl = 'https://dream-frog.herokuapp.com'
    $scope.userName = user
    $scope.userDreamsAll = []

    getUserDreams()

    function getUserDreams () {
      $http.get(apiUrl).then(result => {
        let dreamArrTemp = []
        result.data.forEach(el => {
          if (el['user_username'] === $ionicUser.details.username) {
            dreamArrTemp.push(el)
          }
        })
        $scope.userDreamsAll = dreamArrTemp
        setupChart($scope.userDreamsAll)

        $scope.totalDreams = $scope.userDreamsAll.length
      })
    }

    function setupChart (dreamData) {
      console.log(dreamData);
      let numAfraid = 0;
      let numAngry = 0;
      let numAnxious = 0;
      let numAroused = 0;
      let numConfused = 0;
      let numFrustrated = 0;
      let numHappy = 0;
      let numIndifferent = 0;
      let numSad = 0;
      let numSilly = 0;
      $scope.lucidityCount = 0;
      $scope.avgLucidity = 0;
      $scope.numNightmare = 0;
      $scope.numRecurring = 0;

      dreamData.forEach(obj => {
        switch (obj['emotion']) {
          case 'afraid':
            numAfraid++
            break;
          case 'angry':
            numAngry++
            break;
          case 'anxious':
            numAnxious++
            break;
          case 'aroused':
            numAroused++
            break;
          case 'confused':
            numConfused++
            break;
          case 'frustrated':
            numFrustrated++
            break;
          case 'happy':
            numHappy++
            break;
          case 'indifferent':
            numIndifferent++
            break;
          case 'sad':
            numSad++
            break;
          case 'silly':
            numSilly++
            break;
          default:
            break;
        }

      $scope.lucidityCount += obj['lucidity']
      if (obj['nightmare']) {
        $scope.numNightmare++
      }
      if (obj['recurring']) {
        $scope.numRecurring++
      }
      })
      $scope.avgLucidity = ($scope.lucidityCount / dreamData.length) * 10
      $scope.avgNightmares = ($scope.numNightmare / dreamData.length) * 100
      $scope.avgRecurring = ($scope.numRecurring / dreamData.length) * 100

      $scope.chartObject = {};

      $scope.chartObject.type = "PieChart";

      $scope.chartObject.data = {
          "cols": [
              { id: "t", label: "Emotions", type: "string" },
              { id: "s", label: "Occurence", type: "number" }
          ], "rows": [
              {
                  c: [
                     { v: "Afraid" },
                     { v: numAfraid },
                  ]
              },
              {
                  c: [
                     { v: "Angry" },
                     { v: numAngry }
                  ]
              },
              {
                  c: [
                     { v: "Anxious" },
                     { v: numAnxious },
                  ]
              },
              {
                  c: [
                     { v: "Aroused" },
                     { v: numAroused },
                  ]
              },
              {
                  c: [
                     { v: "Confused" },
                     { v: numConfused },
                  ]
              },
              {
                  c: [
                     { v: "Frustrated" },
                     { v: numFrustrated },
                  ]
              },
              {
                  c: [
                     { v: "Happy" },
                     { v: numHappy }
                  ]
              },
              {
                  c: [
                     { v: "Indifferent" },
                     { v: numIndifferent },
                  ]
              },
              {
                  c: [
                     { v: "Sad" },
                     { v: numSad },
                  ]
              },
              {
                  c: [
                     { v: "Silly" },
                     { v: numSilly },
                  ]
              }
          ]
      };

  $scope.chartObject.options = {
      'legend':'bottom',
      'backgroundColor': 'none',
      'title':'Dream Emotions',
      'is3D':true,
      'chartArea': {width:"100%",height:"80%"},
      'sliceVisibilityThreshold': 0.1,
      'width':350,
      'height':300,
      'legendTextStyle': {color: '#FFF'},
      'titleTextStyle': {color: '#FFF'},
      'colors': ['#182033', '#273453', '#34466F', '#41578B', '#4E69A6', '#667FB7', '#8296C4', '#9EADD1', '#BAC5DE', '#D5DCEB']
  };
}



//     $scope.all = []
//     getStats()
//
//     function getStats () {
//       $http.get(`${apiUrl}/${user}/`).then(result => {
//         $scope.all = result.data
//         $scope.all.nightmareCounter = 0
//         $scope.all.recurringCounter = 0
//
//         $scope.all.emotionCounter = {confused: 5, excited: 0 }
//         // console.log($scope.all.emotionCounter.confused)
// // consider turning the counter into a map, ++ to each item in the array
//         $scope.all.forEach(dream => {
//           dream.nightmare ? $scope.all.nightmareCounter++ : $scope.all.nightmareCounter
//           dream.recurring ? $scope.all.recurringCounter++ : $scope.all.recurringCounter
//           // dream.emotion ? $scope.all.emotionCounter.confused ++ : $scope.all.emotionCounter.confused
//         })
//       })
//     }
  }
])

// afraid, angry, anxious, aroused, confused, frustrated, happy, indifferent, sad, silly
