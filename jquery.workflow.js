(function( $ ){
  var methods = {
    init : function( config ) {
      var $this = $(this);
      $this.data('workflow', {
        target : $this,
        workflow : workflow,
        config : config
      });
      $(document).on("change", ".workflow-opt", function () {        
        var level = 1 * $(this).attr("id").replace(/workflow-opt-/, '');
        console.log("changed level "+level+" to "+$(this).val());
        var elem = $("#workflow-data-" + level);
        elem.html(""); // clear any sub levels
        methods.display(elem, methods.getConfig($this, 1+level), 1+level);
      });
      methods.display(this, config, 0);
      return $this;
    },
    destroy : function( ) {
      var $this = $(this);
      $(window).unbind('.workflow');
      $this.data('workflow').workflow.remove();
      $this.removeData('workflow');
    },
    display : function (elem, config, level) {
      if (config.html) elem.append(config.html);
      if (config.options) {
        var options = '<select class="workflow-opt" '
          + 'id="workflow-opt-' + level + '">';
        var dflt = (typeof config.dflt == 'string') ? config.dflt : '';
        options += '<option>' + dflt + '</option>';
        for (item in config.options) {
          options += "<option value=\"" + item + "\">" 
            + config.options[item].option + "</option>";
        }
        options += "</select>";
        options += "<div id=\"workflow-data-" + level + "\"></div>";
        elem.append(options);
      }
    },
    getConfig : function (elem, level) {
      console.log("getConfig("+level+")");
      var curconfig = elem.data('workflow').config;
      var c = 0;
      while ( c < level ) {
        var opt = $("#workflow-opt-" + c++).val();
        console.log("opt = "+opt);
        curconfig = curconfig.options[opt];
      }
      console.log(JSON.stringify(curconfig));
      return curconfig;
    }
  };

  $.fn.workflow = function( method ) {
    if ( methods[method] ) {
      return methods[method].apply( this, 
        Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.workflow' );
    }
  };

})( jQuery );
