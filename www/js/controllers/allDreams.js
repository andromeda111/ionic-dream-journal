angular.module('app.allDreams', [])

  .controller('allDreamsCtrl', ['$scope', '$stateParams', '$ionicUser', '$http', '$state',
    function ($scope, $stateParams, $ionicUser, $http, $state) {
      const apiUrl = 'https://dream-frog.herokuapp.com'
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
        })
      }

      $scope.deleteDream = function (dream) {
        const id = dream.id
        const username = dream['user_username']
        $http.delete(apiUrl + `/${username}/${id}`).then(() => {
          getUserDreams()
        })

        // $state.go('menu.allDreams')
      }

      $scope.editDream = function (dream) {
        const id = dream.id
        const username = dream['user_username']
        console.log("Dream with ID " + `${dream.id}` + " was deleted.")
        // $http.get(apiUrl + `/${username}` + `/${id}`)

        // $state.go('menu.editDream', {id: id})
      }
    }])
