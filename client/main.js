Router.configure({
    layoutTemplate: 'main'
});
Router.route('/', {
    name: 'home',
    template: 'home'
});
Router.route('/register');
Router.route('/login');
Router.route('/profile',{
	name:'profile',
	template: 'profile'
});
Router.route('/update_profile',{
	name:'update_profile',
	template: 'update_profile'
});

Template.profile.helpers({
	'username': function(){
		return Meteor.user().username;
	},
	'email': function(){
		console.log(Meteor.user());
		return Meteor.user().emails[0].address;
	},
	'status': function(){
		return Meteor.user().profile.status;
	}
});
Template.update_profile.helpers({
	'username': function(){
		return Meteor.user().username;
	},
	'email': function(){
		console.log(Meteor.user());
		return Meteor.user().emails[0].address;
	},
	'status': function(){
		return Meteor.user().profile.status;
	}
});

Template.navigation.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

Template.update_profile.events({
	'keyup [id=name]': function(event){
	    if(event.which == 13 || event.which == 27){
	        $(event.target).blur();
	    } else {
	        var todoItem = $(event.target).val();
	        var _id= Meteor.users.findOne({username:Meteor.user().username})._id;
	        
	        Meteor.call('changeName',_id,todoItem);
	    }
	},
	'keyup [id=email]': function(event){
	    if(event.which == 13 || event.which == 27){
	        $(event.target).blur();
	    } else {
	        var todoItem = $(event.target).val();
	        var _id= Meteor.users.findOne({username:Meteor.user().username})._id;
	        
	        Meteor.call('changeEmail',_id,todoItem);
	    }
	},
	'keyup [id=status]': function(event){
	    if(event.which == 13 || event.which == 27){
	        $(event.target).blur();
	    } else {
	        var documentId = this._id;
	        var todoItem = $(event.target).val();
	        var _id= Meteor.users.findOne({username:Meteor.user().username})._id;
	        
	        Meteor.call('changestatus',_id,todoItem);
	    }
	}
})

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var username = $('[name=username]').val();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        var status = $('[name=status]').val();
        var user = {username:username,'email':email,password:password,profile:{status:status}};
        Accounts.createUser(user, function(error){
		    if(error){
		        console.log(error.reason); // Output error if registration fails
		    } else {
		        Router.go("update_profile"); // Redirect user if registration succeeds
		    }
		});
    }
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
		    if(error){
		        console.log(error.reason);
		    } else {
		        Router.go("update_profile");
		    }
		});
    }
});