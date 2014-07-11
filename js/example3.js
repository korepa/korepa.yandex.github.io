(function($){
    $(function() {
        var container = $('#example3');

        // Автодополнение населённых пунктов
        container.find( '[name="location"]' ).kladr({
            token: '51dfe5d42fb2b43e3300006e',
            key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
            type: $.kladr.type.city,
            parentType: $.kladr.type.region,
            parentId: '5000000000000',
            select: function( obj ) {
                // Изменения родительского объекта для автодополнения улиц
                container.find( '[name="street"]' ).kladr('parentId', obj.id);
                // фокус на элемент "улица"
                //container.find( '[name="street"]')[0].focus();
            }
        });

        container.find( '[name="location2"]' ).kladr({
            token: '51dfe5d42fb2b43e3300006e',
            key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
            type: $.kladr.type.city,
            parentType: $.kladr.type.region,
            parentId: '5000000000000',
            select: function( obj ) {
                // Изменения родительского объекта для автодополнения улиц
                container.find( '[name="street2"]' ).kladr('parentId', obj.id);
            }
        });
        container.find( '[name="location3"]' ).kladr({
            token: '51dfe5d42fb2b43e3300006e',
            key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
            type: $.kladr.type.city,
            parentType: $.kladr.type.region,
            parentId: '5000000000000',
            select: function( obj ) {
                // Изменения родительского объекта для автодополнения улиц
                container.find( '[name="street3"]' ).kladr('parentId', obj.id);
            }
        });

        // Автодополнение улиц
        container.find( '[name="street"]' ).kladr({
            token: '51dfe5d42fb2b43e3300006e',
            key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
            type: $.kladr.type.street,
            parentType: $.kladr.type.city
        });
        container.find( '[name="street2"]' ).kladr({
            token: '51dfe5d42fb2b43e3300006e',
            key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
            type: $.kladr.type.street,
            parentType: $.kladr.type.city
        });
        container.find( '[name="street3"]' ).kladr({
            token: '51dfe5d42fb2b43e3300006e',
            key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
            type: $.kladr.type.street,
            parentType: $.kladr.type.city
        });
    });
})(jQuery);