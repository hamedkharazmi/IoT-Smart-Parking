var red_st, green_st;
var slots;
// free=1  full=2  free-to-full=12  full-to-free=21

$(document).ready(function () {
  var score = {
    last: 0,
    poll: function () {
      var data = new FormData();
      data.append("last", score.last);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "BE.php", true);
      xhr.timeout = 0; // 1000 ms = 1 sec
      xhr.ontimeout = function () {
        score.poll();
      };
      xhr.onload = function () {
        if (xhr.status == 403 || xhr.status == 404) {
          alert("ERROR LOADING FILE!");
        } else {
          var res = "";
          try {
            res = JSON.parse(this.response);
            score.update(res);
          } catch (error) {
            score.poll();
          }
        }
      };
      xhr.send(data);
    },

    update: function (data) {
      if (data["f"] == 1) {
        window.location.reload();
      }
      checkStatus(data["a"], data["g"]);
      score.last = data["t"];
      score.poll();
    },
  };
  window.addEventListener("load", score.poll);

  $("#map").click(function () {
    $("#addmap").html(
      "<iframe width='100%' height='100%' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='https://maps.google.com/maps?width=600&amp;height=500&amp;hl=en&amp;q=%D8%A7%D8%B3%D8%AA%D8%A7%D9%86%20%D8%A7%D8%B5%D9%81%D9%87%D8%A7%D9%86%D8%8C%20%D8%B1%D8%A7%D9%88%D9%86%D8%AF%D8%8C%20%D8%A8%D9%84%D9%88%D8%A7%D8%B1%20%D8%B9%D9%84%D8%A7%D9%85%D9%87%20%D9%82%D8%B7%D8%A8%20%D8%B1%D8%A7%D9%88%D9%86%D8%AF%DB%8C%D8%8C%20%D8%AF%D8%A7%D9%86%D8%B4%DA%AF%D8%A7%D9%87%20%DA%A9%D8%A7%D8%B4%D8%A7%D9%86%20kashan+(kashan%20uni)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'></iframe> "
    );
  });



  ////////////////////////////******************************  for test: **********************************************///////////////////////////

  checkStatus(1,0);    // slot
  //checkStatus(12,0);   // free to full
  //checkStatus(21,0);   // full to free
  //checkStatus(2,0);    // full

  //checkStatus(1,1);    // free slot and gate is open

  // برای تست هر کدام، کافی است خط مربوط به آن را از حالت کامنت خارج کنید





  $(".about").click(function () {
    $(".tr1").css("z-index", "9");
    $(".tr1").css("transform", "none");
    $(".tr1").css("-webkit-transform", "none");
    $(".tr1").css("transition", "0.5s cubic-bezier(0.75, 0, 0.25, 1)");
  });
  $(".nemoodar").click(function () {
    $(".tr2").css("z-index", "9");
    $(".tr2").css("transform", "none");
    $(".tr2").css("-webkit-transform", "none");
    $(".tr2").css("transition", "0.5s cubic-bezier(0.75, 0, 0.25, 1)");
    $(function () {
      Highcharts.setOptions({
        colors: ["#495d65bb"],
        chart: {
          style: {
            fontFamily: "sans-serif",
            color: "#34495e",
          },
        },
      });
      $("#container-chart").highcharts({
        chart: {
          type: "column",
          backgroundColor: "#fff",
        },
        title: {
          text: "History",
          style: {
            color: "#34495e",
          },
        },
        xAxis: {
          tickWidth: 0,
          labels: {
            style: {
              color: "#34495e",
            },
          },
          categories: [
            "July 20",
            "July 21",
            "July 22",
            "July 23",
            "July 24",
            "July 25",
            "July 26",
            "July 27",
            "July 28",
            "July 29",
            "July 30",
            "July 31",
            "August 1",
            "August 2",
            "August 3",
            "August 4",
            "August 5",
            "August 6",
          ],
        },
        yAxis: {
          gridLineWidth: 0.5,
          gridLineDashStyle: "dash",
          gridLineColor: "black",
          title: {
            text: "",
            style: {
              color: "#34495e",
            },
          },
          labels: {
            formatter: function () {
              return Highcharts.numberFormat(this.value, 0, "", ",");
            },
            style: {
              color: "#34495e",
            },
          },
        },
        legend: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        tooltip: {
          valuePrefix: "",
        },
        plotOptions: {
          column: {
            borderRadius: 2,
            pointPadding: 0,
            groupPadding: 0.1,
          },
        },
        series: [
          {
            name: "Occupancy",
            data: [
              14,
              10,
              16,
              18,
              13,
              8,
              12,
              10,
              9,
              17,
              8,
              6,
              14,
              13,
              10,
              8,
              17,
              13,
            ],
          },
        ],
      });
    });
  });
});

function onClickMenu() {
  document.getElementById("menu").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}

function checkStatus(slots, gateOC) {
  gate(gateOC);
  if (slots == 1) {
    st1();
    cle2();
    chart_Available(2, 1);
  }
  if (slots == 12) {
    st12();
    cle2();
    chart_Available(2, 1);
  }
  if (slots == 21) {
    st21();
    cle();
    chart_Available(3, 0);
  }
  if (slots == 2) {
    st2();
    cle();
    chart_Available(3, 0);
  }
}

function gate(st) {
  if (st == 1) {
    $(".gateST").html("<sapn>OPEN</span>");
    $(".gateST").css("color", "green");
  }
  if (st == 0) {
    $(".gateST").html("<sapn>CLOSE</span>");
    $(".gateST").css("color", "red");
  }
}

function A2() {
  $(".Animated_car").addClass("Animated2 Animated2_2");
  setTimeout("A3()", 2600);
}
function A3() {
  $(".Animated_car").addClass("Animated3");
  setTimeout("A4()", 2700);
}
function A4() {
  $(".Animated_car").addClass("Animated4 Animated1_1");
}
function A6() {
  $(".Animated_car").addClass("Animated6");
}
function red() {
  $(".co_2").html("<span></span>");
  $(".ch2").css("background-color", "#D92626");
  $(".free_slot").html("<span>0</span>");
  $(".co_2").html("<div id='pieChart' class='chart'></div>");
  $(".co_2").append(
    "<div class='status'><h1>Parking Status</h1><p>Total Seats: 3 <br>Available: 0</p></div>"
  );
  chart_Available(3, 0);
}
function green() {
  $(".co_2").html("<span></span>");
  $(".ch2").css("background-color", "#2e751d");
  $(".free_slot").html("<span>1</span>");
  $(".co_2").html("<div id='pieChart' class='chart'></div>");
  $(".co_2").append(
    "<div class='status'><h1>Parking Status</h1><p>Total Seats: 3 <br>Available: 1</p></div>"
  );
  chart_Available(2, 1);
}

function cle() {
  $(".co_2").html("<span></span>");
  $(".co_2").html("<div id='pieChart' class='chart'></div>");
  $(".co_2").append(
    "<div class='status'><h1>Parking Status</h1><p>Total Seats: 3 <br>Available: 0</p></div>"
  );
}

function cle2() {
  $(".co_2").html("<span></span>");
  $(".co_2").html("<div id='pieChart' class='chart'></div>");
  $(".co_2").append(
    "<div class='status'><h1>Parking Status</h1><p>Total Seats: 3 <br>Available: 1</p></div>"
  );
}

function st1() {
  $(".Animated_car").css("display", "block");
  $(".Animated_car").addClass("free");
  $(".ch2").css("background-color", "#2e751d");
  $(".free_slot").html("<span>1</span>");
}
function st12() {
  $(".Animated_car").css("display", "block");
  $(".ch2").css("background-color", "#2e751d");
  $(".Animated_car").addClass("Animated1");
  $(".free_slot").html("<span>1</span>");
  setTimeout("A2()", 5000);
  setTimeout("red()", 13000);
}
function st21() {
  $(".Animated_car").css("display", "block");
  $(".ch2").css("background-color", "#D92626");
  $(".Animated_car").addClass("Animated4 Animated5 Animated5_5");
  $(".free_slot").html("<span>0</span>");
  setTimeout("A6()", 3000);
  setTimeout("green()", 4500);
}
function st2() {
  $(".Animated_car").css("display", "block");
  $(".Animated_car").addClass("full");
  $(".ch2").css("background-color", "#D92626");
  $(".free_slot").html("<span>0</span>");
}

// ////////////// chart

function chart_Available(red_st, green_st) {
  $("#pieChart").drawPieChart([
    {title: "full", value: red_st, color: "rgba(219, 29, 29, 0.95)"},
    {title: "free", value: green_st, color: "#2e751d"},
  ]);
}

(function ($, undefined) {
  $.fn.drawPieChart = function (data, options) {
    var $this = this,
      W = $this.width(),
      H = $this.height(),
      centerX = W / 2,
      centerY = H / 2,
      cos = Math.cos,
      sin = Math.sin,
      PI = Math.PI,
      settings = $.extend(
        {
          segmentShowStroke: true,
          segmentStrokeColor: "#fff",
          segmentStrokeWidth: 1,
          baseColor: "#fff",
          baseOffset: 15,
          edgeOffset: 30, //offset from edge of $this
          pieSegmentGroupClass: "pieSegmentGroup",
          pieSegmentClass: "pieSegment",
          lightPiesOffset: 12, //lighten pie's width
          lightPiesOpacity: 0.3, //lighten pie's default opacity
          lightPieClass: "lightPie",
          animation: true,
          animationSteps: 90,
          animationEasing: "easeInOutExpo",
          tipOffsetX: -15,
          tipOffsetY: -45,
          tipClass: "pieTip",
          beforeDraw: function () {},
          afterDrawed: function () {},
          onPieMouseenter: function (e, data) {},
          onPieMouseleave: function (e, data) {},
          onPieClick: function (e, data) {},
        },
        options
      ),
      animationOptions = {
        linear: function (t) {
          return t;
        },
        easeInOutExpo: function (t) {
          var v = t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
          return v > 1 ? 1 : v;
        },
      },
      requestAnimFrame = (function () {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          }
        );
      })();

    var $wrapper = $(
      '<svg width="' +
        W +
        '" height="' +
        H +
        '" viewBox="0 0 ' +
        W +
        " " +
        H +
        '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>'
    ).appendTo($this);
    var $groups = [],
      $pies = [],
      $lightPies = [],
      easingFunction = animationOptions[settings.animationEasing],
      pieRadius = Min([H / 2, W / 2]) - settings.edgeOffset,
      segmentTotal = 0;

    //Draw base circle
    var drawBasePie = (function () {
      var base = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      var $base = $(base).appendTo($wrapper);
      base.setAttribute("cx", centerX);
      base.setAttribute("cy", centerY);
      base.setAttribute("r", pieRadius + settings.baseOffset);
      base.setAttribute("fill", settings.baseColor);
    })();

    //Set up pie segments wrapper
    var pathGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    var $pathGroup = $(pathGroup).appendTo($wrapper);
    $pathGroup[0].setAttribute("opacity", 0);

    //Set up tooltip
    var $tip = $('<div class="' + settings.tipClass + '" />')
        .appendTo("body")
        .hide(),
      tipW = $tip.width(),
      tipH = $tip.height();

    for (var i = 0, len = data.length; i < len; i++) {
      segmentTotal += data[i].value;
      var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("data-order", i);
      g.setAttribute("class", settings.pieSegmentGroupClass);
      $groups[i] = $(g).appendTo($pathGroup);
      $groups[i]
        .on("mouseenter", pathMouseEnter)
        .on("mouseleave", pathMouseLeave)
        .on("mousemove", pathMouseMove)
        .on("click", pathClick);

      var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("stroke-width", settings.segmentStrokeWidth);
      p.setAttribute("stroke", settings.segmentStrokeColor);
      p.setAttribute("stroke-miterlimit", 2);
      p.setAttribute("fill", data[i].color);
      p.setAttribute("class", settings.pieSegmentClass);
      $pies[i] = $(p).appendTo($groups[i]);

      var lp = document.createElementNS("http://www.w3.org/2000/svg", "path");
      lp.setAttribute("stroke-width", settings.segmentStrokeWidth);
      lp.setAttribute("stroke", settings.segmentStrokeColor);
      lp.setAttribute("stroke-miterlimit", 2);
      lp.setAttribute("fill", data[i].color);
      lp.setAttribute("opacity", settings.lightPiesOpacity);
      lp.setAttribute("class", settings.lightPieClass);
      $lightPies[i] = $(lp).appendTo($groups[i]);
    }

    settings.beforeDraw.call($this);

    triggerAnimation();

    function pathMouseEnter(e) {
      var index = $(this).data().order;
      $tip.text(data[index].title + ": " + data[index].value).fadeIn(200);
      if ($groups[index][0].getAttribute("data-active") !== "active") {
        $lightPies[index].animate({opacity: 0.8}, 180);
      }
      settings.onPieMouseenter.apply($(this), [e, data]);
    }
    function pathMouseLeave(e) {
      var index = $(this).data().order;
      $tip.hide();
      if ($groups[index][0].getAttribute("data-active") !== "active") {
        $lightPies[index].animate({opacity: settings.lightPiesOpacity}, 100);
      }
      settings.onPieMouseleave.apply($(this), [e, data]);
    }
    function pathMouseMove(e) {
      $tip.css({
        top: e.pageY + settings.tipOffsetY,
        left: e.pageX - $tip.width() / 2 + settings.tipOffsetX,
      });
    }
    function pathClick(e) {
      var index = $(this).data().order;
      var targetGroup = $groups[index][0];
      for (var i = 0, len = data.length; i < len; i++) {
        if (i === index) continue;
        $groups[i][0].setAttribute("data-active", "");
        $lightPies[i].css({opacity: settings.lightPiesOpacity});
      }
      if (targetGroup.getAttribute("data-active") === "active") {
        targetGroup.setAttribute("data-active", "");
        $lightPies[index].css({opacity: 0.8});
      } else {
        targetGroup.setAttribute("data-active", "active");
        $lightPies[index].css({opacity: 1});
      }
      settings.onPieClick.apply($(this), [e, data]);
    }
    function drawPieSegments(animationDecimal) {
      var startRadius = -PI / 2, //-90 degree
        rotateAnimation = 1;
      if (settings.animation) {
        rotateAnimation = animationDecimal;
      }

      $pathGroup[0].setAttribute("opacity", animationDecimal);

      //draw each path
      for (var i = 0, len = data.length; i < len; i++) {
        var segmentAngle =
            rotateAnimation * ((data[i].value / segmentTotal) * (PI * 2)), //start radian
          endRadius = startRadius + segmentAngle,
          largeArc = (endRadius - startRadius) % (PI * 2) > PI ? 1 : 0,
          startX = centerX + cos(startRadius) * pieRadius,
          startY = centerY + sin(startRadius) * pieRadius,
          endX = centerX + cos(endRadius) * pieRadius,
          endY = centerY + sin(endRadius) * pieRadius,
          startX2 =
            centerX + cos(startRadius) * (pieRadius + settings.lightPiesOffset),
          startY2 =
            centerY + sin(startRadius) * (pieRadius + settings.lightPiesOffset),
          endX2 =
            centerX + cos(endRadius) * (pieRadius + settings.lightPiesOffset),
          endY2 =
            centerY + sin(endRadius) * (pieRadius + settings.lightPiesOffset);
        var cmd = [
          "M",
          startX,
          startY, //Move pointer
          "A",
          pieRadius,
          pieRadius,
          0,
          largeArc,
          1,
          endX,
          endY, //Draw outer arc path
          "L",
          centerX,
          centerY, //Draw line to the center.
          "Z", //Cloth path
        ];
        var cmd2 = [
          "M",
          startX2,
          startY2,
          "A",
          pieRadius + settings.lightPiesOffset,
          pieRadius + settings.lightPiesOffset,
          0,
          largeArc,
          1,
          endX2,
          endY2, //Draw outer arc path
          "L",
          centerX,
          centerY,
          "Z",
        ];
        $pies[i][0].setAttribute("d", cmd.join(" "));
        $lightPies[i][0].setAttribute("d", cmd2.join(" "));
        startRadius += segmentAngle;
      }
    }

    var animFrameAmount = settings.animation ? 1 / settings.animationSteps : 1, //if settings.animationSteps is 10, animFrameAmount is 0.1
      animCount = settings.animation ? 0 : 1;
    function triggerAnimation() {
      if (settings.animation) {
        requestAnimFrame(animationLoop);
      } else {
        drawPieSegments(1);
      }
    }
    function animationLoop() {
      animCount += animFrameAmount; //animCount start from 0, after "settings.animationSteps"-times executed, animCount reaches 1.
      drawPieSegments(easingFunction(animCount));
      if (animCount < 1) {
        requestAnimFrame(arguments.callee);
      } else {
        settings.afterDrawed.call($this);
      }
    }
    function Max(arr) {
      return Math.max.apply(null, arr);
    }
    function Min(arr) {
      return Math.min.apply(null, arr);
    }
    return $this;
  };
})(jQuery);
