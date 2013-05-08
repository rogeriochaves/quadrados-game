Quadrados = new Meteor.Collection("quadrados");

if (Meteor.isClient) {
  Template.hello.quadrado = function(){
    return Quadrados.findOne(Session.get("quadrado"));
  }

  Meteor.startup(function () {
    var quadrado = Quadrados.insert({x: 300, y: 120});
    Session.set("quadrado", quadrado);
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
