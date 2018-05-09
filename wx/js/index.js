;(function (window, undefined) {
  var treeView = tools.$('#treeView');
  var fileData = data.files;

  // 初始化
  treeView.innerHTML = treeHtml(fileData, 0);

  // 事件
  var fileItem = tools.$('.treeNode');
  // var root_icon = tools.$('.icon-control', fileItem[0])[0];
  // root_icon.className = 'icon icon-control icon-add';

  //给每一层列表添加状态
  tools.each(fileItem, function (item) {
    filesHandle(item);
  });

  //遍历字符串
  function treeHtml(fileData, fileId) {
    var _html = '';

    var children = getChildById(fileData, fileId);
    // console.log(children)
    var hideChild = fileId > 0 ? 'none' : '';
    _html += '<ul class="'+hideChild+'">';
    children.forEach(function (item, index) {
      var level = getLevelById(fileData, item.id);
      var distance = (level - 1) * 20 + 'px';
      var hasChild = hasChilds(fileData, item.id);
      var className = hasChild ? '' : 'treeNode-empty';
      var treeRoot_cls = fileId === 0 ? 'hone' : '';
      var ones = fileId === 0?'tblock':'tnone';
      _html += `
        <li>
          <div class="treeNode ${className} ${treeRoot_cls}" style="padding-left: ${distance}" data-file-id="${item.id}">
            <i class="icon icon-control icon-add"></i>
            <span class="sanj ${ones}"></span>
            <a class="title" href="${item.href}">${item.title}</a>
          </div>
          ${treeHtml(fileData, item.id)}
        </li>`;
    });

    _html += '</ul>';

    return _html;
  };
  //设置选中状态已经title属性跳转不跳转、列表的展开闭合
  function filesHandle(item) {
    if(!$(item).next().children('li').length==0){
        $(item).children('.title').removeAttr('href');
    }else{
        $(item).children('.title').css('color','#8BBEEC')
    }
    tools.addEvent(item, 'click', function () {
      $('.treeNode-cur').removeClass('treeNode-cur');
      if(!$(this).hasClass('treeNode-cur')){
        $(this).addClass('treeNode-cur');
      }
      var treeNode_cur = tools.$('.treeNode-cur')[0];
      var fileId = item.dataset.fileId;
      var curElem = document.querySelector('.treeNode[data-file-id="'+fileId+'"]');
      var hasChild = hasChilds(fileData, fileId);
      var icon_control = tools.$('.icon-control', item)[0];
      var openStatus = true;

      if (hasChild) {
        openStatus = tools.toggleClass(item.nextElementSibling, 'none');
        if (openStatus) {
          icon_control.className = 'icon icon-control icon-add';
        } else {
          icon_control.className = 'icon icon-control icon-minus';
        }
      }
    });
  };
})(window);
