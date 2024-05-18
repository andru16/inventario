/**

 * StackedColumn
 * Spline
 * bubbleChart
 * mapChart
 * navigationActive
 * lineChart
 * dropdownMenu
 * tabNav
 * tabMessager
 * toggleInbox
 * scrollbarMember
 * scrollbarMessage
 * scrollbarMessageBox
 * scrollbarTable
 * counter
 * progressBar
 * detectViewport
 * setWidth
 * sendMessage
 * waveButton
 * retinaLogos
 * removePreload

*/
;(function($) {

   'use strict'

        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };

        
      
       

        var mapChart = function() {
            /**
             * Define SVG path for target icon
             */
            var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";

            /**
             * Create the map
             */
            var map = AmCharts.makeChart( "chartdiv", {
              "type": "map",
              "projection": "mercator",
              "theme": "theme",
              "imagesSettings": {
                "rollOverColor": "#fff",
                "rollOverScale": 3,
                "selectedScale": 3,
                "selectedColor": "#fff",
                
              },

              "areasSettings": {
                "unlistedAreasColor": "#2e2f32",
                "outlineThickness": 0.1
              },

              "dataProvider": {
                "map": "worldLow",
                "images": [ {
                  "svgPath": targetSVG,
                  "zoomLevel": 5,
                  "scale": 0.5,
                  "title": "North America",
                  "latitude": 51.980450,
                  "longitude": -85.684635,
                  "color": "#52488b"
                }, {
                  "svgPath": targetSVG,
                  "zoomLevel": 5,
                  "scale": 0.5,
                  "title": "Canada",
                  "latitude": 53.656331,
                  "longitude": -92.694402,
                  "color": "#00afc6"
                }, {
                  "svgPath": targetSVG,
                  "zoomLevel": 5,
                  "scale": 0.5,
                  "title": "United States",
                  "latitude": 49.793445,
                  "longitude": -97.481657,
                  "color": "#ff2d78"
                },
                {
                  "svgPath": targetSVG,
                  "zoomLevel": 5,
                  "scale": 0.5,
                  "title": "South America",
                  "latitude": -2.091623,
                  "longitude": -64.758518,
                  "color": "#00afc6"
                },
                {
                  "svgPath": targetSVG,
                  "zoomLevel": 5,
                  "scale": 0.5,
                  "title": "South Africa",
                  "latitude": -23.851236,
                  "longitude": 23.760990,
                  "color": "#52488b"
                },
                {
                  "svgPath": targetSVG,
                  "zoomLevel": 5,
                  "scale": 0.5,
                  "title": "Bostwana",
                  "latitude": -18.300450,
                  "longitude": 25.132072,
                  "color": "#ff2d78"
                },
                {
                  "svgPath": targetSVG,
                  "zoomLevel": 5,
                  "scale": 0.5,
                  "title": "Turkey",
                  "latitude": 40.399815,
                  "longitude": 40.521479,
                  "color": "#52488b"
                },{
                  "svgPath": targetSVG,
                  "zoomLevel": 5,
                  "scale": 0.5,
                  "title": "Georgia",
                  "latitude": 42.671388,
                  "longitude": 42.299108,
                  "color": "#00afc6"
                },{
                  "svgPath": targetSVG,
                  "zoomLevel": 5,
                  "scale": 0.5,
                  "title": "Rusia",
                  "latitude": 68.657977,
                  "longitude": 129.138220,
                  "color": "#00afc6"
                },{
                  "svgPath": targetSVG,
                  "zoomLevel": 5,
                  "scale": 0.5,
                  "title": "Australia",
                  "latitude": -23.521443,
                  "longitude": 138.949597,
                  "color": "#00afc6"
                },
                ]
              },
              "export": {
                "enabled": true
              }
            } );
        }; // Map Chart


        var dropdownMenu = function() {
            var pull = $(".box .pull-right i"),
                user = $(".navbar-top ul.info-right li.user")
                pull.on('click',function() {
                    $(this).parent(".pull-right").toggleClass('open');
                    $(this).parent(".pull-right").find('.dropdown-menu').toggleClass('active');
                });
                user.on('click',function() {
                    $(this).toggleClass('open');
                    $(this).find('.dropdown-menu').toggleClass('active');
                });
        }; // Dropdown Menu

        var navigationActive = function() {
            var button = $(".top-button");
            button.on('click',function() {
                $(this).closest('body').children(".vertical-navigation").toggleClass('active').delay(800);
                $(this).closest('body').children('main').toggleClass('active');
                $(this).parent('.curren-menu').children('.logo').toggleClass('active');
                button.toggleClass('active');
                $(this).closest('body').children(".vertical-navigation").toggleClass('show');
            });
            var buttonNav = $('.vertical-navigation.left ul.sidebar-nav > li');
                buttonNav.on('click', function(event) {
                    $(this).closest('body').children(".vertical-navigation").removeClass('active');
                    $(this).closest('body').children('main').removeClass('active');
                    $(this).closest('body').find('.curren-menu').children('.logo').removeClass('active');
                event.preventDefault();
            });
        }; // Navigation Active

       

        var tabNav = function() {
            var speed = 1000;
            $('.vertical-navigation').each(function() {
                $(this).find('.sidebar-nav').children().first().addClass('active'),
                $(this).closest('body').find('main').children('section').first().show(),
                $(this).find('.sidebar-nav').children('li').on('click', function(e){
                    var liActive = $(this).index();
                    $(this).addClass('active').siblings().removeClass('active');
                    $(this).addClass('active').closest('body').find('main').children('section').eq(liActive).fadeIn(1000).show().siblings().hide();
                    e.preventDefault();
                });
            });
        }; // Tab Nav

        var tabMessager = function() {
            var speed = 1000;
            $('.member-status').each(function() {
            $(this).find('.member-tab').children().first().addClass('active'),
            $(this).children('.sidebar-member').find('.scroll').first().show().siblings().hide(),
            $(this).find('.member-tab').children('li').on('click', function(e){

                var liActive = $(this).index(),
                contentActive = $(this).siblings().removeClass('active').parents('.sidebar-member').children('.content-tab').children().eq(liActive);

                $(this).addClass('active').closest('.sidebar-member').find('.content-tab').children().eq(liActive).fadeIn(1000).show().siblings().hide();
                e.preventDefault();
            });
            });
        }; // Tab Message

        var calendar = function() {       
            $('#box-calendar').fullCalendar({
            header: {
                left: '',
                right: ''
            },
                defaultDate: '2017-11-12',
                navLinks: true, // can click day/week names to navigate views
                editable: true,
                eventLimit: true, // allow "more" link when too many events
                events: [
                    {
                        title: 'EVENT ONE',
                        start: '2017-11-09',
                        end: '2017-11-11',
                        backgroundColor: '#6256a9',
                        borderColor    : '#6256a9'
                    },
                    {
                        id: 999,
                        title: 'EVENT TWO',
                        start: '2017-11-11',
                        end: '2017-11-11',
                        backgroundColor: '#04aec6',
                        borderColor    : '#04aec6'
                    },
                    {
                        id: 999,
                        title: 'EVENT THREE',
                        start: '2017-11-14',
                        end: '2017-11-16',
                        backgroundColor: '#3d5afe',
                        borderColor    : '#3d5afe'
                    },
                    {
                        title: 'EVENT FOUR',
                        start: '2017-11-16',
                        end: '2017-11-18',
                        backgroundColor: '#ff4081',
                        borderColor    : '#ff4081'
                    },
                    {
                        title: 'EVENT FIVE',
                        start: '2017-11-24',
                        end: '2017-11-26',
                        backgroundColor: '#f09238',
                        borderColor    : '#f09238'
                    }
                ]
            });
        }; // Calendar

        var calendar_s2 = function() {
            $(function () {

                /* initialize the external events
                 -----------------------------------------------------------------*/
                function init_events(ele) {
                  ele.each(function () {

                    // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                    // it doesn't need to have a start or end
                    var eventObject = {
                      title: $.trim($(this).text()) // use the element's text as the event title
                    }

                    // store the Event Object in the DOM element so we can get to it later
                    $(this).data('eventObject', eventObject)

                    // make the event draggable using jQuery UI
                    $(this).draggable({
                      zIndex        : 1070,
                      revert        : true, // will cause the event to go back to its
                      revertDuration: 0  //  original position after the drag
                    })

                  })
                }

                init_events($('#external-events div.external-event'))

                /* initialize the calendar
                 -----------------------------------------------------------------*/
                //Date for the calendar events (dummy data)
                var date = new Date()
                var d    = date.getDate(),
                    m    = date.getMonth(),
                    y    = date.getFullYear()
                $('#box-calendar').fullCalendar({
                    header    : {
                        left  : '',
                        center: '',
                        right : ''
                    },
                    buttonText: {
                        today: 'today',
                        month: 'month',
                        week : 'week',
                        day  : 'day'
                    },
                    //Random default events
                    events    : [
                        {
                          title          : 'EVENT ONE',
                          start          : new Date(y, m, 9),
                          end            : new Date(y, m, 11),
                          backgroundColor: '#6256a9',
                          borderColor    : '#6256a9'
                        },
                        {
                          title          : 'EVENT TWO',
                          start          : new Date(y, m,11),
                          end            : new Date(y, m, 11),
                          allDay         : false,
                          backgroundColor: '#04aec6', 
                          borderColor    : '#04aec6' 
                        },
                        {
                          title          : 'EVENT THREE',
                          start          : new Date(y, m, 15),
                          end            : new Date(y, m, 17),
                          allDay         : false,
                          backgroundColor: '#3d5afe',
                          borderColor    : '#3d5afe'
                        },
                        {
                          title          : 'EVENT FOUR',
                          start          : new Date(y, m, 17),
                          end            : new Date(y, m, 19),
                          allDay         : false,
                          backgroundColor: '#ff4081',
                          borderColor    : '#ff4081'
                        },
                        {
                          title          : 'EVENT FIVE',
                          start          : new Date(y, m, 24),
                          end            : new Date(y, m, 26),
                          allDay         : false,
                          backgroundColor: '#f09238', 
                          borderColor    : '#f09238' 
                        }
                    ],
                    editable  : true,
                    droppable : true, // this allows things to be dropped onto the calendar !!!
                    drop      : function (date, allDay) { 

                        // this function is called when something is dropped
                        // retrieve the dropped element's stored Event Object
                        var originalEventObject = $(this).data('eventObject')

                        // we need to copy it, so that multiple events don't have a reference to the same object
                        var copiedEventObject = $.extend({}, originalEventObject)

                        // assign it the date that was reported
                        copiedEventObject.start           = date
                        // copiedEventObject.allDay          = allDay
                        copiedEventObject.backgroundColor = $(this).css('background-color')
                        copiedEventObject.borderColor     = $(this).css('border-color')

                        // render the event on the calendar
                        // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                        $('#calendar').fullCalendar('renderEvent', copiedEventObject, true)

                        // is the "remove after drop" checkbox checked?
                        if ($('#drop-remove').is(':checked')) {
                          // if so, remove the element from the "Draggable Events" list
                            $(this).remove()
                        }
                    }
                })

                /* ADDING EVENTS */
                var currColor = '#3c8dbc' //Red by default
                //Color chooser button
                var colorChooser = $('#color-chooser-btn')
                $('#color-chooser > li > a').on('click', function(e) {
                    e.preventDefault()
                    //Save color
                    currColor = $(this).css('color')
                    //Add color effect to button
                    $('#add-new-event').css({ 'background-color': currColor, 'border-color': currColor })
                })
                $('#add-new-event').on('click', function(e) {
                    e.preventDefault()
                    //Get value and make sure it is not null
                    var val = $('#new-event').val()
                    if (val.length == 0) {
                    return
                    }

                //Create events
                var event = $('<div />')
                event.css({
                    'background-color': currColor,
                    'border-color'    : currColor,
                    'color'           : '#fff'
                    }).addClass('external-event')
                    event.html(val)
                    $('#external-events').prepend(event)

                    //Add draggable funtionality
                    init_events(event)

                    //Remove event from text input
                    $('#new-event').val('');
                })
            })
        }; // Calendar S2

        var toggleInbox = function() {
            $( ".box-message .box-header" ).on('click', function() {
                $(this).toggleClass('active');
              $( ".box-message .box-content" ).slideToggle(300);
            });
        }; // Toggle Inbox

        var sendMessage = function() {
            $('textarea[name="message"]').each(function() {
                var text = $('textarea[name="message"]');
                $('.btn-send button').on('click', function(e) {
                    if (text.val() == '') {
                        alert('Please type in the box to chat!');
                    } else {
                        $('<div class="clearfix"></div><div class="message-in"><div class="message-pic"><img src="images/avatar/message-06.png" alt=""><div class="status-color purple"></div></div><div class="message-body"><div class="message-text"><p>' + text.val() + '</p></div></div></div>').appendTo('div.message-box .mCustomScrollBox .mCSB_container');
                        text.val('');
                        var heights = $('div.message-box .mCustomScrollBox .mCSB_container').height(),
                            agv = heights - 644;
                         $('div.message-box .mCustomScrollBox .mCSB_container').css({
                             top: -(agv),
                         });                    };
                     e.preventDefault();
                });
                $(this).keyup(function(event){
                var keycode = (event.keyCode ? event.keyCode : event.which);
                    if(keycode == '13'){
                        if (text.val() == '') {
                             alert('Please type in the box to chat!');
                        } else {
                            $('<div class="clearfix"></div><div class="message-in"><div class="message-pic"><img src="images/avatar/message-06.png" alt=""><div class="status-color purple"></div></div><div class="message-body"><div class="message-text"><p>' + text.val() + '</p></div></div></div>').appendTo('div.message-box .mCustomScrollBox .mCSB_container');
                            text.val('');
                             var heights = $('div.message-box .mCustomScrollBox .mCSB_container').height(),
                                agv = heights - 644;
                             $('div.message-box .mCustomScrollBox .mCSB_container').css({
                                 top: -(agv),
                             });
                        };
                    };
                    event.preventDefault();
                });
            });
        }; // Send Message

        var scrollbarMember = function() {
            if ( $().mCustomScrollbar ) {
               $(".member-status .sidebar-member .scroll").mCustomScrollbar({
                scrollInertia:400,
               });
            }
        }; // Scrollbar Member

        var scrollbarMessage = function() {
            if ( $().mCustomScrollbar ) {
               $(".box-message .box-content .scroll").mCustomScrollbar({
                scrollInertia:400,
               });
            }
        }; // Scrollbar Message

        var scrollbarMessageBox = function() {
            if ( $().mCustomScrollbar ) {
               $("#message .message-info .scroll").mCustomScrollbar({
                scrollInertia:400,
               });
            }
        }; // Scrollbar MessageBox

        var scrollbarTable = function() {
            $(".box-project .box-content").mCustomScrollbar({
                axis:"x",
                advanced:{autoExpandHorizontalScroll:true},
                scrollInertia:400,
            });
        }; // Scrollbar MessageBox

        var scrollbarCalendar = function() {
            $(window).on('load resize', function() {
                if ( matchMedia( 'only screen and (max-width: 1900px)' ).matches ) {
                    $(".box.calendar").find('#box-calendar').removeClass('active');
                    $(".box.calendar").mCustomScrollbar({
                        axis:"x",
                        theme:"light-3",
                        advanced:{autoExpandHorizontalScroll:true},
                        scrollInertia:400,
                    });
                } else {
                    $(".box.calendar").find('#box-calendar').addClass('active');
                }
            });
        }; // Scrollbar MessageBox

        var counter = function() {
            $('.status-bar').on('on-appear', function() {             
                $(this).find('.numb').each(function() { 
                    var to = parseInt( ($(this).attr('data-to')),10 ), speed = parseInt( ($(this).attr('data-speed')),10 );
                    if ( $().countTo ) {
                        $(this).countTo({
                            to: to,
                            speed: speed
                        });
                    }
                });
           });
        }; // Counter

        var progressBar = function(){
            $('td.bg').waypoint(function() {
                $('span').each( function() {
                    var percent = $(this).data('percent');
                     $(this).animate({
                        "width": percent + '%'
                    },1500); 
                });
            }, {offset: '100%'});
        };// Progress Bar

        var detectViewport = function() {
            $('[data-waypoint-active="yes"]').waypoint(function() {
                $(this).trigger('on-appear');
            }, { offset: '90%', triggerOnce: true });
             $(window).on('load', function() {
                setTimeout(function() {
                    $.waypoints('refresh');
                }, 100);
            });
        }; // Detect Viewport

        var setWidth = function() {
            $('.box.right').on('resize', function() {
                var w1 = $('.box.right').children('.box-content').width();
                $(this).find('canvas').css({
                    width: w1,
                });
            });
            $(window).on("resize", function () {
                // Set .right's width to the window width minus 480 pixels
                $("canvas").width( $(this).parent().width() );
            // Invoke the resize event immediately
            }).resize();
        }; // Set Width

        var waveButton = function () {
            Waves.attach('.button', ['waves-button', 'waves-float']);
            Waves.init();
        }; // Wave Button

        var retinaLogos = function() {
            var retina = window.devicePixelRatio > 1 ? true : false;
            if(retina) {
                $('.header .logo').find('img').attr( {src:'./images/logo@2x.png',width:'94',height:'47'} );   
            }
        }; // Retina Logos

        var removePreload = function() { 
            $(window).load(function() { 
                setTimeout(function() {
                    $('.loader').hide(); }, 300           
                ); 
            });
        }; //remove Preloader

    $(function() {
    
        mapChart();
        navigationActive();
        dropdownMenu();
        tabNav();
        tabMessager();
        // calendar();
        calendar_s2();
        toggleInbox();
        // scrollbarMember();
        // scrollbarMessage();
        // scrollbarMessageBox();
        // scrollbarTable();
        // scrollbarCalendar();
        counter();
        progressBar();
        detectViewport();
        setWidth();
        sendMessage();
        waveButton();
        retinaLogos();
        removePreload();
    });

})(jQuery);

