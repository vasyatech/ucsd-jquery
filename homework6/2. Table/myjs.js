(function($) {

    function buildRow(row) {
        var html = '<tr>';
        html += '<td></td>';
        html += '<td>' + row.code + '</td>';
        html += '<td>' + row.name + '</td>';
        html += '</tr>';
        return html;
    }

    function buildRows(rows) {
    var allRows = $.map(rows, buildRow);
    return allRows.join('');
    }
    
   
    function convert(data) {
        var obj = [];
        var i = 0;
        $.each(data, function(key, value) {
            var r = {
              code: key,
              name: value
            };
            obj.push(r);
        });
        return obj;
    }

    $.getJSON('countries.json', function(json) {
        $(document).ready(function() {
          var $countryTable = $('#country-table');
            //console.log(json);
          var rows = convert(json);
          //console.log(rows);  
          $countryTable.find('tbody').html(buildRows(rows));

          var $headers = $countryTable.find('thead th').slice(1);
          $headers
            .wrapInner('<a href="#"></a>')
            .addClass('sort');

          $headers.on('click', function(event) {
            event.preventDefault();
            var $header = $(this),
                sortKey = $header.data('sort').key,
                sortDirection = 1;
            //console.log(sortKey);
            if ($header.hasClass('sorted-asc')) {
              sortDirection = -1;
            }

            //console.log(rows);          
            rows.sort(function(a, b) {            
              var keyA = a[sortKey];
              var keyB = b[sortKey];

              if (keyA < keyB) return -sortDirection;
              if (keyA > keyB) return sortDirection;
              return 0;
            });

            $headers.removeClass('sorted-asc sorted-desc');
            $header.addClass(sortDirection == 1 ? 'sorted-asc' : 'sorted-desc');
            //console.log(rows);          
            $countryTable.children('tbody').html(buildRows(rows));
          });
        });
    });
    
})(jQuery);
