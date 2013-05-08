if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return Session.get('texto') || "Olá Mundo";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      Session.set('texto', 'Clicou!');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
