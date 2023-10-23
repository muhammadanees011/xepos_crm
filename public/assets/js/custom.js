/**
 *
 * You can write your JS code here, DO NOT touch the default style file
 * because it will make it harder for you to update.
 * 
 */

"use strict";



$(document).ready(function() {

    $.ajax({
       type:'GET',
       url:'/dashboard/users/chart',
       data:'_token = <?php echo csrf_token() ?>',
       success:function(response) {
            var records=response.data;
            var largest_number=0;
            for(var i=0; i<12; i++)
            {
              if(records[i]> largest_number)
              {
                largest_number=records[i];
              }
            }
            
              //user chart
              var usersOptions = {
                  chart: {
                    height: 230,
                    type: "line",
                    shadow: {
                      enabled: true,
                      color: "#000",
                      top: 18,
                      left: 7,
                      blur: 10,
                      opacity: 1
                    },
                    toolbar: {
                      show: false
                    }
                  },
                  colors: ["#3dc7be", "#ffa117"],
                  dataLabels: {
                    enabled: true
                  },
                  stroke: {
                    curve: "smooth"
                  },
                  series: [{
                    name:  new Date().getFullYear(),
                    data: records
                  },
                  // {
                  //   name: "Low - 2019",
                  //   data: [7, 11, 30, 18, 25, 13, 15, 14, 36, 7, 11, 30]
                  // }
                  ],
                  grid: {
                    borderColor: "#e7e7e7",
                    row: {
                      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                      opacity: 0.0
                    }
                  },
                  markers: {
                    size: 6
                  },
                  xaxis: {
                    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun" , "July" , "Aug" , "Sep", "Oct", "Nov", "Dec"],
                
                    labels: {
                      style: {
                        colors: "#9aa0ac"
                      }
                    }
                  },
                  yaxis: {
                    title: {
                      text: "U s e r s"
                    },
                    labels: {
                      style: {
                        color: "#9aa0ac"
                      }
                    },
                    min: 0,
                    max: largest_number+5
                  },
                  legend: {
                    position: "top",
                    horizontalAlign: "right",
                    floating: true,
                    offsetY: -25,
                    offsetX: -5
                  }
                };

                var chart = new ApexCharts(document.querySelector("#users"), usersOptions);
                chart.render();
                //end user chart

}
});

});



$(document).ready(function() {

  $.ajax({
     type:'GET',
     url:'/dashboard/jobs/chart',
     data:'_token = <?php echo csrf_token() ?>',
     success:function(response) {
          var records=response.data;
          var largest_number=0;
          for(var i=0; i<12; i++)
          {
            if(records[i]> largest_number)
            {
              largest_number=records[i];
            }
          }
          
          //jobs chart
            var jobsOptions = {
              chart: {
                height: 230,
                type: "bar",
                shadow: {
                  enabled: true,
                  color: "#000",
                  top: 18,
                  left: 7,
                  blur: 10,
                  opacity: 1
                },
                toolbar: {
                  show: false
                }
              },
              colors: ["#3dc7be", "#ffa117"],
              dataLabels: {
                enabled: true
              },
              stroke: {
                curve: "smooth"
              },
              series: [
              {
                name:  new Date().getFullYear(),
                data:records
              },
              // {
              //   name: "2022",
              //   data: [7, 11, 30, 18, 25, 13, 15, 14, 32, 32, 15, 14]
              // },
              ],
              grid: {
                borderColor: "#e7e7e7",
                row: {
                  colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                  opacity: 0.0
                }
              },
              markers: {
                size: 6
              },
              xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun" , "July" , "Aug" , "Sep", "Oct", "Nov", "Dec"],
            
                labels: {
                  style: {
                    colors: "#9aa0ac"
                  }
                }
              },
              yaxis: {
                title: {
                  text: "J o b s"
                },
                labels: {
                  style: {
                    color: "#9aa0ac"
                  }
                },
                min: 0,
                max: largest_number+5
              },
              legend: {
                position: "top",
                horizontalAlign: "right",
                floating: true,
                offsetY: -25,
                offsetX: -5
              }
            };

            var chart = new ApexCharts(document.querySelector("#jobs"), jobsOptions);
            chart.render();
          // end job chart

      }
    });

    });