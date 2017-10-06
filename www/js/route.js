app.config(function ($stateProvider, $urlRouterProvider) {  
    $stateProvider
    
    .state('blank', {
        url: '/blank',
        templateUrl: 'component/blank/blank.html',
    })

    .state('form', {
        url: '/form',
        templateUrl: 'component/form/form.html',
        controller: 'FormCtrl'
    }) 

    .state('quiz', {
        url: '/quiz',
        params: {
          type: null,
        },
        templateUrl: 'component/quiz/quiz.html',
        controller: 'QuizCtrl',
        resolve: {
            data: function(Service){
              return Service.GetList('quiz/quiz.json').then(function(resp){

                  var result;

                  result = resp.data.main;
                  
                  return(result);
              });
                  
            },
            localdata: function(Localstorage){
              return Localstorage.findData().then(function(resp){

                var res = resp[1];

                return(res);
            
              });
            }
        }
    })

    .state('quizmain', {
        url: '/quizmain',
        templateUrl: 'component/quiz/main/main.html',
        controller: 'QuizMainCtrl'
    })

    .state('dashboard', {
        url: '/dashboard',
        params:{
          status: null
        },
        templateUrl: 'component/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        resolve: {
            localdata: function(Localstorage){
              return Localstorage.findData().then(function(resp){

                var res = resp[1];

                return(res);
            
              });
            }
        }
    })

    .state('contact', {
        url: '/contact',
        templateUrl: 'component/contact/contact.html',
        controller: 'ContactCtrl',
        resolve: {
            data: function(Service){
              return Service.GetList('contact/contact.json').then(function(resp){

                  var result;

                  result = resp.data.main;
                  
                  return(result);
              });
                  
            }
        }
    })

    .state('content', {
        url: '/content',
        templateUrl: 'component/technique/list.html',
        controller: 'ContentCtrl',
        resolve: {
            data: function(Service){
              return Service.GetList('content/main.json').then(function(resp){

                  var result;

                  result = resp.data.main;
                  
                  return(result);
              });
                  
            }
        }
    }) 

    .state('detail', {
        url: '/detail',
        params:{
          url:null
        },
        templateUrl: 'component/technique/detail/detail.html',
        controller: 'DetailCtrl',
        resolve: {
            data: function(Service, $stateParams){
              return Service.GetList($stateParams.url).then(function(resp){

                  var result;

                  result = resp.data.main;
                  
                  return(result);
              });
                  
            }
        }
    }) 

    .state('video', {
        url: '/video',
        params:{
          url:null
        },
        templateUrl: 'component/technique/detail/video/video.html',
        controller: 'VideoCtrl',
        resolve: {
            data: function(Service, $stateParams){
              return Service.GetList($stateParams.url).then(function(resp){

                  var result;

                  result = resp.data.main;
                  
                  return(result);
              });
                  
            }
        }
    }) 

    .state('image', {
        url: '/image',
        params:{
          url:null
        },
        templateUrl: 'component/technique/detail/image/image.html',
        controller: 'ImageCtrl',
        resolve: {
            data: function(Service, $stateParams){
              return Service.GetList($stateParams.url).then(function(resp){

                  var result;

                  result = resp.data.main;
                  
                  return(result);
              });
                  
            }
        }
    })     

  
  $urlRouterProvider.otherwise('/blank');
});