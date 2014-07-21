(function($){
    $(function() {
        var container = $('#main');

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
            parentId: '7700000000000',
            type: $.kladr.type.street,
            parentType: $.kladr.type.city,
            select: function( obj ) {
                // Изменения родительского объекта для автодополнения номера дома
                container.find( '[name="building"]' ).kladr( 'parentType', $.kladr.type.street );
                container.find( '[name="building"]' ).kladr( 'parentId', obj.id );
                // переведем фокус по таймауту
                setTimeout(function ()
                {
                    container.find( '[name="building"]')[0].value = '';
                    container.find( '[name="building"]').focus();
                }, 50);
            }
        });
        container.find( '[name="street2"]' ).kladr({
            token: '51dfe5d42fb2b43e3300006e',
            key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
            parentId: '7700000000000',
            type: $.kladr.type.street,
            parentType: $.kladr.type.city,
            select: function( obj ) {
                // Изменения родительского объекта для автодополнения номера дома
                container.find( '[name="building2"]' ).kladr( 'parentType', $.kladr.type.street );
                container.find( '[name="building2"]' ).kladr( 'parentId', obj.id );
                // переведем фокус по таймауту
                setTimeout(function ()
                {
                    container.find( '[name="building2"]')[0].value = '';
                    container.find( '[name="building2"]').focus();
                }, 50);
            }
        });
        container.find( '[name="street3"]' ).kladr({
            token: '51dfe5d42fb2b43e3300006e',
            key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
            parentId: '7700000000000',
            type: $.kladr.type.street,
            parentType: $.kladr.type.city,
            select: function( obj ) {
                // Изменения родительского объекта для автодополнения номера дома
                container.find( '[name="building3"]' ).kladr( 'parentType', $.kladr.type.street );
                container.find( '[name="building3"]' ).kladr( 'parentId', obj.id );
                // переведем фокус по таймауту
                setTimeout(function ()
                {
                    container.find( '[name="building3"]')[0].value = '';
                    container.find( '[name="building3"]').focus();
                }, 50);
            }
        });

        // Автодополнение номера дома
        container.find( '[name="building"]' ).kladr({
            token: '51dfe5d42fb2b43e3300006e',
            key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
            type: $.kladr.type.building,
            parentType: $.kladr.type.street,
            select: function( obj ) {
                // строим маршрут
                setTimeout(function ()
                {
                    makeRoute();
                }, 50);
            }
        });
        container.find( '[name="building2"]' ).kladr({
            token: '51dfe5d42fb2b43e3300006e',
            key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
            type: $.kladr.type.building,
            parentType: $.kladr.type.street,
            select: function( obj ) {
                // строим маршрут
                setTimeout(function ()
                {
                    makeRoute();
                }, 50);
            }
        });
        container.find( '[name="building3"]' ).kladr({
            token: '51dfe5d42fb2b43e3300006e',
            key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
            type: $.kladr.type.building,
            parentType: $.kladr.type.street,
            select: function( obj ) {
                // строим маршрут
                setTimeout(function ()
                {
                    makeRoute();
                }, 50);
            }
        });
    });
})(jQuery);