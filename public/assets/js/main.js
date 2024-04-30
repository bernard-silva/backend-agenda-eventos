const app = angular.module('agenda-eventos', [])
app.controller('AgendaController', ($scope, $http) => {
    $scope.titleh1 = 'Agenda de Eventos'
    $scope.saudacao = 'Ola Mundo'
    $scope.title = ''
    $scope.local = ''
    $scope.dateStart = ''
    $scope.eventList = ''
    $scope.showHide = false

    $scope.toggleShowHide = (showHide) => {
        console.log(showHide)
        return $scope.showHide = !$scope.showHide ? true : false;
    }

    $scope.cadastrar = () => {
        if (!$scope.title) {
            return alert('Digite um nome para o evento!')
        }
        $http.post('http://localhost:3333/api/events',
            { title: $scope.title, local: $scope.local, dateStart: $scope.dateStart })
            .then(() => {
                $scope.loadEventList()
            }, () => {
                alert('Ops, algum erro')
            })
    }
    $scope.deleteEvent = (id) => {
        $http.delete('http://localhost:3333/api/events/' + id).then(() => {
            $scope.loadEventList()
        })
    }

    $scope.updateEvent = (id) => {
        const event = $scope.eventList.find(event => event.id === id)

        $scope.toggleShowHide(true)

        $http.patch('http://localhost:3333/api/events/' + id,
            event
        ).then(() => {
            $scope.loadEventList()
        })
    }

    $scope.loadEventList = async () => {
        const { data } = await $http.get('http://localhost:3333/api/events')
        $scope.eventList = data
        $scope.$apply()
    }

    $scope.loadEventList()
})
