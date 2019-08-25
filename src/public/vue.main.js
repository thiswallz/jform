var app = new Vue({
  el: '#app',
  data: {
    rootFolder: '/Users/mauriciobarria/Documents/MGIT/my-dream-app',
    folderSelected: ''
  },
  methods: {
    generate: function() {
      axios
        .get('/file/generate', {
          params: {
            folder: this.folderSelected
          }
        })
        .then(res => {
          console.log('response', res);
        });
    },
    search: function() {
      //alert(this.rootFolder);
      axios
        .get('/file/root', {
          params: {
            folder: this.rootFolder
          }
        })
        .then(res => {
          if (res.status == 200) {
            const children = res.data;
            console.log('children:: ', children);
            $('#tree-container').empty();
            $('#tree-container').append(
              '<div id="tree" style="width: 100%;"></div>'
            );
            $('#tree').fancytree({
              extensions: ['contextMenu'],
              source: children,
              contextMenu: {
                menu: {
                  edit: {name: 'Edit', icon: 'edit'}
                },
                actions: (node, action, options) => {
                  console.log('edit....', node, action);
                  $('#selected-action').text(
                    'Selected action "' + action + '" on node ' + node
                  );
                }
              },
              activate: (event, data) => {
                this.folderSelected = '';
                // Display list of selected nodes
                if (data.node.folder === true) {
                  this.folderSelected = data.node.data.path;
                }
                console.log(data.node.folder);
                //$("#echoSelection1").text(s);
              }
            });
          }
          console.log(res);
        });
    }
  }
});
