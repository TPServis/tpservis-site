var search_box;
var order_box;
var view_box;
var popupWin;
var search_request_active = false;
var ittour_order_id = '';
var default_serialize_module_form_search = '';

var jq = jQuery.noConflict();
function prepare_form() {
transparent_flash();
var options = jq('body').data('options');

if(document.getElementById('package_search_form') != null){
document.getElementById('package_search_form').reset();
}
if(document.getElementById('hike_search_form') != null){
document.getElementById('hike_search_form').reset();
}
if(jq.browser.opera) {
jq(window).resize(function() {
jq('.ellipsis').css('white-space', 'normal');
jq('.tour_search_result div:eq(0)').css('width', 'auto');
jq('.tour_search_result div:eq(0)').css('width', jq('.tour_search_result div:eq(0)').width());
jq('.ellipsis').css('white-space', 'nowrap');
});
}


jq(function() {
jq("#itt_date_from").datepicker({ dateFormat: 'dd.mm.y'
, minDate: '+1d'
, showAnim: ''
, onSelect: function(selectedDate) {
var selected_date_object = jq("#itt_date_from").datepicker('getDate');
// Надо запоминать старое значение, т.к. оно меняется при установке minDate и maxDate
var old_date_till = jq("#date_till").datepicker('getDate');
jq("#date_till").datepicker('option', 'minDate', selectedDate || '+1d');
var new_max_date = selected_date_object.getDate() + 11;
selected_date_object.setDate(new_max_date);
jq("#date_till").datepicker('option', 'maxDate', selected_date_object);
if(jq("#itt_date_from").datepicker('getDate') > old_date_till) {
jq("#date_till").datepicker('setDate', selected_date_object);
}
}
});
jq("#date_till").datepicker({ dateFormat: 'dd.mm.y'
, minDate: '+1d'
, maxDate: '+12d'
, showAnim: ''
});
jq("#hike_date_from").datepicker({dateFormat: 'dd.mm.y', minDate: '+1', showAnim: ''});
jq("#hike_date_till").datepicker({dateFormat: 'dd.mm.y', minDate: '+1', showAnim: ''});
jq("#ui-datepicker-div").css("display", "none");

jq('.itt_show_currency_popap').live('click', function(){
jq('.itt_currency_popap').show();
});

jq('.itt_currency_popap li').live('click', function(){
jq('.itt_currency_popap').hide();
jq('.itt_active_currency').removeClass('itt_active_currency');
jq(this).addClass('itt_active_currency');
jq('span[class^=itt_price_cur_list_]').hide();
jq('.itt_price_cur_list_'+jq(this).attr('show_cur')).show();
jq('.itt_currency_popap_currency').text(jq(this).text());
});

});

jq('#itt_hotel_rating_block input').click(function() {
var need_hotel_refresh = hotel_rating_handler(this);
if(jq('#hotel_list').length && need_hotel_refresh) hotel_refresh();
});
if(jq('#hotel_list').length) {
jq('#region_list').change(function(){
hotel_refresh();
});
}

region_name = (jq('#region_list').length)?'#region_list':'#region';

jq('div.ittour_order_grey_box_list_center a').live('click', show_hotel_more_info);

jq('#transport_type').change(function() {
if(jq('input[name="package_tour_type"]:checked').val() == '1') {
var hotel_rating_list = '';
jq('#itt_hotel_rating_block :checkbox:checked').each(function(index){
hotel_rating_list += jq(this).val()+' ';
});
if(typeof(options.modules_param_action) != 'undefined') {
var options_modules_param_action = options.modules_param_action;
} else {
var options_modules_param_action = options.modules_action;
}
jq.getJSON(options_modules_param_action, { 'action': 'get_package_search_filtered_field'
, 'event': 'select_transport'
, 'hotel_rating_id': hotel_rating_list
, 'transport_type_id': jq('#transport_type').val()
}
, function(data) {
if(typeof(data) != 'undefined') {
if(typeof(data.country) != 'undefined') jq('#itt_country').html(data.country);
if(typeof(data.region) != 'undefined') jq('#region_list').html(data.region);
if(typeof(data.hotel) != 'undefined') jq('#hotel_list').html(data.hotel);
if(typeof(data.departure_city) != 'undefined') jq('#departure_city').html(data.departure_city);
}
package_search_form_submit(true);
});
}
return false;
});

jq('#itt_country').change(function(){
var hotel_rating_list = '';
jq('#itt_hotel_rating_block :checkbox:checked').each(function(index){
hotel_rating_list += jq(this).val()+' ';
});
if(typeof(options.modules_param_action) != 'undefined') {
var options_modules_param_action = options.modules_param_action;
} else {
var options_modules_param_action = options.modules_action;
}
jq.getJSON(options_modules_param_action, { 'action': 'get_package_search_filtered_field'
, 'event_owner_level': 1
, 'event': 'select_country'
, 'country_id': jq('#itt_country').val()
, 'hotel_rating_id': hotel_rating_list
, 'tour_type': jq('#package_search_form :radio:checked').val()
// if user change params => set user param
, 'date_till': jq('#date_till').val()
, 'departure_city': jq('#departure_city').val()
}
, function(data) {
jq('#region_list').html(data.region);
jq('#hotel_list').html(data.hotel);
jq('#departure_city').html(data.departure_city);

// Set relation counrty <=> tour_type as in page http://www.ittour.com.ua/tour-search-all-ajax.html
  if(typeof(data.country_tour_type) != 'undefined' && jq.inArray(data.country_tour_type, ['1', '2']) != '-1') {
  // Unset old params
  jq('input[id^="package_tour_type_"]').prop('checked', false);
  // Set new params
  jq('#package_tour_type_' + data.country_tour_type).prop('checked', true);
  }

  if(typeof(data.period) != 'undefined') {
  var newDate = new Date();
  newDate.setDate(newDate.getDate() + data.period * 1);
  jq('#date_till').datepicker("setDate" , newDate);
  }

  package_search_form_submit(true);
  });
  return false;
  });

  jq('#hotel_list').change(function(){
  package_search_form_submit(true);
  return false;
  });

  jq('.food_list_input').click(function(){
  package_search_form_submit(true);
  });

  jq('#adult').change(function(){
  package_search_form_submit(true);
  });

  jq('#child1_age, #child2_age, #child3_age').change(function(){
  package_search_form_submit(true);
  });

  function itt_night_change(type, night_from, night_till) {
  var itt_night_to_default = [4, 6, 8, 10, 12, 14, 16, 18, 21];
  var from_to_defaults = [];
  from_to_defaults[1] = 3;
  from_to_defaults[3] = 5;
  from_to_defaults[4] = 6;
  from_to_defaults[6] = 8;
  from_to_defaults[7] = 8;
  from_to_defaults[8] = 10;
  from_to_defaults[10] = 12;
  from_to_defaults[12] = 14;
  from_to_defaults[14] = 16;

  var from_to = [];
  from_to[1] = [2, 3, 4];
  from_to[3] = [3, 4, 5, 6];
  from_to[4] = [4, 5, 6, 7];
  from_to[6] = [6, 7, 8, 9];
  from_to[7] = [7, 8, 9, 10, 11];
  from_to[8] = [8, 9, 10, 11, 12];
  from_to[10] = [10, 11, 12, 13, 14];
  from_to[12] = [12, 13, 14];
  from_to[14] = [15, 16, 21];

  var options = jq('body').data('options');

  if(type == 'from') {
  var new_night_till_list = from_to[night_from];
  var new_night_till_default = from_to_defaults[night_from];
  if(typeof(new_night_till_list) != 'undefined' && typeof(new_night_till_default) != 'undefined') {
  // Базовый список мержим с дополнительным, удаляем дубликаты, сортируем
  var tmp_night_till_list = itt_night_to_default.concat(new_night_till_list.filter(function(item) {
  return itt_night_to_default.indexOf(item) < 0;
    }));
    tmp_night_till_list.sort(function(a, b) {return a - b;});

    // Генерация списка
    var new_night_till_options='' ;
    jq.each(tmp_night_till_list, function(index, value) {
    new_night_till_options +='<option value="' + value + '">' + value + '</option>' ;
    });
    jq('#night_till').html(new_night_till_options);

    jq('#night_till option[value=' + new_night_till_default + ' ]').attr('selected', 'selected' );
    }
    } else if(type=='till' ) {
    // Ищем диапазоны, в которые входит новое значение ночи "до"
    var valid_from_to=[];
    var valid_from_to_count=0;
    var founded_from=0;
    jq.each(from_to, function(index, value) {
    if(night_till>= Math.min.apply(null, value) && night_till <= Math.max.apply(null, value)) {
      valid_from_to[index]=value;
      valid_from_to_count++;
      if(index==night_from) founded_from=night_from;
      }
      });

      // Обрабатываем диапазоны
      if(valid_from_to_count> 0) {
      var new_from = 0;
      var tmp_night_till_list = [];
      jq.each(valid_from_to, function(index, value) {
      if(typeof(value) == 'undefined' || (founded_from > 0 && founded_from != index)) {
      return true;
      }
      // Базовый список мержим с дополнительным, удаляем дубликаты, сортируем
      tmp_night_till_list = itt_night_to_default.concat(value.filter(function(item) {
      return itt_night_to_default.indexOf(item) < 0;
        }));
        if(new_from==0) new_from=index;
        });
        if(tmp_night_till_list.length> 0) {
        tmp_night_till_list.sort(function(a, b) {return a - b;});

        // Генерация списка
        var new_night_till_options = '';
        jq.each(tmp_night_till_list, function(index, value) {
        new_night_till_options += '<option value="' + value + '">' + value + '</option>';
        });
        jq('#night_till').html(new_night_till_options);

        jq('#night_till option[value=' + night_till + ']').attr('selected', 'selected');
        if(founded_from == 0) {
        jq('#night_from option[value=' + new_from + ']').attr('selected', 'selected');
        }
        };
        }
        }
        }

        jq('#night_from').change(function() {
        var night_from = parseInt(jq(this).val());
        var night_till = parseInt(jq('#night_till').val());
        itt_night_change('from', night_from, night_till);

        package_search_form_submit(true);
        });

        jq('#night_till').change(function() {
        var night_till = parseInt(jq(this).val());
        var night_from = parseInt(jq('#night_from').val());
        itt_night_change('till', night_from, night_till);

        package_search_form_submit(true);
        });

        jq('#price_from').change(function(){
        package_search_form_submit(true);
        });

        jq('#price_till').change(function(){
        package_search_form_submit(true);
        });

        jq('#itt_date_from').change(function(){
        package_search_form_submit(true);
        });

        jq('#date_till').change(function(){
        package_search_form_submit(true);
        });

        jq('#departure_city').change(function(){
        package_search_form_submit(true);
        });

        jq('#children').change(function(e, without_instantsearch){
        jq(':input.age_small[id^="child"]').attr('disabled', 'disabled').hide();
        var child_count = jq('#children').val();
        switch(child_count) {
        case '0':
        jq('div.child_age-select').hide();
        break;
        case '3':
        jq('#child3_age').removeAttr('disabled').show();
        case '2':
        jq('#child2_age').removeAttr('disabled').show();
        case '1':
        jq('#child1_age').removeAttr('disabled').show();
        jq('div.child_age-select').show();
        break;
        }
        if(without_instantsearch == undefined)
        package_search_form_submit(true);
        });

        jq('#switch_price').change(function() {
        // Если есть результаты поиска
        if(jq('div.package_search_result_table').length > 0) {
        var currency_code = jq('#switch_price').val().toLowerCase();
        if(currency_code != '') {
        var currency_code_list = ['usd', 'uah', 'eur'];
        for(var i = 0; i < currency_code_list.length; i++) {
          jq('.curr_' + currency_code_list[i]).hide();
          }
          jq('.curr_' + currency_code).show();
          }
          }
          });

          jq('#tour_not_found_price_link').live('click', function(){
          jq('#package_tour_type_0').attr('checked', 'checked' );
          jq('#price_from').val(1);
          jq('#price_till').val(900000);
          jq('#package_search_form .btn-search :button').click();
          });

          jq('#tour_not_found_night_link').live('click', function() {
          jq('#package_tour_type_0').attr('checked', 'checked' );
          jq('#night_from').val(6).trigger('change');
          jq('#package_search_form .btn-search :button').click();
          });

          jq('#tour_not_found_hotel_rating_link').live('click', function() {
          jq('#package_tour_type_0').attr('checked', 'checked' );
          jq('.hotel_rating[value="7" ]').attr('checked', false);
          jq('.hotel_rating[value="3" ]').attr('checked', false);
          jq('.hotel_rating[value="4" ]').attr('checked', true);
          jq('.hotel_rating[value="78" ]').attr('checked', true);
          if(jq('#hotel_list').length) hotel_refresh();
          jq('#package_search_form .btn-search :button').click();
          });

          jq('#tour_not_found_meal_link').live('click', function(){
          jq('#package_tour_type_0').attr('checked', 'checked' );

          jq('select[name=food] option').removeAttr('selected');
          jq('select[name=food] option:first').attr('selected', 'selected' );

          jq('.food_list_input[value="1956" ]').attr('checked', 'checked' );
          jq('.food_list_input[value="498" ]').attr('checked', 'checked' );
          jq('.food_list_input[value="388" ]').attr('checked', 'checked' );
          jq('.food_list_input[value="512" ]').attr('checked', 'checked' );
          jq('.food_list_input[value="496" ]').attr('checked', 'checked' );
          jq('.food_list_input[value="560" ]').attr('checked', 'checked' );
          jq('#package_search_form .btn-search :button').click();
          });

          jq('#tour_not_found_date_link').live('click', function() {
          jq('#package_tour_type_0').attr('checked', 'checked' );
          var newDateFrom=new Date();
          var newDateTill=new Date();
          newDateFrom.setDate(newDateFrom.getDate() + 1);
          newDateTill.setDate(newDateTill.getDate() + 12);
          jq("#itt_date_from").datepicker("setDate", newDateFrom);
          jq("#date_till").datepicker('option', 'minDate' , newDateFrom);
          jq("#date_till").datepicker('option', 'maxDate' , newDateTill);
          jq('#date_till').datepicker("setDate", newDateTill);
          jq('#package_search_form .btn-search :button').click();
          });

          jq('#hike_tour_not_found_price_link').live('click', function(){
          jq('#hike_tour_type_0').attr('checked', 'checked' );
          jq('#hike_price_till').val(2000);
          jq('#hike_search_form .btn-search :button').click();
          });

          jq('#hike_tour_not_found_date_link').live('click', function(){
          jq('#hike_tour_type_0').attr('checked', 'checked' );
          var newDate=new Date();
          newDate.setDate(newDate.getDate() + 90);
          jq('#hike_date_till').datepicker( "setDate" , newDate );
          jq('#hike_search_form .btn-search :button').click();
          });

          //автопоиск
          search_params=window.location.hash.toString();
          if(search_params=='' ) {
          search_params='#' + jq('#module_search_query').val();
          }
          var reg=/action=([a-z_]+)/;
          var arr=reg.exec(search_params);
          if(arr)
          var action=arr[1];
          else
          var action=null;

          if(action) {

          if(action=='hike_tour_search' )
          display_hike_form();
          else
          display_package_form();

          search_params=search_params.substr(1);
          search_params=search_params.split('&');
          search_params_array=new Array();
          jq.each(search_params, function(index, value){
          param_one=value.split('=');
      var field = param_one[0];
      var value = jq.trim(param_one[1]);
      search_params_array[field] = value;
    });

    if(action == ' package_tour_search') {
          if(search_params_array['country'] !=undefined){
          jq('#itt_country').val(search_params_array['country'].split('+'));
          if(jq('#itt_country').val() !=search_params_array['country']) {
          jq('#tour_search_module').show();
          return false;
          }
          } else {
          jq('#tour_search_module').show();
          return false;
          }
          jq('.hotel_rating').attr('checked', false);
          jq('.food_list_input').attr('checked', false);
          if(search_params_array['hotel_rating'] !=undefined && search_params_array['hotel_rating'])
          jq.each(search_params_array['hotel_rating'].split('+'), function(i, v) {
          jq('.hotel_rating[value="'+v+'" ]').attr('checked', 'checked' );
          });
          if(search_params_array['food'] !=undefined && search_params_array['food'])
          jq.each(search_params_array['food'].split('+'), function(i, v) {
          jq('.food_list_input[value="'+v+'" ]').attr('checked', 'checked' );
          });
          if(search_params_array['adults'] !=undefined && search_params_array['adults'])
          jq('#adult').val(search_params_array['adults']);
          if(search_params_array['children'] !=undefined && search_params_array['children'])
          jq('#children').val(search_params_array['children']).trigger('change', true);//.change();
          if(search_params_array['child1_age'] !=undefined && search_params_array['child1_age'])
          jq('#child1_age').val(search_params_array['child1_age']);
          if(search_params_array['child2_age'] !=undefined && search_params_array['child2_age'])
          jq('#child2_age').val(search_params_array['child2_age']);
          if(search_params_array['child3_age'] !=undefined && search_params_array['child3_age'])
          jq('#child3_age').val(search_params_array['child3_age']);
          if(search_params_array['date_from'] !=undefined && search_params_array['date_from'])
          jq('#itt_date_from').val(search_params_array['date_from']);
          if(search_params_array['date_till'] !=undefined && search_params_array['date_till'])
          jq('#date_till').val(search_params_array['date_till']);
          if(search_params_array['night_from'] !=undefined && search_params_array['night_from'])
          jq('#night_from').val(search_params_array['night_from']);
          if(search_params_array['night_till'] !=undefined && search_params_array['night_till'])
          jq('#night_till').val(search_params_array['night_till']);
          if(search_params_array['price_from'] !=undefined && search_params_array['price_from'])
          jq('#price_from').val(search_params_array['price_from'].replace(/[^\d]/g, '' ));
          if(search_params_array['price_till'] !=undefined && search_params_array['price_till'])
          jq('#price_till').val(search_params_array['price_till'].replace(/[^\d]/g, '' ));
          if(search_params_array['items_per_page'] !=undefined && search_params_array['items_per_page'])
          jq('#items_per_page' + search_params_array['items_per_page']).attr('checked', 'checked' );
          if(search_params_array['package_tour_type'] !=undefined && search_params_array['package_tour_type'])
          jq('#package_tour_type_'+search_params_array['package_tour_type']).attr('checked', 'checked' );

          if(typeof(options.modules_param_action) !='undefined' ) {
          var options_modules_param_action=options.modules_param_action;
          } else {
          var options_modules_param_action=options.modules_action;
          }
          jq.getJSON(options_modules_param_action, { 'action' : 'get_package_search_filtered_field'
          , 'event_owner_level' : 0
          , 'event' : 'select_type'
          , 'country_id' : jq('#itt_country').val()
          , 'region_id' : search_params_array['region'].replace(/\+/g, ' ' )
          , 'hotel_rating_id' : search_params_array['hotel_rating'] !=undefined ? search_params_array['hotel_rating'].replace(/\+/g, ' ' ) : ''
          , 'tour_type' : jq('#package_search_form :radio:checked').val()
          }
          , function(data) {
          jq('#itt_country').html(data.country);
          jq('#region_list').html(data.region);
          jq('#hotel_list').html(data.hotel);
          jq('#departure_city').html(data.departure_city);

          if(search_params_array['country'])
          jq('#itt_country').val(search_params_array['country'].split('+'));
          if(search_params_array['region'] !=undefined && search_params_array['region'])
          jq('#region_list').val(search_params_array['region'].split('+'));
          if(search_params_array['hotel'] !=undefined && search_params_array['hotel'])
          jq('#hotel_list').val(search_params_array['hotel'].split('+'));
          if(search_params_array['departure_city'] !=undefined && search_params_array['departure_city'])
          jq('#departure_city').val(search_params_array['departure_city'].split('+'));
          jq('#package_search_form .btn-search :button').click();
          jq('#tour_search_module').show();
          });
          }

          if(action=='hike_tour_search' && search_params_array['country'] !=undefined) {
          if(search_params_array['hike_date_from'] !=undefined && search_params_array['hike_date_from'])
          jq('#hike_date_from').val(search_params_array['hike_date_from']);
          if(search_params_array['hike_date_till'] !=undefined && search_params_array['hike_date_till'])
          jq('#hike_date_till').val(search_params_array['hike_date_till']);
          if(search_params_array['hike_price_till'] !=undefined && search_params_array['hike_price_till'])
          jq('#hike_price_till').val(search_params_array['hike_price_till']);
          if(search_params_array['items_per_page'] !=undefined && search_params_array['items_per_page'])
          jq('#hike_items_per_page' + search_params_array['items_per_page']).attr('checked', 'checked' );

          if(typeof(options.modules_param_action) !='undefined' ) {
          var options_modules_param_action=options.modules_param_action;
          } else {
          var options_modules_param_action=options.modules_action;
          }
          jq.getJSON(options_modules_param_action, { 'action' : 'get_hike_search_filtered_field'
          , 'event_owner_level' : 0
          , 'country_id' : search_params_array['country'].replace(/\+/g, ' ' )
          , 'transport_id' : search_params_array['transport'].replace(/\+/g, ' ' )
          , 'city_id' : search_params_array['city'].replace(/\+/g, ' ' )
          }
          , function(data) {
          jq('#transport_list').html(data.transport);
          jq('#city_list').html(data.city);
          jq('#tour_city_list').html(data.tour_city);
          if(search_params_array['country'])
          jq('#country_list').val(search_params_array['country'].split('+'));
          if(search_params_array['transport'] !=undefined && search_params_array['transport'])
          jq('#transport_list').val(search_params_array['transport'].split('+'));
          if(search_params_array['city'] !=undefined && search_params_array['city'])
          jq('#city_list').val(search_params_array['city'].split('+'));
          if(search_params_array['tour_city'] !=undefined && search_params_array['tour_city'])
          jq('#tour_city_list').val(search_params_array['tour_city'].split('+'));
          jq('#hike_search_form .btn-search :button').click();
          jq('#tour_search_module').show();
          });
          }





          } else {
          jq('#tour_search_module').show();
          package_search_form_submit(true);
          }
          jq('.module_preview_load').hide();
          //---------
          }

          function show_operator(e) {
          if(e.ctrlKey) {
          jq('#itt_hidden_operator').show();
          }
          }

          function change_package_tour_type(tour_type) {
          // При переключении на "проезд включен" ставим транспорт "Авиа"
          if(parseInt(tour_type)==1) jq('#transport_type option[value="1" ]').prop('selected', true);

          var options=jq('body').data('options');

          var hotel_rating_list='' ;
          jq('#itt_hotel_rating_block :checkbox:checked').each(function(index){
          hotel_rating_list +=jq(this).val()+' ';
  });
  if(typeof(options.modules_param_action) != ' undefined') {
          var options_modules_param_action=options.modules_param_action;
          } else {
          var options_modules_param_action=options.modules_action;
          }
          jq.getJSON(options_modules_param_action, { 'action' : 'get_package_search_filtered_field'
          , 'event_owner_level' : 0
          , 'event' : 'select_type'
          , 'hotel_rating_id' : hotel_rating_list
          , 'tour_type' : tour_type
          // if user change params=> set user param
          , 'date_till': jq('#date_till').val()
          , 'departure_city': jq('#departure_city').val()
          , 'country_id': jq('#itt_country').val()
          , 'region_list_ids': jq('#region_list').val()
          }
          , function(data) {
          jq('#itt_country').html(data.country);
          jq('#region_list').html(data.region);
          jq('#hotel_list').html(data.hotel);
          jq('#departure_city').html(data.departure_city);
          package_search_form_submit(true);
          });
          }

          function hotel_rating_handler(element) {
          var need_hotel_refresh = true;
          var element = jq(element);
          // Условная активация только двух рейтингов
          var active_ratings = jq('#itt_hotel_rating_block :checkbox:checked');

          if(active_ratings.length > 2) {
          // Искомый соседний элемент
          var nearest_star = '';

          // Ищем соседний элемент
          active_ratings.each(function() {
          var current_star = jq(this).get(0);
          if(nearest_star == '' && current_star == element.parent().prev().find('input.hotel_rating').get(0)) {
          nearest_star = element.parent().prev().find('input.hotel_rating');
          }
          if(nearest_star == '' && current_star == element.parent().next().find('input.hotel_rating').get(0)) {
          nearest_star = element.parent().next().find('input.hotel_rating');
          }
          });

          // Ищем соседний - через один элемент
          active_ratings.each(function() {
          var current_star = jq(this).get(0);
          if(nearest_star == '' && current_star == element.parent().prev().prev().find('input.hotel_rating').get(0)) {
          nearest_star = element.parent().prev().prev().find('input.hotel_rating');
          }
          if(nearest_star == '' && current_star == element.parent().next().next().find('input.hotel_rating').get(0)) {
          nearest_star = element.parent().next().next().find('input.hotel_rating');
          }
          });

          // Деактивируем все рейтинги
          jq('#itt_hotel_rating_block :checkbox').prop("checked", false);
          // Активируем кликнутый элемент
          element.prop("checked", true);
          // Активируем соседа
          if(nearest_star != '') nearest_star.prop("checked", true);
          } else if(active_ratings.length == 0) {
          // Одну звезду нельзя деактивировать - выбираем принудительно
          element.prop("checked", true);
          need_hotel_refresh = false;
          }
          return need_hotel_refresh;
          }

          function hotel_refresh(){

          var options = jq('body').data('options');

          var region_list = '';
          jq('#region_list option:selected').each(function(index){
          region_list += jq(this).val()+' ';
          });
          var hotel_rating_list = '';
          jq('#itt_hotel_rating_block :checkbox:checked').each(function(index){
          hotel_rating_list += jq(this).val()+' ';
          });

          if(typeof(options.modules_param_action) != 'undefined') {
          var options_modules_param_action = options.modules_param_action;
          } else {
          var options_modules_param_action = options.modules_action;
          }
          jq.getJSON(options_modules_param_action, { 'action': 'get_package_search_filtered_field'
          , 'event_owner_level': 2
          , 'event': 'select_rating'
          , 'country_id': jq('#itt_country').val()
          , 'region_id': region_list
          , 'hotel_rating_id': hotel_rating_list
          , 'tour_type': jq('#package_search_form :radio:checked').val()
          // if user change params => set user param
          , 'date_till': jq('#date_till').val()
          , 'departure_city': jq('#departure_city').val()
          , 'region_list_ids': region_list
          }
          , function(data) {
          jq('#hotel_list').html(data.hotel).val(0);
          jq('#departure_city').html(data.departure_city);
          package_search_form_submit(true);
          });
          }

          function package_search_form_submit(presearch) {
          if(!presearch) {
          if(search_request_active)
          return false;
          search_request_active = true;
          }
          var options = jq('body').data('options');

          var hotel_rating_str = '';
          jq('#itt_hotel_rating_block :checkbox:checked').each(function(index){
          hotel_rating_str += jq(this).val()+' ';
          });
          jq('#hotel_rating').val(jq.trim(hotel_rating_str));
          jq('#itt_hotel_rating_block input').attr('disabled', 'disabled');

          var food_str = '';
          jq('ul.food :checkbox:checked').each(function(index){
          food_str += jq(this).val()+' ';
          });
          jq('#food').val(jq.trim(food_str));
          jq('ul.food input').attr('disabled', 'disabled');

          var hotel_list_temp = jq('#hotel_list').val();
          var region_list_temp = jq('#region_list').val();
          var region_list = '';
          jq('#region_list option:selected').each(function(index){
          if(jq(this).val() != 0) // исключаем все регионы
          region_list += jq(this).val()+' ';
          });
          jq('#region').val(jq.trim(region_list));
          var hotel_list = '';
          jq('#hotel_list option:selected').each(function(index){
          if(jq(this).val() != 0) // исключаем все отели
          hotel_list += jq(this).val()+' ';
          });
          jq('#hotel').val(jq.trim(hotel_list));
          jq('#hotel_list').val('');
          jq('#region_list').val('');

          var params = (jq('#package_search_form').serialize());
          if(!default_serialize_module_form_search) default_serialize_module_form_search = params;
          if(jq('#add_package_tour_type').length) {
          jq('#add_package_tour_type').remove();
          }
          //if(form_type == 'extended') {
          jq('#hotel_list').val(hotel_list_temp);
          jq('#region_list').val(region_list_temp);
          //}
          jq('#itt_hotel_rating_block input').removeAttr('disabled');
          //jq('ul.food input').attr('disabled', '');
          jq('ul.food input').removeAttr('disabled');

          if(!presearch) {
          if(default_serialize_module_form_search && default_serialize_module_form_search == params){
          params += '&default_form_select=1';
          }
          if(options.modules_popup_result && options.extended_search_url != ''){
          window.location = options.extended_search_url + '#' + params;
          return false;
          }

          if(options.modules_popup_result) {
          if(options.modules_popup_type == 'div') {
          if(search_box)
          jq('div.tour_search_result').parents('table.boxy-wrapper').remove();
          search_box = new Boxy('<div id="main_content" class="itt_main_block tour_search_result" style="text-align: center;background: none repeat scroll 0 0 #FFFFFF;">'+jq('#go_tour_search_caption').html()+'<br />'+jq('#please_wait_caption').html()+'<br /><img class="load_center" src="'+options.modules_url+'images/ajax_loader_circle.gif" /></div>',
          {modal: true
          , title: jq('#tour_search_result_caption').html()
          //, afterHide: function(event, ui) { jq('body').css('overflow', ''); }
          //, afterShow: function(event, ui) { jq('body').css('overflow', 'hidden'); }
          });
          lang();
          title_box('small');
          jq('#main_content').css('width', '310px');
          jq('.itt_main_block strong').attr('style', 'color:#000000!important;font-size:12px!important');
          } else {
          popupWin = window.open('', '', 'status=no,width=750,height=240,scrollbars=yes,resizable=no,top=10,left='+(screen.width-800)/2);
          popupWin.document.write('<div class="window_popup" style="width: 100%; text-align: center;"><img style="margin: 50px 0;" src="'+options.modules_url+'images/ajax_loader_circle.gif" /></div>');
          popupWin.document.close();
          }
          } else {
          jq('div.tour_search_result').html('');
          jq('.tour_load').show();
          }

          if(!options.modules_popup_result && jq('#module_search_query').val() == '') {
          // change url
          var loc = window.location.toString();
          if(loc.indexOf('#') == -1)
          window.location = loc + '#' + params;
          else
          window.location = loc.substr(0, loc.indexOf('#')) + '#' + params;
          }
          } else {
          params = params + '&instantsearch=1';
          return false;
          }

          var current_url = location.href;
          current_url = current_url.replace(location.search, '');
          current_url = current_url.replace(location.hash, '');
          params += '&module_location_url=' + encodeURIComponent(current_url);

          if(options.preview){
          params += '&preview=1';
          if(options.show_basket == 1){
          params += '&dont_show_basket=1';
          }
          if(options.use_hotel_result == 1){
          params += '&use_hotel_result=1';
          }
          }

          jq.getJSON(options.modules_action, params, function(data) {
          console.log(data);
          if(presearch)
          return false;
          search_request_active = false;
          if(options.modules_popup_result) {
          if(options.modules_popup_type == 'div') {
          search_box.setContent('<div class="itt_main_block tour_search_result" style="overflow: auto;background: none repeat scroll 0 0 #FFFFFF;">'+data.text+'</div>');
          set_poput_actual_size(search_box, 740);
          } else {
          popupWin.document.write(data.text);
          popupWin.document.close();
          }
          } else {
          jq('div.tour_search_result').html(data.text);
          jq('.tour_load').hide();
          if(jq.browser.opera) { // for opera only
          jq('.ellipsis').css('white-space', 'normal');
          jq('.tour_search_result div:eq(0)').css('width', jq('.tour_search_result div:eq(0)').width());
          jq('.ellipsis').css('white-space', 'nowrap');
          }
          var targetOffset = (jq('div.tour_search_result').offset().top) - 15;
          jq('html,body').animate({scrollTop: targetOffset}, 700);
          }
          lang();

          title_box('big');
          return false;
          });
          return false;
          }

          function ajax_load(url, div_name, show_result_in_popup) {
          var options = jq('body').data('options');

          var params = url.substr( (url.indexOf( '?', 0) + 1) );
          params = params.replace(/callback=jsonp[0-9]+&/, '');
          params = params.replace(/callback=jQuery[0-9_]+&/, '');
          if(show_result_in_popup) {

          if(options.modules_popup_type == 'div')
          search_box.setContent('<div id="main_content" class="itt_main_block tour_search_result" style="text-align: center;background: none repeat scroll 0 0 #FFFFFF;">'+jq('#go_tour_search_caption').html()+'<br />'+jq('#please_wait_caption').html()+'<br /><img class="load_center" src="'+options.modules_url+'images/ajax_loader_circle.gif" /></div>').center();
          else {
          window.document.write('<div class="window_popup" style="width: 100%; text-align: center;"><img style="margin: 50px 0;" src="'+options.modules_url+'images/ajax_loader_circle.gif" /></div>');
          window.document.close();
          }
          lang();
          title_box('small');
          jq('#main_content').css('width', '310px');
          var width = (jq(window).width() - jq('div:last').prev().outerWidth())/2;
          jq('div:last').prev().css('left', width+'px');
          jq('div:last').prev().prev().css('left', width+'px');
          jq('.itt_main_block strong').attr('style', 'color:#000000!important;font-size:12px!important');
          } else {
          jq('.'+div_name).html('');
          jq('.tour_load').show();
          }

          jq.getJSON(options.modules_action, params, function(data) {
          if(show_result_in_popup) {
          if(options.modules_popup_type == 'div') {
          title_box('big');
          search_box.setContent('<div class="itt_main_block tour_search_result" style="overflow: auto;background: none repeat scroll 0 0 #FFFFFF;">'+data.text+'</div>');
          set_poput_actual_size(search_box, 740);
          } else {
          window.document.write(data.text);
          window.document.close();
          }
          } else {
          jq('.'+div_name).html(data.text);
          jq('.tour_load').hide();
          if(jq.browser.opera) { // for opera only
          jq('.ellipsis').css('white-space', 'normal');
          jq('.tour_search_result div:eq(0)').css('width', jq('.tour_search_result div:eq(0)').width());
          jq('.ellipsis').css('white-space', 'nowrap');
          }
          }
          lang();
          return false;
          });
          return false;
          }

          function display_hike_form() {
          jq('div.tour_search_result').html('');
          jq('div.extended_package_search_form').hide();
          jq('div.extended_hike_search_form').show();
          jq('#form_type_hike').val(2);
          checkCookie('hike');
          setCount(getCount('hike'));
          return false;
          }

          function display_package_form() {
          jq('div.tour_search_result').html('');
          jq('div.extended_hike_search_form').hide();
          jq('div.extended_package_search_form').show();
          jq('#form_type_package').val(1);
          checkCookie();
          setCount(getCount());
          return false;
          }

          function hike_search_form_submit(form_type, show_result_in_popup) {
          if(search_request_active)
          return false;
          search_request_active = true;
          var options = jq('body').data('options');

          var country_list_temp = jq('#country_list').val();
          var transport_list_temp = jq('#transport_list').val();
          var city_list_temp = jq('#city_list').val();
          var tour_city_list_temp = jq('#tour_city_list').val();

          var country_list = '';
          jq('#country_list option:selected').each(function(index){
          country_list += jq(this).val()+' ';
          });
          jq('#hike_country').val(jq.trim(country_list));
          var transport_list = '';
          jq('#transport_list option'+((jq('#transport_list').val() && jq('#transport_list').val() != 900)?':selected':'') ).each(function(index){
          if(jq(this).val() != 0)
          transport_list += jq(this).val()+' ';
          });
          jq('#transport').val(jq.trim(transport_list));
          var city_list = '';
          jq('#city_list option'+((jq('#city_list').val() && jq('#city_list').val() != 900)?':selected':'') ).each(function(index){
          if(jq(this).val() != 0)
          city_list += jq(this).val()+' ';
          });
          jq('#city').val(jq.trim(city_list));
          var tour_city_list = '';
          jq('#tour_city_list option'+((jq('#tour_city_list').val() && jq('#tour_city_list').val() != 900)?':selected':'') ).each(function(index){
          if(jq(this).val() != 0)
          tour_city_list += jq(this).val()+' ';
          });
          jq('#tour_city').val(jq.trim(tour_city_list));

          jq('#country_list').val('');
          jq('#transport_list').val('');
          jq('#city_list').val('');
          jq('#tour_city_list').val('');

          var params = (jq('#hike_search_form').serializeArray());
          var params_str = (jq('#hike_search_form').serialize());
          jq('#country_list').val(country_list_temp);
          jq('#transport_list').val(transport_list_temp);
          jq('#city_list').val(city_list_temp);
          jq('#tour_city_list').val(tour_city_list_temp);

          if(show_result_in_popup && options.extended_search_url != ''){
          window.location = options.extended_search_url + '#' + params_str;
          return false;
          }

          if(show_result_in_popup) {
          if(options.modules_popup_type == 'div') {
          if(search_box)
          jq('div.tour_search_result').parents('table.boxy-wrapper').remove();
          search_box = new Boxy('<div id="main_content" class="itt_main_block tour_search_result" style="text-align: center;background: none repeat scroll 0 0 #FFFFFF;">'+jq('#go_tour_search_caption').html()+'<br />'+jq('#please_wait_caption').html()+'<br /><img class="load_center" src="'+options.modules_url+'images/ajax_loader_circle.gif" /></div>',
          {modal: true
          , title: jq('#tour_search_result_caption').html()
          //, afterHide: function(event, ui) { jq('body').css('overflow', ''); }
          //, afterShow: function(event, ui) { jq('body').css('overflow', 'hidden'); }
          });
          lang();
          title_box('small');
          jq('#main_content').css('width', '310px');
          jq('.itt_main_block strong').attr('style', 'color:#000000!important;font-size:12px!important');
          } else {
          popupWin = window.open('', '', 'status=no,width=750,height=240,scrollbars=yes,resizable=no,top=10,left='+(screen.width-800)/2);
          popupWin.document.write('<div class="window_popup" style="width: 100%; text-align: center;"><img style="margin: 50px 0;" src="'+options.modules_url+'images/ajax_loader_circle.gif" /></div>');
          popupWin.document.close();
          }
          } else {
          jq('div.tour_search_result').html('');
          jq('.tour_load').show();
          }

          if(!show_result_in_popup && jq('#module_search_query').val() == '') {
          var loc = window.location.toString();
          if(loc.indexOf('#') == -1)
          window.location = loc + '#' + params_str;
          else
          window.location = loc.substr(0, loc.indexOf('#')) + '#' + params_str;
          }

          var current_url = location.href;
          current_url = current_url.replace(location.search, '');
          current_url = current_url.replace(location.hash, '');
          var current_url_object = {name:'module_location_url', value:current_url};
          params.push(current_url_object);

          jq.getJSON(options.modules_action, params, function(data) {
          search_request_active = false;
          if(show_result_in_popup) {
          if(options.modules_popup_type == 'div') {
          search_box.setContent('<div class="itt_main_block tour_search_result" style="overflow: auto;background: none repeat scroll 0 0 #FFFFFF;">'+data.text+'</div>');
          set_poput_actual_size(search_box, 740);
          } else {
          popupWin.document.write(data.text);
          popupWin.document.close();
          }
          } else {
          jq('div.tour_search_result').html(data.text);
          jq('.tour_load').hide();
          if(jq.browser.opera) { // for opera only
          jq('.ellipsis').css('white-space', 'normal');
          jq('.tour_search_result div:eq(0)').css('width', jq('.tour_search_result div:eq(0)').width());
          jq('.ellipsis').css('white-space', 'nowrap');
          }
          var targetOffset = jq('div.tour_search_result').offset().top;
          jq('html,body').animate({scrollTop: targetOffset}, 700);
          }
          lang();
          title_box('big');
          return false;
          });
          return false;
          }

          function country_list_click(){

          var options = jq('body').data('options');

          var country_list = '';
          jq('#country_list option:selected').each(function(index){
          if(jq(this).val() != 0)
          country_list += jq(this).val()+' ';
          });

          if(typeof(options.modules_param_action) != 'undefined') {
          var options_modules_param_action = options.modules_param_action;
          } else {
          var options_modules_param_action = options.modules_action;
          }
          jq.getJSON(options_modules_param_action, {'action':'get_hike_search_filtered_field', 'event_owner_level' : 1, 'country_id': jq.trim(country_list)}, function(data) {
          jq('#transport_list').html(data.transport);
          jq('#city_list').html(data.city);
          jq('#tour_city_list').html(data.tour_city);
          });
          }

          function transport_list_click(){

          var options = jq('body').data('options');

          var country_list = '';
          jq('#country_list option:selected').each(function(index){
          if(jq(this).val() != 0)
          country_list += jq(this).val()+' ';
          });
          var transport_list = '';
          jq('#transport_list option:selected').each(function(index){
          if(jq(this).val() != 0)
          transport_list += jq(this).val()+' ';
          });

          if(typeof(options.modules_param_action) != 'undefined') {
          var options_modules_param_action = options.modules_param_action;
          } else {
          var options_modules_param_action = options.modules_action;
          }
          jq.getJSON(options_modules_param_action, {'action':'get_hike_search_filtered_field', 'event_owner_level' : 2, 'country_id': jq.trim(country_list), 'transport_id': jq.trim(transport_list)}, function(data) {
          jq('#city_list').html(data.city);
          jq('#tour_city_list').html(data.tour_city);
          });
          }

          function city_list_click(){

          var options = jq('body').data('options');

          var country_list = '';
          jq('#country_list option:selected').each(function(index){
          if(jq(this).val() != 0)
          country_list += jq(this).val()+' ';
          });
          var transport_list = '';
          jq('#transport_list option:selected').each(function(index){
          if(jq(this).val() != 0)
          transport_list += jq(this).val()+' ';
          });
          var city_list = '';
          jq('#city_list option:selected').each(function(index){
          if(jq(this).val() != 0)
          city_list += jq(this).val()+' ';
          });

          if(typeof(options.modules_param_action) != 'undefined') {
          var options_modules_param_action = options.modules_param_action;
          } else {
          var options_modules_param_action = options.modules_action;
          }
          jq.getJSON(options_modules_param_action, { 'action': 'get_hike_search_filtered_field'
          , 'event_owner_level': 3
          , 'country_id': jq.trim(country_list)
          , 'transport_id': jq.trim(transport_list)
          , 'city_id': jq.trim(city_list)
          }, function(data) {
          jq('#tour_city_list').html(data.tour_city);
          });
          }

          function package_tour_order(tour_id, sharding_rule_id) {
          var options = jq('body').data('options');
          if(typeof sharding_rule_id == 'undefined') sharding_rule_id = '';
          if(options.modules_popup_type == 'div') {
          if(order_box) jq('div.tour_order').parents('table.boxy-wrapper').remove();
          order_box = new Boxy('<div id="tour_order" class="itt_main_block tour_order" style="background: none repeat scroll 0 0 #FFFFFF;"><img class="load_center" src="'
      + options.modules_url + 'images/ajax_loader_circle.gif" /></div>',
          { modal: true
          , title: jq('#tour_order_caption').html()
          });
          var lang_close = jq('#close').html();
          jq('.it_close span').html(lang_close);
          } else {
          orderWin = window.open('', '', 'status=no,width=750,height=240,scrollbars=yes,resizable=no,top=10,left=' + (screen.width - 800) / 2);
          orderWin.document.write('<div class="window_popup" style="width: 100%; text-align: center;"><img style="margin: 50px 0;" src="'
      + options.modules_url + 'images/ajax_loader_circle.gif" /></div>');
          orderWin.document.close();
          }

          jq.getJSON(options.modules_action, { 'action': 'get_package_tour_order_form'
          , 'tour_id': tour_id
          , 'sharding_rule_id': sharding_rule_id}, function(data) {
          if(options.modules_popup_type == 'div') {
          order_box.setContent('<div id="tour_order" class="itt_main_block tour_order" style="overflow: auto;">' + data.text + '</div>');
          set_poput_actual_size(order_box);
          top_px = jq('div:last').prev().css("top");
          var top_int = top_px.split('px')[0];
          if(top_int < 0) {
            jq('div:last').prev().css("top", "10px" );
            }
            jq('#tour_order').attr('style','border: medium none !important;height: 536px;width: 996px !important');
            jq('#tour_order').prev().hide();
            var width=(jq(window).width() - jq('div:last').prev().outerWidth()) / 2;
            jq('div:last').prev().css('left', width + 'px' );
            } else {
            orderWin.document.write(data.text);
            orderWin.document.close();
            }

            var blink_elem=jq('.ittour_sr_price');
            var blinker=setInterval(function() {
            if(blink_elem.css('opacity')=='0' ) {
            blink_elem.css({opacity: 0}).animate({opacity: 1.0}, 150);
            } else {
            blink_elem.css({opacity: 1.0}).animate({opacity: 0}, 150);
            }
            }, 600);

            jq('#main_price_currency_package').die();
            jq('#itt_package_cur_popup li').die();
            jq('#main_price_currency_package').live('click', function() {
            jq('#itt_package_cur_popup').toggle();
            })
            jq('#itt_package_cur_popup li').live('click', function() {
            var this_=jq(this);
            var cur=this_.html();
            var price=this_.attr('prc');
            var cur_price=this_.attr('cur_prc');
            jq('.ittour_sr_price').html(price);
            if(cur_price) {
            var cur_id=this_.attr('currency');
            jq('.ittour_new_price').html(cur_price);
            jq('.input_price').val(cur_price);
            jq('.input_currency_id').val(cur_id);
            jq('.ittour_old_price').html(price);
            jq('#main_price_currency_package').attr('currency_id', cur_id);
            }
            jq('#main_price_currency_package').html(cur);
            jq('#itt_package_cur_popup').hide();
            })

            if(jq('input[name="itt_is_actual_price" ]').val()=='0' ) {
            jq.getJSON(options.modules_action, { 'action' : 'get_package_validate_tour'
            , 'tour_id' : tour_id
            , 'sharding_rule_id' : sharding_rule_id}, function(jsondata) {
            if(blinker) {
            clearInterval(blinker);
            setTimeout(function(){ blink_elem.animate({opacity: 1.0}, 150); }, 160);
            }

            if(jsondata.validate) {
            if(jsondata.validate.stop_price) {
            jq('#order_desc_default').hide();
            jq('#order_desc_stop_price').show();
            } else if(jsondata.validate.stop_sale) {
            jq('#order_desc_default').hide();
            jq('#order_desc_stop_sale').show();
            } else if(jsondata.validate.stop_flight) {
            jq('#order_desc_default').hide();
            jq('#order_desc_stop_flight').show();
            } else if(jsondata.validate.prices) {
            var currency_id=jq('#main_price_currency_package').attr('currency_id');
            if(currency_id) {
            var new_prices=jsondata.validate.prices;
            if(new_prices) {
            jq("#itt_package_cur_popup li").each(function(indx, element){
            var cur_currency_id=jq(element).attr('currency');
            jq(element).attr('cur_prc',Math.ceil(new_prices[cur_currency_id]));
            });

            var cur_price=Math.ceil(new_prices[currency_id]);
            if(cur_price){
            jq('.ittour_sr_price').attr('class','ittour_old_price');

            jq(".ittour_old_price").after("<span class='ittour_new_price'></span>");
            jq('.ittour_new_price').html(cur_price);

            jq('.input_price').val(cur_price);
            jq('.input_currency_id').val(currency_id);

            jq('#order_desc_default').hide();
            jq('#order_desc_price_change').show();
            }
            }
            }
            } else if(!jsondata.validate.operator_validate) {
            jq('#order_desc_default').hide();
            jq('#order_desc_no_validate').show();
            }
            }
            });
            } else {
            if(blinker) {
            clearInterval(blinker);
            setTimeout(function(){ blink_elem.animate({opacity: 1.0}, 150); }, 160);
            }
            }

            return false;
            });
            }

            //*** Begin handler for close pop-up tour (hot key 'Esc' or click out pop-up) **
            // Hot key 'Esc'
            jq(document.body).on('keydown', function(event){
            // Check press key "Esc" => 27
            var key = event.which || event.keyCode;
            if (key == 27) {
            // Check user unput data
            check_user_input_info_and_close_pop_up();
            }
            });

            // Click out pop-up
            jq('.boxy-modal-blackout').live('click', function(){
            check_user_input_info_and_close_pop_up();
            });

            /**
            * function check user input data info and close pop-up
            * @param {void}
            * @returns {void}
            */
            function check_user_input_info_and_close_pop_up() {
            // Check isset element in DOM
            var text_for_confirm = jq('input[name="close_window_application"]').val();
            if (typeof text_for_confirm == 'undefined') return;

            // Set flag for open confirm
            var flag_open_confirm = false;

            // Имя
            var tour_first_name = jq('.ittour_order_grey_form_center_left input[name="first_name"]').val();
            var first_name_el_const = jq('input[name="first_name_el_const"]').val();
            if ((tour_first_name != first_name_el_const) && (tour_first_name != '')) {
            flag_open_confirm = true;
            }

            // Город
            var tour_city = jq('.ittour_order_grey_form_center_left input[name="city"]').val();
            var city_el_const = jq('input[name="city_el_const"]').val();
            if ((tour_city != city_el_const) && (tour_city != '')) {
            flag_open_confirm = true;
            }

            // Телефон
            var tour_phone = jq('.ittour_order_grey_form_center_left input[name="phone"]').val();
            var phone_el_const = jq('input[name="phone_el_const"]').val();
            if ((tour_phone != phone_el_const) && (tour_phone != '')) {
            flag_open_confirm = true;
            }

            // E-mail
            var tour_email = jq('.ittour_order_grey_form_center_left input[name="email"]').val();
            if ((tour_email != 'E-mail') && (tour_email != '')) {
            flag_open_confirm = true;
            }

            // Комментарии
            var tour_comment = jq('.ittour_order_grey_form_center_right textarea[name="comment"]').val();
            if (tour_comment != '') {
            flag_open_confirm = true;
            }

            // All row not input
            if (flag_open_confirm === false) {
            // Close pop-up
            window_close();
            return;
            }

            if (confirm(text_for_confirm) && flag_open_confirm) {
            // Close pop-up
            window_close();
            }
            }
            //*** End handler for close pop-up tour (hot key 'Esc' or click out pop-up) ****

            // Captcha refresh
            function captcha_refresh(buttom_resresh){
            // Update image - not create new cod, use old cod
            var parentWrap = buttom_resresh.parent();
            var captcha = parentWrap.find('img.captcha');
            if(typeof captcha != 'undefined') {
            buttom_resresh.css('opacity', '0.6');
            captcha.attr('src', captcha.attr('src') + '&' + Math.floor(Math.random(7,9)*100));
            setTimeout(function(){ buttom_resresh.css('opacity', '1'); }, 250);
            }
            }

            function package_tour_order_submit() {
            var options = jq('body').data('options');
            var params = (jq('#package_order_form').serialize());
            var new_ittour_order_id = jq("#package_order_form input[name='tour_id']").val();
            if(ittour_order_id != new_ittour_order_id) {
            ittour_order_id = new_ittour_order_id;
            jq('.package_order_load').html('<img src="' + options.modules_url + 'images/ajax_loader.gif" />');
            jq('#package_order_form :submit').hide();
            jq.getJSON(options.modules_action, params, function(data) {
            if(data.success == false) {
            alert(data.error);
            } else {
            if(options.modules_popup_type == 'div') {
            order_box.setContent(jq('#tour_order_success_message').html());
            set_poput_actual_size(order_box);
            jq('#title_message').attr('style', 'width: 730px; display: block; height: 39px;padding: 0;border: medium none;margin: 0 0 1px;');
            jq('#title_message .ittour_order_block_title_box_center_corner').css('width', '723px');
            jq('#title_message .ittour_order_block_title_box_center_corner .it_gradient_right').css('width', '723px');
            jq('#isolate .message').css({'background-color':'#FFFFFF', 'display':'block', 'height':'96px', 'width':'718px', 'padding':'5px'});
            } else {
            jq('.ittour_order_block').html(jq('#tour_order_success_message').html());
            }
            }
            ittour_order_id = '';
            return false;
            });
            }
            return false;
            }

            function hike_tour_order(tour_id) {
            var options = jq('body').data('options');
            if(options.modules_popup_type == 'div') {
            if(order_box) jq('div.tour_order').parents('table.boxy-wrapper').remove();
            order_box = new Boxy('<div id="tour_order" class="itt_main_block tour_order" style="background: none repeat scroll 0 0 #FFFFFF;"><img class="load_center" src="'
                        + options.modules_url + 'images/ajax_loader_circle.gif" /></div>', { modal: true
            , title: jq('#tour_order_caption').html()
            });
            var lang_close = jq('#close').html();
            jq('.it_close span').html(lang_close);
            } else {
            orderWin = window.open('', '', 'status=no,width=750,height=240,scrollbars=yes,resizable=no,top=10,left=' + (screen.width - 800) / 2);
            orderWin.document.write('<div class="window_popup" style="width: 100%; text-align: center;"><img style="margin: 50px 0;" src="'
      + options.modules_url + 'images/ajax_loader_circle.gif" /></div>');
            orderWin.document.close();
            }

            jq.getJSON(options.modules_action, {'action':'get_hike_tour_order_form', 'tour_id' : tour_id}, function(data) {
            if(options.modules_popup_type == 'div') {
            order_box.setContent('<div id="tour_order" class="itt_main_block tour_order" style="overflow: auto;">'+data.text+'</div>');
            reload_price();
            set_poput_actual_size(order_box, 1000);
            top_px = jq('div:last').prev().css("top")
            var top_int = top_px.split('px')[0];
            if(top_int<0){
              jq('div:last').prev().css("top", "10px" );
              }
              jq('#tour_order').attr('style','border: medium none !important;height: 536px;width: 996px !important');
              jq('#tour_order').prev().hide();
              var width=(jq(window).width() - jq('div:last').prev().outerWidth())/2;
              jq('div:last').prev().css('left', width+'px');
              } else {
              orderWin.document.write(data.text.replace('/*%onload_custom_func%*/', 'reload_price();' ));
              orderWin.document.close();
              }
              jq('#main_price_currency').die();
              jq('.itt_cur_popup li').die();
              jq('#main_price_currency').live('click',function(){
              jq('.itt_cur_popup').toggle();
              })
              jq('.itt_cur_popup li').live('click',function(){
              var this_=jq(this);
              currency_symbol=this_.html();
              currency_id=this_.attr('currency');
              jq('.itt_cur_popup').hide();
              reload_price();
              })

              return false;
              });
              }

              function hike_tour_view(tour_id) {
              var options=jq('body').data('options');
              if(options.modules_popup_type=='div' ) {
              if(order_box)
              jq('div.tour_order').parents('table.boxy-wrapper').remove();
              //width: 288px !important;
              order_box=new Boxy('<div id="tour_order" class="itt_main_block tour_order" style="background: none repeat scroll 0 0 #FFFFFF;"><img class="load_center" src="'+options.modules_url+'images/ajax_loader_circle.gif" /></div>',
              {modal: true
              , title: jq('#tour_order_caption').html()
              //, afterHide: function(event, ui) { jq('body').css('overflow', ''); }
              //, afterShow: function(event, ui) { jq('body').css('overflow', 'hidden'); }
              });
              var lang_close = jq('#close').html();
              jq('.it_close span').html(lang_close);
              } else {
              orderWin = window.open('', '', 'status=no,width=750,height=240,scrollbars=yes,resizable=no,top=10,left='+(screen.width-800)/2);
              orderWin.document.write('<div class="window_popup" style="width: 100%; text-align: center;"><img style="margin: 50px 0;" src="'+options.modules_url+'images/ajax_loader_circle.gif" /></div>');
              orderWin.document.close();
              }

              jq.getJSON(options.modules_action, {'action':'get_hike_tour_order_form', 'tour_id' : tour_id}, function(data) {
              if(options.modules_popup_type == 'div') {
              order_box.setContent('<div id="tour_order" class="itt_main_block tour_order" style="overflow: auto;">'+data.text+'</div>');
              reload_price();
              set_poput_actual_size(order_box, 1000);
              top_px = jq('div:last').prev().css("top")
              var top_int = top_px.split('px')[0];
              if(top_int
              <0){
                jq('div:last').prev().css("top", "10px" );
                }
                jq('#tour_order').attr('style','border: medium none !important;height: 536px;width: 996px !important');
                jq('#tour_order').prev().hide();
                } else {
                orderWin.document.write(data.text.replace('/*%onload_custom_func%*/', 'reload_price();' ));
                orderWin.document.close();
                }
                toggle_hotel_info(true);

                jq('#main_price_currency').die();
                jq('.itt_cur_popup li').die();
                jq('#main_price_currency').live('click',function(){
                jq('.itt_cur_popup').toggle();
                })
                jq('.itt_cur_popup li').live('click',function(){
                var this_=jq(this);
                currency_symbol=this_.html();
                currency_id=this_.attr('currency');
                jq('.itt_cur_popup').hide();
                reload_price();
                })

                return false;
                });
                }

                function hike_tour_order_submit(){
                var options=jq('body').data('options');
                var params=(jq('#hike_order_form').serialize());
                params +='&price=' +jq('select[id=price]').val();
                params +='&' +(jq('select[name=accomodation]').serialize());
                params +='&' +(jq('select[name=departure_date]').serialize());
                params +='&currency=' +jq('#main_price_currency').html();
                params +='&currency_id=' +window.currency_id;
                jq('.hike_order_load').html('<img src="'+options.modules_url+'images/ajax_loader.gif" />');
              jq('#hike_order_form :submit').hide();
              jq.getJSON(options.modules_action, params, function(data) {
              jq('.hike_order_load').html('');
              jq('#hike_order_form :submit').show();
              if(data.success == false) {
              alert(data.error);
              } else {
              if(options.modules_popup_type == 'div') {
              order_box.setContent(jq('#tour_order_success_message').html());
              set_poput_actual_size(order_box, 730);
              jq('#title_message').attr('style', 'width: 730px; display: block; height: 39px;padding: 0;border: medium none;margin: 0 0 1px;');
              jq('#title_message .ittour_order_block_title_box_center_corner').css('width', '723px');
              jq('#title_message .ittour_order_block_title_box_center_corner .it_gradient_right').css('width', '723px');
              jq('#isolate .message').css({'background-color':'#FFFFFF', 'display':'block', 'height':'96px', 'width':'718px', 'padding':'5px'});
              } else {
              jq('.ittour_order_block').html(jq('#tour_order_success_message').html());
              }
              }
              return false;
              });
              return false;
              }

              /**
              * function set first (default) parameter for #price as 'selected'
              * and exec original reload_price();
              *
              * @param void
              * @returns void
              */
              function reload_price_custom() {
              // Unset all selected
              jq("#price option").each(function(){
              jq(this).attr('selected', false);
              });

              // Set defalt '0' element on #price
              jq("#price option").first().attr('selected', 'selected');

              // Standart reload price
              reload_price();
              }

              //hike order

              function reload_price(set_min_price) {
              var departure_date = '';
              var accomodation = '';
              if(set_min_price){
              var min_price = 9999999999;
              if (offer_prices[currency_id]){
              jq.each(offer_prices[currency_id] , function(dep_date, accom_array){
              jq.each(accom_array , function(accomodation_idx, price_el){
              if(min_price > price_el.price){
              departure_date = dep_date;
              accomodation = accomodation_idx;
              min_price = price_el.price;
              }
              })
              })
              }
              var timestamp = Number(new Date())/1000;
              if(offer_early_prices[currency_id]) {
              jq.each(offer_early_prices[currency_id] , function(dep_date, accom_array){
              jq.each(accom_array , function(accomodation_idx, date_price_el){
              jq.each(date_price_el , function(date_idx, price_el){
              if((min_price == 9999999999) || (min_price > price_el.price && timestamp < price_el.early_timestamp)){
                departure_date=dep_date;
                accomodation=accomodation_idx;
                min_price=price_el.price;
                }
                })
                })
                })
                }
                jq('#departure_date').val(departure_date);
                jq('#accomodation').val(accomodation);
                }else{
                departure_date=jq('#departure_date').val();
                accomodation=jq('#accomodation').val();
                }

                if(!departure_date)
                return false;
                var departure_timestamp=Date.UTC(departure_date.substr(0, 4), departure_date.substr(5, 2)-1, departure_date.substr(8, 2), 0, 0, 0) / 1000;
                var now_timestamp=Number(new Date())/1000;
                var price_found=false;

                if(!jq.isEmptyObject(offer_prices)){
                var price=offer_prices[currency_id][departure_date][accomodation]['price'];
                var price_id=offer_prices[currency_id][departure_date][accomodation]['price_id'];
                price_found=true;
                } else if(!jq.isEmptyObject(offer_early_prices)){
                var price=offer_early_prices[currency_id][departure_date][accomodation][0]['price'];
                var price_id=offer_early_prices[currency_id][departure_date][accomodation][0]['price_id'];
                }

                // Add fix for save position if user change element
                var position_for_option=0;// Add variable for save position if user change element
                var select_current_data_num=jq("#price :selected").attr("data-num");
                var price_select=0;
                var price_id_select=0;

                var offer_early_prices_str='' ;
                if(offer_early_prices[currency_id] && offer_early_prices[currency_id][departure_date]) {
                var early_price=offer_early_prices[currency_id][departure_date][accomodation];
                jq.each(early_price, function(key, value) {
                if(now_timestamp < value['early_timestamp']) {
                var price_selected='' ;
                if(!price_found) {
                price_found=true;
                price=value['price'];
                price_id=value['price_id'];
                price_selected='selected="selected"' ;
                }
                // Check user selected element
                if (position_for_option==select_current_data_num) {
                price_selected='selected="selected"' ;
                price_select=value['price'];
                price_id_select=value['price_id'];
                }
                offer_early_prices_str +='<option name="price" ' + price_selected + ' data-num="' + position_for_option + '" value="' + value['price'] + ':' + value['price_id'] + '">' + jq('#for_count_weeks').html().replace('$count', value['week_num']) + ': ' + value['price'] + ' </option>' ;
                position_for_option++;
                }
                });
                }
                if(offer_early_prices_str=='' ) {
                jq('#ittour_hike_price_container').hide();
                } else {
                jq('#ittour_hike_price_container').show();
                }

                if(!jq.isEmptyObject(offer_prices)){
                // Check user selected element
                var price_selected='' ;
                if (position_for_option==select_current_data_num) {
                price_selected='selected="selected"' ;
                price_select=price;
                price_id_select=price_id;
                }
                offer_early_prices_str +='<option name="price" ' + price_selected + ' data-num="' + position_for_option + '" value="' + price + ':' + price_id + '">' + (offer_early_prices_str?(jq('#without_prepay_message').html() + ': ' ):'') + price + '</option>' ;// new
                }
                jq('#price').html(offer_early_prices_str);

                // Set params price and price_id
                if (price_select !=0) {
                // User change price
                price=price_select;
                price_id=price_id_select;
                } else {
                // Default first price user not selected element
                price=jq("#price option:first").val().toString().split(':');
                price=price[0];
                price_id=price[1];
                }

                // Set main price
                jq('#main_price').html(price);
                jq('#main_price_currency').html(' '+currency_symbol);
//  if(!jq.isEmptyObject(offer_prices)){
//    jq(' #price').find('select[name=price]:first').click();
                // }
                //set_poput_actual_size(order_box);
                }

                function show_hide_tour_info(){
                if(jq('#hike_tour_info').css('display')=='none' ) {
                jq('.hike_tour_add_info_link').html( jq('#hide_add_info_message').html() );
                jq('#hike_tour_info').show();
                } else {
                jq('.hike_tour_add_info_link').html( jq('#show_add_info_message').html() );
                jq('#hike_tour_info').hide();
                }
                return false;
                }

                function show_hike_description(hike_id){
                jq('div[id^="hike_description_" ]').hide();
                jq('#hike_description_'+hike_id).show();
                return false;
                }

                function set_poput_actual_size(box, div_width) {

                if(div_width==undefined)
                div_width=730;

                box.resize(div_width, '' ); // or 'auto'
                var size=box.getContentSize();
                h=((jq(window).height()-80) < (size[1]))?(jq(window).height()-80):(size[1]);
                box.resize(div_width, h).center();
                }

                function set_window_popup_actual_size(box){
                var height=jq(box.document).find('.window_popup').height();
                height=((screen.height-170) < height)?(screen.height-170):(height);
                box.resizeTo(760, height+80);
                }

                function toggle_hike_tour_add_info(el, element_id) {
                var visible=jq('#'+element_id).css('display');
                if(visible=='none' ) {
                jq('#'+element_id).show();
                jq(el).parent().removeClass().addClass('itt_open_header');
                jq(el).html(jq('#hide_info_caption').html());
                } else {
                jq('#'+element_id).hide();
                jq(el).parent().removeClass().addClass('itt_close_header');
                jq(el).html(jq('#show_info_caption').html());
                }
                set_poput_actual_size(order_box);
                return false;
                }

                function show_hotel_more_info() {
                jq('div.ittour_order_hotel_description2').css({'height': 'auto' , 'overflow' : 'auto' });
                jq('p.ittour_order_more_block').hide();
                jq('div.ittour_order_hotel_description_shadow').hide();
                }

                function show_hotel_more_photos(btn,img) {
                show_hotel_more_info();
                jq('div#ittour_slider_panel').show();
                jq('#ittour_order_show_more_photos').hide();
                jq(btn).hide();
                jq(img).hide();
                }

                function input_focus(el, text) {
                if(jq.trim(jq(el).val())==text)
                jq(el).val('');
                }

                function input_blur(el, text) {
                if(jq.trim(jq(el).val())=='' )
                jq(el).val(text);
                }

                function ittour_show_down(list,btn_up, btn_duwn) {
                var next=jq(list+':visible:last').next();
                if(jq(next).html()) {
                //jq(btn_up).show();
                jq(btn_up).removeClass("ittour_hidden");
                jq(next).show();
                jq(list+':visible:first').hide();
                // alert(jq(next).next().html());
                if(!jq(next).next().html()) {
                //jq(btn_duwn).hide();
                jq(btn_duwn).addClass("ittour_hidden");
                }
                }
                }

                /*
                jq("#target").addClass("ittour_hidden ");
jq(" #target").removeClass("ittour_hidden ");

*/
function ittour_show_up(list,btn_up, btn_duwn) {
  var prev = jq(list+':visible:first').prev();
  if(jq(prev).html()) {
    //jq(btn_duwn).show();
    jq(btn_duwn).removeClass(" ittour_hidden");
                jq(prev).show();
                jq(list+':visible:last').hide();
                if(!jq(prev).prev().html()) {
                //jq(btn_up).hide();
                jq(btn_up).addClass("ittour_hidden");
                }
                }
                }

                function transparent_flash() {
                jq('embed').each(function() {
                var clone=this.cloneNode(true);
                clone.setAttribute('wmode', 'transparent' );
                jq(this).before(clone);
                jq(this).remove();
                });

                jq("object").each(function (i, v) {
                var embed=jq(this).children("embed");
                if(typeof (embed.get(0)) !="undefined" ) {
                if(typeof (embed.get(0).outerHTML) !="undefined" ) {
                embed.attr("wmode", "transparent" );
                jq(this.outerHTML).insertAfter(this);
                jq(this).remove();
                }
                return true;
                }

                });
                }

                function addToCart(id, date, tour_type='package' ) {
                var exp_date=date;
                if(tour_type=='package' ) {
                cookie=get_cookie('cart');//куки пакетных туров
                } else {
                cookie=get_cookie('cart_hike');//куки экскурсионных туров
                }
                var count=0;
                if(cookie) {
                var arr=cookie.split(";");
                var value='' ;
                var flag=true;
                var exp_date=0;
                for(i=0; i < arr.length; i++){
                if(arr[i]) {
                // сравниваем ИД из куки с тем который пришел
                data=arr[i].split('_');
                // если разные записываем в значение данные из куки
                if(data[0] !=id) {
                count++;
                value +=data[0] + '_' + data[1] + ';' ;
                if(data[1] * 1> exp_date * 1) {
                exp_date = data[1];
                }
                } else {
                // если одинаковые то пропускаем и ставим флаг false
                flag = false;
                }
                }
                }
                //если флаг тру то дописываем ид который пришел
                if(flag) {
                count++;
                value += id + '_' + date + ';';
                if(date * 1 > exp_date * 1) {
                exp_date = date;
                }
                }
                } else {
                count++;
                value = id + '_' + date + ';';
                }

                if(jq('.cart_count')) {
                jq('.cart_count').html(count);
                }

                if(tour_type == 'package') {
                set_cookie('cart', value, exp_date);
                setCount(getCount());
                } else {
                set_cookie('cart_hike', value, exp_date);
                setCount(getCount('hike'));
                }
                }

                function addToCart_hotel(id, date) {
                cookie = get_cookie('cart');
                var count = 0;
                var add = true;
                var value = '';
                if(cookie) {
                var arr = cookie.split(";");
                for(i = 0; i < arr.length; i++) {
                  if(arr[i]) {
                  if(id !=arr[i]) {
                  count++;
                  value +=arr[i] + ';' ;
                  } else {
                  add=false;
                  }
                  }
                  }
                  }
                  if(add) {
                  count++;
                  value +=id + ';' ;
                  jq('#' + id + " .itt_add_to_basket_span" ).hide();
                  jq('#' + id + " .itt_del_to_basket" ).show();
                  jq('#' + id).removeClass("itt_add_to_basket");
                  jq('#' + id).addClass("itt_add_to_basket_to_del");
                  } else {
                  jq('#' + id + " .itt_add_to_basket_span" ).show();
                  jq('#' + id + " .itt_del_to_basket" ).hide();
                  jq('#' + id).removeClass("itt_add_to_basket_to_del");
                  jq('#' + id).addClass("itt_add_to_basket");
                  if(date) {
                  jq('#' + date).hide();
                  }
                  }

                  if(jq('.cart_count')) {
                  jq('.cart_count').html(count);
                  }
                  set_cookie('cart', value, 100 * 60 * 60 * 24);

                  setCount(getCount());
                  }

                  function in_array(needle, haystack, strict) {
                  var found=false, key, strict=!!strict;
                  for (key in haystack) {
                  if ((strict && haystack[key]===needle) || (!strict && haystack[key]==needle)) {
                  found=true;
                  break;
                  }
                  }
                  return found;
                  }

                  function set_cookie(cookie_name, value, expire) {
                  var expire_date=new Date();

                  expire_date.setDate(expire_date.getDate() + expire*1);
                  document.cookie=(cookie_name + "=" + escape(value) + ((expire==null) ? "" : ";expires=" + expire_date.toGMTString()));

                  return true;
                  }

                  function setCount(count) {
                  if(jq('.cart_count')) {
                  if(count) {
                  if(count=='0' ) {
                  jq('.cart_count').html('');
                  jq('#tour_search_module .cart_link').css({opacity: '0.5' });
                  } else {
                  str='(' + count + ')' ;
                  jq('.cart_count').html(str);
                  jq('#tour_search_module .cart_link').css({opacity: '1' });
                  }

                  jq('.cart_count').show();
                  } else {
                  jq('.cart_count').hide();
                  jq('#tour_search_module .cart_link').css({opacity: '0.5' });
                  }
                  } else {
                  jq('#tour_search_module .cart_link').css({opacity: '0.5' });
                  }
                  }

                  function getCount(tour_type='package' ) {
                  if(tour_type=='package' ) {
                  cookie=get_cookie('cart');
                  } else {
                  cookie=get_cookie('cart_hike');//куки экскурсионных туров
                  }
                  if(cookie) {
                  cookie=cookie.slice(0, -1);
                  arr=cookie.split(";");
                  return arr.length;
                  } else
                  return '0' ;
                  }

                  function get_cookie(cookie_name) {
                  if (document.cookie.length> 0) {
                  cookie_start = document.cookie.indexOf(cookie_name + "=");

                  if (cookie_start != -1) {
                  cookie_start = ((cookie_start + cookie_name.length) + 1);
                  cookie_end = document.cookie.indexOf(";", cookie_start);

                  if ( cookie_end == -1) {
                  cookie_end = document.cookie.length;
                  }

                  return unescape(document.cookie.substring(cookie_start, cookie_end));
                  }
                  }

                  return false;
                  }

                  function setChecked() {
                  cookie = get_cookie('cart');
                  if(cookie) {
                  var arr = cookie.split(";");
                  var ids = Array();
                  for(i = 0; i < arr.length; i++){
                    if(arr[i]) {
                    data=arr[i].split('_');
                    ids.push(data[0]);
                    }
                    }

                    jq('input[class^="list_stars" ]').each(function() {
                    if(jq.inArray(this.id, ids) !='-1' ) {
                    jq(this).attr('checked', true);
                    }
                    });
                    }

                    }
                    function setCheckedHotels() {
                    cookie=get_cookie('cart');
                    if(cookie) {
                    var arr=cookie.split(";");
                    var ids=Array();
                    for(i=0; i < arr.length; i++){
                    if(arr[i]) {
                    data=arr[i].split('_');
                    ids.push(data[0]);
                    }
                    }
                    jq('.itt_add_to_basket').each(function() {
                    if(jq.inArray(this.id, ids) !='-1' ) {
                    jq('#'+this.id+" .itt_add_to_basket_span").hide();
                    jq('#'+this.id+" .itt_del_to_basket").show();
                    jq('#'+this.id).removeClass("itt_add_to_basket");
                    jq('#'+this.id).addClass("itt_add_to_basket_to_del");
                    }
                    });
                    }
                    }

                    function showToursCart() {
                    var loc=window.location.toString();
                    var ids=getCartIds('package');
                    var options=jq('body').data('options');

                    if(ids !='' ) {
                    var url=ids.join('+');
                    } else {
                    var url='' ;
                    }

                    jq.getJSON(options.modules_action, 'action=package_tour_cart&ids=' + url, function(data) {
                    jq('div.tour_search_result').html('');
                    jq('.tour_load').hide();
                    if(options.modules_popup_result) {
                    if(options.modules_popup_type=='div' ) {
                    jq('div.tour_search_result').parents('table.boxy-wrapper').remove();
                    if(search_box) jq('div.tour_search_result').parents('table.boxy-wrapper').remove();
                    search_box=new Boxy('<div id="main_content" class="itt_main_block tour_search_result" style="text-align: center;background: none repeat scroll 0 0 #FFFFFF;">
                    </div>'
                    , { modal: true
                    , title: jq('#tour_search_result_caption').html()
                    }
                    );
                    lang();
                    title_box('small');
                    jq('#main_content').css('width', '310px');
                    jq('.itt_main_block strong').attr('style', 'color:#000000!important;font-size:12px!important');
                    title_box('big');
                    search_box.setContent('<div class="itt_main_block tour_search_result" style="overflow: auto;background: none repeat scroll 0 0 #FFFFFF;">' + data.text + '</div>');
                    set_poput_actual_size(search_box, 740);
                    } else {
                    popupWin.document.write(data.text);
                    popupWin.document.close();
                    }
                    } else {
                    jq('div.tour_search_result').html(data.text);
                    if(jq.browser.opera) {
                    jq('.ellipsis').css('white-space', 'normal');
                    jq('.tour_search_result div:eq(0)').css('width', jq('.tour_search_result div:eq(0)').width());
                    jq('.ellipsis').css('white-space', 'nowrap');
                    }
                    var targetOffset = jq('div.tour_search_result').offset().top;
                    jq('html,body').animate({scrollTop: targetOffset}, 700);
                    }

                    return false;
                    });
                    jq('.tour_load').hide();
                    }

                    function showHikeToursCart() {
                    var loc = window.location.toString();
                    var ids = getCartIds('hike');
                    var options = jq('body').data('options');

                    if(ids != '') {
                    var url = ids.join('+');
                    } else {
                    var url = '';
                    }

                    jq.getJSON(options.modules_action, 'action=hike_tour_cart&ids=' + url, function(data) {
                    jq('div.tour_search_result').html('');
                    jq('.tour_load').hide();
                    if(options.modules_popup_result) {
                    if(options.modules_popup_type == 'div') {
                    jq('div.tour_search_result').parents('table.boxy-wrapper').remove();
                    if(search_box) jq('div.tour_search_result').parents('table.boxy-wrapper').remove();
                    search_box = new Boxy('<div id="main_content" class="itt_main_block tour_search_result" style="text-align: center;background: none repeat scroll 0 0 #FFFFFF;"></div>'
                    , { modal: true
                    , title: jq('#tour_search_result_caption').html()
                    }
                    );
                    lang();
                    title_box('small');
                    jq('#main_content').css('width', '310px');
                    jq('.itt_main_block strong').attr('style', 'color:#000000!important;font-size:12px!important');
                    title_box('big');
                    search_box.setContent('<div class="itt_main_block tour_search_result" style="overflow: auto;background: none repeat scroll 0 0 #FFFFFF;">' + data.text + '</div>');
                    set_poput_actual_size(search_box, 740);
                    } else {
                    popupWin.document.write(data.text);
                    popupWin.document.close();
                    }
                    } else {
                    jq('div.tour_search_result').html(data.text);
                    if(jq.browser.opera) {
                    jq('.ellipsis').css('white-space', 'normal');
                    jq('.tour_search_result div:eq(0)').css('width', jq('.tour_search_result div:eq(0)').width());
                    jq('.ellipsis').css('white-space', 'nowrap');
                    }
                    var targetOffset = jq('div.tour_search_result').offset().top;
                    jq('html,body').animate({scrollTop: targetOffset}, 700);
                    }

                    return false;
                    });
                    jq('.tour_load').hide();
                    }

                    function getCartIds(tour_type = 'package') {
                    if(tour_type == 'package') {
                    cookie = get_cookie('cart');
                    } else {
                    cookie = get_cookie('cart_hike');
                    }
                    if(cookie) {
                    var ids = Array();
                    var arr = cookie.split(";");
                    for(i = 0; i < arr.length; i++){
                      if(arr[i]) {
                      data=arr[i].split('_');
                      ids.push(data[0]);
                      }
                      }
                      return ids;
                      }
                      return '' ;
                      }

                      function showCart() {
                      var options=jq('body').data('options');

                      var params=(jq('#package_search_form').serialize());

                      if(jq('#add_package_tour_type').length) {
                      jq('#add_package_tour_type').remove();
                      }


                      if(options.modules_popup_result && options.extended_search_url !='' ){
                      window.location=options.extended_search_url + '#' + params;
                      return false;
                      }

                      if(options.modules_popup_result) {
                      if(options.modules_popup_type=='div' ) {
                      if(search_box)
                      jq('div.tour_search_result').parents('table.boxy-wrapper').remove();
                      search_box=new Boxy('<div class="itt_main_block tour_search_result" style="text-align: center;">'+jq('#go_tour_search_caption').html()+'<br />'+jq('#please_wait_caption').html()+'<br /><img class="load_center" src="'+options.modules_url+'images/ajax_loader_circle.gif" /></div>',
                      {modal: true
                      , title: jq('#tour_search_result_caption').html()
                      //, afterHide: function(event, ui) { jq('body').css('overflow', ''); }
                      //, afterShow: function(event, ui) { jq('body').css('overflow', 'hidden'); }
                      });
                      } else {
                      popupWin = window.open('', '', 'status=no,width=750,height=240,scrollbars=yes,resizable=no,top=10,left='+(screen.width-800)/2);
                      popupWin.document.write('<div class="window_popup" style="width: 100%; text-align: center;"><img style="margin: 50px 0;" src="'+options.modules_url+'images/ajax_loader_circle.gif" /></div>');
                      popupWin.document.close();
                      }
                      } else {
                      jq('div.tour_search_result').html('');
                      jq('.tour_load').show();
                      }

                      if(!options.modules_popup_result && jq('#module_search_query').val() == '') {
                      var loc = window.location.toString();
                      var ids = getCartIds();
                      if(ids != '') {
                      var url = ids.join('+');
                      } else {
                      var url = '';
                      }

                      if(url != '') {
                      if(loc.indexOf('#') == -1)
                      window.location = loc + '#action=package_tour_cart&ids='+url;
                      else
                      window.location = loc.substr(0, loc.indexOf('#')) + '#action=package_tour_cart&ids='+url;
                      }
                      }

                      jq.getJSON(options.modules_action, 'action=package_tour_cart&ids='+url, function(data) {
                      search_request_active = false;
                      if(options.modules_popup_result) {
                      if(options.modules_popup_type == 'div') {
                      search_box.setContent('<div class="itt_main_block tour_search_result" style="overflow: auto;">'+data.text+'</div>');
                      set_poput_actual_size(search_box);
                      } else {
                      popupWin.document.write(data.text);
                      popupWin.document.close();
                      }
                      } else {
                      jq('div.tour_search_result').html(data.text);
                      jq('.tour_load').hide();
                      if(jq.browser.opera) { // for opera only
                      jq('.ellipsis').css('white-space', 'normal');
                      jq('.tour_search_result div:eq(0)').css('width', jq('.tour_search_result div:eq(0)').width());
                      jq('.ellipsis').css('white-space', 'nowrap');
                      }
                      var targetOffset = jq('div.itt_title').offset().top;
                      jq('html,body').animate({scrollTop: targetOffset}, 700);
                      }
                      return false;
                      });
                      return false;
                      }

                      jq(document).ready(function(){
                      checkCookie();
                      setCount(getCount());
                      jq('.select').live("click", function(){
                      var price = jq(this, 'option:selected').val();
                      price = price.toString().split(':');
                      jq('#main_price').html(price[0]);
                      });
                      });

                      function window_close(_this){
                      jq('#main_price_currency_package').die("click");
                      jq('#itt_package_cur_popup li').die("click");
                      jq('#main_price_currency').die("click");
                      jq('.itt_cur_popup li').die("click");
                      jq('body div:last').prev().remove();
                      jq('body div:last').remove();
                      }

                      function toggle_hotel_info(hike){
                      jq(".ittour_order_block_hotel_info").toggle();
                      //jq(".ittour_order_block_transport_info").toggle();
                      //jq(".ittour_order_block_customer_info").toggle();

                      if(jq(".ittour_order_block_hotel_info").is(":visible")){
                      if(hike){
                      jq(".it_hiden_info").html(jq(".it_hiden_info").attr('hide_text'));
                      } else {
                      jq(".it_hiden_info").html(jq(".it_hiden_info").attr('hide_text'));
                      }
                      } else {
                      if(hike){
                      jq(".it_hiden_info").html(jq(".it_hiden_info").attr('show_text'));
                      } else {
                      jq(".it_hiden_info").html(jq(".it_hiden_info").attr('show_text'));
                      }
                      }
                      }

                      function title_box(size){

                      if (size == 'big'){
                      jq('#title_box').css('width', '742px');
                      jq('.ittour_order_block_title_box_center_corner').css('width', '735px');
                      jq('.it_gradient_right').css('width', '99%');
                      jq('.it_gradient_right h2').css({'width':'116px', 'margin':'0'})
                      } else if(size == 'small'){
                      jq('#title_box').css('width', '312px');
                      jq('.ittour_order_block_title_box_center_corner').css('width', '305px');
                      jq('.it_gradient_right').css('width', '97%');
                      jq('.it_gradient_right h2').html('');
                      }
                      }

                      function lang(){
                      var lang_search_results = jq('#search_results').html();
                      var lang_close = jq('#close').html();
                      jq('.it_gradient_right h2').html(lang_search_results);
                      jq('.it_close span').html(lang_close);
                      }

                      function selectToursInCart(tour_type = 'package') {
                      if(tour_type == 'package') {
                      cookie = get_cookie('cart');//куки пакетных туров
                      } else {
                      cookie = get_cookie('cart_hike');//куки экскурсионных туров
                      }
                      if(cookie) {
                      var arr = cookie.split(";");
                      for(i = 0; i < arr.length; i++) {
                        if(arr[i]) {
                        data=arr[i].split('_');
                        if(tour_type=='package' ) {
                        data[0]=data[0].substring(0, data[0].length - 1)//обрезаем дефис "-" в конце от id тура
                        }
                        jq('#' + data[0]).attr('checked', true);
                        }
                        }
                        }
                        }


                        function checkCookie(tour_type='package' ){
                        var today=new Date().getTime();
                        today=Math.floor(today / 1000);
                        if(tour_type=='package' ) {
                        cookie=get_cookie('cart');//куки пакетных туров
                        } else {
                        cookie=get_cookie('cart_hike');//куки экскурсионных туров
                        }
                        if(cookie) {
                        var arr=cookie.split(";");
                        var value='' ;
                        var exp_date=0;
                        for(i=0; i < arr.length; i++) {
                        if(arr[i]) {
                        // сравниваем дату из куки с той которая пришла
                        data=arr[i].split('_');
                        // если дата меньше, чем сегодня, удаляем данную куку
                        if(data[1]>= today) {
                        value += data[0] + '_' + data[1] + ';';
                        if(data[1] * 1 > exp_date * 1) {
                        exp_date = data[1];
                        }
                        }
                        }
                        }
                        if(tour_type == 'package') {
                        set_cookie('cart', value, exp_date);
                        } else {
                        set_cookie('cart_hike', value, exp_date);
                        }
                        }
                        }
