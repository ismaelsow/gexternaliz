var homeApp = new Vue({
  el: '#homeApp',
  data: {
    emailIsValid: false
  },

  mounted: function() {
    var inputWidth = parseInt(jQuery(".request-early-access-confirmation").css("width")) - 1
    jQuery(".request-early-access-email").css("width", inputWidth + "px");
  },

  methods: {
    validateEmail: function() {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var email = jQuery(".request-early-access-email").val();

      if (email.trim().length === 0 || !re.test(String(email).toLowerCase())) {
        comingSoonApp.emailIsValid = false;
      }
      else {
        comingSoonApp.emailIsValid = true;
      }
    },

    processEarlyAccessRequest: function(event) {
      event.preventDefault();
      event.stopPropagation();

      jQuery(".request-early-access-confirmation").addClass("loading").addClass("disabled");
      axios.post("/process-early-access-request", {
        email: jQuery(".request-early-access-email").val()
      }).then(function(response){
        if (response.status == 200 || response.status == 204){
          jQuery(".request-form").transition("fly left");
          jQuery(".request-ok").transition("fly left");
        }
        else {
          jQuery(".request-form").transition("fly left");
          jQuery(".request-ko").transition("fly left");
        }
      }).catch(function (error) {
        if (error){
          jQuery(".request-form").transition("fly left");
          jQuery(".request-ko").transition("fly left");
        }
      });
    }
  }
});
