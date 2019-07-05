(function () {
    "use strict"

    angular.module('phonedirectory', [])
        .controller('phonedirectoryctr', ['$http', phoneDirectory])

    function phoneDirectory($http) {
        var pd = this
        pd.title = "Phone Directory"
        pd.phoneDetails = []
        pd.GetPhoneDetails = getPhoneDetails
        pd.AddPhoneDetails = addPhoneDetails
        pd.EditPhoneDetails = editPhoneDetails
        pd.UpdatePhoneDetails = updatePhoneDetails
        pd.DeletePhoneDetails = deletePhoneDetails
        getPhoneDetails()

        function getPhoneDetails() {
            $http.get('/getPhoneDetails').then(
                function (res) {
                    pd.phoneDetails = res.data
                },
                function (err) {
                    console.log(err)
                }
            )
        }

        function addPhoneDetails() {
            $http.post('/addPhoneDetails', pd.phonedirectory).then(
                function (res) {
                    getPhoneDetails()
                    pd.phonedirectory = ''
                },
                function (err) {
                    console.log(err)
                }
            )
        }

        function editPhoneDetails(id) {
            $http.get('/editPhoneDetails/' + id).then(
                function (res) {
                    pd.phonedirectory = res.data
                    getPhoneDetails()
                },
                function (err) {
                    console.log(err)
                }
            )
        }

        function updatePhoneDetails(id) {
            $http.put('/updatePhoneDetails/' + id, pd.phonedirectory).then(
                function (res) {
                    getPhoneDetails()
                    pd.phonedirectory = ''
                },
                function (err) {
                    console.log(err)
                }
            )
        }

        function deletePhoneDetails(id) {
            $http.delete('/deletePhoneDetails/' + id).then(
                function (res) {
                    getPhoneDetails()
                },
                function (err) {
                    console.log(err)
                }
            )
        }
    }
})()