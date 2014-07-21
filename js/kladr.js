(function($){
    $(function() {
        var container = $('#main');

        // города
        var location = container.find( '[name="location"]' );
        var location2 = container.find( '[name="location2"]' );
        var location3 = container.find( '[name="location3"]' );

        // улицы
        var street = container.find( '[name="street"]' );
        var street2 = container.find( '[name="street2"]' );
        var street3 = container.find( '[name="street3"]' );

        // дома
        var building = container.find( '[name="building"]' );
        var building2 = container.find( '[name="building2"]' );
        var building3 = container.find( '[name="building3"]' );

        // Автодополнение населённых пунктов
        location.kladr({
            token: '51dfe5d42fb2b43e3300006e',
            key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
            type: $.kladr.type.city,
            parentType: $.kladr.type.region,
            parentId: '5000000000000',
            select: function( obj ) {
                // Изменения родительского объекта для автодополнения улиц
                street.kladr('parentId', obj.id);
            }
        });
        location2.kladr({
            token: '51dfe5d42fb2b43e3300006e',
            key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
            type: $.kladr.type.city,
            parentType: $.kladr.type.region,
            parentId: '5000000000000',
            select: function( obj ) {
                // Изменения родительского объекта для автодополнения улиц
                street2.kladr('parentId', obj.id);
            }
        });
        location3.kladr({
            token: '51dfe5d42fb2b43e3300006e',
            key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
            type: $.kladr.type.city,
            parentType: $.kladr.type.region,
            parentId: '5000000000000',
            select: function( obj ) {
                // Изменения родительского объекта для автодополнения улиц
                street3.kladr('parentId', obj.id);
            }
        });

        // Автодополнение улиц
        street.kladr({
            token: '51dfe5d42fb2b43e3300006e',
            key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
            parentId: '7700000000000',
            type: $.kladr.type.street,
            parentType: $.kladr.type.city,
            select: function( obj ) {
                // Изменения родительского объекта для автодополнения номера дома
                building.kladr( 'parentType', $.kladr.type.street );
                building.kladr( 'parentId', obj.id );
                // переведем фокус по таймауту
                setTimeout(function ()
                {
                    building[0].value = '';
                    building.focus();
                }, 50);
            }
        });
        street2.kladr({
            token: '51dfe5d42fb2b43e3300006e',
            key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
            parentId: '7700000000000',
            type: $.kladr.type.street,
            parentType: $.kladr.type.city,
            select: function( obj ) {
                // Изменения родительского объекта для автодополнения номера дома
                building2.kladr( 'parentType', $.kladr.type.street );
                building2.kladr( 'parentId', obj.id );
                // переведем фокус по таймауту
                setTimeout(function ()
                {
                    building2[0].value = '';
                    building2.focus();
                }, 50);
            }
        });
        street3.kladr({
            token: '51dfe5d42fb2b43e3300006e',
            key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
            parentId: '7700000000000',
            type: $.kladr.type.street,
            parentType: $.kladr.type.city,
            select: function( obj ) {
                // Изменения родительского объекта для автодополнения номера дома
                building3.kladr( 'parentType', $.kladr.type.street );
                building3.kladr( 'parentId', obj.id );
                // переведем фокус по таймауту
                setTimeout(function ()
                {
                    building3[0].value = '';
                    building3.focus();
                }, 50);
            }
        });

        // Автодополнение номера дома
        building.kladr({
            token: '51dfe5d42fb2b43e3300006e',
            key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
            type: $.kladr.type.building,
            parentType: $.kladr.type.street,
            select: function( obj ) { makeRouteTimeout(obj); }
        });
        building2.kladr({
            token: '51dfe5d42fb2b43e3300006e',
            key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
            type: $.kladr.type.building,
            parentType: $.kladr.type.street,
            select: function( obj ) { makeRouteTimeout(obj); }
        });
        building3.kladr({
            token: '51dfe5d42fb2b43e3300006e',
            key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
            type: $.kladr.type.building,
            parentType: $.kladr.type.street,
            select: function( obj ) { makeRouteTimeout(obj); }
        });
    });
})(jQuery);

function makeRouteTimeout(obj){
    // строим маршрут
    setTimeout(function ()
    {
        makeRoute();
    }, 50);
}